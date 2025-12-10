const express = require('express');
const router = express.Router();
const {
  getSettings,
  updateSettings
} = require('../controllers/siteSettingsController');

/**
 * Site Settings Routes
 * 
 * All routes are prefixed with /api/site-settings
 */

/**
 * @route   GET /api/site-settings
 * @desc    Get site settings
 * @access  Public
 */
router.get('/', getSettings);

/**
 * @route   PUT /api/site-settings
 * @desc    Update site settings
 * @access  Public (should be protected in production)
 */
router.put('/', updateSettings);

module.exports = router;

