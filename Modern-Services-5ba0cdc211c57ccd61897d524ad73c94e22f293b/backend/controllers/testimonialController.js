const Testimonial = require('../models/Testimonial');
const nodemailer = require('nodemailer');

// Create reusable transporter for sending emails
const getTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.hostinger.com',
    port: parseInt(process.env.SMTP_PORT || '465'),
    secure: true, // Use SSL/TLS for port 465
    auth: {
      user: process.env.SMTP_USER || process.env.EMAIL_USER,
      pass: process.env.SMTP_PASSWORD || process.env.EMAIL_PASSWORD,
    },
  });
};

/**
 * Send email notification when a new testimonial is submitted
 * Notifies admin to review and approve/decline the testimonial
 */
const sendTestimonialNotification = async (testimonial) => {
  try {
    const transporter = getTransporter();
    const adminEmail = process.env.CONTACT_EMAIL || 'info@modernservices.org.uk';
    const fromEmail = process.env.SMTP_USER || process.env.EMAIL_USER;
    // Admin dashboard URL - defaults to localhost for development, can be overridden via env variable
    const adminDashboardUrl = process.env.ADMIN_DASHBOARD_URL || 'http://localhost:5173/admin';

    const mailOptions = {
      from: `"Modern Services" <${fromEmail}>`,
      to: adminEmail,
      subject: `New Testimonial Submission by : ${testimonial.name}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; background-color: #ffffff; }
              .header { background-color: #0A1A2F; color: white; padding: 20px; text-align: center; }
              .content { background-color: #f9f9f9; padding: 20px; margin: 20px 0; }
              .field { margin: 15px 0; }
              .label { font-weight: bold; color: #0A1A2F; display: block; margin-bottom: 5px; }
              .value { padding: 10px; background-color: white; border-left: 4px solid #C8A75B; display: block; }
              .cta-button { display: inline-block; padding: 12px 24px; background-color: #C8A75B; color: white; text-decoration: none; border-radius: 5px; margin-top: 20px; font-weight: bold; }
              .footer { text-align: center; color: #666; font-size: 12px; margin-top: 20px; padding-top: 20px; border-top: 1px solid #ddd; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h2 style="margin: 0;">New Testimonial Submission</h2>
              </div>
              <div class="content">
                <p style="color: #333; margin-bottom: 20px;">
                  A new testimonial has been submitted and is awaiting your review. Please log in to the admin dashboard to approve or decline it.
                </p>
                
                <div class="field">
                  <div class="label">Name:</div>
                  <div class="value">${testimonial.name}</div>
                </div>
                
                ${testimonial.email ? `
                <div class="field">
                  <div class="label">Email:</div>
                  <div class="value"><a href="mailto:${testimonial.email}" style="color: #0A1A2F; text-decoration: none;">${testimonial.email}</a></div>
                </div>
                ` : ''}
                
                ${testimonial.location ? `
                <div class="field">
                  <div class="label">Location:</div>
                  <div class="value">${testimonial.location}</div>
                </div>
                ` : ''}
                
                <div class="field">
                  <div class="label">Message:</div>
                  <div class="value" style="white-space: pre-wrap;">${testimonial.message}</div>
                </div>
                
                <div style="margin-top: 30px; text-align: center;">
                  <a href="${adminDashboardUrl}" class="cta-button">Review in Admin Dashboard</a>
                </div>
              </div>
              <div class="footer">
                <p>Submitted at: ${new Date(testimonial.createdAt).toLocaleString('en-GB', { timeZone: 'Europe/London' })}</p>
                <p>This is an automated notification from Modern Services.</p>
              </div>
            </div>
          </body>
        </html>
      `,
      text: `
        New Testimonial Submission
        
        A new testimonial has been submitted and is awaiting your review.
        
        Name: ${testimonial.name}
        ${testimonial.email ? `Email: ${testimonial.email}` : ''}
        ${testimonial.location ? `Location: ${testimonial.location}` : ''}
        
        Message:
        ${testimonial.message}
        
        Review in Admin Dashboard: ${adminDashboardUrl}
        
        Submitted at: ${new Date(testimonial.createdAt).toLocaleString('en-GB', { timeZone: 'Europe/London' })}
      `
    };

    await transporter.sendMail(mailOptions);
    console.log('✅ Testimonial notification email sent successfully');
  } catch (error) {
    // Don't throw error - just log it so testimonial creation doesn't fail
    console.error('❌ Error sending testimonial notification email:', error);
  }
};

/**
 * Get all testimonials (both approved and unapproved)
 * Used by admin dashboard to see all submissions
 * 
 * @route GET /api/testimonials
 * @access Public (but typically used by admin)
 */
