import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  studentId: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  department: { type: String, required: true },
  enrollmentYear: { type: Number, required: true },
  graduationYear: Number,
  phoneNumber: String,
  address: String,
  dateOfBirth: Date,
  nationality: String,
  gender: String,
  program: String,
  status: String, // e.g., 'active', 'graduated', 'withdrawn'
  courses: [{
    courseCode: String,
    courseName: String,
    semester: String,
    grade: String
  }],
  gpa: Number,
  // New fields for signup and verification
  isInvited: { type: Boolean, default: false }, // To indicate if the student is eligible for signup
  isRegistered: { type: Boolean, default: false }, // To indicate if the student has completed the registration
  signupToken: { type: String, default: null }, // The verification token for completing the signup process
  tokenExpiration: { type: Date, default: null } // Expiration time for the signup token
});

const Student = mongoose.model('Student', studentSchema);

export default Student;