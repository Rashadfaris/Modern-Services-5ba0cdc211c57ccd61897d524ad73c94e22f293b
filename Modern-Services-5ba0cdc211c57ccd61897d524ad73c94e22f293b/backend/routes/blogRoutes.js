const express = require('express');
const router = express.Router();
const {
  getAllBlogs,
  getPublishedBlogs,
  getBlogById,
  createBlog,
  updateBlog,
  togglePublishBlog,
  deleteBlog
} = require('../controllers/blogController');

/**
 * Blog Routes
 * 
 * All routes are prefixed with /api/blogs
 * Example: GET /api/blogs/published
 */

/**
 * @route   GET /api/blogs
 * @desc    Get all blog posts (published and unpublished)
 * @access  Public (typically used by admin)
 */
router.get('/', getAllBlogs);

/**
 * @route   GET /api/blogs/published
 * @desc    Get only published blog posts
 * @access  Public
 */
router.get('/published', getPublishedBlogs);

/**
 * @route   GET /api/blogs/:id
 * @desc    Get a single blog post by ID
 * @access  Public
 */
router.get('/:id', getBlogById);

/**
 * @route   POST /api/blogs
 * @desc    Create a new blog post
 * @access  Public (should be protected in production)
 */
router.post('/', createBlog);

/**
 * @route   PUT /api/blogs/:id
 * @desc    Update a blog post by ID
 * @access  Public (should be protected in production)
 */
router.put('/:id', updateBlog);

/**
 * @route   PATCH /api/blogs/:id/publish
 * @desc    Toggle publish status of a blog post
 * @access  Public (should be protected in production)
 */
router.patch('/:id/publish', togglePublishBlog);

/**
 * @route   DELETE /api/blogs/:id
 * @desc    Delete a blog post by ID
 * @access  Public (should be protected in production)
 */
router.delete('/:id', deleteBlog);

module.exports = router;

