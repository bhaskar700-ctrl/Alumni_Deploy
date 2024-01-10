import jwt from 'jsonwebtoken';
import User from '../api/models/User.js'; // Adjust the path according to your project structure
import mongoose from 'mongoose';

const authenticate = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        // console.log("Token:", token); // Debugging log

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // console.log("Decoded Token:", decoded); // Debugging log

        // Ensure you're using the correct field from the decoded token
        const userId = decoded.userId;
        // console.log("User ID from Token:", userId); // Debugging log

        // Check if the userId is a valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            // console.error("Invalid User ID format:", userId);
            return res.status(400).send({ message: 'Invalid User ID' });
        }

        const user = await User.findById(userId);
        // console.log("User found:", user); // Debugging log

        if (!user) {
            // console.error("User with ID not found:", userId);
            return res.status(401).send({ message: 'Authentication failed: User not found.' });
        }

        req.user = user;
        req.token = token;
        next();
    } catch (error) {
        // console.error("Authentication Error:", error); // Debugging log
        res.status(401).send({ message: 'Please authenticate.' });
    }
};

export default authenticate;
