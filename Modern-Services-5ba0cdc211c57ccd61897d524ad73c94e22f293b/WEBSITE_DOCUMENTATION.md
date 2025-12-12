# Modern Services Website - Public-Facing Documentation

## 1. SITE STRUCTURE

### 1.1 Visible Pages
- **Home** (`/home`)
- **About** (`/about`)
- **Services** (`/services`)
- **Blog** (`/blog`)
- **Testimonials** (`/testimonials`)
- **Contact** (`/contact`)

### 1.2 Navigation Flow
- **Header Navigation**: Sticky header with logo, navigation links, and "Get Started" CTA button
- **Mobile Navigation**: Hamburger menu that expands to show all navigation links
- **Footer Navigation**: Quick links section with page navigation buttons
- **Internal Links**: Buttons and CTAs throughout pages navigate to other pages (e.g., "Learn More About Us" → About page)

### 1.3 Footer Structure
- **4-Column Layout** (responsive: stacks on mobile)
  - Column 1: Company Info (Modern Services description)
  - Column 2: Quick Links (Home, About Us, Services, Testimonials, Contact)
  - Column 3: Services List (Property Management, Tenant Services, Financial Management, Maintenance & Repairs, Tax & Legal Compliance)
  - Column 4: Contact Info (Phone, Email, Company Registration)
- **Bottom Bar**: Copyright, Privacy Policy, Terms of Service, Admin link

---

## 2. LAYOUT & ALIGNMENT

### 2.1 Home Page Sections

#### Hero Section
- **Layout**: Full-width, centered content
- **Height**: `min-h-[500px] sm:h-[600px] md:h-[700px]`
- **Background**: Image with dark gradient overlay (`from-[#0A1A2F]/90 to-[#0A1A2F]/70`)
- **Content Alignment**: Centered text
- **Responsive**: Text sizes scale from `text-2xl` to `text-6xl` for title

#### About Preview Section
- **Layout**: 2-column grid (`grid-cols-1 lg:grid-cols-2`)
- **Alignment**: Left-aligned text on desktop, centered on mobile
- **Spacing**: `py-12 sm:py-16 md:py-20`
- **Background**: White (`bg-white`)

#### Key Investor Benefits Section
- **Layout**: 4-column grid (`grid-cols-1 sm:grid-cols-2 lg:grid-cols-4`)
- **Alignment**: Centered section title and description
- **Spacing**: `gap-6 sm:gap-8`
- **Background**: Light gray (`bg-[#F4F5F7]`)

#### Services Overview Section
- **Layout**: 4-column grid (`grid-cols-1 sm:grid-cols-2 lg:grid-cols-4`)
- **Alignment**: Centered section title and description
- **Background**: White (`bg-white`)

#### Testimonials Slider Section
- **Layout**: Single column, centered
- **Background**: Dark blue (`bg-[#0A1A2F]`)
- **Features**: Auto-rotating slider with dot indicators

#### CTA Section
- **Layout**: Centered content, max-width container
- **Background**: Gold (`bg-[#C8A75B]`)
- **Alignment**: Centered text and buttons

### 2.2 About Page Sections

#### Hero Section
- **Height**: Fixed `h-[400px]`
- **Background**: Image with gradient overlay
- **Alignment**: Centered

#### Our Story Section
- **Layout**: 2-column grid (`grid-cols-1 lg:grid-cols-2`)
- **Background**: White
- **Image**: Right side, `h-[500px]`

#### Our Values Section
- **Layout**: 5-column grid (`grid-cols-1 md:grid-cols-2 lg:grid-cols-5`)
- **Background**: Light gray (`bg-[#F4F5F7]`)
- **Alignment**: Centered cards

#### Why Choose Us Section
- **Layout**: 3-column grid (`grid-cols-1 md:grid-cols-2 lg:grid-cols-3`)
- **Background**: White
- **Spacing**: `gap-8`

#### Mission & Vision Section
- **Layout**: 2-column grid (`grid-cols-1 md:grid-cols-2`)
- **Background**: Dark blue (`bg-[#0A1A2F]`)
- **Cards**: White overlay (`bg-white/5`)

#### Stats Section
- **Layout**: 4-column grid (`grid-cols-2 md:grid-cols-4`)
- **Background**: Gold (`bg-[#C8A75B]`)
- **Alignment**: Centered

