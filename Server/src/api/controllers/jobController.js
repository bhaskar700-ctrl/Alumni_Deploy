// controllers/jobController.js
import Job from '../models/Job.js';

const jobController = {
    createJob: async (req, res) => {
        try {
            const { title, description, location, company, type, applyLink, author } = req.body;
            const newJob = new Job({ title, description, location, company, type, applyLink, author });
            await newJob.save();
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
            res.status(200).json(updatedJob);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },

    deleteJob: async (req, res) => {
        try {
            const job = await Job.findByIdAndDelete(req.params.jobId);
            if (!job) {
                return res.status(404).json({ message: 'Job not found' });
            }
            res.status(200).json({ message: 'Job deleted successfully' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
};

export default jobController;
