import Donation from '../models/Donation.js';
import User from '../models/User.js';

const donationAnalyticsController = {
  getTotalDonationsByMonth: async (req, res) => {
    try {
      const result = await Donation.aggregate([
        { $project: { month: { $month: "$createdAt" }, year: { $year: "$createdAt" }, amount: 1 }},
        { $group: { _id: { year: "$year", month: "$month" }, totalAmount: { $sum: "$amount" }, count: { $sum: 1 }}},
        { $sort: { "_id.year": 1, "_id.month": 1 }}
      ]);
      res.json(result.length ? result : { message: "No data available for donations by month." });
    } catch (error) {
      res.status(500).send("Error retrieving donation analytics: " + error.message);
    }
  },

  getTotalUniqueDonors: async (req, res) => {
    try {
      const result = await Donation.aggregate([
        { $group: { _id: "$donor" }},
        { $count: "totalDonors" }
      ]);
      res.json(result.length ? result : { totalDonors: 0 });
    } catch (error) {
      res.status(500).send("Error retrieving total unique donors: " + error.message);
    }
  },

  getTotalRepeatedDonors: async (req, res) => {
    try {
      const result = await Donation.aggregate([
        { $group: { _id: "$donor", count: { $sum: 1 } }},
        { $match: { count: { $gt: 1 } }},
        { $count: "repeatedDonors" }
      ]);
      res.json(result.length ? result : { repeatedDonors: 0 });
    } catch (error) {
      res.status(500).send("Error retrieving repeated donors: " + error.message);
    }
  },

  getTopDonors: async (req, res) => {
    try {
      const result = await Donation.aggregate([
        {
          $lookup: {
            from: 'users',
            localField: 'donor',
            foreignField: '_id',
            as: 'donorDetails'
          }
        },
        { 
          $unwind: {
            path: '$donorDetails',
            preserveNullAndEmptyArrays: true // Handle cases where there may not be a corresponding user
          }
        },
        { 
          $group: {
            _id: {
              id: "$donor",
              name: "$donorDetails.personalDetails.firstName",
              lastName: "$donorDetails.personalDetails.lastName"
            },
            totalAmount: { $sum: "$amount" }
          }
        },
        { $sort: { totalAmount: -1 } },
        { $limit: 10 }
      ]);
      res.json(result.map(item => ({
        name: item._id.name + ' ' + item._id.lastName,
        totalAmount: item.totalAmount
      })));
    } catch (error) {
      res.status(500).send("Error retrieving top donors: " + error.message);
    }
  },

  getAverageDonationAmount: async (req, res) => {
    try {
      const result = await Donation.aggregate([
        { $group: { _id: null, averageAmount: { $avg: "$amount" }}}
      ]);
      res.json(result.length ? result : { averageAmount: 0 });
    } catch (error) {
      res.status(500).send("Error retrieving average donation amount: " + error.message);
    }
  },

  getDonationFrequency: async (req, res) => {
    try {
      const result = await Donation.aggregate([
        { $group: { _id: "$donor", totalDonations: { $sum: 1 }}},
        { $group: { _id: null, averageFrequency: { $avg: "$totalDonations" }}}
      ]);
      res.json(result.length ? result : { averageFrequency: 0 });
    } catch (error) {
      res.status(500).send("Error retrieving donation frequency: " + error.message);
    }
  }
};

export default donationAnalyticsController;
