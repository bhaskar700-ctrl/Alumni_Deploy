import Razorpay from 'razorpay';
import Donation from '../models/Donation.js';  // Ensure the path to your model is correct

// Initialize Razorpay instance with your credentials
const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_SECRET_KEY
});

const donationController = {
    // Create a donation order
    makeDonation: async (req, res) => {
        const { amount, message } = req.body;
        const donorId = req.user.id; // Ensure you have user ID available in the request

        if (!amount || amount <= 0) {
            return res.status(400).json({ message: "Invalid donation amount." });
        }

        // Convert amount to the smallest currency unit (paise, cents etc.)
        const amountInPaise = Math.round(amount * 100);

        const options = {
            amount: amountInPaise,
            currency: "INR",
            receipt: `receipt_${donorId}`,
            payment_capture: '1'
        };

        try {
            const order = await razorpay.orders.create(options);
            const newDonation = new Donation({
                donor: donorId,
                amount: amountInPaise,
                message,
                orderId: order.id,
                status: 'pending' // Initially, all donations are pending
            });

            await newDonation.save();

            res.status(201).json({
                message: "Donation order created successfully.",
                orderId: order.id,
                amount: amountInPaise,
                currency: "INR"
            });
        } catch (error) {
            console.error("Error in creating donation order:", error);
            res.status(500).json({ message: "Unable to create donation order." });
        }
    },

    // Fetch donation history for a user
    getDonations: async (req, res) => {
        try {
            const donations = await Donation.find({ donor: req.user.id }).sort({ createdAt: -1 });
            res.status(200).json(donations);
        } catch (error) {
            console.error("Error fetching donation history:", error);
            res.status(500).json({ message: "Error retrieving donation history." });
        }
    },

    // Update the payment status
    updatePaymentStatus: async (req, res) => {
        const { orderId, razorpayPaymentId } = req.body;
        try {
            const donation = await Donation.findOne({ orderId });
            if (!donation) {
                return res.status(404).json({ message: "Donation order not found." });
            }

            donation.razorpayPaymentId = razorpayPaymentId;
            donation.status = 'completed'; // Set the status to completed after payment is successful
            await donation.save();

            res.status(200).json({ message: "Payment status updated successfully." });
        } catch (error) {
            console.error("Error updating payment status:", error);
            res.status(500).json({ message: "Failed to update payment status." });
        }
    },

    // Process a refund
    refundDonation: async (req, res) => {
        const { donationId } = req.params;
        try {
            const donation = await Donation.findById(donationId);
            if (!donation) {
                return res.status(404).json({ message: "Donation not found." });
            }

            const refund = await razorpay.payments.refund(donation.orderId, {
                amount: donation.amount // Refund the full amount by default
            });

            donation.status = 'refunded';
            await donation.save();

            res.status(200).json({
                message: "Donation refunded successfully.",
                refund
            });
        } catch (error) {
            console.error("Refund Error:", error);
            res.status(500).json({ message: "Failed to process refund." });
        }
    }
};

export default donationController;
