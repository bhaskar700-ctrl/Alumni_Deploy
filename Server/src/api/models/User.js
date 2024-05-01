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
      trim: true
    },
    phone: String,
    address: String
  },
  educationHistory: [{
    institutionName: String,
    degree: String,
    department: String,
    programme: String,
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
}, {
  timestamps: true  // Add this to automatically handle createdAt and updatedAt
});

// Add text index for searching by user's first and last name
userSchema.index({
  'personalDetails.firstName': 'text',
  'personalDetails.lastName': 'text'
});

// Ensure email is indexed
userSchema.index({ 'contactInfo.email': 1 }, { unique: true });

const User = model('User', userSchema);

export default User;