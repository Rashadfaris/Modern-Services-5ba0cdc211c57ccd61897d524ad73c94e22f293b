# Environment Variables Setup Guide

This guide shows you exactly how to set up your `.env` files for both frontend and backend.

## 📁 File Locations

You need to create **two** `.env` files:

1. **Backend**: `backend/.env`
2. **Frontend**: `frontend/.env`

---

## 🔧 Backend Environment File

**Location:** `backend/.env`

**Create this file:**

```env
# MongoDB Connection
# Get your connection string from MongoDB Atlas: https://www.mongodb.com/cloud/atlas
# Format: mongodb+srv://username:password@cluster.mongodb.net/database-name?retryWrites=true&w=majority
MONGO_URI=mongodb+srv://your_username:your_password@cluster0.xxxxx.mongodb.net/modern-services?retryWrites=true&w=majority

# Server Configuration
PORT=5000
NODE_ENV=development

# Frontend URL (for CORS)
# Update this to your production frontend URL when deploying
FRONTEND_URL=http://localhost:5173

# Email Configuration (Hostinger SMTP)
# SMTP settings for sending contact form emails
SMTP_HOST=smtp.hostinger.com
SMTP_PORT=465
SMTP_USER=info@modernservices.org.uk
SMTP_PASSWORD=your_email_password_here
# Where contact form emails will be sent
CONTACT_EMAIL=info@modernservices.org.uk
```

### How to Get MongoDB URI:

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Sign up or log in
3. Create a free cluster (if you don't have one)
4. Click **"Connect"** → **"Connect your application"**
5. Copy the connection string
6. Replace `<password>` with your database password
7. Replace `<dbname>` with `modern-services` (or your preferred database name)

**Example:**

```
MONGO_URI=mongodb+srv://admin:MyPassword123@cluster0.abc123.mongodb.net/modern-services?retryWrites=true&w=majority
```

**Complete Backend `.env` Example:**

```env
MONGO_URI=mongodb+srv://admin:MyPassword123@cluster0.abc123.mongodb.net/modern-services?retryWrites=true&w=majority
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173

# Hostinger Email Configuration
SMTP_HOST=smtp.hostinger.com
SMTP_PORT=465
SMTP_USER=info@modernservices.org.uk
SMTP_PASSWORD=MuFaMod1*!
CONTACT_EMAIL=info@modernservices.org.uk
```

---

## 🎨 Frontend Environment File

**Location:** `frontend/.env`

**Create this file:**

```env
# Backend API URL
# Development: http://localhost:5000/api
# Production: https://your-backend-domain.com/api
VITE_API_URL=http://localhost:5000/api
```

### For Production:

When deploying to production, update to your backend URL:

```env
VITE_API_URL=https://api.yourdomain.com/api
```

---

## 📝 Step-by-Step Setup

### Step 1: Create Backend .env

1. Navigate to the `backend/` folder
2. Create a new file named `.env` (no extension)
3. Copy the backend template above
4. Replace `MONGO_URI` with your actual MongoDB connection string

**Example:**

```env
MONGO_URI=mongodb+srv://myuser:mypassword123@cluster0.abc123.mongodb.net/modern-services?retryWrites=true&w=majority
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

### Step 2: Create Frontend .env

1. Navigate to the `frontend/` folder
2. Create a new file named `.env` (no extension)
3. Copy the frontend template above

**Example:**

```env
VITE_API_URL=http://localhost:5000/api
```

---

## ✅ Verification

### Test Backend Connection

1. Start the backend:

   ```bash
   cd backend
   npm run dev
   ```

2. You should see:

   ```
   ✅ Connected to MongoDB Atlas
   🚀 Server running in development mode on port 5000
   ```

3. If you see an error about `MONGO_URI`, check:
   - File is named exactly `.env` (not `.env.txt`)
   - File is in the `backend/` folder
   - MongoDB URI is correct
   - Your IP is whitelisted in MongoDB Atlas (Network Access)

### Test Frontend Connection

1. Start the frontend:

   ```bash
   cd frontend
   npm run dev
   ```

2. Open browser console (F12)
3. Check for any API connection errors
4. Try submitting a testimonial to test the connection

---

## 🔒 Security Notes

### ⚠️ Important:

1. **Never commit `.env` files to Git**

   - They're already in `.gitignore`
   - They contain sensitive information

2. **For Production:**

   - Use environment variables provided by your hosting service
   - Don't hardcode credentials in code
   - Use different MongoDB databases for dev/prod

3. **MongoDB Atlas Security:**
   - Create a database user with limited permissions
   - Whitelist only necessary IP addresses
   - Use strong passwords

---

## 🐛 Troubleshooting

### Backend Issues

**"MONGO_URI is not defined"**

- Make sure `.env` file exists in `backend/` folder
- Check file is named exactly `.env` (not `.env.txt` or `.env.example`)
- Restart the server after creating/editing `.env`

**"MongoDB connection error"**

- Verify connection string is correct
- Check username and password
- Ensure your IP is whitelisted in MongoDB Atlas
- Check network connectivity

**"Port 5000 already in use"**

- Change `PORT=5001` in `.env`
- Or stop the process using port 5000

### Frontend Issues

**"Cannot connect to API"**

- Check `VITE_API_URL` is correct
- Ensure backend is running
- Check CORS settings in backend
- Verify no typos in the URL

**"Environment variable not working"**

- Variables must start with `VITE_` to be accessible in frontend
- Restart dev server after changing `.env`
- Check for typos in variable names

---

## 📋 Quick Reference

### Backend `.env` Template

```env
MONGO_URI=your_mongodb_connection_string_here
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173

# Hostinger Email Configuration
SMTP_HOST=smtp.hostinger.com
SMTP_PORT=465
SMTP_USER=info@modernservices.org.uk
SMTP_PASSWORD=your_email_password_here
CONTACT_EMAIL=info@modernservices.org.uk
```

### Frontend `.env` Template

```env
VITE_API_URL=http://localhost:5000/api
```

---

## 🚀 Production Example

### Backend Production `.env`

```env
MONGO_URI=mongodb+srv://prod_user:secure_password@cluster0.xxxxx.mongodb.net/modern-services-prod?retryWrites=true&w=majority
PORT=5000
NODE_ENV=production
FRONTEND_URL=https://modernservices.com
```

### Frontend Production `.env`

```env
VITE_API_URL=https://api.modernservices.com/api
```

---

## 📞 Need Help?

If you're having issues:

1. Check the error message in the console
2. Verify all environment variables are set correctly
3. Ensure MongoDB Atlas is accessible
4. Check that both servers are running

For MongoDB Atlas setup help, see: [MongoDB Atlas Documentation](https://docs.atlas.mongodb.com/)
