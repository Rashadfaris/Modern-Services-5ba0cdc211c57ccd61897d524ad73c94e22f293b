const mongoose = require('mongoose');

/**
 * Page Schema
 * 
 * Defines the structure for page content documents in MongoDB.
 * Each page contains a slug (home, about, services, contact) and flexible content fields.
 * The content field is a flexible JSON object that can store any page-specific content.
 */
const pageSchema = new mongoose.Schema({
  slug: {
    type: String,
    required: [true, 'Page slug is required'],
    trim: true,
    unique: true,
    enum: ['home', 'about', 'services', 'contact'],
    lowercase: true
  },
  title: {
    type: String,
    required: [true, 'Page title is required'],
    trim: true,
    maxlength: [200, 'Title cannot exceed 200 characters']
  },
  // Flexible content structure - can store any JSON data
  content: {
    type: mongoose.Schema.Types.Mixed,
    required: true
  },
  // Optional metadata
  meta: {
    description: {
      type: String,
      trim: true,
      maxlength: [500, 'Meta description cannot exceed 500 characters']
    },
    keywords: {
      type: String,
      trim: true
    }
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: false // We're using createdAt and updatedAt fields manually
});

/**
 * Index for faster queries on slug
 */
pageSchema.index({ slug: 1 });

/**
 * Transform the output when converting to JSON
 * Removes __v and converts _id to id for cleaner API responses
 */
pageSchema.set('toJSON', {
  transform: function(doc, ret) {
    ret.id = ret._id.toString();
    delete ret._id;
    delete ret.__v;
    return ret;
  }
});

module.exports = mongoose.model('Page', pageSchema);

