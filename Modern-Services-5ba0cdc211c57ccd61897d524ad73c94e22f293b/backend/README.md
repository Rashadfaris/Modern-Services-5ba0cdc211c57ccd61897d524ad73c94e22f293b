# Modern Services Backend API

Node.js + Express + MongoDB backend for the Modern Services property management website.

## Features

- RESTful API for testimonial management
- MongoDB Atlas integration
- CORS enabled for React frontend
- Error handling and validation

## Setup

1. **Install dependencies:**

   ```bash
   npm install
   ```

2. **Configure environment variables:**

   - Copy `.env.example` to `.env`
   - Add your MongoDB Atlas connection string to `MONGO_URI`
   - Update `FRONTEND_URL` if needed

3. **Start the server:**

   ```bash
   # Development (with auto-reload)
   npm run dev

   # Production
   npm start
   ```

## API Endpoints

### Testimonials

- `GET /api/testimonials` - Get all testimonials
- `GET /api/testimonials/approved` - Get approved testimonials only
- `POST /api/testimonials` - Create a new testimonial
- `PATCH /api/testimonials/:id/approve` - Approve a testimonial
- `DELETE /api/testimonials/:id` - Delete a testimonial

### Health Check

- `GET /api/health` - Server health check

## MongoDB Schema

### Testimonial

```javascript
{
  name: String (required),
  email: String (required),
  message: String (required),
  approved: Boolean (default: false),
  createdAt: Date (default: now)
}
```

## Environment Variables

- `MONGO_URI` - MongoDB Atlas connection string
- `PORT` - Server port (default: 5000)
- `NODE_ENV` - Environment (development/production)
- `FRONTEND_URL` - React frontend URL for CORS
