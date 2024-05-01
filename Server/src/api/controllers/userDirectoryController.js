// Import the User model
import User from '../models/User.js';

// Controller function to handle user filtering
export const filterUsers = async (req, res) => {
  const { userType, department, programme } = req.query;
  
  try {
    let query = User.find();

    if (userType) {
      query = query.where('userType').equals(userType);
    }
    if (department) {
      query = query.where('educationHistory.department').equals(department);
    }
    if (programme) {
      query = query.where('educationHistory.programme').equals(programme);
    }

    const filteredUsers = await query.exec();
    res.json(filteredUsers);
    // Inside filterUsers controller function
    console.log('Filtered Users:', filteredUsers);

  } catch (error) {
    console.error('Error filtering users:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Controller function to fetch user by ID
export const getUserById = async (req, res) => {
  const userId = req.params.userId; // Get the user ID from request parameters

  try {
    const user = await User.findById(userId); // Find user by ID in the database

    if (!user) {
      // If user is not found, send a 404 error response
      return res.status(404).json({ error: 'User not found' });
    }

    // If user is found, send the user data as response
    res.json(user);
  } catch (error) {
    // If an error occurs, send a 500 error response
    console.error('Error fetching user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }

};
