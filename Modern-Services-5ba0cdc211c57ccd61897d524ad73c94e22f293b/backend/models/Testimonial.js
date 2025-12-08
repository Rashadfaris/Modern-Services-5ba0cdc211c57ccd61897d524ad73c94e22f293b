const mongoose = require('mongoose');

/**
 * Testimonial Schema
 * 
 * Defines the structure for testimonial documents in MongoDB.
 * Each testimonial contains user information and approval status.
 */
const testimonialSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    maxlength: [100, 'Name cannot exceed 100 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    trim: true,
    lowercase: true
  },
  location: {
    type: String,
    trim: true,
    maxlength: [100, 'Location cannot exceed 100 characters']
  },
  message: {
    type: String,
    required: [true, 'Message is required'],
    trim: true,
    maxlength: [1000, 'Message cannot exceed 1000 characters']
  },
  approved: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: false // We're using createdAt field manually
});

/**
 * Index for faster queries on approved status and creation date
 * This helps optimize queries for approved testimonials
 */
testimonialSchema.index({ approved: 1, createdAt: -1 });

/**
 * Transform the output when converting to JSON
 * Removes __v and converts _id to id for cleaner API responses
 */
testimonialSchema.methods.toJSON = function() {
  const obj = this.toObject();
  obj.id = obj._id.toString();
  delete obj._id;
  delete obj.__v;
  return obj;
};

// Create and export the model
const Testimonial = mongoose.model('Testimonial', testimonialSchema);

module.exports = Testimonial;

