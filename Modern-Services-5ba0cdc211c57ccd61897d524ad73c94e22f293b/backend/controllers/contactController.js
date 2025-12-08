const nodemailer = require('nodemailer');

// Create reusable transporter
const getTransporter = () => {
  const smtpUser = process.env.SMTP_USER || process.env.EMAIL_USER;
  const smtpPass = process.env.SMTP_PASSWORD || process.env.EMAIL_PASSWORD;

  // Validate SMTP credentials
  if (!smtpUser || !smtpPass) {
    throw new Error('SMTP credentials are not configured. Please set SMTP_USER and SMTP_PASSWORD environment variables.');
  }

  return nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.hostinger.com',
    port: parseInt(process.env.SMTP_PORT || '465'),
    secure: true, // Use SSL/TLS for port 465
    auth: {
      user: smtpUser,
      pass: smtpPass,
    },
    connectionTimeout: 10000, // 10 seconds to establish connection
    socketTimeout: 10000, // 10 seconds for socket operations
    greetingTimeout: 10000, // 10 seconds for greeting
  });
};

/**
 * Send contact form email
 * Sends an email notification when someone submits the contact form
 * 
 * @route POST /api/contact
 * @access Public
 */
exports.sendContactEmail = async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    // Validate required fields
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: 'Please provide name, email, and message'
      });
    }

    // Validate SMTP configuration before attempting to send
    const smtpUser = process.env.SMTP_USER || process.env.EMAIL_USER;
    if (!smtpUser) {
      console.error('SMTP_USER is not configured');
      return res.status(500).json({
        success: false,
        message: 'Email service is not configured. Please contact us directly at info@modernservices.org.uk'
      });
    }

    // Email configuration using Hostinger SMTP
    let transporter;
    try {
      transporter = getTransporter();
    } catch (error) {
      console.error('Failed to create email transporter:', error.message);
      return res.status(500).json({
        success: false,
        message: 'Email service is not configured. Please contact us directly at info@modernservices.org.uk'
      });
    }

    // Recipient email (from your contact page)
    const recipientEmail = process.env.CONTACT_EMAIL || 'info@modernservices.org.uk';

    // Email content
    const mailOptions = {
      from: smtpUser,
      to: recipientEmail,
      replyTo: email, // So you can reply directly to the sender
      subject: `A Message from ${name}`,
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
              .footer { text-align: center; color: #666; font-size: 12px; margin-top: 20px; padding-top: 20px; border-top: 1px solid #ddd; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h2 style="margin: 0;">Message Information</h2>
              </div>
              <div class="content">
                <div class="field">
                  <div class="label">Name:</div>
                  <div class="value">${name}</div>
                </div>
                
                <div class="field">
                  <div class="label">Email:</div>
                  <div class="value"><a href="mailto:${email}" style="color: #0A1A2F; text-decoration: none;">${email}</a></div>
                </div>
                
                ${phone ? `
                <div class="field">
                  <div class="label">Phone:</div>
                  <div class="value"><a href="tel:${phone}" style="color: #0A1A2F; text-decoration: none;">${phone}</a></div>
                </div>
                ` : ''}
                
                <div class="field">
                  <div class="label">Message:</div>
                  <div class="value" style="white-space: pre-wrap;">${message.replace(/\n/g, '<br>')}</div>
                </div>
                
                <div style="margin-top: 20px; padding: 15px; background-color: #e8f4f8; border-radius: 5px;">
                  <strong>Reply to:</strong> <a href="mailto:${email}" style="color: #0A1A2F; text-decoration: none;">${email}</a>
                </div>
              </div>
              <div class="footer">
                <p>Submitted at: ${new Date().toLocaleString('en-GB', { timeZone: 'Europe/London' })}</p>
              </div>
            </div>
          </body>
        </html>
      `,
      text: `
        New Contact Form Submission
        
        Name: ${name}
        Email: ${email}
        ${phone ? `Phone: ${phone}` : ''}
        
        Message:
        ${message}
        
        Reply to: ${email}
        Submitted at: ${new Date().toLocaleString('en-GB', { timeZone: 'Europe/London' })}
      `
    };

    // Send email with timeout
    const sendEmailWithTimeout = (transporter, mailOptions, timeout = 15000) => {
      return Promise.race([
        transporter.sendMail(mailOptions),
        new Promise((_, reject) => 
          setTimeout(() => reject(new Error('Email sending timed out after 15 seconds')), timeout)
        )
      ]);
    };

    await sendEmailWithTimeout(transporter, mailOptions);

    res.status(200).json({
      success: true,
      message: 'Your message has been sent successfully. We will get back to you soon!'
    });
  } catch (error) {
    console.error('Error sending contact email:', error);
    
    // Provide more specific error messages
    let errorMessage = 'Failed to send message. Please try again later or contact us directly at info@modernservices.org.uk';
    
    if (error.message.includes('timeout')) {
      errorMessage = 'Email service is taking too long to respond. Please try again later or contact us directly at info@modernservices.org.uk';
    } else if (error.message.includes('credentials') || error.message.includes('authentication')) {
      errorMessage = 'Email service authentication failed. Please contact us directly at info@modernservices.org.uk';
    } else if (error.message.includes('not configured')) {
      errorMessage = 'Email service is not configured. Please contact us directly at info@modernservices.org.uk';
    }
    
    res.status(500).json({
      success: false,
      message: errorMessage
    });
  }
};

/**
 * Send reply email to customer
 * Sends a beautifully formatted reply email back to the customer
 * 
 * @route POST /api/contact/reply
 * @access Public (should be protected in production)
 */
exports.sendReplyEmail = async (req, res) => {
  try {
    const { to, subject, message, customerName } = req.body;

    // Validate required fields
    if (!to || !message) {
      return res.status(400).json({
        success: false,
        message: 'Please provide recipient email (to) and message'
      });
    }

    // Validate SMTP configuration
    const fromEmail = process.env.SMTP_USER || process.env.EMAIL_USER;
    if (!fromEmail) {
      return res.status(500).json({
        success: false,
        message: 'Email service is not configured'
      });
    }

    let transporter;
    try {
      transporter = getTransporter();
    } catch (error) {
      console.error('Failed to create email transporter:', error.message);
      return res.status(500).json({
        success: false,
        message: 'Email service is not configured',
        error: error.message
      });
    }

    const companyName = 'Modern Services';
    const replySubject = subject || `Re: Your Inquiry - ${companyName}`;

    // Beautiful reply email template
    const mailOptions = {
      from: `"${companyName}" <${fromEmail}>`,
      to: to,
      replyTo: fromEmail,
      subject: replySubject,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; background-color: #ffffff; }
              .header { background-color: #0A1A2F; color: white; padding: 20px; text-align: center; }
              .content { background-color: #f9f9f9; padding: 20px; margin: 20px 0; }
              .message-box { background-color: white; padding: 20px; border-left: 4px solid #C8A75B; margin: 15px 0; }
              .greeting { font-size: 16px; color: #0A1A2F; margin-bottom: 15px; }
              .message-text { color: #333; white-space: pre-wrap; line-height: 1.8; }
              .signature { margin-top: 20px; padding-top: 20px; border-top: 1px solid #ddd; }
              .signature-name { font-weight: bold; color: #0A1A2F; }
              .signature-company { color: #666; font-size: 14px; }
              .footer { text-align: center; color: #666; font-size: 12px; margin-top: 20px; padding-top: 20px; border-top: 1px solid #ddd; }
              .contact-info { background-color: #e8f4f8; padding: 15px; border-radius: 5px; margin-top: 20px; }
              .contact-info a { color: #0A1A2F; text-decoration: none; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h2 style="margin: 0;">${companyName}</h2>
                <p style="margin: 5px 0 0 0; font-size: 14px;">Your Trusted Property Management Partner</p>
              </div>
              <div class="content">
                <div class="greeting">
                  ${customerName ? `Dear ${customerName},` : 'Dear Valued Customer,'}
                </div>
                
                <div class="message-box">
                  <div class="message-text">${message.replace(/\n/g, '<br>')}</div>
                </div>
                
                <div class="signature">
                  <div class="signature-name">Best regards,</div>
                  <div class="signature-name">${companyName} Team</div>
                  <div class="signature-company">Property Management Services</div>
                </div>
                
                <div class="contact-info">
                  <strong>Contact Us:</strong><br>
                  📧 <a href="mailto:${fromEmail}">${fromEmail}</a><br>
                  🌐 <a href="https://modernservices.org.uk">www.modernservices.org.uk</a>
                </div>
              </div>
              <div class="footer">
                <p>This is an automated email from ${companyName}.</p>
                <p>Sent at: ${new Date().toLocaleString('en-GB', { timeZone: 'Europe/London' })}</p>
              </div>
            </div>
          </body>
        </html>
      `,
      text: `
        ${customerName ? `Dear ${customerName},` : 'Dear Valued Customer,'}
        
        ${message}
        
        Best regards,
        ${companyName} Team
        Property Management Services
        
        Contact Us:
        Email: ${fromEmail}
        Website: https://modernservices.org.uk
        
        Sent at: ${new Date().toLocaleString('en-GB', { timeZone: 'Europe/London' })}
      `
    };

    // Send email with timeout
    const sendEmailWithTimeout = (transporter, mailOptions, timeout = 15000) => {
      return Promise.race([
        transporter.sendMail(mailOptions),
        new Promise((_, reject) => 
          setTimeout(() => reject(new Error('Email sending timed out after 15 seconds')), timeout)
        )
      ]);
    };

    await sendEmailWithTimeout(transporter, mailOptions);

    res.status(200).json({
      success: true,
      message: 'Reply email sent successfully'
    });
  } catch (error) {
    console.error('Error sending reply email:', error);
    
    let errorMessage = 'Failed to send reply email. Please try again later.';
    
    if (error.message.includes('timeout')) {
      errorMessage = 'Email service is taking too long to respond. Please try again later.';
    } else if (error.message.includes('credentials') || error.message.includes('authentication')) {
      errorMessage = 'Email service authentication failed.';
    }
    
    res.status(500).json({
      success: false,
      message: errorMessage,
      error: error.message
    });
  }
};

