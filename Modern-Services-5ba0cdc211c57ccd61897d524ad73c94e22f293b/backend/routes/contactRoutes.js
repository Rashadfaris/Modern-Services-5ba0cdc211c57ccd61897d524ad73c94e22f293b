const express = require('express');
const router = express.Router();
const { sendContactEmail, sendReplyEmail } = require('../controllers/contactController');

/**
 * Contact Routes
 * 
 * All routes are prefixed with /api/contact
 */

/**
 * @route   POST /api/contact
 * @desc    Send contact form email
 * @access  Public
 */
router.post('/', sendContactEmail);

/**
 * @route   POST /api/contact/reply
 * @desc    Send reply email to customer (beautifully formatted)
 * @access  Public (should be protected in production)
 * @body    { to, subject, message, customerName }
 */
router.post('/reply', sendReplyEmail);

module.exports = router;

