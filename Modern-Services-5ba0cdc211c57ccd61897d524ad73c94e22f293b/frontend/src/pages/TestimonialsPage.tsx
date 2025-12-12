import { useState, useEffect, useMemo } from 'react';
import { TestimonialCard } from '../components/TestimonialCard';
import { Button } from '../components/ui/button';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { FadeIn } from '../components/FadeIn';
import { Star, Quote, Send, CheckCircle } from 'lucide-react';
import { submitTestimonial, getApprovedTestimonials, Testimonial, getSiteSettings, SiteSettings } from '../lib/api';
import { usePageContent } from '../hooks/usePageContent';

interface TestimonialsPageProps {
  onNavigate: (page: string) => void;
}

export function TestimonialsPage({ onNavigate }: TestimonialsPageProps) {
  const [firestoreTestimonials, setFirestoreTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [siteSettings, setSiteSettings] = useState<SiteSettings | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    message: ''
  });

  // Try to get page content (may not exist, that's okay)
  const { pageContent } = usePageContent('testimonials');

  // Default content for countries section
  const defaultContent = useMemo(() => ({
    countries: {
      title: "Serving Investors Globally",
      description: "We proudly serve property investors from around the world who trust us with their UK investments.",
      countriesList: ['UAE', 'USA', 'Saudi', 'Spain', 'France', 'Germany', 'Australia', 'Japan', 'India', 'Qatar', 'Mexico', 'Ireland']
    }
  }), []);

  // Use API content if available, otherwise use defaults
  const content = pageContent?.content || defaultContent;

  // Static testimonials (fallback)
  const staticTestimonials = [
    {
      name: "Ahmed",
      role: "Investor, Dubai, UAE",
      content: "Managing properties in England from Dubai seemed daunting at first, but Modern Services made it effortless. Their transparent reporting and proactive communication keep me informed about every aspect of my portfolio. The team's expertise in UK property laws and tax compliance has been invaluable. I've expanded from one property to five, all thanks to their exceptional service.",
      rating: 5
    },
    {
      name: "Fatima",
      role: "Property Owner, Riyadh, Saudi Arabia",
      content: "What impressed me most is how Modern Services handles everything from tenant sourcing to maintenance without me having to worry. Their monthly financial reports are detailed and always arrive on time. The 24/7 support means I can reach them whenever needed, despite the time difference. My properties have been fully occupied with quality tenants since day one.",
      rating: 5
    },
    {
      name: "Khalid",
      role: "Portfolio Holder, Doha, Qatar",
      content: "After working with another management company that left me frustrated, finding Modern Services was a game-changer. They understand the unique needs of international investors and provide comprehensive services that cover every aspect of property management. Their attention to detail and regular property inspections give me complete confidence. My rental yields have improved significantly since switching to them.",
      rating: 5
    },
    {
      name: "Layla",
      role: "Investor, Dubai, UAE",
      content: "The integrated property management and accounting services have streamlined my entire UK investment operation. Modern Services handles everything from rent collection to tax compliance seamlessly. Their team is professional, responsive, and truly cares about maximizing my returns. I sleep better at night knowing my investments are in their capable hands.",
      rating: 5
    },
    {
      name: "James",
      role: "Property Owner, London, UK",
      content: "As a London-based investor, I've tried several management companies, but Modern Services stands out for their professionalism and results. They found high-quality tenants for my properties within weeks, and their maintenance team is incredibly responsive. The detailed monthly reports help me track performance effortlessly. I couldn't be happier with their service.",
      rating: 5
    },
    {
      name: "Emma",
      role: "Portfolio Holder, London, UK",
      content: "Modern Services has transformed how I manage my property portfolio. Their proactive approach means issues are resolved before they become problems. The team's expertise in tenant relations and property maintenance keeps my properties in excellent condition. The financial reporting is transparent and comprehensive, making it easy to track my investment performance.",
      rating: 5
    },
    {
      name: "Anonymous",
      role: "Investor, UK",
      content: "I prefer to remain anonymous, but I felt compelled to share my positive experience. Modern Services has exceeded all my expectations in managing my UK property investments. Their professionalism, attention to detail, and commitment to client satisfaction are outstanding. The peace of mind they provide is worth every penny, and I've recommended them to several colleagues.",
      rating: 5
    },
    {
      name: "Anonymous",
      role: "Property Owner, England",
      content: "While I choose to keep my identity private, I want others to know how exceptional Modern Services truly is. They've managed my properties flawlessly for years, handling everything from tenant screening to emergency repairs with efficiency and care. Their accounting services ensure I'm always compliant, and their communication is always clear and timely. Highly recommended.",
      rating: 5
    }
  ];

  // Fetch approved testimonials and site settings
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [approved, settings] = await Promise.all([
          getApprovedTestimonials(),
          getSiteSettings().catch(() => null) // Fallback if settings don't exist
        ]);
        setFirestoreTestimonials(approved);
        setSiteSettings(settings);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim() || !formData.location.trim() || !formData.message.trim()) {
      alert('Please fill in all fields');
      return;
    }

    try {
      setSubmitting(true);
      await submitTestimonial(formData.name, formData.location, formData.message);
      setSubmitted(true);
      setFormData({ name: '', location: '', message: '' });
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setSubmitted(false);
      }, 5000);
    } catch (error) {
      console.error('Error submitting testimonial:', error);
      alert('Failed to submit testimonial. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };


  // Combine static and Firestore testimonials
  const allTestimonials = [
    ...staticTestimonials.map((t) => ({
      ...t,
      date: undefined as string | undefined
    })),
    ...firestoreTestimonials.map((t) => ({
      name: t.name,
      role: t.location || t.role || 'Client',
      content: t.message,
      rating: t.rating || 5,
      date: undefined as string | undefined
    }))
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[400px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A1A2F]/90 to-[#0A1A2F]/70 z-10"></div>
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1763976435739-2eb798e5907c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxVSyUyMHByb3BlcnR5JTIwaG91c2V8ZW58MXx8fHwxNzY0Mjc2NTQ0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
          alt="UK property"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="relative z-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Quote size={64} className="text-[#C8A75B] mx-auto mb-6" />
          <h1 className="text-white mb-4">Client Testimonials</h1>
          <p className="text-xl text-gray-200">
            Trusted by international investors worldwide
          </p>
        </div>
      </section>

      {/* Trust Stats */}
      <section className="py-12 bg-[#C8A75B]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="flex items-center justify-center space-x-1 mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={20} className="text-white fill-white" />
                ))}
              </div>
              <div className="text-white text-sm">5-Star Average Rating</div>
            </div>
            <div>
              <div className="text-4xl text-white mb-2">{siteSettings?.clientSatisfaction || '98%'}</div>
              <div className="text-white text-sm">Client Satisfaction</div>
            </div>
            <div>
              <div className="text-4xl text-white mb-2">{siteSettings?.happyClients || '56+'}</div>
              <div className="text-white text-sm">Happy Clients</div>
            </div>
            <div>
              <div className="text-4xl text-white mb-2">{siteSettings?.yearsOfExperience || '10+'}</div>
              <div className="text-white text-sm">Years of Trust</div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="text-center mb-12">
              <h2 className="text-[#0A1A2F] mb-4">What Our Clients Say</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Real feedback from real investors who trust us with their property investments in England.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {loading ? (
                <div className="col-span-full text-center py-12">
                  <p className="text-gray-600">Loading testimonials...</p>
                </div>
              ) : allTestimonials.length === 0 ? (
                <div className="col-span-full text-center py-12">
                  <p className="text-gray-600">No testimonials available yet.</p>
                </div>
              ) : (
                allTestimonials.map((testimonial, index) => (
                  <TestimonialCard
                    key={index}
                    name={testimonial.name}
                    role={testimonial.role}
                    content={testimonial.content}
                    rating={testimonial.rating}
                    date={testimonial.date}
                  />
                ))
              )}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Submit Testimonial Form */}
      <section className="py-20 bg-[#F4F5F7]">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <div className="text-center mb-8">
                <h2 className="text-[#0A1A2F] mb-4">Share Your Experience</h2>
                <p className="text-gray-600">
                  We'd love to hear about your experience with Modern Services. Your feedback helps us improve and helps other investors make informed decisions.
                </p>
              </div>

              {submitted ? (
                <div className="bg-green-50 border border-green-200 text-green-800 p-6 rounded-lg mb-6">
                  <div className="flex items-center space-x-2">
                    <CheckCircle size={20} className="text-green-600" />
                    <p className="font-semibold">Thank you for your feedback!</p>
                  </div>
                  <p className="text-sm mt-2">Your testimonial is pending approval and will be reviewed shortly.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-sm focus:outline-none focus:border-[#C8A75B] transition-colors"
                      placeholder="John"
                    />
                  </div>

                  <div>
                    <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
                      Location *
                    </label>
                    <input
                      type="text"
                      id="location"
                      name="location"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-sm focus:outline-none focus:border-[#C8A75B] transition-colors"
                      placeholder="Dubai, UAE"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                      Your Testimonial *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      required
                      rows={6}
                      className="w-full px-4 py-3 border border-gray-300 rounded-sm focus:outline-none focus:border-[#C8A75B] transition-colors resize-none"
                      placeholder="Share your experience with Modern Services..."
                    />
                  </div>

                  <Button type="submit" disabled={submitting} fullWidth className="bg-[#C8A75B] text-white hover:bg-[#B8964A] disabled:opacity-50">
                    <span className="flex items-center justify-center space-x-2">
                      <Send size={20} />
                      <span>{submitting ? 'Submitting...' : 'Submit Testimonial'}</span>
                    </span>
                  </Button>
                </form>
              )}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Featured Testimonial */}
      <section className="py-20 bg-[#F4F5F7]">
        <FadeIn>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white p-12 rounded-lg shadow-xl">
            <Quote size={48} className="text-[#C8A75B] mb-6" />
            <p className="text-2xl text-gray-700 italic mb-8 leading-relaxed">
              "Modern Services doesn't just manage properties—they build partnerships. In an industry where trust is everything, they've proven time and again that they have their clients' best interests at heart. Their comprehensive approach to property management and accounting services has been invaluable for my UK investments. I sleep better at night knowing my portfolio is in their capable hands."
            </p>
            <div className="flex items-center space-x-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={24} className="text-[#C8A75B] fill-[#C8A75B]" />
              ))}
            </div>
            <div className="border-t border-gray-200 pt-6">
              <div className="text-xl text-[#0A1A2F]">Ahmed</div>
              <div className="text-gray-500">Portfolio Holder, Dubai, UAE</div>
              <div className="text-sm text-gray-400 mt-2">Client since 2019</div>
            </div>
          </div>
          </div>
        </FadeIn>
      </section>

      {/* Countries Served */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="text-center mb-12">
            <h2 className="text-[#0A1A2F] mb-4">{content.countries?.title || defaultContent.countries.title}</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {content.countries?.description || defaultContent.countries.description}
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 text-center">
            {(content.countries?.countriesList || defaultContent.countries.countriesList).map((country: string) => (
              <div key={country} className="bg-[#F4F5F7] p-6 rounded-lg">
                <div className="text-[#0A1A2F]">{country}</div>
              </div>
            ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[#0A1A2F]">
        <FadeIn>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-white mb-6">Join Our Family of Satisfied Investors</h2>
          <p className="text-gray-300 text-lg mb-8">
            Experience the Modern Services difference. Get a free consultation today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button onClick={() => onNavigate('contact')} className="bg-[#C8A75B] text-white hover:bg-[#B8964A]">
              Schedule Consultation
            </Button>
            <Button variant="outline" className="bg-white/10 border-white text-white hover:bg-white hover:text-[#0A1A2F]" onClick={() => onNavigate('services')}>
              View Our Services
            </Button>
          </div>
          </div>
        </FadeIn>
      </section>
    </div>
  );
}
