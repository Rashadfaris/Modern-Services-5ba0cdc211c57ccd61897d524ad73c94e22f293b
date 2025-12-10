/**
 * API Service for Testimonials and Blogs
 * 
 * This file replaces the Firebase Firestore functionality with REST API calls
 * to the Express backend server.
 */

// API base URL - adjust this to match your backend server
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export interface Testimonial {
  id?: string;
  name: string;
  email?: string;
  location?: string;
  message: string;
  approved: boolean;
  createdAt: Date | string;
  role?: string;
  rating?: number;
}

/**
 * Helper function to handle API responses
 */
async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'An error occurred' }));
    throw new Error(error.message || `HTTP error! status: ${response.status}`);
  }
  const data = await response.json();
  return data.data || data;
}

/**
 * Submit a new testimonial
 * Creates a new testimonial with approved: false
 * 
 * @param name - User's name
 * @param location - User's location (e.g., "Dubai, UAE")
 * @param message - Testimonial message
 * @param email - User's email (optional, can use location as fallback)
 * @returns The created testimonial ID
 */
export async function submitTestimonial(
  name: string,
  location: string,
  message: string,
  email?: string
): Promise<string> {
  try {
    const response = await fetch(`${API_BASE_URL}/testimonials`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        email: email, // Backend will generate fallback if not provided
        location,
        message,
      }),
    });

    const result = await handleResponse<Testimonial>(response);
    return result.id || '';
  } catch (error) {
    console.error('Error submitting testimonial:', error);
    throw error;
  }
}

/**
 * Fetch approved testimonials
 * Returns only testimonials that have been approved
 * Used by the public testimonials page
 * 
 * @returns Array of approved testimonials
 */
export async function getApprovedTestimonials(): Promise<Testimonial[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/testimonials/approved`);
    const testimonials = await handleResponse<Testimonial[]>(response);
    
    // Transform the data to match the expected format
    return testimonials.map((t: any) => ({
      id: t.id,
      name: t.name,
      email: t.email,
      location: t.location,
      message: t.message,
      approved: t.approved,
      createdAt: t.createdAt ? new Date(t.createdAt) : new Date(),
      role: t.role,
      rating: t.rating,
    }));
  } catch (error) {
    console.error('Error fetching approved testimonials:', error);
    throw error;
  }
}

/**
 * Fetch unapproved testimonials (admin only)
 * Returns testimonials that are pending approval
 * Used by the admin dashboard
 * 
 * @returns Array of unapproved testimonials
 */
export async function getUnapprovedTestimonials(): Promise<Testimonial[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/testimonials/unapproved`);
    const testimonials = await handleResponse<Testimonial[]>(response);
    
    // Transform the data to match the expected format
    return testimonials.map((t: any) => ({
      id: t.id,
      name: t.name,
      email: t.email,
      location: t.location,
      message: t.message,
      approved: t.approved,
      createdAt: t.createdAt ? new Date(t.createdAt) : new Date(),
      role: t.role,
      rating: t.rating,
    }));
  } catch (error) {
    console.error('Error fetching unapproved testimonials:', error);
    throw error;
  }
}

/**
 * Subscribe to unapproved testimonials in real-time (admin only)
 * 
 * Note: This is a polling-based implementation since we're using REST API.
 * For true real-time updates, consider using WebSockets or Server-Sent Events.
 * 
 * @param callback - Function to call when testimonials update
 * @returns Unsubscribe function to stop polling
 */
export function subscribeToUnapprovedTestimonials(
  callback: (testimonials: Testimonial[]) => void
): () => void {
  let isActive = true;
  let intervalId: number | null = null;

  const fetchTestimonials = async () => {
    if (!isActive) return;
    
    try {
      const testimonials = await getUnapprovedTestimonials();
      callback(testimonials);
    } catch (error) {
      console.error('Error in testimonial subscription:', error);
      callback([]);
    }
  };

  // Initial fetch
  fetchTestimonials();

  // Poll every 5 seconds for updates
  intervalId = setInterval(fetchTestimonials, 5000);

  // Return unsubscribe function
  return () => {
    isActive = false;
    if (intervalId) {
      clearInterval(intervalId);
    }
  };
}

/**
 * Approve a testimonial (admin only)
 * Sets the approved field to true
 * 
 * @param testimonialId - ID of the testimonial to approve
 */
