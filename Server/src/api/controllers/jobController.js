// controllers/jobController.js
import Job from '../models/Job.js';
import User from '../models/User.js'; // Import the User model to fetch users
import NotificationController from './NotificationController.js';

const jobController = {
    createJob: async (req, res) => {
        try {
            const { title, description, location, company, type, applyLink, author } = req.body;
            const newJob = new Job({ title, description, location, company, type, applyLink, author });
            await newJob.save();

            // Notify users about the new job posting
            const users = await User.find({}); // Fetch users to be notified (adjust logic as needed)
            users.forEach(user => {
                NotificationController.createNotification(
                    user._id,
                    'New Job Posting',
                    `New job available: ${title} at ${company}`,
                    `/jobs/${newJob._id}`
                );
            });

            res.status(201).json(newJob);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },

    getAllJobs: async (req, res) => {
        try {
            const jobs = await Job.find();
            res.status(200).json(jobs);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    getJobById: async (req, res) => {
        try {
            const job = await Job.findById(req.params.jobId);
            if (!job) {
                return res.status(404).json({ message: 'Job not found' });
            }
            res.status(200).json(job);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    updateJob: async (req, res) => {
        try {
            const updatedJob = await Job.findByIdAndUpdate(req.params.jobId, req.body, { new: true });
            if (!updatedJob) {
                return res.status(404).json({ message: 'Job not found' });
            }

            // Notify users about the job update
            const users = await User.find({}); // Fetch users to be notified (adjust logic as needed)
            users.forEach(user => {
                NotificationController.createNotification(
                    user._id,
                    'Job Update',
                    `Job updated: ${updatedJob.title} at ${updatedJob.company}`,
                    `/jobs/${updatedJob._id}`
                );
            });

            res.status(200).json(updatedJob);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },

    deleteJob: async (req, res) => {
        try {
            const job = await Job.findById(req.params.jobId);
            if (!job) {
                return res.status(404).json({ message: 'Job not found' });
            }

            // Store job details for notification before deletion
            const jobTitle = job.title;
            const jobCompany = job.company;

            await job.remove();

            // Notify users about the job deletion
            const interestedUsers = await User.find({ /* logic to find interested users */ });
            interestedUsers.forEach(user => {
                NotificationController.createNotification(
                    user._id,
                    'Job Deleted',
                    `Job removed: ${jobTitle} at ${jobCompany}`,
                    `/jobs`
                );
            });

            res.status(200).json({ message: 'Job deleted successfully' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
};

export default jobController;
