import { 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  User 
} from 'firebase/auth';
import { auth } from '../firebase/config';

// Admin credentials
export const ADMIN_EMAIL = 'admin@modernservices.com';
export const ADMIN_PASSWORD = 'Admin123!';

// Login as admin
export async function loginAdmin(email: string, password: string): Promise<User> {
  try {
    if (email !== ADMIN_EMAIL || password !== ADMIN_PASSWORD) {
      throw new Error('Invalid credentials');
    }
    
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error: any) {
    console.error('Login error:', error);
    
    // Provide helpful error messages
    if (error.code === 'auth/configuration-not-found') {
      throw new Error(
        'Firebase Authentication is not enabled. Please enable it in Firebase Console: ' +
        'https://console.firebase.google.com/project/modern-services-4675/authentication'
      );
    }
    
    if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
      throw new Error('Invalid email or password. Please check your credentials.');
    }
    
    if (error.code === 'auth/invalid-email') {
      throw new Error('Invalid email address format.');
    }
    
    throw new Error(error.message || 'Failed to login. Please try again.');
  }
}

// Logout
export async function logoutAdmin(): Promise<void> {
  try {
    await signOut(auth);
  } catch (error) {
    console.error('Logout error:', error);
    throw error;
  }
}

// Get current user
export function getCurrentUser(): User | null {
  return auth.currentUser;
}

// Subscribe to auth state changes
export function onAuthChange(callback: (user: User | null) => void): () => void {
  return onAuthStateChanged(auth, callback);
}

// Check if user is admin
export function isAdmin(user: User | null): boolean {
  return user?.email === ADMIN_EMAIL;
}

