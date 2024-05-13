import express from 'express';
import donationAnalyticsController from '../../api/controllers/donationAnalyticsController.js'; // Ensure path is correct

const router = express.Router();

// Retrieve total donations by month and year
router.get('/total-donations-by-month', donationAnalyticsController.getTotalDonationsByMonth);

// Retrieve the total number of unique donors
router.get('/total-unique-donors', donationAnalyticsController.getTotalUniqueDonors);

// Retrieve the total number of repeated donors
router.get('/total-repeated-donors', donationAnalyticsController.getTotalRepeatedDonors);

// Retrieve the top donors based on total donation amount
router.get('/top-donors', donationAnalyticsController.getTopDonors);

// Retrieve the average donation amount
router.get('/average-donation-amount', donationAnalyticsController.getAverageDonationAmount);

// Retrieve the average donation frequency per donor
router.get('/donation-frequency', donationAnalyticsController.getDonationFrequency);

export default router;
