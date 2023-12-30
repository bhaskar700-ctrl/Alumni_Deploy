// src/controllers/userControllers
import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import nodemailer from 'nodemailer';
import { google } from 'googleapis';
import dotenv from 'dotenv';

dotenv.config();

const OAuth2 = google.auth.OAuth2;

// Register a new user
export const registerUser = async (req, res) => {
    try {
        const { personalDetails, contactInfo, educationHistory, workExperience, password } = req.body;

        // Check if the user already exists
        const userExists = await User.findOne({ 'contactInfo.email': contactInfo.email });
        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const user = await User.create({
            personalDetails,
            contactInfo,
            educationHistory,
            workExperience,
            password: hashedPassword,
            // Include other fields as necessary
        });

        if (user) {
            res.status(201).json({
                _id: user._id,
                personalDetails: user.personalDetails,
                contactInfo: user.contactInfo,
                educationHistory: user.educationHistory,
                workExperience: user.workExperience
                // Include other necessary fields in the response
            });
        } else {
            res.status(400).json({ message: 'Invalid user data' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// User login
export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find the user by email
        const user = await User.findOne({ 'contactInfo.email': email });

        // Check if user exists
        if (!user) {
            console.log('User not found for email:', email); // Debugging log
            return res.status(401).json({ message: 'Invalid email' });
        }


        // Check if password is correct
        if (await bcrypt.compare(password, user.password)) {
            res.json({
                _id: user._id,
                personalDetails: user.personalDetails,
                contactInfo: user.contactInfo,
                message: 'Password is correct',
                // Include other necessary fields in the response
            });
        } else {
            console.log('Password comparison failed'); // Debugging log
            res.status(401).json({ message: 'Invalid password' });
        }
    } catch (error) {
        console.error('Error:', error); // Debugging log for errors
        res.status(500).json({ message: error.message });
    }
};

export const resetPassword = async (req, res) => {
    try {
        const { token, newPassword } = req.body;

        if (!token) {
            return res.status(400).json({ message: 'Token is required' });
        }

        const user = await User.findOne({
            resetPasswordToken: token,
            resetPasswordExpires: { $gt: Date.now() }
        });

        if (!user) {
            return res.status(400).json({ message: 'Invalid or expired password reset token' });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;
        await user.save();

        res.status(200).json({ message: 'Password successfully reset' });
    } catch (error) {
        console.error('Error in resetPassword:', error);
        res.status(500).json({ message: error.message });
    }
};


// Function to handle password reset request
export const requestPasswordReset = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ 'contactInfo.email': email });

        if (user) {
            const token = crypto.randomBytes(20).toString('hex');
            user.resetPasswordToken = token;
            user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
            await user.save();
            await sendPasswordResetEmail(user.contactInfo.email, token);
        }

        // Send a generic response
        res.status(200).json({ message: 'If your email is registered, you will receive a password reset link' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Function to send password reset email
const sendPasswordResetEmail = async (email, token) => {
    const oauth2Client = new OAuth2(
        process.env.GOOGLE_CLIENT_ID,
        process.env.GOOGLE_CLIENT_SECRET,
        "https://developers.google.com/oauthplayground"
    );

    oauth2Client.setCredentials({
        refresh_token: process.env.GOOGLE_REFRESH_TOKEN
    });

    const accessToken = await oauth2Client.getAccessToken();

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            type: 'OAuth2',
            user: process.env.EMAIL_USER,
            accessToken: accessToken.token,
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            refreshToken: process.env.GOOGLE_REFRESH_TOKEN
        }
    });

    const resetUrl = `${process.env.FRONTEND_RESET_PASSWORD_URL}/${token}`;

    const mailOptions = {
        from: process.env.EMAIL_FROM,
        to: email,
        subject: 'Password Reset',
        // text: `You requested a password reset. Please go to this link to reset your password: ${resetUrl}`,
        // html: `<p>You requested a password reset. Please click on the link below to reset your password:</p><a href="${resetUrl}">${resetUrl}</a>`
        text: `Hello ${user.personalDetails.firstName},\n\nYou requested a password reset. Please go to this link to reset your password: ${resetUrl}`,
        html: `<p>Hello ${user.personalDetails.firstName},</p><p>You requested a password reset. Please click on the link below to reset your password:</p><a href="${resetUrl}">${resetUrl}</a>`
    };

    try {
        await transporter.sendMail(mailOptions);
    } catch (error) {
        console.error('Error sending email:', error);
        // Handle email sending error
    }
};