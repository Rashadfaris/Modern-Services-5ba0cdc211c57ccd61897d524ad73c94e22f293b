# Migration Guide: Firebase to MongoDB Backend

This guide explains the changes made to migrate from Firebase Firestore to a Node.js + Express + MongoDB backend for testimonials.

## What Changed

### Backend (New)

- **Created**: `backend/` folder with complete Express + MongoDB setup
- **Models**: Mongoose schema for testimonials
- **Controllers**: Business logic for testimonial operations
- **Routes**: RESTful API endpoints
- **Server**: Express server with MongoDB Atlas connection

### Frontend (Updated)

- **Replaced**: `lib/firestore.ts` → `lib/api.ts` (new REST API client)
- **Updated**: `pages/TestimonialsPage.tsx` - now uses API instead of Firebase
- **Updated**: `pages/AdminDashboard.tsx` - now uses API instead of Firebase
- **Updated**: Date handling to work with regular Date objects (not Firebase Timestamps)

### Authentication (Updated)

- **Replaced**: Firebase Auth → Simple session-based authentication using localStorage
- **Updated**: `lib/auth.ts` - now uses localStorage instead of Firebase Auth
- **No Firebase Dependencies**: All Firebase code has been removed

## Setup Instructions

### 1. Backend Setup

1. **Navigate to backend folder:**

   ```bash
   cd backend
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Create `.env` file:**

   ```bash
   cp .env.example .env
   ```

4. **Configure MongoDB:**

   - Get your MongoDB Atlas connection string
   - Update `MONGO_URI` in `backend/.env`
   - Format: `mongodb+srv://username:password@cluster.mongodb.net/database-name?retryWrites=true&w=majority`

5. **Start the backend server:**

   ```bash
   # Development (with auto-reload)
   npm run dev

   # Production
   npm start
   ```

   The server will run on `http://localhost:5000` by default.

### 2. Frontend Setup

1. **Update environment variables:**

   - Copy `env.template` to `.env` (if not already done)
   - Set `VITE_API_URL=http://localhost:5000/api` (or your backend URL)

2. **Install dependencies (if needed):**

   ```bash
   npm install
   ```

3. **Start the frontend:**
   ```bash
   npm run dev
   ```

## API Endpoints

The backend provides the following endpoints:

- `GET /api/testimonials` - Get all testimonials
- `GET /api/testimonials/approved` - Get approved testimonials only
- `GET /api/testimonials/unapproved` - Get unapproved testimonials (admin)
- `POST /api/testimonials` - Create a new testimonial
- `PATCH /api/testimonials/:id/approve` - Approve a testimonial
- `DELETE /api/testimonials/:id` - Delete a testimonial
- `GET /api/health` - Health check

## Database Schema

### Testimonial Model

```javascript
{
  name: String (required),
  email: String (required, auto-generated if not provided),
  location: String (optional),
  message: String (required),
  approved: Boolean (default: false),
  createdAt: Date (default: now)
}
```

## Differences from Firebase

### Real-time Updates

- **Firebase**: Real-time listeners with `onSnapshot()`
- **MongoDB Backend**: Polling every 5 seconds (can be upgraded to WebSockets)

### Data Format

- **Firebase**: Uses `Timestamp` objects
- **MongoDB Backend**: Uses regular JavaScript `Date` objects

### Authentication

- **Admin Login**: Still uses Firebase Auth (not migrated)
- **Testimonials**: No authentication required (public submission)

## Testing

1. **Test API directly:**

   ```bash
   # Get approved testimonials
   curl http://localhost:5000/api/testimonials/approved

   # Create a testimonial
   curl -X POST http://localhost:5000/api/testimonials \
     -H "Content-Type: application/json" \
     -d '{"name":"John","location":"London, UK","message":"Great service!"}'
   ```

2. **Test from frontend:**
   - Submit a testimonial from the Testimonials page
   - Check admin dashboard to see unapproved testimonials
   - Approve/decline testimonials from admin dashboard

## Production Deployment

### Backend

1. Deploy to services like:

   - Heroku
   - Railway
   - Render
   - AWS EC2
   - DigitalOcean

2. Update environment variables:
   - `MONGO_URI` - Your production MongoDB connection
   - `FRONTEND_URL` - Your production frontend URL
   - `NODE_ENV=production`

### Frontend

1. Update `.env` or build-time variables:

   - `VITE_API_URL` - Your production backend URL

2. Build and deploy:
   ```bash
   npm run build
   # Deploy dist/ folder to your hosting service
   ```

## Troubleshooting

### Backend won't start

- Check MongoDB connection string in `.env`
- Ensure MongoDB Atlas allows connections from your IP
- Check if port 5000 is available

### Frontend can't connect to backend

- Verify backend is running on correct port
- Check `VITE_API_URL` in frontend `.env`
- Check CORS settings in `backend/server.js`

### Testimonials not showing

- Check browser console for errors
- Verify backend is running and accessible
- Check MongoDB for data: `db.testimonials.find()`

## Next Steps (Optional)

1. **Add Backend Authentication**: Protect admin endpoints with JWT tokens
2. **Real-time Updates**: Implement WebSockets for instant updates
3. **Email Notifications**: Add email service for new testimonial alerts
4. **Enhanced Security**: Move admin credentials to environment variables

## Files Changed

### Created

- `backend/models/Testimonial.js`
- `backend/controllers/testimonialController.js`
- `backend/routes/testimonialRoutes.js`
- `backend/server.js`
- `backend/package.json`
- `backend/.gitignore`
- `backend/README.md`
- `lib/api.ts` (replaces Firebase calls)

### Modified

- `pages/TestimonialsPage.tsx` - Updated imports
- `pages/AdminDashboard.tsx` - Updated imports and date handling
- `env.template` - Updated for API URL

### Updated (No longer uses Firebase)

- `lib/auth.ts` - Now uses localStorage-based session authentication
- `components/AdminLogin.tsx` - Works with new auth system
