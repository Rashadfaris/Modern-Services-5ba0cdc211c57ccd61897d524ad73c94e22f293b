const SiteSettings = require('../models/SiteSettings');

/**
 * Get site settings (singleton - always returns one document)
 * 
 * @route GET /api/site-settings
 * @access Public
 */
exports.getSettings = async (req, res) => {
  try {
    const settings = await SiteSettings.getSettings();
    
    res.status(200).json({
      success: true,
      data: settings
    });
  } catch (error) {
    console.error('Error fetching site settings:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching site settings',
      error: error.message
    });
  }
};

/**
 * Update site settings
 * 
 * @route PUT /api/site-settings
 * @access Public (should be protected in production)
 */
exports.updateSettings = async (req, res) => {
  try {
    const {
      yearsOfExperience,
      happyClients,
      clientSatisfaction,
      propertiesManaged,
      companyFoundedYear
    } = req.body;

    // Get or create settings
    let settings = await SiteSettings.findOne();
    if (!settings) {
      settings = await SiteSettings.create({});
    }

    // Update fields
    if (yearsOfExperience !== undefined) {
      settings.yearsOfExperience = yearsOfExperience.trim();
    }
    if (happyClients !== undefined) {
      settings.happyClients = happyClients.trim();
    }
    if (clientSatisfaction !== undefined) {
      settings.clientSatisfaction = clientSatisfaction.trim();
    }
    if (propertiesManaged !== undefined) {
      settings.propertiesManaged = propertiesManaged.trim();
    }
    if (companyFoundedYear !== undefined) {
      settings.companyFoundedYear = companyFoundedYear;
    }

    settings.updatedAt = Date.now();
    await settings.save();

    res.status(200).json({
      success: true,
      message: 'Site settings updated successfully',
      data: settings
    });
  } catch (error) {
    console.error('Error updating site settings:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating site settings',
      error: error.message
    });
  }
};

