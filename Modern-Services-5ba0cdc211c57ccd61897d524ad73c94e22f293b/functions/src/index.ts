import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as nodemailer from 'nodemailer';

// Initialize Firebase Admin
admin.initializeApp();

// Email transporter configuration
// You can use Gmail, SendGrid, or any SMTP service
const transporter = nodemailer.createTransport({
  service: 'gmail', // Change to your email service
  auth: {
    user: functions.config().email?.user || process.env.EMAIL_USER,
    pass: functions.config().email?.password || process.env.EMAIL_PASSWORD,
  },
});

// Get the base URL for the functions
const getBaseUrl = () => {
  const projectId = process.env.GCLOUD_PROJECT || admin.app().options.projectId;
  return `https://${process.env.REGION || 'us-central1'}-${projectId}.cloudfunctions.net`;
};

// Trigger when a new testimonial is created
export const onTestimonialCreated = functions.firestore
  .document('testimonials/{testimonialId}')
  .onCreate(async (snap: functions.firestore.QueryDocumentSnapshot, context: functions.EventContext) => {
    const testimonial = snap.data();
    const testimonialId = context.params.testimonialId;

    // Only send email if not approved
    if (testimonial.approved === false) {
      const baseUrl = getBaseUrl();
      const approveUrl = `${baseUrl}/approveTestimonial?id=${testimonialId}`;
      const declineUrl = `${baseUrl}/declineTestimonial?id=${testimonialId}`;

      const mailOptions = {
        from: functions.config().email?.user || process.env.EMAIL_USER,
        to: 'rashadfaris4675@gmail.com',
        subject: 'New Testimonial Submission - Approval Required',
        html: `
          <!DOCTYPE html>
          <html>
            <head>
              <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                .header { background-color: #0A1A2F; color: white; padding: 20px; text-align: center; }
                .content { background-color: #f9f9f9; padding: 20px; margin: 20px 0; }
                .testimonial { background-color: white; padding: 15px; margin: 15px 0; border-left: 4px solid #C8A75B; }
                .buttons { text-align: center; margin: 30px 0; }
                .button { display: inline-block; padding: 12px 30px; margin: 10px; text-decoration: none; border-radius: 5px; font-weight: bold; }
                .approve { background-color: #28a745; color: white; }
                .decline { background-color: #dc3545; color: white; }
                .footer { text-align: center; color: #666; font-size: 12px; margin-top: 20px; }
              </style>
            </head>
            <body>
              <div class="container">
                <div class="header">
                  <h2>New Testimonial Submission</h2>
                </div>
                <div class="content">
                  <p>A new testimonial has been submitted and requires your approval.</p>
                  
                  <div class="testimonial">
                    <p><strong>Name:</strong> ${testimonial.name}</p>
                    <p><strong>Location:</strong> ${testimonial.location}</p>
                    <p><strong>Message:</strong></p>
                    <p style="font-style: italic; margin-top: 10px;">"${testimonial.message}"</p>
                    <p style="margin-top: 15px; font-size: 12px; color: #666;">
                      Submitted: ${testimonial.createdAt?.toDate?.()?.toLocaleString() || 'Just now'}
                    </p>
                  </div>

                  <div class="buttons">
                    <a href="${approveUrl}" class="button approve">✓ Approve</a>
                    <a href="${declineUrl}" class="button decline">✗ Decline</a>
                  </div>
                </div>
                <div class="footer">
                  <p>This is an automated email from Modern Services testimonial system.</p>
                </div>
              </div>
            </body>
          </html>
        `,
      };

      try {
        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully for testimonial:', testimonialId);
      } catch (error) {
        console.error('Error sending email:', error);
      }
    }

    return null;
  });