### 2.3 Services Page Sections

#### Hero Section
- **Height**: Fixed `h-[400px]`
- **Background**: Image with gradient overlay

#### Main Services Section
- **Layout**: 2-column grid (`grid-cols-1 lg:grid-cols-2`)
- **Left Column**: Property Management with expandable sub-services
- **Right Column**: Accounting Services with cards
- **Quick Features**: 3-column grid (`grid-cols-1 md:grid-cols-2 lg:grid-cols-3`)

### 2.4 Contact Page Sections

#### Hero Section
- **Height**: Fixed `h-[400px]`
- **Background**: Image with gradient overlay

#### Contact Form & Info Section
- **Layout**: 2-column grid (`grid-cols-1 lg:grid-cols-2`)
- **Left**: Contact form
- **Right**: Contact information cards + WhatsApp CTA

#### Map Section
- **Layout**: Centered, max-width container
- **Background**: Light gray (`bg-[#F4F5F7]`)
- **Map**: Embedded Google Maps iframe

#### FAQ Section
- **Layout**: 3-column grid (`grid-cols-1 md:grid-cols-3`)
- **Background**: White

### 2.5 Testimonials Page Sections

#### Hero Section
- **Height**: Fixed `h-[400px]`
- **Background**: Image with gradient overlay

#### Trust Stats Section
- **Layout**: 4-column grid (`grid-cols-2 md:grid-cols-4`)
- **Background**: Gold (`bg-[#C8A75B]`)

#### Testimonials Grid Section
- **Layout**: 3-column grid (`grid-cols-1 md:grid-cols-2 lg:grid-cols-3`)
- **Background**: White

#### Submit Testimonial Form Section
- **Layout**: Centered, max-width container
- **Background**: Light gray (`bg-[#F4F5F7]`)

#### Featured Testimonial Section
- **Layout**: Centered, max-width container
- **Background**: Light gray

#### Countries Served Section
- **Layout**: 6-column grid (`grid-cols-2 md:grid-cols-4 lg:grid-cols-6`)
- **Background**: White

### 2.6 Blog Page Sections

#### Hero Section
- **Height**: Fixed `h-[400px]`
- **Background**: Image with gradient overlay

#### Blog Posts Section
- **Layout**: 2-column + sidebar (`lg:col-span-2` for posts, `lg:col-span-1` for sidebar)
- **Sidebar**: Sticky (`sticky top-24`)
- **Posts**: Expandable/collapsible content

### 2.7 Responsive Breakpoints
- **Mobile**: Default (no prefix)
- **Small**: `sm:` (640px+)
- **Medium**: `md:` (768px+)
- **Large**: `lg:` (1024px+)
- **Extra Large**: `xl:` (1280px+)

### 2.8 Common Spacing Patterns
- **Section Padding**: `py-12 sm:py-16 md:py-20` or `py-20`
- **Container Padding**: `px-4 sm:px-6 lg:px-8`
- **Max Width**: `max-w-7xl` (most sections), `max-w-4xl` (CTAs)
- **Gap Spacing**: `gap-6 sm:gap-8` or `gap-8` or `gap-12`

---

## 3. UI COMPONENTS

### 3.1 Header Component
- **Type**: Sticky header (`sticky top-0 z-50`)
- **Background**: White with shadow (`bg-white shadow-md`)
- **Height**: `h-16 md:h-20`
- **Logo**: Image + text "Modern Services"
- **Navigation**: Horizontal links with active state (gold underline)
- **Mobile Menu**: Hamburger icon, expands to vertical menu
- **CTA Button**: "Get Started" button (desktop only)

### 3.2 Footer Component
- **Background**: Dark blue (`bg-[#0A1A2F]`)
- **Text Color**: White and gray-300
- **Layout**: 4-column grid, responsive
- **Links**: Hover effect changes to gold (`hover:text-[#C8A75B]`)

### 3.3 Button Component
- **Primary**: Gold background (`bg-[#C8A75B]`), white text, hover: `bg-[#B8964A]`
- **Secondary/Outline**: Border, transparent background, hover fills with color
- **Variants**: `variant="outline"`, `variant="secondary"`
- **Full Width**: `fullWidth` prop or `w-full` class
- **States**: Disabled with opacity-50

