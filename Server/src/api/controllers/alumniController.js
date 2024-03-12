import User from '../models/User.js';

class AlumniController {
  // Add a new alumni profile
  static async addAlumni(req, res) {
    try {
      const newAlumni = new User(req.body);
      await newAlumni.save();
      res.status(201).json(newAlumni);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  // Get all alumni profiles
  static async getAllAlumni(req, res) {
    try {
      const alumni = await User.find({ userType: 'alumni' });
      res.json(alumni);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  // Update an alumni profile
  static async updateAlumni(req, res) {
    const { id } = req.params;
    try {
      const alumni = await User.findByIdAndUpdate(id, req.body, { new: true });
      if (!alumni) {
        return res.status(404).json({ message: 'Alumni not found' });
      }
      res.json(alumni);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  // Delete an alumni profile
  static async deleteAlumni(req, res) {
    const { id } = req.params;
    try {
      const alumni = await User.findByIdAndDelete(id);
      if (!alumni) {
        return res.status(404).json({ message: 'Alumni not found' });
      }
      res.json({ message: 'Alumni profile deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  // Search for alumni profiles
  static async searchAlumni(req, res) {
    const { query } = req.query;
    try {
      const searchResults = await User.find({
        userType: 'alumni',
        $or: [
          { 'personalDetails.firstName': { $regex: query, $options: 'i' } },
          { 'personalDetails.lastName': { $regex: query, $options: 'i' } },
          { 'educationHistory.institutionName': { $regex: query, $options: 'i' } }
          // Add other fields you want to include in the search
        ]
      });
      res.json(searchResults);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

export default AlumniController;
