// controllers/jobController.js
import Job from '../models/Job.js';
import User from '../models/User.js'; // Import the User model to fetch users
import NotificationController from './notificationController.js';

const jobController = {
    createJob: async (req, res) => {
        try {
            const { title, description, location, company, type, applyLink, author, image } = req.body;
            const newJob = new Job({ title, description, location, company, type, applyLink, author, image });
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
            const { image } = req.body;
            const updatedJobData = { ...req.body };
            if (image) {
                updatedJobData.image = image; // If image is provided, update the image field
            }

            const updatedJob = await Job.findByIdAndUpdate(req.params.jobId, updatedJobData, { new: true });
            if (!updatedJob) {
                return res.status(404).json({ message: 'Job not found' });
            }

            // Notify all users about the job update...
            const users = await User.find({});
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
    
            // Assuming req.user is populated by your authentication middleware
            const isAuthor = job.author.equals(req.user._id);
            const isAdmin = req.user.userType === 'admin';
    
            if (!isAuthor && !isAdmin) {
                return res.status(403).json({ message: 'Not authorized to delete this job' });
            }
    
            // Store job details for notification before deletion
            const jobTitle = job.title;
            const jobCompany = job.company;
    
            await job.remove();
    
            // Notify users about the job deletion
            // Replace the placeholder with actual logic to find interested users
            const interestedUsers = await User.find({}); // Example: Find users who favorited or applied to this job
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
    },
    
};

export default jobController;
