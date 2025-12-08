import { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ServicesPage } from './pages/ServicesPage';
import { TestimonialsPage } from './pages/TestimonialsPage';
import { ContactPage } from './pages/ContactPage';
import { BlogPage } from './pages/BlogPage';
import { AdminDashboard } from './pages/AdminDashboard';
import { AdminLogin } from './components/AdminLogin';
import { onAuthChange, isAdmin, getCurrentUser } from './lib/auth';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);

  // Check authentication state
  useEffect(() => {
    // Initial check
    const user = getCurrentUser();
    setIsAuthenticated(user !== null && isAdmin(user));
    setCheckingAuth(false);
    
    // Subscribe to auth changes
    const unsubscribe = onAuthChange((user) => {
      setIsAuthenticated(user !== null && isAdmin(user));
    });

    return () => unsubscribe();
  }, []);

  // Scroll to top when page changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  const handleNavigate = (page: string) => {
    setCurrentPage(page);
  };

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
    setCurrentPage('admin');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentPage('home');
  };

  const renderPage = () => {
    // Show admin login if trying to access admin without auth
    if (currentPage === 'admin' && !isAuthenticated) {
      return <AdminLogin onLoginSuccess={handleLoginSuccess} />;
    }

    // Show admin dashboard if authenticated
    if (currentPage === 'admin' && isAuthenticated) {
      return <AdminDashboard onLogout={handleLogout} />;
    }

    // Regular pages
    switch (currentPage) {
      case 'home':
        return <HomePage onNavigate={handleNavigate} />;
      case 'about':
      case 'aboutus':
        return <AboutPage onNavigate={handleNavigate} />;
      case 'services':
        return <ServicesPage onNavigate={handleNavigate} />;
      case 'testimonials':
        return <TestimonialsPage onNavigate={handleNavigate} />;
      case 'blog':
        return <BlogPage onNavigate={handleNavigate} />;
      case 'contact':
        return <ContactPage onNavigate={handleNavigate} />;
      default:
        return <HomePage onNavigate={handleNavigate} />;
    }
  };

  // Don't show header/footer for admin pages
  const showLayout = currentPage !== 'admin' || !isAuthenticated;

  if (checkingAuth && currentPage === 'admin') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#C8A75B]"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      {showLayout && <Header currentPage={currentPage} onNavigate={handleNavigate} />}
      <main className="flex-grow">
        {renderPage()}
      </main>
      {showLayout && <Footer onNavigate={handleNavigate} />}
    </div>
  );
}

