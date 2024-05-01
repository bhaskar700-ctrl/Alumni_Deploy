import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
  sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  receiver: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  readBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  editedAt: { type: Date }, // Track when a message was last edited
});

// Add a text index to the content field for search functionality
messageSchema.index({ content: 'text' });

// Optional: If you want to track when the message is updated
messageSchema.pre('save', function(next) {
  if (this.isModified('content')) {
    this.editedAt = new Date();
  }
  next();
});

const Message = mongoose.model('Message', messageSchema);

export default Message;