### 3.4 BenefitCard Component
- **Layout**: White card with shadow
- **Icon**: Circular gold background (`bg-[#C8A75B]`), white icon
- **Hover**: Shadow increases (`hover:shadow-lg`)
- **Content**: Title (dark blue), description (gray-600)
- **Spacing**: `p-6`, `mb-4` for icon, `mb-3` for title

### 3.5 ServiceCard Component
- **Layout**: White card with shadow, flex column
- **Icon**: Circular gold background
- **Features List**: Bullet points with gold bullets
- **Button**: "Learn More" outline button at bottom
- **Hover**: Shadow increases

### 3.6 TestimonialCard Component
- **Layout**: White card with shadow
- **Rating**: 5 gold stars at top
- **Content**: Italic gray text in quotes
- **Author**: Name (dark blue), role (gray-500)
- **Hover**: Shadow increases

### 3.7 ValueCard Component
- **Layout**: White card, centered text
- **Icon**: Larger circular gold background (`w-16 h-16`)
- **Content**: Centered title and description

### 3.8 Form Components

#### Contact Form
- **Input Fields**: 
  - Border: `border-gray-300`
  - Focus: `focus:border-[#C8A75B]`
  - Padding: `px-4 py-3`
  - Border radius: `rounded-sm`
- **Labels**: `text-sm text-gray-700 mb-2`
- **Textarea**: `rows={6}`, `resize-none`
- **Submit Button**: Gold background with Send icon
- **Success Message**: Green background (`bg-green-50`), green border
- **Error Message**: Red background (`bg-red-50`), red border

#### Testimonial Form
- **Same styling as Contact Form**
- **Fields**: Name, Location, Message
- **Success Message**: Shows checkmark icon

### 3.9 Expandable Sections (Services Page)
- **Trigger**: Button with icon and title
- **Icon**: ChevronDown/ChevronUp
- **Expanded State**: Shows description and feature list
- **Background**: White header, light gray expanded area (`bg-[#F4F5F7]`)
- **Hover**: Header background changes to light gray

### 3.10 Blog Post Cards
- **Layout**: White card with shadow
- **Category Badge**: Gold background with rounded-full (`bg-[#C8A75B]/10`)
- **Date**: Calendar icon + text
- **Content**: Expandable with "Read More"/"Show Less" button
- **Hover**: Shadow increases (`hover:shadow-xl`)

### 3.11 Icons
- **Library**: Lucide React icons
- **Common Icons**: 
  - Shield, TrendingUp, Clock, FileCheck (benefits)
  - Building2, Users, Wallet, Wrench (services)
  - Heart, Eye, Users, Lightbulb, Award (values)
  - Phone, Mail, MapPin, Clock, Send (contact)
  - Star, Quote (testimonials)
  - Calendar, ChevronDown, ChevronUp (blog)

### 3.12 Animations

#### FadeIn Component
- **Type**: Intersection Observer-based fade-in
- **Effect**: `opacity-0 translate-y-6` → `opacity-100 translate-y-0`
- **Duration**: `duration-700`
- **Trigger**: When 10% of element is visible
- **Delay**: Configurable per element

#### Hover Effects
- **Cards**: Shadow increases (`hover:shadow-lg`)
- **Buttons**: Background color changes
- **Links**: Color changes to gold
- **Transitions**: `transition-colors`, `transition-shadow`, `transition-all`

#### Testimonial Slider
- **Auto-rotate**: Every 5 seconds
- **Indicators**: Dot navigation (active dot is wider and gold)

---

## 4. CONTENT

### 4.1 Home Page Content

#### Hero Section
- **Main Title**: "Modern Services"
- **Subtitle**: "Your Trusted Partner for Property Management in England"
- **Description**: "Seamless, profitable, and stress-free property solutions tailored for international investors."
- **CTA Primary**: "Get a Free Consultation"
- **CTA Secondary**: "Explore Our Services"

#### About Preview
- **Title**: "About Modern Services"
- **Description 1**: "For over 10+ years, Modern Services has empowered international investors with exceptional property management across England. We enhance both your investments and the communities we manage."
- **Description 2**: "Our comprehensive approach combines expert property management with integrated accounting services, ensuring your investments are professionally managed, fully compliant, and optimized for maximum returns."
- **Button**: "Learn More About Us"