exports.getAllTestimonials = async (req, res) => {
  try {
    const testimonials = await Testimonial.find()
      .sort({ createdAt: -1 }) // Sort by newest first
      .exec();

    res.status(200).json({
      success: true,
      count: testimonials.length,
      data: testimonials
    });
  } catch (error) {
    console.error('Error fetching all testimonials:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching testimonials',
      error: error.message
    });
  }
};

/**
 * Get only approved testimonials
 * Used by the public testimonials page to display approved reviews
 * 
 * @route GET /api/testimonials/approved
 * @access Public
 */
exports.getApprovedTestimonials = async (req, res) => {
  try {
    const testimonials = await Testimonial.find({ approved: true })
      .sort({ createdAt: -1 }) // Sort by newest first
      .exec();

    res.status(200).json({
      success: true,
      count: testimonials.length,
      data: testimonials
    });
  } catch (error) {
    console.error('Error fetching approved testimonials:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching approved testimonials',
      error: error.message
    });
  }
};

/**
 * Get only unapproved testimonials
 * Used by admin dashboard to see pending testimonials
 * 
 * @route GET /api/testimonials/unapproved
 * @access Public (should be protected in production)
 */
exports.getUnapprovedTestimonials = async (req, res) => {
  try {
    const testimonials = await Testimonial.find({ approved: false })
      .sort({ createdAt: -1 }) // Sort by newest first
      .exec();

    res.status(200).json({
      success: true,
      count: testimonials.length,
      data: testimonials
    });
  } catch (error) {
    console.error('Error fetching unapproved testimonials:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching unapproved testimonials',
      error: error.message
    });
  }
};

/**
 * Create a new testimonial
 * Used by the testimonials page form to submit new reviews
 * New testimonials are created with approved: false by default
 * 
 * @route POST /api/testimonials
 * @access Public
 */
exports.createTestimonial = async (req, res) => {
  try {
    // Validate required fields
    const { name, email, message, location } = req.body;

    if (!name || !message) {
      return res.status(400).json({
        success: false,
        message: 'Please provide name and message'
      });
    }

    // Generate email from name if not provided
    const testimonialEmail = email 
      ? email.trim().toLowerCase()
      : `${name.toLowerCase().replace(/\s+/g, '.')}@example.com`;

    // Create new testimonial (approved defaults to false)
    const testimonial = await Testimonial.create({
      name: name.trim(),
      email: testimonialEmail,
      message: message.trim(),
      location: location ? location.trim() : undefined,
      approved: false
    });

    // Send email notification to admin (non-blocking)
    sendTestimonialNotification(testimonial).catch(err => {
      console.error('Failed to send testimonial notification:', err);
    });

    res.status(201).json({
      success: true,
      message: 'Testimonial submitted successfully',
      data: testimonial
    });
  } catch (error) {
    console.error('Error creating testimonial:', error);
    
    // Handle validation errors
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
      message: 'Error creating testimonial',
      error: error.message
    });
  }
};

/**
 * Approve a testimonial by ID
 * Sets the approved field to true
 * Used by admin dashboard to approve pending testimonials
 * 
 * @route PATCH /api/testimonials/:id/approve
 * @access Public (should be protected in production)
 */
exports.approveTestimonial = async (req, res) => {
  try {
    const { id } = req.params;

    // Find testimonial by ID
    const testimonial = await Testimonial.findById(id);

    if (!testimonial) {
      return res.status(404).json({
        success: false,
        message: 'Testimonial not found'
      });
    }

    // Update approved status
    testimonial.approved = true;
    await testimonial.save();

    res.status(200).json({
      success: true,
      message: 'Testimonial approved successfully',
      data: testimonial
    });
  } catch (error) {
    console.error('Error approving testimonial:', error);
    
    // Handle invalid ObjectId format
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid testimonial ID'
      });
    }

    res.status(500).json({
      success: false,
      message: 'Error approving testimonial',
      error: error.message
    });
  }
};

/**
 * Delete/Decline a testimonial by ID
 * Removes the testimonial from the database
 * Used by admin dashboard to decline unwanted testimonials
 * 
 * @route DELETE /api/testimonials/:id
 * @access Public (should be protected in production)
 */
exports.deleteTestimonial = async (req, res) => {
  try {
    const { id } = req.params;

    const testimonial = await Testimonial.findByIdAndDelete(id);

    if (!testimonial) {
      return res.status(404).json({
        success: false,
        message: 'Testimonial not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Testimonial deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting testimonial:', error);
    
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid testimonial ID'
      });
    }

    res.status(500).json({
      success: false,
      message: 'Error deleting testimonial',
      error: error.message
    });
  }
};

