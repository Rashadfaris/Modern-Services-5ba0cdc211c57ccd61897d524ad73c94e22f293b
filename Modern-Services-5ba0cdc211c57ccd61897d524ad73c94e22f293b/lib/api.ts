/**
 * API Service for Testimonials
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
  let intervalId: NodeJS.Timeout | null = null;

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