#### Key Investor Benefits
- **Title**: "Why International Investors Choose Us"
- **Description**: "We provide comprehensive solutions that protect and grow your property investments in England."
- **Cards**:
  1. **Peace of Mind**: "Rest easy knowing your properties are in expert hands with 24/7 support and proactive management."
  2. **Maximized Returns**: "Strategic rent optimization and cost-effective maintenance to enhance your investment performance."
  3. **Time Savings**: "We handle everything from tenant screening to maintenance, freeing you to focus on growing your portfolio."
  4. **Legal & Tax Compliance**: "Full UK regulatory compliance and expert tax guidance to protect your interests."

#### Services Overview
- **Title**: "Our Core Services"
- **Description**: "Comprehensive property and financial management solutions tailored for international investors."
- **Cards**:
  1. **Property Management**: "Full-service management from tenant sourcing to maintenance and compliance." Features: Tenant Screening, Rent Collection, 24/7 Support
  2. **Tenant Services**: "Professional tenant sourcing, screening, and relationship management." Features: Background Checks, Contract Management, Tenant Support
  3. **Financial Management**: "Expert accounting, bookkeeping, and financial reporting services." Features: Monthly Reports, Tax Planning, Payroll Services
  4. **Maintenance & Repairs**: "Proactive maintenance and rapid response to keep properties in prime condition." Features: 24/7 Emergency, Quality Contractors, Cost Control
- **Button**: "View All Services"

#### Testimonials
- **Title**: "What Our Clients Say"
- **Description**: "Trusted by international investors worldwide"
- **Testimonials** (5 rotating):
  1. Sarah Mitchell, Property Investor, Dubai
  2. James Chen, International Investor, Singapore
  3. Maria Rodriguez, Real Estate Portfolio Owner, Spain
  4. Robert Thompson, Property Developer, USA
  5. Amira Hassan, Investor, UAE
- **Button**: "Read More Testimonials"

#### CTA Section
- **Title**: "Ready to Optimize Your Property Investment?"
- **Description**: "Get a free consultation with our property management experts today."
- **CTA Primary**: "Schedule Consultation"
- **CTA Secondary**: "Learn More"

### 4.2 About Page Content

#### Hero
- **Title**: "About Modern Services"
- **Description**: "A decade of excellence in property management and accounting services"

#### Our Story
- **Title**: "Our Story"
- **Paragraphs** (3):
  1. "Founded over 10+ years ago, Modern Services was born from a simple vision..."
  2. "Throughout our decade-long journey, we have successfully managed over fifty properties..."
  3. "Today, Modern Services stands as a trusted leader in property management..."

#### Our Core Values
- **Title**: "Our Core Values"
- **Description**: "These principles guide every decision we make and every service we provide."
- **Cards** (5):
  1. **Integrity**: "We operate with honesty and transparency..."
  2. **Transparency**: "Clear, open communication and detailed reporting..."
  3. **Client-Centricity**: "Your success is our success..."
  4. **Innovation**: "We embrace technology and modern practices..."
  5. **Expertise**: "A decade of experience combined with continuous learning..."

#### Why Choose Modern Services
- **Title**: "Why Choose Modern Services?"
- **Description**: "We offer a unique combination of expertise, technology, and personalized service that sets us apart."
- **Cards** (6):
  1. **Specialized Expertise**
  2. **Comprehensive Solutions**
  3. **Transparent Reporting**
  4. **Dedicated Account Management**
  5. **Integrated Tax & Financial Support**
  6. **Advanced Technology**

#### Mission & Vision
- **Mission Title**: "Our Mission"
- **Mission Content**: "To empower international property investors..."
- **Vision Title**: "Our Vision"
- **Vision Content**: "To be recognized as the leading property management company..."

#### Stats
- **Years Experience**: "10+"
- **Properties Managed**: "50+"
- **Client Satisfaction**: "98%"
- **Support Available**: "24/7"

#### CTA
- **Title**: "Ready to Partner With Us?"
- **Description**: "Let's discuss how we can help you achieve your property investment goals in England."
- **Buttons**: "Get in Touch", "Explore Our Services"

### 4.3 Services Page Content

#### Hero
- **Title**: "Our Services"
- **Description**: "Comprehensive property management and accounting solutions for international investors"

