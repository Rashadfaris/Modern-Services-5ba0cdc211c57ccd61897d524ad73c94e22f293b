# Modern Services - Property Management Website

A full-stack MERN (MongoDB, Express, React, Node.js) application for property management services in England, serving international investors.

## 🏗️ Project Structure

```
Modern-Services/
├── frontend/              # React + TypeScript + Vite
│   ├── src/
│   │   ├── components/   # React components
│   │   ├── pages/        # Page components
│   │   ├── lib/          # Utilities (API, auth, etc.)
│   │   ├── styles/       # Global styles
│   │   ├── App.tsx       # Main app component
│   │   └── main.tsx      # Entry point
│   ├── public/           # Static assets
│   ├── package.json
│   └── vite.config.ts
│
├── backend/              # Node.js + Express + MongoDB
│   ├── controllers/      # Business logic
│   ├── models/           # Mongoose schemas
│   ├── routes/           # API routes
│   ├── server.js         # Express server
│   ├── package.json
│   └── .env              # Environment variables
│
└── package.json          # Root scripts
```

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm
- MongoDB Atlas account (or local MongoDB)

### Installation

1. **Clone the repository:**

   ```bash
   git clone <repository-url>
   cd Modern-Services
   ```

2. **Install all dependencies:**

   ```bash
   npm run install:all
   ```

3. **Set up backend environment:**

   ```bash
   cd backend
   cp .env.example .env
   # Edit .env and add your MONGO_URI
   ```

4. **Set up frontend environment:**
   ```bash
   cd frontend
   cp .env.example .env
   # Edit .env and set VITE_API_URL
   ```

### Running the Application

**Option 1: Run both frontend and backend together**

```bash
npm run dev
```

**Option 2: Run separately**

Terminal 1 (Backend):

```bash
npm run dev:backend
```

Terminal 2 (Frontend):

```bash
npm run dev:frontend
```

- Frontend: http://localhost:5173
- Backend API: http://localhost:5000

## 📦 Tech Stack

### Frontend

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **shadcn/ui** - UI components
- **Lucide React** - Icons

### Backend

- **Node.js** - Runtime
- **Express** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **CORS** - Cross-origin support

## 🔑 Features

- ✅ **Testimonial Management** - Submit, approve, and display testimonials
- ✅ **Admin Dashboard** - Manage testimonials with approval workflow
- ✅ **Responsive Design** - Works on all devices
- ✅ **Session-Based Auth** - Simple admin authentication
- ✅ **RESTful API** - Clean API endpoints

## 📡 API Endpoints

### Testimonials

- `GET /api/testimonials` - Get all testimonials
- `GET /api/testimonials/approved` - Get approved testimonials
- `GET /api/testimonials/unapproved` - Get unapproved testimonials
- `POST /api/testimonials` - Create new testimonial
- `PATCH /api/testimonials/:id/approve` - Approve testimonial
- `DELETE /api/testimonials/:id` - Delete testimonial

### Health Check

- `GET /api/health` - Server health check

## 🔐 Admin Credentials

- **Email:** `admin@modernservices.com`
- **Password:** `Admin123!`

## 📝 Environment Variables

### Backend (`backend/.env`)

```env
MONGO_URI=your_mongodb_atlas_connection_string
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

### Frontend (`frontend/.env`)

```env
VITE_API_URL=http://localhost:5000/api
```

## 🛠️ Development

### Frontend Development

```bash
cd frontend
npm run dev
```

### Backend Development

```bash
cd backend
npm run dev
```

### Building for Production

```bash
# Build frontend
npm run build:frontend

# Build backend (just installs dependencies)
npm run build:backend
```

## 📚 Documentation

- [Backend Setup Guide](./BACKEND_SETUP.md)
- [Migration Guide](./MIGRATION_GUIDE.md)
- [Restructure Guide](./RESTRUCTURE_GUIDE.md)

## 🚢 Deployment

### Backend

Deploy to services like:

- Heroku
- Railway
- Render
- AWS EC2
- DigitalOcean

### Frontend

Build and deploy the `frontend/dist/` folder to:

- Vercel
- Netlify
- AWS S3 + CloudFront
- Any static hosting service

## 📄 License

This project is for Modern Services property management company.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📞 Support

For issues or questions, please open an issue on GitHub.