// HTTP function to approve a testimonial
export const approveTestimonial = functions.https.onRequest(async (req: functions.https.Request, res: functions.Response) => {
  // Set CORS headers
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.set('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(204).send('');
    return;
  }

  const testimonialId = req.query.id as string;

  if (!testimonialId) {
    res.status(400).send(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Error</title>
          <style>
            body { font-family: Arial, sans-serif; text-align: center; padding: 50px; }
            .error { color: #dc3545; }
          </style>
        </head>
        <body>
          <h1 class="error">Error</h1>
          <p>Missing testimonial ID</p>
        </body>
      </html>
    `);
    return;
  }

  try {
    const testimonialRef = admin.firestore().doc(`testimonials/${testimonialId}`);
    await testimonialRef.update({ approved: true });

    res.status(200).send(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Testimonial Approved</title>
          <style>
            body { 
              font-family: Arial, sans-serif; 
              text-align: center; 
              padding: 50px; 
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
              color: white;
              min-height: 100vh;
              display: flex;
              align-items: center;
              justify-content: center;
            }
            .container {
              background: white;
              color: #333;
              padding: 40px;
              border-radius: 10px;
              box-shadow: 0 10px 30px rgba(0,0,0,0.3);
              max-width: 500px;
            }
            .success { color: #28a745; font-size: 48px; margin-bottom: 20px; }
            h1 { color: #28a745; margin-bottom: 20px; }
            p { line-height: 1.6; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="success">✓</div>
            <h1>Testimonial Approved</h1>
            <p>The testimonial has been successfully approved and is now visible on the website.</p>
            <p style="margin-top: 20px; font-size: 14px; color: #666;">You can close this window.</p>
          </div>
        </body>
      </html>
    `);
  } catch (error) {
    console.error('Error approving testimonial:', error);
    res.status(500).send(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Error</title>
          <style>
            body { font-family: Arial, sans-serif; text-align: center; padding: 50px; }
            .error { color: #dc3545; }
          </style>
        </head>
        <body>
          <h1 class="error">Error</h1>
          <p>Failed to approve testimonial. Please try again.</p>
        </body>
      </html>
    `);
  }
});

// HTTP function to decline a testimonial
export const declineTestimonial = functions.https.onRequest(async (req: functions.https.Request, res: functions.Response) => {
  // Set CORS headers
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.set('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(204).send('');
    return;
  }

  const testimonialId = req.query.id as string;

  if (!testimonialId) {
    res.status(400).send(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Error</title>
          <style>
            body { font-family: Arial, sans-serif; text-align: center; padding: 50px; }
            .error { color: #dc3545; }
          </style>
        </head>
        <body>
          <h1 class="error">Error</h1>
          <p>Missing testimonial ID</p>
        </body>
      </html>
    `);
    return;
  }

  try {
    const testimonialRef = admin.firestore().doc(`testimonials/${testimonialId}`);
    await testimonialRef.delete();

    res.status(200).send(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Testimonial Declined</title>
          <style>
            body { 
              font-family: Arial, sans-serif; 
              text-align: center; 
              padding: 50px; 
              background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
              color: white;
              min-height: 100vh;
              display: flex;
              align-items: center;
              justify-content: center;
            }
            .container {
              background: white;
              color: #333;
              padding: 40px;
              border-radius: 10px;
              box-shadow: 0 10px 30px rgba(0,0,0,0.3);
              max-width: 500px;
            }
            .declined { color: #dc3545; font-size: 48px; margin-bottom: 20px; }
            h1 { color: #dc3545; margin-bottom: 20px; }
            p { line-height: 1.6; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="declined">✗</div>
            <h1>Testimonial Declined</h1>
            <p>The testimonial has been declined and removed from the system.</p>
            <p style="margin-top: 20px; font-size: 14px; color: #666;">You can close this window.</p>
          </div>
        </body>
      </html>
    `);
  } catch (error) {
    console.error('Error declining testimonial:', error);
    res.status(500).send(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Error</title>
          <style>
            body { font-family: Arial, sans-serif; text-align: center; padding: 50px; }
            .error { color: #dc3545; }
          </style>
        </head>
        <body>
          <h1 class="error">Error</h1>
          <p>Failed to decline testimonial. Please try again.</p>
        </body>
      </html>
    `);
  }
});