#### Property Management
- **Title**: "Comprehensive Property Management"
- **Description**: "Full-service property management designed specifically for international investors..."
- **Quick Features** (6):
  - Professional tenant screening
  - 24/7 emergency support
  - Rent collection & management
  - Property maintenance & repairs
  - Legal compliance & reporting
  - Market analysis & advice
- **Sub-Services** (8 expandable):
  1. Rent Collection & Financial Management
  2. Tax & Legal Compliance
  3. Tenant Sourcing & Management
  4. Short-Term Rental Management
  5. Property Maintenance & Repairs
  6. Market Analysis & Investment Advice
  7. Property Marketing
  8. 24/7 Dedicated Support

#### Accounting Services
- **Title**: "Accounting Services"
- **Description**: "Professional accounting and financial services to keep your property business compliant and profitable."
- **Services** (5):
  1. Bookkeeping Services
  2. Payroll Processing
  3. Accounts Preparation
  4. Tax Compliance
  5. Business Start-up Support
- **Pluto CTA**:
  - **Title**: "Expert Accountancy & Tax Advice"
  - **Description**: "For comprehensive accountancy and tax consultancy services, visit our specialist partner Pluto Consultancy."
  - **Button**: "Visit Pluto Consultancy"
  - **URL**: "https://plutoconsultancy.com"

#### CTA
- **Title**: "Let's Discuss Your Property Needs"
- **Description**: "Schedule a free consultation to learn how our services can benefit your property investment."
- **Buttons**: "Get Free Consultation", "Read Client Stories"

### 4.4 Contact Page Content

#### Hero
- **Title**: "Get In Touch"
- **Description**: "Let's discuss how we can help you achieve your property investment goals"

#### Form
- **Title**: "Send Us a Message"
- **Description**: "Fill out the form below and our team will get back to you within 24 hours."
- **Fields**:
  - Full Name * (placeholder: "John Smith")
  - Email Address * (placeholder: "john.smith@email.com")
  - Phone Number (placeholder: "+44 20 8058 7635")
  - Message * (placeholder: "Tell us about your property management needs...")
- **Submit Button**: "Send Message" (with Send icon)
- **Success Message**: "Thank You! Your message has been sent successfully to info@modernservices.org.uk. We'll be in touch soon."

#### Contact Information
- **Title**: "Contact Information"
- **Description**: "Reach out to us through any of the following channels. We're here to help!"
- **Phone**: "+44 20 8058 7635" (Note: "International rates may apply")
- **Email**: "info@modernservices.org.uk" (Note: "We respond within 24 hours")
- **Company Registration**: "Company Registration No: OC407556"
- **Operating Hours**:
  - Weekdays: "Monday - Friday: 9:00 AM - 6:00 PM GMT"
  - Saturday: "Saturday: 10:00 AM - 2:00 PM GMT"
  - Sunday: "Sunday: Closed"
- **Emergency Support**: "24/7 Emergency Support Available"

#### WhatsApp CTA
- **Title**: "Chat With Us Instantly"
- **Description**: "Get immediate assistance through WhatsApp. Perfect for quick questions or urgent matters."
- **Button**: "Start WhatsApp Chat"
- **URL**: "https://wa.me/447808646056"

#### Visit Our Office
- **Title**: "Visit Our Office"
- **Description**: "Located in Harrow, we welcome visits by appointment"
- **Map**: Google Maps embed (Harrow Town Centre)
- **Link**: "Harrow Town Centre" (opens Google Maps)

#### FAQ
- **Title**: "Have Questions?"
- **Description**: "Here are some quick answers to common questions. For more detailed information, please contact us directly."
- **Questions** (3):
  1. "How quickly can you start managing my property?" → "We can typically onboard new properties within 5-7 business days..."
  2. "Do you manage properties outside London?" → "Yes, we manage properties throughout England..."
  3. "What are your management fees?" → "Our fees are competitive and transparent..."

#### CTA
- **Title**: "Ready to Get Started?"
- **Description**: "Join hundreds of satisfied international investors who trust Modern Services with their UK property investments."
- **Buttons**: "Explore Our Services", "Learn About Us"

### 4.5 Testimonials Page Content

#### Hero
- **Title**: "Client Testimonials"
- **Description**: "Trusted by international investors worldwide"

#### Trust Stats
- **5-Star Average Rating**: 5 stars display
- **Client Satisfaction**: "98%"
- **Happy Clients**: "56+"
- **Years of Trust**: "10+"

