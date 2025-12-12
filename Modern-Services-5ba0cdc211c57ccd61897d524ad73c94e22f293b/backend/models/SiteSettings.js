const mongoose = require('mongoose');

/**
 * Site Settings Schema
 * 
 * Stores editable site-wide settings like stats, years of experience, etc.
 * Single document in the database (singleton pattern)
 */
const siteSettingsSchema = new mongoose.Schema({
  // Company stats
  yearsOfExperience: {
    type: String,
    default: '10+',
    trim: true
  },
  happyClients: {
    type: String,
    default: '56+',
    trim: true
  },
  clientSatisfaction: {
    type: String,
    default: '98%',
    trim: true
  },
  propertiesManaged: {
    type: String,
    default: '50+',
    trim: true
  },
  // Company info
  companyFoundedYear: {
    type: Number,
    default: 2014 // Assuming 10+ years means founded around 2014
  },
  // Other settings can be added here
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: false
});

/**
 * Ensure only one document exists (singleton)
 */
siteSettingsSchema.statics.getSettings = async function() {
  let settings = await this.findOne();
  if (!settings) {
    settings = await this.create({});
  }
  return settings;
};

siteSettingsSchema.set('toJSON', {
  transform: function(doc, ret) {
    ret.id = ret._id.toString();
    delete ret._id;
    delete ret.__v;
    return ret;
  }
});

module.exports = mongoose.model('SiteSettings', siteSettingsSchema);


