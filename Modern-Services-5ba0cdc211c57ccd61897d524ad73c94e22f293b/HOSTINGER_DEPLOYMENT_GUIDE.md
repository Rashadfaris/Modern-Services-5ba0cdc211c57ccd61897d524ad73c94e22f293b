# Hostinger Deployment Guide

This guide will help you deploy your Modern Services website to Hostinger.

## 📋 Prerequisites

1. **Backend API URL** - Your Railway backend URL (e.g., `https://your-app.railway.app`)
2. **Hostinger Account** - Access to your Hostinger hosting panel
3. **FTP/File Manager Access** - To upload files

---

## 🚀 Step 1: Build the Frontend

### 1.1 Navigate to Frontend Folder

```bash
cd Modern-Services-5ba0cdc211c57ccd61897d524ad73c94e22f293b/frontend
```

### 1.2 Create Production Environment File

Create a file named `.env.production` in the `frontend/` folder:

```env
VITE_API_URL=https://your-railway-backend-url.railway.app/api
```

**Replace `your-railway-backend-url.railway.app` with your actual Railway backend URL.**

### 1.3 Install Dependencies (if not already done)

```bash
npm install
```

### 1.4 Build for Production

```bash
npm run build
```

This will create a `dist/` folder with all the production-ready files.

---

## 📦 Step 2: Prepare Files for Upload

After building, you'll have a `frontend/dist/` folder containing:

- `index.html`
- `assets/` folder (CSS and JS files)
- `logo/` folder (images and favicons)
- `site.webmanifest`

**These are the files you need to upload to Hostinger.**

---

## 🌐 Step 3: Upload to Hostinger

### Option A: Using File Manager (Recommended)

1. **Login to Hostinger:**

   - Go to https://hpanel.hostinger.com
   - Login to your account

2. **Open File Manager:**

   - Click on "File Manager" in the control panel
   - Navigate to `public_html` folder (this is your website root)

3. **Clear Existing Files (if any):**

   - Delete all existing files in `public_html` (or backup first)
   - **Important:** Keep `.htaccess` if it exists

4. **Upload Files:**

   - Upload ALL contents from `frontend/dist/` folder
   - Upload `index.html` to the root
   - Upload `assets/` folder
   - Upload `logo/` folder
   - Upload `site.webmanifest`

5. **Verify Structure:**
   Your `public_html` should look like:
   ```
   public_html/
   ├── index.html
   ├── assets/
   │   ├── index-xxxxx.css
   │   └── index-xxxxx.js
   ├── logo/
   │   └── (all logo files)
   └── site.webmanifest
   ```

### Option B: Using FTP

1. **Get FTP Credentials:**

   - In Hostinger panel, go to "FTP Accounts"
   - Note your FTP host, username, and password

2. **Connect via FTP Client:**

   - Use FileZilla, WinSCP, or any FTP client
   - Connect to your Hostinger FTP server
   - Navigate to `public_html` folder

3. **Upload Files:**
   - Upload all contents from `frontend/dist/` folder
   - Ensure `index.html` is in the root of `public_html`

---

## ⚙️ Step 4: Configure .htaccess (Important!)

Create or update `.htaccess` file in `public_html` to handle React Router:

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

This ensures all routes work correctly (prevents 404 errors on page refresh).

---

## ✅ Step 5: Verify Deployment

1. **Visit Your Website:**

   - Go to your domain (e.g., `https://modernservices.org.uk`)
   - Check if the homepage loads correctly

2. **Test API Connection:**

   - Open browser console (F12)
   - Check for any API errors
   - Try submitting a testimonial or contact form

3. **Test All Pages:**
   - Navigate through all pages (Home, About, Services, etc.)
   - Check if admin login works
   - Verify testimonials load correctly

---

## 🔧 Troubleshooting

### Issue: Website shows blank page

**Solution:**

- Check browser console for errors
- Verify `index.html` is in the root of `public_html`
- Ensure all `assets/` files are uploaded
- Check file permissions (should be 644 for files, 755 for folders)

### Issue: API calls failing

**Solution:**

- Verify `VITE_API_URL` in `.env.production` is correct
- Check CORS settings in backend (Railway)
- Ensure backend is running and accessible
- Check browser console for CORS errors

### Issue: 404 errors on page refresh

**Solution:**

- Ensure `.htaccess` file is created (see Step 4)
- Verify mod_rewrite is enabled on Hostinger
- Contact Hostinger support if mod_rewrite is not available

### Issue: Images not loading

**Solution:**

- Verify `logo/` folder is uploaded correctly
- Check file paths in browser console
- Ensure images are in the correct location

---

## 🔄 Updating Your Website

When you make changes:

1. **Update Code:**

   - Make your changes in the frontend code

2. **Rebuild:**

   ```bash
   cd frontend
   npm run build
   ```

3. **Upload New Files:**

   - Delete old files from `public_html`
   - Upload new files from `frontend/dist/`

4. **Clear Browser Cache:**
   - Users may need to hard refresh (Ctrl+F5) to see changes

---

## 📝 Important Notes

1. **Backend Must Be Running:**

   - Your Railway backend must be running for the website to work
   - API calls will fail if backend is down

2. **Environment Variables:**

   - The `VITE_API_URL` is baked into the build during `npm run build`
   - If you change the backend URL, you must rebuild and re-upload

3. **SSL Certificate:**

   - Ensure your domain has SSL enabled in Hostinger
   - Your API URL should use `https://` not `http://`

4. **CORS Configuration:**
   - Your backend (Railway) must allow requests from your domain
   - Update `FRONTEND_URL` in backend `.env` to your Hostinger domain

---

## 🆘 Need Help?

If you encounter issues:

1. Check browser console (F12) for errors
2. Verify all files are uploaded correctly
3. Check backend logs in Railway dashboard
4. Contact Hostinger support for hosting issues
5. Check Railway logs for backend issues

---

## 📞 Quick Checklist

Before going live, verify:

- [ ] Backend is running on Railway
- [ ] `VITE_API_URL` is set correctly in `.env.production`
- [ ] Frontend is built (`npm run build`)
- [ ] All files uploaded to `public_html`
- [ ] `.htaccess` file is created
- [ ] SSL certificate is active
- [ ] CORS is configured in backend
- [ ] Test all pages work
- [ ] Test API connections
- [ ] Test admin login
- [ ] Test form submissions

---

**Good luck with your deployment! 🚀**