export async function approveTestimonial(testimonialId: string): Promise<void> {
  try {
    const response = await fetch(`${API_BASE_URL}/testimonials/${testimonialId}/approve`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    await handleResponse(response);
  } catch (error) {
    console.error('Error approving testimonial:', error);
    throw error;
  }
}

/**
 * Decline/Delete a testimonial (admin only)
 * Removes the testimonial from the database
 * 
 * @param testimonialId - ID of the testimonial to decline
 */
export async function declineTestimonial(testimonialId: string): Promise<void> {
  try {
    const response = await fetch(`${API_BASE_URL}/testimonials/${testimonialId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    await handleResponse(response);
  } catch (error) {
    console.error('Error declining testimonial:', error);
    throw error;
  }
}

/**
 * Send contact form message
 * Sends an email to info@modernservices.org.uk with the contact form submission
 * 
 * @param name - Sender's name
 * @param email - Sender's email
 * @param phone - Sender's phone (optional)
 * @param message - Message content
 * @returns Success message
 */
export async function sendContactMessage(
  name: string,
  email: string,
  phone: string,
  message: string
): Promise<string> {
  try {
    const response = await fetch(`${API_BASE_URL}/contact`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        email,
        phone,
        message,
      }),
    });

    const result = await handleResponse<{ message: string }>(response);
    return result.message || 'Message sent successfully!';
  } catch (error) {
    console.error('Error sending contact message:', error);
    throw error;
  }
}

// ==================== BLOG API FUNCTIONS ====================

export interface Blog {
  id?: string;
  title: string;
  category: 'Tax' | 'Property' | 'Employment' | 'Leisure & Hospitality' | 'Financial Services' | 'Energy' | 'Other';
  content: string;
  source?: string;
  published: boolean;
  createdAt: Date | string;
  updatedAt?: Date | string;
}

/**
 * Get all blog posts (admin only)
 * Returns all blog posts regardless of published status
 */
export async function getAllBlogs(): Promise<Blog[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/blogs`);
    const blogs = await handleResponse<Blog[]>(response);
    
    return blogs.map((b: any) => ({
      id: b.id,
      title: b.title,
      category: b.category,
      content: b.content,
      source: b.source,
      published: b.published,
      createdAt: b.createdAt ? new Date(b.createdAt) : new Date(),
      updatedAt: b.updatedAt ? new Date(b.updatedAt) : undefined,
    }));
  } catch (error) {
    console.error('Error fetching blogs:', error);
    throw error;
  }
}

/**
 * Get published blog posts
 * Returns only published blog posts for public display
 */
export async function getPublishedBlogs(): Promise<Blog[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/blogs/published`);
    const blogs = await handleResponse<Blog[]>(response);
    
    return blogs.map((b: any) => ({
      id: b.id,
      title: b.title,
      category: b.category,
      content: b.content,
      source: b.source,
      published: b.published,
      createdAt: b.createdAt ? new Date(b.createdAt) : new Date(),
      updatedAt: b.updatedAt ? new Date(b.updatedAt) : undefined,
    }));
  } catch (error) {
    console.error('Error fetching published blogs:', error);
    throw error;
  }
}

/**
 * Create a new blog post (admin only)
 */
export async function createBlog(
  title: string,
  category: Blog['category'],
  content: string,
  source?: string
): Promise<Blog> {
  try {
    const response = await fetch(`${API_BASE_URL}/blogs`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title,
        category,
        content,
        source,
      }),
    });

    const result = await handleResponse<Blog>(response);
    return {
      ...result,
      createdAt: result.createdAt ? new Date(result.createdAt) : new Date(),
    };
  } catch (error) {
    console.error('Error creating blog:', error);
    throw error;
  }
}

/**
 * Update a blog post (admin only)
 */
export async function updateBlog(
  blogId: string,
  updates: Partial<Pick<Blog, 'title' | 'category' | 'content' | 'source' | 'published'>>
): Promise<Blog> {
  try {
    const response = await fetch(`${API_BASE_URL}/blogs/${blogId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updates),
    });

    const result = await handleResponse<Blog>(response);
    return {
      ...result,
      createdAt: result.createdAt ? new Date(result.createdAt) : new Date(),
      updatedAt: result.updatedAt ? new Date(result.updatedAt) : undefined,
    };
  } catch (error) {
    console.error('Error updating blog:', error);
    throw error;
  }
}

/**
 * Toggle publish status of a blog post (admin only)
 */
