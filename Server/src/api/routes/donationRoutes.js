import express from 'express';
import donationController from '../controllers/donationController.js';
import authenticate from '../../middleware/authenticate.js';
import Razorpay from 'razorpay';
import Donation from '../models/Donation.js'; // Ensure this path is correct

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_SECRET_KEY
});

const router = express.Router();

// Endpoint for making donations
router.post('/make', authenticate, donationController.makeDonation);

// Endpoint for fetching donation history
router.get('/history', authenticate, donationController.getDonations);

// Endpoint for refunding donations
router.post('/refund/:donationId', authenticate, donationController.refundDonation);

// Razorpay webhook endpoint
router.post('/webhooks/razorpay', express.json(), async (req, res) => {
    const secret = process.env.RAZORPAY_WEBHOOK_SECRET;

    // Verify webhook signature to ensure that the request is from Razorpay
    const shasum = crypto.createHmac('sha256', secret);
    shasum.update(JSON.stringify(req.body));
    const digest = shasum.digest('hex');

    if (digest !== req.headers['x-razorpay-signature']) {
        return res.status(400).send("Invalid signature. It is possible that this request is not sent from Razorpay.");
    }

    try {
        // Handle different event types accordingly
        switch (req.body.event) {
            case 'payment.authorized':
                // Payment has been captured on Razorpay
                await Donation.findOneAndUpdate(
                    { orderId: req.body.payload.payment.entity.order_id },
                    { status: 'completed' }
                );
                break;
            case 'payment.failed':
                // Payment has failed on Razorpay
                await Donation.findOneAndUpdate(
                    { orderId: req.body.payload.payment.entity.order_id },
                    { status: 'failed' }
                );
                break;
        }

        res.status(200).json({received: true});
    } catch (error) {
        console.error('Webhook Error:', error);
        res.status(500).send(`Webhook Handler Error: ${error.message}`);
    }
});

export default router;