#### What Our Clients Say
- **Title**: "What Our Clients Say"
- **Description**: "Real feedback from real investors who trust us with their property investments in England."
- **Testimonials**: Mix of static testimonials (8) and approved user-submitted testimonials

#### Submit Testimonial
- **Title**: "Share Your Experience"
- **Description**: "We'd love to hear about your experience with Modern Services. Your feedback helps us improve and helps other investors make informed decisions."
- **Fields**:
  - Your Name * (placeholder: "John")
  - Location * (placeholder: "Dubai, UAE")
  - Your Testimonial * (placeholder: "Share your experience with Modern Services...")
- **Submit Button**: "Submit Testimonial" (with Send icon)
- **Success Message**: "Thank you for your feedback! Your testimonial is pending approval and will be reviewed shortly."

#### Featured Testimonial
- **Content**: "Modern Services doesn't just manage properties—they build partnerships..."
- **Author**: "Ahmed"
- **Role**: "Portfolio Holder, Dubai, UAE"
- **Client Since**: "Client since 2019"

#### Countries Served
- **Title**: "Serving Investors Globally"
- **Description**: "We proudly serve property investors from around the world who trust us with their UK investments."
- **Countries**: UAE, USA, Saudi, Spain, France, Germany, Australia, Japan, India, Qatar, Mexico, Ireland

#### CTA
- **Title**: "Join Our Family of Satisfied Investors"
- **Description**: "Experience the Modern Services difference. Get a free consultation today."
- **Buttons**: "Schedule Consultation", "View Our Services"

### 4.6 Blog Page Content

#### Hero
- **Title**: "Property & Finance News"
- **Description**: "Stay informed with the latest insights on property management, tax regulations, and financial services affecting UK property investors."

#### Blog Posts
- **Categories**: All, Tax, Property, Employment, Leisure & Hospitality, Financial Services, Energy, Other
- **Post Structure**:
  - Category badge
  - Date with calendar icon
  - Title
  - Content (expandable)
  - "Read More"/"Show Less" button

#### Sidebar
- **Categories Section**: Filter buttons
- **Need Help Section**:
  - **Title**: "Need Help?"
  - **Description**: "Our experts can help you navigate property management and tax regulations."
  - **Button**: "Contact Us"

#### CTA
- **Title**: "Ready to Optimize Your Property Investment?"
- **Description**: "Get expert advice on property management, tax planning, and financial services tailored for UK property investors."
- **Buttons**: "Schedule Consultation", "View Our Services"

### 4.7 Footer Content
- **Company Description**: "Your trusted partner for property management in England. Serving international investors with excellence for over 10+ years."
- **Quick Links**: Home, About Us, Services, Testimonials, Contact
- **Services**: Property Management, Tenant Services, Financial Management, Maintenance & Repairs, Tax & Legal Compliance
- **Contact**: Phone (+44 20 8058 7635), Email (info@modernservices.org.uk), Company Registration (OC407556)
- **Copyright**: "© {currentYear} Modern Services. All rights reserved."
- **Links**: Privacy Policy, Terms of Service, Admin

---

## 5. STYLING & DESIGN

### 5.1 Color Palette

#### Primary Colors
- **Dark Blue (Primary)**: `#0A1A2F` - Headers, text, backgrounds
- **Gold (Accent)**: `#C8A75B` - Buttons, icons, highlights
- **Gold Hover**: `#B8964A` or `#B39650` - Button hover states

#### Secondary Colors
- **Light Gray**: `#F4F5F7` - Section backgrounds, card backgrounds
- **White**: `#FFFFFF` - Card backgrounds, text on dark backgrounds
- **Gray-300**: `#gray-300` - Footer text, secondary text
- **Gray-500**: `#gray-500` - Muted text
- **Gray-600**: `#gray-600` - Body text, descriptions
- **Gray-700**: `#gray-700` - Darker text

#### Status Colors
- **Green**: `#green-50`, `#green-200`, `#green-600`, `#green-800`, `#green-900` - Success messages
- **Red**: `#red-50`, `#red-200`, `#red-800` - Error messages
- **WhatsApp Green**: `#25D366` - WhatsApp CTA section

