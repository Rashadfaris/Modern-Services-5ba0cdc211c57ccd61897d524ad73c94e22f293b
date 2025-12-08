const express = require('express');
const router = express.Router();
const {
  getAllTestimonials,
  getApprovedTestimonials,
  getUnapprovedTestimonials,
  createTestimonial,
  approveTestimonial,
  deleteTestimonial
} = require('../controllers/testimonialController');

/**
 * Testimonial Routes
 * 
 * All routes are prefixed with /api/testimonials
 * Example: GET /api/testimonials/approved
 */

/**
 * @route   GET /api/testimonials
 * @desc    Get all testimonials (approved and unapproved)
 * @access  Public (typically used by admin)
 */
router.get('/', getAllTestimonials);

/**
 * @route   GET /api/testimonials/approved
 * @desc    Get only approved testimonials
 * @access  Public
 */
router.get('/approved', getApprovedTestimonials);

/**
 * @route   GET /api/testimonials/unapproved
 * @desc    Get only unapproved testimonials
 * @access  Public (should be protected in production)
 */
router.get('/unapproved', getUnapprovedTestimonials);

/**
 * @route   POST /api/testimonials
 * @desc    Create a new testimonial
 * @access  Public
 */
router.post('/', createTestimonial);

/**
 * @route   PATCH /api/testimonials/:id/approve
 * @desc    Approve a testimonial by ID
 * @access  Public (should be protected in production)
 */
router.patch('/:id/approve', approveTestimonial);

/**
 * @route   DELETE /api/testimonials/:id
 * @desc    Delete/Decline a testimonial by ID
 * @access  Public (should be protected in production)
 */
router.delete('/:id', deleteTestimonial);

module.exports = router;

