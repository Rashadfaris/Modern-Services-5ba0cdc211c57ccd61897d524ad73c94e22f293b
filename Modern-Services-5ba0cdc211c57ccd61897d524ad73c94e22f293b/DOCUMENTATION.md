# Modern Services - Complete Documentation

## 📋 Table of Contents

1. [Project Overview](#project-overview)
2. [Firebase Setup](#firebase-setup)
3. [Admin Dashboard](#admin-dashboard)
4. [Features](#features)
5. [Troubleshooting](#troubleshooting)

---

## 🏗️ Project Overview

Modern Services is a property management website built with React, TypeScript, and Firebase.

### Tech Stack

- **React 18** + **TypeScript**
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Firebase** - Backend (Firestore, Authentication, Cloud Functions)
- **Lucide React** - Icons

### Getting Started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build
```

---

## 🔥 Firebase Setup

### 1. Environment Variables

Create a `.env` file in the root directory:

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=modern-services-4675.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=modern-services-4675
VITE_FIREBASE_STORAGE_BUCKET=modern-services-4675.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

### 2. Enable Firebase Services

1. **Firestore Database**

   - Go to [Firebase Console](https://console.firebase.google.com/project/modern-services-4675/firestore)
   - Create database (Production mode)

2. **Authentication**

   - Go to [Authentication](https://console.firebase.google.com/project/modern-services-4675/authentication)
   - Enable "Email/Password" sign-in method

3. **Deploy Firestore Rules & Indexes**
   ```powershell
   firebase deploy --only firestore:rules,firestore:indexes
   ```

### 3. Create Admin User

1. Go to [Authentication → Users](https://console.firebase.google.com/project/modern-services-4675/authentication/users)
2. Click "Add user"
3. Enter:
   - **Email**: `admin@modernservices.com`
   - **Password**: `Admin123!`

---

## 👤 Admin Dashboard

### Access

- Click "Admin" link in the footer (shield icon)
- Login with: `admin@modernservices.com` / `Admin123!`

### Features

- View pending testimonials
- Approve/Decline testimonials
- Real-time updates (auto-refreshes when testimonials change)

### Testimonials System

1. **User Submission**: Users submit testimonials via form on Testimonials page
2. **Auto-Save**: Testimonials saved with `approved: false`
3. **Admin Review**: Admin sees pending testimonials in dashboard
4. **Approval**: Approved testimonials appear on public page

---

## ✨ Features

### Automatic Client Count Update

The client count automatically updates every December 28th:

- **Base**: 56 clients (Dec 28, 2024)
- **Increment**: +12 clients per year
- **Location**: Testimonials page stats section

**Timeline:**

- Before Dec 28, 2025: 56+
- Dec 28, 2025+: 68+
- Dec 28, 2026+: 80+
- And so on...

To modify: Edit `lib/clientCount.ts`

### Testimonials

- Users can submit testimonials via form
- Admin approval required before public display
- Real-time updates in admin dashboard
- Shows submission date for approved testimonials

---

## 🔧 Troubleshooting

### Admin Login Issues

**Error: `auth/configuration-not-found`**

- Enable Firebase Authentication in Firebase Console
- Enable "Email/Password" sign-in method
- Create admin user (see Firebase Setup)

**Error: `permission-denied`**

- Deploy Firestore rules: `firebase deploy --only firestore:rules`
- Verify you're logged in as admin

### Testimonials Not Showing in Admin Panel

1. **Check Firestore**: Verify testimonial exists with `approved: false`
2. **Deploy Rules**: `firebase deploy --only firestore:rules`
3. **Check Authentication**: Ensure you're logged in as admin
4. **Browser Console**: Check for errors (F12)

### Common Commands

```powershell
# Deploy Firestore rules
firebase deploy --only firestore:rules

# Deploy Firestore indexes
firebase deploy --only firestore:indexes

# Deploy both
firebase deploy --only firestore:rules,firestore:indexes
```

---

## 📁 Project Structure

```
├── components/          # Reusable components
│   ├── ui/             # UI components
│   ├── Header.tsx
│   ├── Footer.tsx
│   └── ...
├── pages/               # Page components
│   ├── HomePage.tsx
│   ├── AboutPage.tsx
│   ├── ServicesPage.tsx
│   ├── TestimonialsPage.tsx
│   ├── ContactPage.tsx
│   └── AdminDashboard.tsx
├── lib/                 # Utilities
│   ├── firestore.ts    # Firestore functions
│   ├── auth.ts         # Authentication
│   └── clientCount.ts  # Client count calculator
├── firebase/           # Firebase config
│   └── config.ts
├── firestore.rules      # Security rules
└── firestore.indexes.json
```

---

## 🔐 Security

- Firestore rules enforce admin-only access for approve/decline operations
- Public users can only read approved testimonials
- Admin authentication required for dashboard access
- Email-based admin verification

---

## 📝 Notes

- Admin credentials are hardcoded in `lib/auth.ts` (change for production)
- Client count updates automatically (no manual changes needed)
- Real-time listeners update admin dashboard instantly
- All testimonials require admin approval before public display

---

## 🚀 Deployment

1. Build the project: `npm run build`
2. Deploy to your hosting service (Vercel, Netlify, etc.)
3. Ensure `.env` variables are set in hosting environment
4. Deploy Firestore rules: `firebase deploy --only firestore:rules`

---

## 📞 Support

For issues or questions:

- Check browser console (F12) for errors
- Verify Firebase configuration
- Ensure all services are enabled in Firebase Console
- Check Firestore rules are deployed
