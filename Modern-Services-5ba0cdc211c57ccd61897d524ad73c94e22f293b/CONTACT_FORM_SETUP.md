# Contact Form Email Setup

## 📧 Where Contact Form Messages Are Sent

When someone submits the "Send Us a Message" form on the Contact page, the message is sent to:

**Email Address:** `info@modernservices.org.uk`

This is the email address displayed on your Contact page and is configured in the backend.

---

## 🔧 How It Works

1. **User fills out the form** on the Contact page
2. **Frontend sends data** to `/api/contact` endpoint
3. **Backend receives the data** and sends an email using Nodemailer
4. **Email is delivered** to `info@modernservices.org.uk`
5. **Reply-To is set** to the sender's email, so you can reply directly

---

## ⚙️ Email Configuration

### Step 1: Add Email Settings to Backend `.env`

Add these to your `backend/.env` file:

```env
# Hostinger SMTP Configuration
SMTP_HOST=smtp.hostinger.com
SMTP_PORT=465
SMTP_USER=info@modernservices.org.uk
SMTP_PASSWORD=your_email_password_here

# Where contact form emails will be sent
CONTACT_EMAIL=info@modernservices.org.uk
```

**Note:** The email will be sent FROM and TO `info@modernservices.org.uk` (same email address).

### Step 2: Install Nodemailer

The backend already includes `nodemailer` in `package.json`. Just install dependencies:

```bash
cd backend
npm install
```

### Step 3: Configure Hostinger Email

The system is configured to use Hostinger SMTP. Simply add your email password:

```env
SMTP_HOST=smtp.hostinger.com
SMTP_PORT=465
SMTP_USER=info@modernservices.org.uk
SMTP_PASSWORD=your_email_password_here
CONTACT_EMAIL=info@modernservices.org.uk
```

**Note:**

- Port 465 uses SSL/TLS encryption (secure connection)
- Use the password for your `info@modernservices.org.uk` email account
- The email will be sent FROM `info@modernservices.org.uk` TO `info@modernservices.org.uk`

---

## 📨 Email Content

The email sent will include:

- **Subject:** "New Contact Form Submission from [Name]"
- **From:** Your EMAIL_USER address
- **To:** info@modernservices.org.uk
- **Reply-To:** The sender's email (so you can reply directly)
- **Content:**
  - Sender's name
  - Sender's email
  - Sender's phone (if provided)
  - Message content
  - Submission timestamp

---

## 🔄 Alternative Email Services

### Using SendGrid

```env
EMAIL_SERVICE=sendgrid
EMAIL_USER=apikey
EMAIL_PASSWORD=your_sendgrid_api_key
CONTACT_EMAIL=info@modernservices.org.uk
```

### Using Outlook/Office 365

```env
EMAIL_SERVICE=outlook
EMAIL_USER=your_email@outlook.com
EMAIL_PASSWORD=your_password
CONTACT_EMAIL=info@modernservices.org.uk
```

### Using Custom SMTP

Update `backend/controllers/contactController.js` to use custom SMTP:

```javascript
const transporter = nodemailer.createTransport({
  host: "smtp.yourdomain.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});
```

---

## ✅ Testing

1. **Start the backend:**

   ```bash
   cd backend
   npm run dev
   ```

2. **Start the frontend:**

   ```bash
   cd frontend
   npm run dev
   ```

3. **Test the form:**
   - Go to the Contact page
   - Fill out the form
   - Submit it
   - Check `info@modernservices.org.uk` inbox

---

## 🐛 Troubleshooting

### "Email not sending"

- Check `EMAIL_USER` and `EMAIL_PASSWORD` are correct
- For Gmail, ensure you're using an App Password (not regular password)
- Check spam/junk folder
- Verify email service is correct (gmail, sendgrid, etc.)

### "Authentication failed"

- Gmail: Make sure 2FA is enabled and you're using App Password
- Check email and password are correct
- Some email providers require "Less secure app access" to be enabled

### "Connection timeout"

- Check your internet connection
- Verify SMTP settings are correct
- Some networks block SMTP ports

---

## 📝 Current Status

✅ **Backend endpoint created:** `/api/contact`  
✅ **Email controller created:** `backend/controllers/contactController.js`  
✅ **Frontend integration:** ContactPage now sends to API  
✅ **Email recipient:** `info@modernservices.org.uk`

**Next Step:** Configure email settings in `backend/.env` and install nodemailer.

---

## 🔐 Security Notes

- Never commit `.env` files to Git
- Use App Passwords for Gmail (not your main password)
- Consider using environment variables in production hosting
- Rate limiting should be added for production
