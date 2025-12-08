import { useState, useEffect } from 'react';
import { Button } from '../components/ui/button';
import { logoutAdmin, getCurrentUser, isAdmin } from '../lib/auth';
import { 
  getUnapprovedTestimonials,
  subscribeToUnapprovedTestimonials,
  approveTestimonial, 
  declineTestimonial,
  Testimonial 
} from '../lib/api';
import { LogOut, CheckCircle, XCircle, Clock, User, MapPin, MessageSquare, FileText, BookOpen } from 'lucide-react';
import { FadeIn } from '../components/FadeIn';
import { BlogManagement } from '../components/BlogManagement';

interface AdminDashboardProps {
  onLogout: () => void;
}

type TabType = 'testimonials' | 'blogs';

export function AdminDashboard({ onLogout }: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState<TabType>('testimonials');
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Check if user is admin
    const user = getCurrentUser();
    if (!user || !isAdmin(user)) {
      onLogout();
      return;
    }

    // Initial load
    loadTestimonials();
    
    // Set up real-time listener (updates instantly when testimonials change)
    const unsubscribe = subscribeToUnapprovedTestimonials((testimonials) => {
      console.log('🔄 Real-time update:', testimonials.length, 'testimonials');
      setTestimonials(testimonials);
      setLoading(false);
      setError(null);
    });
    
    // Cleanup on unmount
    return () => {
      unsubscribe();
    };
  }, []);

  const loadTestimonials = async () => {
    try {
      setLoading(true);
      setError(null);
      const unapproved = await getUnapprovedTestimonials();
      setTestimonials(unapproved);
      console.log('✅ Loaded testimonials:', unapproved.length);
    } catch (error: any) {
      console.error('❌ Error loading testimonials:', error);
      setError(error.message || 'Failed to load testimonials');
      
      // Show error message
      if (error.message) {
        setError(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (testimonialId: string) => {
    try {
      setProcessing(testimonialId);
      await approveTestimonial(testimonialId);
      await loadTestimonials(); // Refresh list
    } catch (error) {
      console.error('Error approving testimonial:', error);
      alert('Failed to approve testimonial. Please try again.');
    } finally {
      setProcessing(null);
    }
  };

  const handleDecline = async (testimonialId: string) => {
    if (!confirm('Are you sure you want to decline this testimonial? This action cannot be undone.')) {
      return;
    }

    try {
      setProcessing(testimonialId);
      await declineTestimonial(testimonialId);
      await loadTestimonials(); // Refresh list
    } catch (error) {
      console.error('Error declining testimonial:', error);
      alert('Failed to decline testimonial. Please try again.');
    } finally {
      setProcessing(null);
    }
  };

  const handleLogout = async () => {
    try {
      await logoutAdmin();
      onLogout();
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const formatDate = (timestamp: any) => {
    if (!timestamp) return 'N/A';
    // Handle both Firebase Timestamp and regular Date objects
    const date = timestamp instanceof Date 
      ? timestamp 
      : timestamp.toDate 
        ? timestamp.toDate() 
        : new Date(timestamp);
    return date.toLocaleDateString('en-GB', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="min-h-screen bg-[#F4F5F7]">
      {/* Header */}
      <div className="bg-[#0A1A2F] text-white py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold">Admin Dashboard</h1>
              <p className="text-gray-300 text-sm mt-1">Manage Content</p>
            </div>
            <Button
              onClick={handleLogout}
              variant="outline"
              className="bg-white/10 border-white text-white hover:bg-white hover:text-[#0A1A2F]"
            >
              <LogOut size={18} className="mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-1">
            <button
              onClick={() => setActiveTab('testimonials')}
              className={`px-6 py-4 font-medium text-sm border-b-2 transition-colors ${
                activeTab === 'testimonials'
                  ? 'border-[#C8A75B] text-[#C8A75B]'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center gap-2">
                <MessageSquare size={18} />
                <span>Testimonials</span>
              </div>
            </button>
            <button
              onClick={() => setActiveTab('blogs')}
              className={`px-6 py-4 font-medium text-sm border-b-2 transition-colors ${
                activeTab === 'blogs'
                  ? 'border-[#C8A75B] text-[#C8A75B]'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center gap-2">
                <BookOpen size={18} />
                <span>Blog Posts</span>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      {activeTab === 'blogs' ? (
        <BlogManagement onLogout={handleLogout} />
      ) : (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <FadeIn>
          <div className="mb-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-[#0A1A2F] mb-2">
                    Pending Testimonials
                  </h2>
                  <p className="text-gray-600 text-sm">
                    {testimonials.length} testimonial{testimonials.length !== 1 ? 's' : ''} awaiting approval
                  </p>
                  {error && (
                    <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded text-red-800 text-sm">
                      <strong>Error:</strong> {error}
                      <br />
                      <span className="text-xs mt-1 block">
                        Check browser console (F12) for details. Ensure backend server is running.
                      </span>
                    </div>
                  )}
                </div>
                <Button
                  onClick={loadTestimonials}
                  variant="outline"
                  disabled={loading}
                >
                  {loading ? 'Loading...' : 'Refresh'}
                </Button>
              </div>
            </div>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#C8A75B]"></div>
              <p className="mt-4 text-gray-600">Loading testimonials...</p>
            </div>
          ) : testimonials.length === 0 ? (
            <div className="bg-white p-12 rounded-lg shadow-md text-center">
              <CheckCircle size={48} className="mx-auto text-green-500 mb-4" />
              <h3 className="text-xl font-semibold text-[#0A1A2F] mb-2">All Caught Up!</h3>
              <p className="text-gray-600 mb-4">There are no pending testimonials to review.</p>
              <p className="text-sm text-gray-500">
                If you just submitted a testimonial, make sure:
                <br />
                1. Backend server is running
                <br />
                2. You're logged in as admin
                <br />
                3. Check browser console for errors
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {testimonials.map((testimonial) => (
                <div
                  key={testimonial.id}
                  className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
                >
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-start space-x-4 mb-4">
                        <div className="w-12 h-12 bg-[#C8A75B] rounded-full flex items-center justify-center flex-shrink-0">
                          <User size={24} className="text-white" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-[#0A1A2F] mb-1">
                            {testimonial.name}
                          </h3>
                          <div className="flex items-center text-gray-600 text-sm mb-2">
                            <MapPin size={16} className="mr-1" />
                            <span>{testimonial.location}</span>
                          </div>
                          <div className="flex items-center text-gray-500 text-xs">
                            <Clock size={14} className="mr-1" />
                            <span>Submitted: {formatDate(testimonial.createdAt)}</span>
                          </div>
                        </div>
                      </div>

                      <div className="bg-[#F4F5F7] p-4 rounded-lg mb-4">
                        <div className="flex items-start space-x-2">
                          <MessageSquare size={20} className="text-[#C8A75B] mt-1 flex-shrink-0" />
                          <p className="text-gray-700 italic leading-relaxed">
                            "{testimonial.message}"
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row lg:flex-col gap-2 lg:w-48 flex-shrink-0">
                      <Button
                        onClick={() => handleApprove(testimonial.id!)}
                        disabled={processing === testimonial.id}
                        className="bg-green-600 hover:bg-green-700 text-white"
                        fullWidth
                      >
                        <CheckCircle size={18} className="mr-2" />
                        {processing === testimonial.id ? 'Processing...' : 'Approve'}
                      </Button>
                      <Button
                        onClick={() => handleDecline(testimonial.id!)}
                        disabled={processing === testimonial.id}
                        variant="outline"
                        className="border-red-300 text-red-600 hover:bg-red-50"
                        fullWidth
                      >
                        <XCircle size={18} className="mr-2" />
                        {processing === testimonial.id ? 'Processing...' : 'Decline'}
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          </FadeIn>
        </div>
      )}
    </div>
  );
}

