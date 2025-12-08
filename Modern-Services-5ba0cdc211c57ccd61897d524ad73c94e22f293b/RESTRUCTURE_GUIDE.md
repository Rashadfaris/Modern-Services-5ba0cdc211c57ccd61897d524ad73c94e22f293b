# Project Restructure Guide

This guide explains how to complete the project restructure by moving remaining frontend files to the `frontend/` folder.

## Current Status

✅ **Completed:**

- Backend structure is complete in `backend/`
- Frontend configuration files created in `frontend/`
- Core frontend files created:
  - `frontend/src/App.tsx`
  - `frontend/src/main.tsx`
  - `frontend/src/lib/` (api.ts, auth.ts, clientCount.ts)
  - `frontend/src/styles/globals.css`

## Files to Move

You need to move the following files/folders from the root to `frontend/src/`:

### 1. Components

Move `components/` → `frontend/src/components/`

- All component files
- All UI component files
- figma folder

### 2. Pages

Move `pages/` → `frontend/src/pages/`

- All page files

### 3. Public Assets

Move `public/` → `frontend/public/`

- logo folder
- site.webmanifest

## Quick Move Commands

### Windows (PowerShell)

```powershell
# Move components
Move-Item -Path "components" -Destination "frontend/src/components"

# Move pages
Move-Item -Path "pages" -Destination "frontend/src/pages"

# Move public
Move-Item -Path "public" -Destination "frontend/public"
```

### Mac/Linux

```bash
# Move components
mv components frontend/src/components

# Move pages
mv pages frontend/src/pages

# Move public
mv public frontend/public
```

## After Moving Files

1. **Update imports** - All imports should use relative paths from `src/`
2. **Install dependencies**:
   ```bash
   cd frontend
   npm install
   ```
3. **Test the frontend**:
   ```bash
   npm run dev
   ```

## Final Structure

```
Modern-Services/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── lib/
│   │   ├── styles/
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── public/
│   ├── package.json
│   └── vite.config.ts
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── server.js
│   └── package.json
└── README.md
```
