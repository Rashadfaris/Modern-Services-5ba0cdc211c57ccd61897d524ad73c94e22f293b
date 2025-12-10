const Page = require('../models/Page');

/**
 * Get all pages
 * Used by admin dashboard to see all pages
 * 
 * @route GET /api/pages
 * @access Public (but typically used by admin)
 */
exports.getAllPages = async (req, res) => {
  try {
    const pages = await Page.find()
      .sort({ slug: 1 }) // Sort alphabetically by slug
      .exec();

    res.status(200).json({
      success: true,
      count: pages.length,
      data: pages
    });
  } catch (error) {
    console.error('Error fetching all pages:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching pages',
      error: error.message
    });
  }
};

/**
 * Get a single page by slug
 * Used by frontend to display page content
 * 
 * @route GET /api/pages/:slug
 * @access Public
 */
exports.getPageBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    const page = await Page.findOne({ slug: slug.toLowerCase() });

    if (!page) {
      return res.status(404).json({
        success: false,
        message: `Page with slug "${slug}" not found`
      });
    }

    res.status(200).json({
      success: true,
      data: page
    });
  } catch (error) {
    console.error('Error fetching page:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching page',
      error: error.message
    });
  }
};

/**
 * Create a new page
 * Used by admin dashboard to create page content
 * 
 * @route POST /api/pages
 * @access Public (should be protected in production)
 */
exports.createPage = async (req, res) => {
  try {
    const { slug, title, content, meta } = req.body;

    if (!slug || !title || !content) {
      return res.status(400).json({
        success: false,
        message: 'Please provide slug, title, and content'
      });
    }

    // Check if page with this slug already exists
    const existingPage = await Page.findOne({ slug: slug.toLowerCase() });
    if (existingPage) {
      return res.status(400).json({
        success: false,
        message: `Page with slug "${slug}" already exists. Use PUT to update instead.`
      });
    }

    const page = await Page.create({
      slug: slug.toLowerCase(),
      title: title.trim(),
      content: content, // Flexible JSON object
      meta: meta || {}
    });

    res.status(201).json({
      success: true,
      message: 'Page created successfully',
      data: page
    });
  } catch (error) {
    console.error('Error creating page:', error);
    
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
      message: 'Error creating page',
      error: error.message
    });
  }
};

/**
 * Update a page by slug
 * Used by admin dashboard to update page content
 * 
 * @route PUT /api/pages/:slug
 * @access Public (should be protected in production)
 */
exports.updatePage = async (req, res) => {
  try {
    const { slug } = req.params;
    const { title, content, meta } = req.body;

    const updateData = {
      updatedAt: Date.now()
    };

    if (title) {
      updateData.title = title.trim();
    }

    if (content !== undefined) {
      updateData.content = content;
    }

    if (meta !== undefined) {
      updateData.meta = meta;
    }

    const page = await Page.findOneAndUpdate(
      { slug: slug.toLowerCase() },
      updateData,
      { new: true, runValidators: true }
    );

    if (!page) {
      return res.status(404).json({
        success: false,
        message: `Page with slug "${slug}" not found`
      });
    }

    res.status(200).json({
      success: true,
      message: 'Page updated successfully',
      data: page
    });
  } catch (error) {
    console.error('Error updating page:', error);
    
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
      message: 'Error updating page',
      error: error.message
    });
  }
};

/**
 * Delete a page by slug
 * 
 * @route DELETE /api/pages/:slug
 * @access Public (should be protected in production)
 */
exports.deletePage = async (req, res) => {
  try {
    const { slug } = req.params;
    const page = await Page.findOneAndDelete({ slug: slug.toLowerCase() });

    if (!page) {
      return res.status(404).json({
        success: false,
        message: `Page with slug "${slug}" not found`
      });
    }

    res.status(200).json({
      success: true,
      message: 'Page deleted successfully',
      data: page
    });
  } catch (error) {
    console.error('Error deleting page:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting page',
      error: error.message
    });
  }
};

