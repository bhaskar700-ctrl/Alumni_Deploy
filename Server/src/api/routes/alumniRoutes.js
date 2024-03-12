import express from 'express';
import AlumniController from '../controllers/AlumniController.js';

const router = express.Router();

// Route to add a new alumni
router.post('/', AlumniController.addAlumni);

// Route to get all alumni
router.get('/', AlumniController.getAllAlumni);

// Route to update an alumni profile
router.put('/:id', AlumniController.updateAlumni);

// Route to delete an alumni profile
router.delete('/:id', AlumniController.deleteAlumni);

// Route to search alumni profiles
router.get('/search', AlumniController.searchAlumni);

export default router;
