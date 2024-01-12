// src/routes/userRoutes.js
import express from 'express';
import { registerUser, loginUser, resetPassword, requestPasswordReset } from '../controllers/userController.js';
// import authenticate from '../../middleware/authenticate.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/request-reset-password', requestPasswordReset);
router.post('/reset-password/:token', resetPassword);

// Protected route
// router.get('/profile', authenticate, (req, res) => {
//     // Assuming you have a controller function to handle profile retrieval
//     // You can access the authenticated user with req.user
//     res.send(req.user);
// });

export default router;
