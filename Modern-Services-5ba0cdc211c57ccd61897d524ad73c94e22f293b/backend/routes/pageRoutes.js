const express = require('express');
const router = express.Router();
const {
  getAllPages,
  getPageBySlug,
  createPage,
  updatePage,
  deletePage
} = require('../controllers/pageController');

/**
 * Page Routes
 * 
 * All routes are prefixed with /api/pages
 * Example: GET /api/pages/home
 */

/**
 * @route   GET /api/pages
 * @desc    Get all pages
 * @access  Public (typically used by admin)
 */
router.get('/', (req, res) => {
  console.log('📄 GET /api/pages - Fetching all pages');
  getAllPages(req, res);
});

/**
 * @route   GET /api/pages/:slug
 * @desc    Get a single page by slug (home, about, services, contact)
 * @access  Public
 */
router.get('/:slug', getPageBySlug);

/**
 * @route   POST /api/pages
 * @desc    Create a new page
 * @access  Public (should be protected in production)
 */
router.post('/', createPage);

/**
 * @route   PUT /api/pages/:slug
 * @desc    Update a page by slug
 * @access  Public (should be protected in production)
 */
router.put('/:slug', updatePage);

/**
 * @route   DELETE /api/pages/:slug
 * @desc    Delete a page by slug
 * @access  Public (should be protected in production)
 */
router.delete('/:slug', deletePage);

module.exports = router;