export async function togglePublishBlog(blogId: string): Promise<Blog> {
  try {
    const response = await fetch(`${API_BASE_URL}/blogs/${blogId}/publish`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const result = await handleResponse<Blog>(response);
    return {
      ...result,
      createdAt: result.createdAt ? new Date(result.createdAt) : new Date(),
    };
  } catch (error) {
    console.error('Error toggling blog publish status:', error);
    throw error;
  }
}

/**
 * Delete a blog post (admin only)
 */
export async function deleteBlog(blogId: string): Promise<void> {
  try {
    const response = await fetch(`${API_BASE_URL}/blogs/${blogId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    await handleResponse(response);
  } catch (error) {
    console.error('Error deleting blog:', error);
    throw error;
  }
}

// ==================== PAGE MANAGEMENT API FUNCTIONS ====================

export interface Page {
  id?: string;
  slug: 'home' | 'about' | 'services' | 'contact';
  title: string;
  content: any; // Flexible JSON object - structure varies by page
  meta?: {
    description?: string;
    keywords?: string;
  };
  createdAt: Date | string;
  updatedAt?: Date | string;
}

/**
 * Get all pages (admin only)
 * Returns all pages for management
 */
export async function getAllPages(): Promise<Page[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/pages`);
    const pages = await handleResponse<Page[]>(response);
    
    return pages.map((p: any) => ({
      id: p.id,
      slug: p.slug,
      title: p.title,
      content: p.content,
      meta: p.meta,
      createdAt: p.createdAt ? new Date(p.createdAt) : new Date(),
      updatedAt: p.updatedAt ? new Date(p.updatedAt) : undefined,
    }));
  } catch (error) {
    console.error('Error fetching pages:', error);
    throw error;
  }
}

/**
 * Get a single page by slug
 * Used by frontend pages to load content dynamically
 */
export async function getPageBySlug(slug: 'home' | 'about' | 'services' | 'contact'): Promise<Page> {
  try {
    const response = await fetch(`${API_BASE_URL}/pages/${slug}`);
    const page = await handleResponse<Page>(response);
    
    return {
      id: page.id,
      slug: page.slug,
      title: page.title,
      content: page.content,
      meta: page.meta,
      createdAt: page.createdAt ? new Date(page.createdAt) : new Date(),
      updatedAt: page.updatedAt ? new Date(page.updatedAt) : undefined,
    };
  } catch (error) {
    console.error('Error fetching page:', error);
    throw error;
  }
}

/**
 * Create a new page (admin only)
 */
export async function createPage(
  slug: 'home' | 'about' | 'services' | 'contact',
  title: string,
  content: any,
  meta?: { description?: string; keywords?: string }
): Promise<Page> {
  try {
    const response = await fetch(`${API_BASE_URL}/pages`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        slug,
        title,
        content,
        meta,
      }),
    });

    const result = await handleResponse<Page>(response);
    return {
      ...result,
      createdAt: result.createdAt ? new Date(result.createdAt) : new Date(),
    };
  } catch (error) {
    console.error('Error creating page:', error);
    throw error;
  }
}

/**
 * Update a page (admin only)
 */
export async function updatePage(
  slug: 'home' | 'about' | 'services' | 'contact',
  updates: {
    title?: string;
    content?: any;
    meta?: { description?: string; keywords?: string };
  }
): Promise<Page> {
  try {
    const response = await fetch(`${API_BASE_URL}/pages/${slug}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updates),
    });

    const result = await handleResponse<Page>(response);
    return {
      ...result,
      createdAt: result.createdAt ? new Date(result.createdAt) : new Date(),
      updatedAt: result.updatedAt ? new Date(result.updatedAt) : undefined,
    };
  } catch (error) {
    console.error('Error updating page:', error);
    throw error;
  }
}

/**
 * Delete a page (admin only)
 */
export async function deletePage(slug: 'home' | 'about' | 'services' | 'contact'): Promise<void> {
  try {
    const response = await fetch(`${API_BASE_URL}/pages/${slug}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    await handleResponse(response);
  } catch (error) {
    console.error('Error deleting page:', error);
    throw error;
  }
}

// ==================== SITE SETTINGS API FUNCTIONS ====================

export interface SiteSettings {
  id?: string;
  yearsOfExperience: string;
  happyClients: string;
  clientSatisfaction: string;
  propertiesManaged: string;
  companyFoundedYear: number;
  createdAt?: Date | string;
  updatedAt?: Date | string;
}

/**
 * Get site settings
 */
export async function getSiteSettings(): Promise<SiteSettings> {
  try {
    const response = await fetch(`${API_BASE_URL}/site-settings`);
    const settings = await handleResponse<SiteSettings>(response);
    
    return {
      ...settings,
      createdAt: settings.createdAt ? new Date(settings.createdAt) : undefined,
      updatedAt: settings.updatedAt ? new Date(settings.updatedAt) : undefined,
    };
  } catch (error) {
    console.error('Error fetching site settings:', error);
    throw error;
  }
}

/**
 * Update site settings (admin only)
 */
export async function updateSiteSettings(
  updates: Partial<Pick<SiteSettings, 'yearsOfExperience' | 'happyClients' | 'clientSatisfaction' | 'propertiesManaged' | 'companyFoundedYear'>>
): Promise<SiteSettings> {
  try {
    const response = await fetch(`${API_BASE_URL}/site-settings`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updates),
    });

    const result = await handleResponse<SiteSettings>(response);
    return {
      ...result,
      createdAt: result.createdAt ? new Date(result.createdAt) : undefined,
      updatedAt: result.updatedAt ? new Date(result.updatedAt) : undefined,
    };
  } catch (error) {
    console.error('Error updating site settings:', error);
    throw error;
  }
}