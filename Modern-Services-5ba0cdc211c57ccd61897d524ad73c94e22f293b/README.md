# Modern Services - Property Management Website

A modern, responsive website for Modern Services, a property management company serving international investors in England.

## Features

- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Modern UI**: Built with React, TypeScript, and Tailwind CSS
- **Component-Based Architecture**: Reusable components for easy maintenance
- **Multiple Pages**: Home, About, Services, Testimonials, and Contact pages

## Tech Stack

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling
- **Lucide React** - Icons
- **shadcn/ui** - UI components

## Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn/pnpm

### Installation

1. Install dependencies:

```bash
npm install
```

2. Start the development server:

```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Project Structure

```
├── components/          # Reusable components
│   ├── ui/              # shadcn/ui components
│   ├── Header.tsx       # Navigation header
│   ├── Footer.tsx       # Site footer
│   ├── BenefitCard.tsx  # Benefit display card
│   ├── ServiceCard.tsx  # Service display card
│   ├── TestimonialCard.tsx # Testimonial card
│   └── ValueCard.tsx    # Value display card
├── pages/               # Page components
│   ├── HomePage.tsx
│   ├── AboutPage.tsx
│   ├── ServicesPage.tsx
│   ├── TestimonialsPage.tsx
│   └── ContactPage.tsx
├── styles/              # Global styles
│   └── globals.css
├── App.tsx              # Main app component
└── src/                 # Entry point
    └── main.tsx
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## License

This project is for Modern Services property management company.
