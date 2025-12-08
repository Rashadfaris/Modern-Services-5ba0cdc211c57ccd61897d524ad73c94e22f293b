# Backend Setup Quick Start

## Quick Setup

1. **Navigate to backend:**

   ```bash
   cd backend
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Create `.env` file:**
   Create a file named `.env` in the `backend/` folder with:

   ```env
   MONGO_URI=your_mongodb_atlas_connection_string_here
   PORT=5000
   NODE_ENV=development
   FRONTEND_URL=http://localhost:5173
   ```

4. **Get MongoDB Atlas Connection String:**

   - Go to https://www.mongodb.com/cloud/atlas
   - Create a free cluster (if you don't have one)
   - Click "Connect" → "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your database password
   - Format: `mongodb+srv://username:password@cluster.mongodb.net/database-name?retryWrites=true&w=majority`

5. **Start the server:**

   ```bash
   npm run dev
   ```

   You should see:

   ```
   ✅ Connected to MongoDB Atlas
   🚀 Server running in development mode on port 5000
   📍 API available at http://localhost:5000/api
   ```

## Test the API

Open your browser or use curl:

```bash
# Health check
curl http://localhost:5000/api/health

# Get approved testimonials
curl http://localhost:5000/api/testimonials/approved

# Create a testimonial
curl -X POST http://localhost:5000/api/testimonials \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","location":"London, UK","message":"Great service!"}'
```

## API Endpoints

| Method | Endpoint                        | Description                 |
| ------ | ------------------------------- | --------------------------- |
| GET    | `/api/testimonials`             | Get all testimonials        |
| GET    | `/api/testimonials/approved`    | Get approved testimonials   |
| GET    | `/api/testimonials/unapproved`  | Get unapproved testimonials |
| POST   | `/api/testimonials`             | Create new testimonial      |
| PATCH  | `/api/testimonials/:id/approve` | Approve testimonial         |
| DELETE | `/api/testimonials/:id`         | Delete testimonial          |
| GET    | `/api/health`                   | Health check                |

## Project Structure

```
backend/
├── models/
│   └── Testimonial.js          # Mongoose schema
├── controllers/
│   └── testimonialController.js # Business logic
├── routes/
│   └── testimonialRoutes.js    # API routes
├── server.js                    # Express server
├── package.json                 # Dependencies
├── .env                         # Environment variables (create this)
└── README.md                    # Full documentation
```

## Troubleshooting

**"MONGO_URI is not defined"**

- Make sure you created `.env` file in the `backend/` folder
- Check that `MONGO_URI` is set in the file

**"MongoDB connection error"**

- Verify your connection string is correct
- Check MongoDB Atlas allows connections from your IP (Network Access)
- Ensure your database user has read/write permissions

**"Port 5000 already in use"**

- Change `PORT` in `.env` to a different port (e.g., 5001)
- Or stop the process using port 5000

## Next Steps

1. Update frontend `.env` with `VITE_API_URL=http://localhost:5000/api`
2. Test testimonial submission from the frontend
3. Test admin dashboard approval workflow
4. Deploy to production when ready
