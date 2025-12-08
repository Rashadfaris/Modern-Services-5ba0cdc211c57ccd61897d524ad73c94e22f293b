import { 
  collection, 
  addDoc, 
  query, 
  where, 
  getDocs, 
  doc, 
  updateDoc,
  deleteDoc,
  Timestamp,
  orderBy,
  onSnapshot
} from 'firebase/firestore';
import { db } from '../firebase/config';

export interface Testimonial {
  id?: string;
  name: string;
  location: string;
  message: string;
  approved: boolean;
  createdAt: Timestamp;
  role?: string;
  rating?: number;
}

// Submit a new testimonial
export async function submitTestimonial(
  name: string,
  location: string,
  message: string
): Promise<string> {
  try {
    const testimonialData = {
      name,
      location,
      message,
      approved: false,
      createdAt: Timestamp.now()
    };

    const docRef = await addDoc(collection(db, 'testimonials'), testimonialData);
    return docRef.id;
  } catch (error) {
    console.error('Error submitting testimonial:', error);
    throw error;
  }
}

// Fetch approved testimonials
export async function getApprovedTestimonials(): Promise<Testimonial[]> {
  try {
    const q = query(
      collection(db, 'testimonials'),
      where('approved', '==', true),
      orderBy('createdAt', 'desc')
    );

    const querySnapshot = await getDocs(q);
    const testimonials: Testimonial[] = [];

    querySnapshot.forEach((doc) => {
      testimonials.push({
        id: doc.id,
        ...doc.data()
      } as Testimonial);
    });

    return testimonials;
  } catch (error) {
    console.error('Error fetching testimonials:', error);
    throw error;
  }
}

// Fetch unapproved testimonials (admin only)
export async function getUnapprovedTestimonials(): Promise<Testimonial[]> {
  try {
    // First try with orderBy (requires index)
    try {
      const q = query(
        collection(db, 'testimonials'),
        where('approved', '==', false),
        orderBy('createdAt', 'desc')
      );

      const querySnapshot = await getDocs(q);
      const testimonials: Testimonial[] = [];

      querySnapshot.forEach((doc) => {
        testimonials.push({
          id: doc.id,
          ...doc.data()
        } as Testimonial);
      });

      // Sort in memory as fallback
      testimonials.sort((a, b) => {
        const aTime = a.createdAt?.toDate?.()?.getTime() || 0;
        const bTime = b.createdAt?.toDate?.()?.getTime() || 0;
        return bTime - aTime;
      });

      return testimonials;
    } catch (indexError: any) {
      // If index error, try without orderBy
      if (indexError.code === 'failed-precondition') {
        console.warn('Index missing, fetching without orderBy:', indexError);
        const q = query(
          collection(db, 'testimonials'),
          where('approved', '==', false)
        );

        const querySnapshot = await getDocs(q);
        const testimonials: Testimonial[] = [];

        querySnapshot.forEach((doc) => {
          testimonials.push({
            id: doc.id,
            ...doc.data()
          } as Testimonial);
        });

        // Sort in memory
        testimonials.sort((a, b) => {
          const aTime = a.createdAt?.toDate?.()?.getTime() || 0;
          const bTime = b.createdAt?.toDate?.()?.getTime() || 0;
          return bTime - aTime;
        });

        return testimonials;
      }
      throw indexError;
    }
  } catch (error) {
    console.error('Error fetching unapproved testimonials:', error);
    throw error;
  }
}

// Subscribe to unapproved testimonials in real-time (admin only)
export function subscribeToUnapprovedTestimonials(
  callback: (testimonials: Testimonial[]) => void
): () => void {
  let unsubscribe: (() => void) | null = null;

  try {
    // Try with orderBy first (requires index)
    const q = query(
      collection(db, 'testimonials'),
      where('approved', '==', false),
      orderBy('createdAt', 'desc')
    );

    unsubscribe = onSnapshot(
      q,
      (querySnapshot) => {
        const testimonials: Testimonial[] = [];
        querySnapshot.forEach((doc) => {
          testimonials.push({
            id: doc.id,
            ...doc.data()
          } as Testimonial);
        });

        // Sort in memory as fallback (already sorted by query, but just in case)
        testimonials.sort((a, b) => {
          const aTime = a.createdAt?.toDate?.()?.getTime() || 0;
          const bTime = b.createdAt?.toDate?.()?.getTime() || 0;
          return bTime - aTime;
        });

        callback(testimonials);
      },
      (error: any) => {
        // If index error, use fallback query without orderBy
        if (error.code === 'failed-precondition') {
          console.warn('Index missing, using fallback query (no orderBy):', error);
          const fallbackQ = query(
            collection(db, 'testimonials'),
            where('approved', '==', false)
          );

          // Unsubscribe from the first query and set up fallback
          if (unsubscribe) {
            unsubscribe();
          }

          unsubscribe = onSnapshot(
            fallbackQ,
            (querySnapshot) => {
              const testimonials: Testimonial[] = [];
              querySnapshot.forEach((doc) => {
                testimonials.push({
                  id: doc.id,
                  ...doc.data()
                } as Testimonial);
              });

              // Sort in memory
              testimonials.sort((a, b) => {
                const aTime = a.createdAt?.toDate?.()?.getTime() || 0;
                const bTime = b.createdAt?.toDate?.()?.getTime() || 0;
                return bTime - aTime;
              });

              callback(testimonials);
            },
            (fallbackError: any) => {
              console.error('Error in fallback query:', fallbackError);
              callback([]);
            }
          );
        } else {
          console.error('Error subscribing to testimonials:', error);
          callback([]);
        }
      }
    );

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  } catch (error) {
    console.error('Error setting up subscription:', error);
    // Return a no-op unsubscribe function
    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }
}

// Approve a testimonial (admin only)
export async function approveTestimonial(testimonialId: string): Promise<void> {
  try {
    const testimonialRef = doc(db, 'testimonials', testimonialId);
    await updateDoc(testimonialRef, {
      approved: true
    });
  } catch (error) {
    console.error('Error approving testimonial:', error);
    throw error;
  }
}

// Decline/Delete a testimonial (admin only)
export async function declineTestimonial(testimonialId: string): Promise<void> {
  try {
    const testimonialRef = doc(db, 'testimonials', testimonialId);
    await deleteDoc(testimonialRef);
  } catch (error) {
    console.error('Error declining testimonial:', error);
    throw error;
  }
}

