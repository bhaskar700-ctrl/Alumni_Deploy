// profileRoutes.js
import express from 'express';
import ProfileController from '../controllers/profileController.js';

const router = express.Router();

// Create a new user profile
// router.post('/profile', ProfileController.createProfile);

// Edit an existing user profile
router.put('/profile/:userId', ProfileController.editProfile);

// Update user privacy settings
router.put('/privacy/:userId', ProfileController.updatePrivacySettings);

export default router;
