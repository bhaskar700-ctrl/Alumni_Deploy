// routes/donationRoutes.js
import express from 'express';
import donationController from '../controllers/donationController.js';
import authenticate from '../../middleware/authenticate.js';

const router = express.Router();

router.post('/make', authenticate, donationController.makeDonation);
router.get('/history', authenticate, donationController.getDonations);

export default router;
