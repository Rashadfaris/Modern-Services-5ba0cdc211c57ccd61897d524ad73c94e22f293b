const mongoose = require('mongoose');

/**
 * Blog Schema
 * 
 * Defines the structure for blog post documents in MongoDB.
 * Each blog post contains title, category, content, and publication status.
 */
const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    maxlength: [200, 'Title cannot exceed 200 characters']
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    trim: true,
    enum: ['Tax', 'Property', 'Employment', 'Leisure & Hospitality', 'Financial Services', 'Energy', 'Other'],
    default: 'Other'
  },
  content: {
    type: String,
    required: [true, 'Content is required'],
    trim: true
  },
  source: {
    type: String,
    trim: true,
    maxlength: [200, 'Source cannot exceed 200 characters']
  },
  published: {
    type: Boolean,
    default: false
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
 * Index for faster queries on published status and creation date
 */
blogSchema.index({ published: 1, createdAt: -1 });
blogSchema.index({ category: 1, published: 1 });

/**
 * Update the updatedAt field before saving
 */
blogSchema.pre('save', function(next) {
  if (this.isModified() && !this.isNew) {
    this.updatedAt = Date.now();
  }
  next();
});

/**
 * Transform the output when converting to JSON
 * Removes __v and converts _id to id for cleaner API responses
 */
blogSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    ret.id = ret._id.toString();
    delete ret._id;
    delete ret.__v;
  }
});

// Create and export the model
const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;

