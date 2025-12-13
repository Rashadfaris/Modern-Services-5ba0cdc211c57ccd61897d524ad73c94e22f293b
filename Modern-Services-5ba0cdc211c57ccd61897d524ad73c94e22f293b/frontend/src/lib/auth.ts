/**
 * Simple Session-Based Authentication
 * 
 * Replaces Firebase Auth with localStorage-based session management.
 * Admin credentials are hardcoded for simplicity.
 */

// Admin credentials
export const ADMIN_EMAIL = 'admin@modernservices.com';
export const ADMIN_PASSWORD = 'M$ad25!^';

// Session storage keys
const SESSION_KEY = 'admin_session';
const SESSION_EXPIRY_KEY = 'admin_session_expiry';
const SESSION_DURATION = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

// Simple user interface (compatible with existing code)
export interface User {
  email: string;
  uid?: string;
}

/**
 * Login as admin
 * Validates credentials and creates a session in localStorage
 */
export async function loginAdmin(email: string, password: string): Promise<User> {
  try {
    // Validate credentials
    if (email !== ADMIN_EMAIL || password !== ADMIN_PASSWORD) {
      throw new Error('Invalid email or password. Please check your credentials.');
    }
    
    // Create session
    const user: User = {
      email: ADMIN_EMAIL,
      uid: 'admin'
    };
    
    // Store session in localStorage
    const expiryTime = Date.now() + SESSION_DURATION;
    localStorage.setItem(SESSION_KEY, JSON.stringify(user));
    localStorage.setItem(SESSION_EXPIRY_KEY, expiryTime.toString());
    
    return user;
  } catch (error: any) {
    console.error('Login error:', error);
    throw new Error(error.message || 'Failed to login. Please try again.');
  }
}

/**
 * Logout admin
 * Removes session from localStorage
 */
export async function logoutAdmin(): Promise<void> {
  try {
    localStorage.removeItem(SESSION_KEY);
    localStorage.removeItem(SESSION_EXPIRY_KEY);
  } catch (error) {
    console.error('Logout error:', error);
    throw error;
  }
}

/**
 * Get current user from session
 * Returns null if no valid session exists
 */
export function getCurrentUser(): User | null {
  try {
    const sessionData = localStorage.getItem(SESSION_KEY);
    const expiryTime = localStorage.getItem(SESSION_EXPIRY_KEY);
    
    if (!sessionData || !expiryTime) {
      return null;
    }
    
    // Check if session has expired
    if (Date.now() > parseInt(expiryTime, 10)) {
      // Session expired, clear it
      localStorage.removeItem(SESSION_KEY);
      localStorage.removeItem(SESSION_EXPIRY_KEY);
      return null;
    }
    
    return JSON.parse(sessionData) as User;
  } catch (error) {
    console.error('Error getting current user:', error);
    return null;
  }
}

/**
 * Subscribe to auth state changes
 * Uses polling to check for session changes (compatible with existing code)
 * 
 * @param callback - Function to call when auth state changes
 * @returns Unsubscribe function
 */
export function onAuthChange(callback: (user: User | null) => void): () => void {
  // Initial check
  const user = getCurrentUser();
  callback(user);
  
  // Poll for changes every second
  const intervalId = setInterval(() => {
    const currentUser = getCurrentUser();
    callback(currentUser);
  }, 1000);
  
  // Return unsubscribe function
  return () => {
    clearInterval(intervalId);
  };
}

/**
 * Check if user is admin
 */
export function isAdmin(user: User | null): boolean {
  return user?.email === ADMIN_EMAIL;
}

