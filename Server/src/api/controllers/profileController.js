import User from '../models/User.js'; // Adjust the path as necessary

const ProfileController = {
    // Fetch the authenticated user's profile
    async getProfile(req, res) {
        try {
            // Assuming authenticate middleware attaches the user to req.user
            const user = req.user.toObject(); // Convert the Mongoose document to a plain JavaScript object
            delete user.password; // Exclude password from the result
            
            res.status(200).json(user);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    // Edit the authenticated user's profile
    async editProfile(req, res) {
        try {
            const userId = req.user._id; // Use _id from the authenticated user
            const { personalDetails, contactInfo, educationHistory, workExperience } = req.body;

            const updatedUser = await User.findByIdAndUpdate(
                userId,
                { $set: { personalDetails, contactInfo, educationHistory, workExperience } },
                { new: true, omitUndefined: true }
            ).select('-password'); // Exclude password from the result

            if (!updatedUser) {
                return res.status(404).json({ message: 'User not found' });
            }

            res.status(200).json({ message: 'Profile updated successfully', profile: updatedUser });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    // Update the authenticated user's privacy settings
    async updatePrivacySettings(req, res) {
        try {
            const userId = req.user._id; // Use _id from the authenticated user
            const { privacySettings } = req.body;

            const user = await User.findByIdAndUpdate(
                userId,
                { $set: { privacySettings } },
                { new: true, omitUndefined: true }
            );

            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            res.status(200).json({ message: 'Privacy settings updated successfully', privacySettings: user.privacySettings });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
};

export default ProfileController;
