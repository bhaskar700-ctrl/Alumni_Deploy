// model/User.js
import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const userSchema = new Schema({
  userType: {
    type: String,
    enum: ['alumni', 'admin', 'faculty', 'student'],
    default: 'alumni'
  },
  personalDetails: {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    profilePicture: String // URL to the image
  },
  contactInfo: {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true
    },
    phone: String,
    address: String
  },
  educationHistory: [{
    institutionName: String,
    degree: String,
    department: String, // New field for department
    programme: String,  // New field for program
    yearOfGraduation: Number,
    activities: [String]
  }],
  workExperience: [{
    companyName: String,
    position: String,
    startDate: Date,
    endDate: Date,
    description: String,
    skills: [String]
  }],
  privacySettings: {
    // Define various privacy settings here as needed
    showEmail: { type: Boolean, default: true },
    showPhone: { type: Boolean, default: false },
  },
  password: {
    type: String,
    required: true
  },

  friends: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],

  resetPasswordToken: String,
  resetPasswordExpires: Date,

  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
  
});

// Update updatedAt on save
userSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

const User = model('User', userSchema);

export default User;
