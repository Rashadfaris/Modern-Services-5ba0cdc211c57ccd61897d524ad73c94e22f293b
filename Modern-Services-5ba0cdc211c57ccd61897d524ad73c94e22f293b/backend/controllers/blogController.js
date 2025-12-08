const Blog = require('../models/Blog');

/**
 * Get all blog posts (both published and unpublished)
 * Used by admin dashboard to see all posts
 * 
 * @route GET /api/blogs
 * @access Public (but typically used by admin)
 */
exports.getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find()
      .sort({ createdAt: -1 }) // Sort by newest first
      .exec();

    res.status(200).json({
      success: true,
      count: blogs.length,
      data: blogs
    });
  } catch (error) {
    console.error('Error fetching all blogs:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching blogs',
      error: error.message
    });
  }
};

/**
 * Get only published blog posts
 * Used by the public blog page to display published posts
 * 
 * @route GET /api/blogs/published
 * @access Public
 */
exports.getPublishedBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({ published: true })
      .sort({ createdAt: -1 }) // Sort by newest first
      .exec();

    res.status(200).json({
      success: true,
      count: blogs.length,
      data: blogs
    });
  } catch (error) {
    console.error('Error fetching published blogs:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching published blogs',
      error: error.message
    });
  }
};

/**
 * Get a single blog post by ID
 * 
 * @route GET /api/blogs/:id
 * @access Public
 */
exports.getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: 'Blog post not found'
      });
    }

    res.status(200).json({
      success: true,
      data: blog
    });
  } catch (error) {
    console.error('Error fetching blog:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching blog',
      error: error.message
    });
  }
};

/**
 * Create a new blog post
 * Used by admin dashboard to add new blog posts
 * 
 * @route POST /api/blogs
 * @access Public (should be protected in production)
 */
exports.createBlog = async (req, res) => {
  try {
    const { title, category, content, source } = req.body;

    if (!title || !category || !content) {
      return res.status(400).json({
        success: false,
        message: 'Please provide title, category, and content'
      });
    }

    const blog = await Blog.create({
      title: title.trim(),
      category: category.trim(),
      content: content.trim(),
      source: source ? source.trim() : undefined,
      published: false // Default to unpublished
    });

    res.status(201).json({
      success: true,
      message: 'Blog post created successfully',
      data: blog
    });
  } catch (error) {
    console.error('Error creating blog:', error);
    
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: messages
      });
    }

    res.status(500).json({
      success: false,
      message: 'Error creating blog',
      error: error.message
    });
  }
};

/**
 * Update a blog post by ID
 * 
 * @route PUT /api/blogs/:id
 * @access Public (should be protected in production)
 */
exports.updateBlog = async (req, res) => {
  try {
    const { title, category, content, source, published } = req.body;

    const blog = await Blog.findByIdAndUpdate(
      req.params.id,
      {
        ...(title && { title: title.trim() }),
        ...(category && { category: category.trim() }),
        ...(content && { content: content.trim() }),
        ...(source !== undefined && { source: source ? source.trim() : undefined }),
        ...(published !== undefined && { published }),
        updatedAt: Date.now()
      },
      { new: true, runValidators: true }
    );

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: 'Blog post not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Blog post updated successfully',
      data: blog
    });
  } catch (error) {
    console.error('Error updating blog:', error);
    
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: messages
      });
    }

    res.status(500).json({
      success: false,
      message: 'Error updating blog',
      error: error.message
    });
  }
};

/**
 * Publish/Unpublish a blog post by ID
 * 
 * @route PATCH /api/blogs/:id/publish
 * @access Public (should be protected in production)
 */
exports.togglePublishBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: 'Blog post not found'
      });
    }

    blog.published = !blog.published;
    blog.updatedAt = Date.now();
    await blog.save();

    res.status(200).json({
      success: true,
      message: `Blog post ${blog.published ? 'published' : 'unpublished'} successfully`,
      data: blog
    });
  } catch (error) {
    console.error('Error toggling blog publish status:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating blog publish status',
      error: error.message
    });
  }
};

/**
 * Delete a blog post by ID
 * 
 * @route DELETE /api/blogs/:id
 * @access Public (should be protected in production)
 */
exports.deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: 'Blog post not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Blog post deleted successfully',
      data: blog
    });
  } catch (error) {
    console.error('Error deleting blog:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting blog',
      error: error.message
    });
  }
};

