// routes/jobRoutes.js
import express from 'express';
import jobController from '../controllers/jobController.js';
import authenticate from '../../middleware/authenticate.js'; // Ensure this path is correct

const router = express.Router();

// Route to create a new job posting
router.post('/create', authenticate, jobController.createJob);

// Route to get all job postings
router.get('/all', jobController.getAllJobs);

// Route to get a specific job posting by ID
router.get('/:jobId', jobController.getJobById);

// Route to update a specific job posting
router.put('/update/:jobId', authenticate, jobController.updateJob);

// Route to delete a specific job posting
router.delete('/delete/:jobId', authenticate, jobController.deleteJob);

export default router;
