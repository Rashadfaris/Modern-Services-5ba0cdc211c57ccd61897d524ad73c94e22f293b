const { Resend } = require('resend');

// Initialize Resend client
const getResendClient = () => {
  const apiKey = process.env.RESEND_API_KEY;
  
  if (!apiKey) {
    throw new Error('RESEND_API_KEY is not configured. Please set RESEND_API_KEY environment variable.');
  }
  
  return new Resend(apiKey);
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

    // Validate Resend configuration
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.error('RESEND_API_KEY is not configured');
      return res.status(500).json({
        success: false,
        message: 'Email service is not configured. Please contact us directly at info@modernservices.org.uk'
      });
    }

    // Initialize Resend client
    let resend;
    try {
      resend = getResendClient();
    } catch (error) {
      console.error('Failed to create Resend client:', error.message);
      return res.status(500).json({
        success: false,
        message: 'Email service is not configured. Please contact us directly at info@modernservices.org.uk'
      });
    }

    // Recipient email (from your contact page)
    const recipientEmail = process.env.CONTACT_EMAIL || 'info@modernservices.org.uk';
    
    // From email - should be from a verified domain in Resend
    // You can use onboarding@resend.dev for testing, or your verified domain
    const fromEmail = process.env.FROM_EMAIL || 'onboarding@resend.dev';

    // Email HTML content
    const htmlContent = `
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
    `;

    // Email text content
    const textContent = `
      New Contact Form Submission
      
      Name: ${name}
      Email: ${email}
      ${phone ? `Phone: ${phone}` : ''}
      
      Message:
      ${message}
      
      Reply to: ${email}
      Submitted at: ${new Date().toLocaleString('en-GB', { timeZone: 'Europe/London' })}
    `;

    // Send email using Resend
    const { data, error } = await resend.emails.send({
      from: fromEmail,
      to: recipientEmail,
      reply_to: email, // So you can reply directly to the sender
      subject: `A Message from ${name}`,
      html: htmlContent,
      text: textContent,
    });

    if (error) {
      console.error('Resend API error:', error);
      throw new Error(error.message || 'Failed to send email');
    }

    res.status(200).json({
      success: true,
      message: 'Your message has been sent successfully. We will get back to you soon!'
    });
  } catch (error) {
    console.error('Error sending contact email:', error);
    
    // Provide more specific error messages
    let errorMessage = 'Failed to send message. Please try again later or contact us directly at info@modernservices.org.uk';
    
    if (error.message.includes('API key')) {
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

    // Validate Resend configuration
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      return res.status(500).json({
        success: false,
        message: 'Email service is not configured'
      });
    }

    let resend;
    try {
      resend = getResendClient();
    } catch (error) {
      console.error('Failed to create Resend client:', error.message);
      return res.status(500).json({
        success: false,
        message: 'Email service is not configured',
        error: error.message
      });
    }

    const companyName = 'Modern Services';
    const replySubject = subject || `Re: Your Inquiry - ${companyName}`;
    const fromEmail = process.env.FROM_EMAIL || 'onboarding@resend.dev';

    // Beautiful reply email template
    const htmlContent = `
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
    `;

    const textContent = `
      ${customerName ? `Dear ${customerName},` : 'Dear Valued Customer,'}
      
      ${message}
      
      Best regards,
      ${companyName} Team
      Property Management Services
      
      Contact Us:
      Email: ${fromEmail}
      Website: https://modernservices.org.uk
      
      Sent at: ${new Date().toLocaleString('en-GB', { timeZone: 'Europe/London' })}
    `;

    // Send email using Resend
    const { data, error } = await resend.emails.send({
      from: `"${companyName}" <${fromEmail}>`,
      to: to,
      reply_to: fromEmail,
      subject: replySubject,
      html: htmlContent,
      text: textContent,
    });

    if (error) {
      console.error('Resend API error:', error);
      throw new Error(error.message || 'Failed to send email');
    }

    res.status(200).json({
      success: true,
      message: 'Reply email sent successfully'
    });
  } catch (error) {
    console.error('Error sending reply email:', error);
    
    let errorMessage = 'Failed to send reply email. Please try again later.';
    
    if (error.message.includes('API key')) {
      errorMessage = 'Email service authentication failed.';
    }
    
    res.status(500).json({
      success: false,
      message: errorMessage,
      error: error.message
    });
  }
};
