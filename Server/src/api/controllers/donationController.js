// controllers/donationController.js
import Stripe from 'stripe';
import Donation from '../models/Donation.js';

import User from '../models/User.js'; // Import your User model
// Import your email service if you're planning to send email notifications

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const donationController = {
    makeDonation: async (req, res) => {
        try {
            const donorId = req.user.id;
            const { amount, message } = req.body; // Remove stripeToken
    
            if (amount <= 0) {
                return res.status(400).json({ message: "Donation amount must be greater than zero." });
            }
    
            const amountInPaise = Math.round(amount * 100);
    
            // Create a Payment Intent instead of a direct charge
            const paymentIntent = await stripe.paymentIntents.create({
                amount: amountInPaise,
                currency: 'inr',
                description: `Donation by user ID ${donorId}`,
                // You can add a receipt email if you have the donor's email
                // receipt_email: 'donor_email',
            });
    
            // You might want to save the paymentIntent details instead
            const newDonation = new Donation({
                donor: donorId,
                amount,
                message,
                paymentIntentId: paymentIntent.id // Store payment intent ID
            });
            await newDonation.save();
    
            // Respond with the client secret to complete the payment on the client-side
            res.status(201).json({
                donation: newDonation,
                clientSecret: paymentIntent.client_secret // Send client_secret to the client
            });
    
        } catch (error) {
            console.error("Donation Error:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    },
    
    

    getDonations: async (req, res) => {
        try {
            const donations = await Donation.find({ donor: req.user.id });
            res.status(200).json(donations);
        } catch (error) {
            console.error("Error Fetching Donations:", error);
            res.status(500).json({ message: "Error fetching donation records." });
        }
    },

    // Implement additional functionalities like refunding a donation here
};

export default donationController;
