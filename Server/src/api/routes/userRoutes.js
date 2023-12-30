// src/routes/userRoutes.js
import express from 'express';
import { registerUser, loginUser, resetPassword, requestPasswordReset } from '../controllers/userController.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/request-reset-password', requestPasswordReset);
router.post('/reset-password/:token', resetPassword);

export default router;