#### Text Colors
- **Primary Text**: `text-[#0A1A2F]` (dark blue)
- **Secondary Text**: `text-gray-600` or `text-gray-700`
- **Muted Text**: `text-gray-500` or `text-gray-400`
- **White Text**: `text-white` (on dark backgrounds)
- **Gold Text**: `text-[#C8A75B]` (links, highlights)

### 5.2 Typography

#### Headings
- **H1**: `text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl` (hero titles)
- **H1 (Page)**: `text-white mb-4` (page hero titles)
- **H2**: `text-2xl sm:text-3xl md:text-4xl` (section titles)
- **H3**: `text-xl` or `text-2xl` (card titles, subsection titles)
- **H4**: `text-lg` or `text-xl` (smaller headings)
- **Font Weight**: `font-bold` or `font-semibold`

#### Body Text
- **Base**: `text-sm sm:text-base` or `text-base`
- **Large**: `text-lg` or `text-xl`
- **Small**: `text-sm`
- **Extra Small**: `text-xs`
- **Line Height**: `leading-relaxed` or default

#### Font Families
- Default system fonts (no custom font family specified)

### 5.3 Section Backgrounds

#### Solid Colors
- **White**: `bg-white`
- **Dark Blue**: `bg-[#0A1A2F]`
- **Gold**: `bg-[#C8A75B]`
- **Light Gray**: `bg-[#F4F5F7]`

#### Gradients
- **Hero Overlay**: `bg-gradient-to-r from-[#0A1A2F]/90 to-[#0A1A2F]/70`
- **Semi-transparent**: `bg-white/5`, `bg-white/10`

#### Images
- **Hero Sections**: Background images with gradient overlays
- **About Section**: Right-side image in 2-column layout
- **Map**: Embedded Google Maps iframe

### 5.4 Border Radius
- **Cards**: `rounded-lg` (0.5rem / 8px)
- **Buttons**: `rounded-sm` (0.125rem / 2px) or default
- **Badges**: `rounded-full` (pill shape)
- **Images**: `rounded-lg` or default

### 5.5 Shadows
- **Cards**: `shadow-md` (default), `shadow-lg` (hover)
- **Blog Cards**: `shadow-md`, `hover:shadow-xl`
- **Map Container**: `shadow-lg`
- **Form Container**: `shadow-lg`

### 5.6 Spacing Patterns
- **Section Padding**: `py-12 sm:py-16 md:py-20` or `py-20`
- **Container Padding**: `px-4 sm:px-6 lg:px-8`
- **Card Padding**: `p-6` or `p-8`
- **Gap Between Elements**: `gap-6`, `gap-8`, `gap-12`
- **Margin Bottom**: `mb-4`, `mb-6`, `mb-8`, `mb-12`

### 5.7 Border Styles
- **Input Borders**: `border border-gray-300`
- **Focus Borders**: `focus:border-[#C8A75B]`
- **Card Dividers**: `border-t border-gray-200`
- **Footer Divider**: `border-t border-gray-700`

---

## 6. FUNCTIONAL BEHAVIOR (FRONTEND ONLY)

### 6.1 Form Submissions

#### Contact Form
- **On Submit**: 
  - Validates required fields (name, email, message)
  - Shows loading state ("Sending...")
  - On success: Shows green success message, clears form, message disappears after 5 seconds
  - On error: Shows red error message with error details
- **No Page Reload**: Form submission is handled via JavaScript/API call
- **Success Message**: "Thank You! Your message has been sent successfully to info@modernservices.org.uk. We'll be in touch soon."

#### Testimonial Form
- **On Submit**:
  - Validates all fields (name, location, message)
  - Shows loading state ("Submitting...")
  - On success: Shows green success message with checkmark, clears form, message disappears after 5 seconds
  - On error: Shows alert with error message
- **Success Message**: "Thank you for your feedback! Your testimonial is pending approval and will be reviewed shortly."

### 6.2 Blog Behavior

#### Blog Listing
- **Category Filtering**: Clicking category filters posts, closes all expanded posts
- **Post Expansion**: Clicking "Read More" expands post content inline
- **Post Collapse**: Clicking "Show Less" collapses post content
- **No Pagination**: All posts displayed on single page
- **Empty State**: Shows "No posts found in this category." if no posts match filter

