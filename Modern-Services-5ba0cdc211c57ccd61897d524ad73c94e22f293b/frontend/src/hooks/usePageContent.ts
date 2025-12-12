import { useState, useEffect } from 'react';
import { getPageBySlug, Page } from '../lib/api';

/**
 * Custom hook to load page content from API
 * Falls back to null if page doesn't exist or API fails
 */
export function usePageContent(slug: 'home' | 'about' | 'services' | 'contact' | 'testimonials') {
  const [pageContent, setPageContent] = useState<Page | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadContent = async () => {
      try {
        setLoading(true);
        setError(null);
        const page = await getPageBySlug(slug);
        setPageContent(page);
      } catch (err: any) {
        // Page doesn't exist or API error - use fallback content
        console.log(`Page "${slug}" not found in database, using default content`);
        setPageContent(null);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadContent();
  }, [slug]);

  return { pageContent, loading, error };
}


