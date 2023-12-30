// profileController.js
import User from '../models/User.js';

const ProfileController = {
    // async createProfile(req, res) {
    //     try {
    //         const { personalDetails, contactInfo, educationHistory, workExperience, password } = req.body;

    //         const newUser = new User({
    //             personalDetails,
    //             contactInfo,
    //             educationHistory,
    //             workExperience,
    //             password // Ensure password is hashed in the User model
    //         });

    //         await newUser.save();

    //         res.status(201).json({ message: 'Profile created successfully', userId: newUser._id });
    //     } catch (error) {
    //         res.status(500).json({ message: error.message });
    //     }
    // },

    async editProfile(req, res) {
        try {
            const userId = req.params.userId;
            const { personalDetails, contactInfo, educationHistory, workExperience } = req.body;

            const updatedUser = await User.findByIdAndUpdate(
                userId,
                {
                    personalDetails,
                    contactInfo,
                    educationHistory,
                    workExperience
                },
                { new: true, omitUndefined: true }
            );

            if (!updatedUser) {
                return res.status(404).json({ message: 'User not found' });
            }

            res.status(200).json({ message: 'Profile updated successfully', userId: updatedUser._id });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    async updatePrivacySettings(req, res) {
        try {
            const userId = req.params.userId;
            const { privacySettings } = req.body;

            const user = await User.findByIdAndUpdate(
                userId,
                { privacySettings },
                { new: true, omitUndefined: true }
            );

            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            res.status(200).json({ message: 'Privacy settings updated successfully', userId: user._id });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
};

export default ProfileController;