#### Blog Post Display
- **Default State**: Shows truncated content (4 lines with `line-clamp-4`)
- **Expanded State**: Shows full content
- **Toggle Button**: "Read More" with ChevronDown icon / "Show Less" with ChevronUp icon

### 6.3 Testimonials Display

#### Home Page Testimonial Slider
- **Auto-rotation**: Changes testimonial every 5 seconds
- **Manual Navigation**: Clicking dot indicators jumps to specific testimonial
- **Infinite Loop**: Loops back to first testimonial after last
- **Dot Indicators**: Active dot is wider (`w-8`) and gold, inactive dots are smaller (`w-3`) and gray

#### Testimonials Page
- **Grid Display**: Shows all testimonials in 3-column grid
- **Loading State**: Shows "Loading testimonials..." while fetching
- **Empty State**: Shows "No testimonials available yet." if no testimonials
- **Mix of Sources**: Displays both static testimonials and approved user-submitted testimonials

### 6.4 Services Page Expandable Sections
- **Toggle Behavior**: Clicking section header expands/collapses content
- **Single Expand**: Only one section can be expanded at a time (or all can be collapsed)
- **Visual Feedback**: Chevron icon rotates (ChevronDown ↔ ChevronUp)
- **Smooth Transition**: Content area slides down/up

### 6.5 Navigation Behavior
- **Page Navigation**: Clicking nav links or buttons navigates to different pages
- **Active State**: Current page link is highlighted with gold color and underline
- **Mobile Menu**: Toggles open/closed with hamburger icon
- **Logo Click**: Navigates to home page
- **Footer Links**: Navigate to respective pages

### 6.6 Scroll Behavior
- **Sticky Header**: Header remains fixed at top while scrolling
- **Sticky Sidebar**: Blog sidebar sticks to top when scrolling (on desktop)
- **Smooth Scrolling**: Default browser smooth scroll behavior

### 6.7 Image Loading
- **Fallback Images**: Uses `ImageWithFallback` component for error handling
- **Lazy Loading**: Google Maps iframe uses `loading="lazy"`
- **Object Fit**: Images use `object-cover` to maintain aspect ratio

### 6.8 Responsive Behavior
- **Mobile Menu**: Hamburger menu replaces desktop navigation
- **Grid Collapse**: Multi-column grids stack to single column on mobile
- **Text Scaling**: Font sizes scale down on smaller screens
- **Button Layout**: Buttons stack vertically on mobile, horizontal on desktop
- **Spacing Adjustments**: Padding and gaps reduce on smaller screens

### 6.9 Hover States
- **Cards**: Shadow increases on hover
- **Buttons**: Background color changes on hover
- **Links**: Text color changes to gold on hover
- **Logo**: Slight scale increase on hover (`group-hover:scale-105`)

### 6.10 Animation Behavior
- **FadeIn Component**: 
  - Triggers when element enters viewport (10% visible)
  - Fades in from `opacity-0` to `opacity-100`
  - Slides up from `translate-y-6` to `translate-y-0`
  - Duration: 700ms
  - Configurable delay per element
- **Transitions**: All hover effects use smooth transitions (`transition-colors`, `transition-shadow`, `transition-all`)

---

## 7. ADDITIONAL NOTES

### 7.1 External Links
- **Pluto Consultancy**: Opens in new tab (`target="_blank"`, `rel="noopener noreferrer"`)
- **WhatsApp**: Opens WhatsApp chat (`https://wa.me/447808646056`)
- **Google Maps**: Opens Google Maps in new tab

### 7.2 Accessibility
- **ARIA Labels**: Used on navigation buttons and menu toggle
- **Alt Text**: All images have alt text
- **Semantic HTML**: Uses proper heading hierarchy, semantic elements
- **Focus States**: Form inputs have visible focus borders

### 7.3 Performance Considerations
- **Lazy Loading**: Images and iframes use lazy loading
- **Intersection Observer**: Used for fade-in animations (efficient)
- **Conditional Rendering**: Components only render when needed

### 7.4 Browser Compatibility
- Uses modern CSS features (CSS Grid, Flexbox)
- Tailwind CSS classes (responsive design)
- Modern JavaScript (no polyfills visible)

---

## END OF DOCUMENTATION

This documentation covers all user-facing aspects of the Modern Services website. Use this as a reference when recreating the site from scratch, focusing only on the public-facing frontend without any admin panel or backend dependencies.

