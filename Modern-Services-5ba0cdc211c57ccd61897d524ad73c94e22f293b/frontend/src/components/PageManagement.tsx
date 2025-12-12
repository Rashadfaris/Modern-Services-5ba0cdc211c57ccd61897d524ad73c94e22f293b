import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { 
  getAllPages, 
  createPage, 
  updatePage, 
  Page 
} from '../lib/api';
import { Edit, X, Save, Home, Info, Briefcase, Mail, MessageSquare } from 'lucide-react';
import { FadeIn } from './FadeIn';

interface PageManagementProps {
  onLogout?: () => void;
}

const PAGE_CONFIG = {
  home: { label: 'Home', icon: Home },
  about: { label: 'About', icon: Info },
  services: { label: 'Services', icon: Briefcase },
  contact: { label: 'Contact', icon: Mail },
  testimonials: { label: 'Testimonials', icon: MessageSquare },
};

export function PageManagement({ onLogout: _onLogout }: PageManagementProps) {
  const [pages, setPages] = useState<Page[]>([]);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [editingPage, setEditingPage] = useState<Page | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    content: '' as any,
  });

  useEffect(() => {
    loadPages();
  }, []);

  const loadPages = async () => {
    try {
      setLoading(true);
      setError(null);
      const allPages = await getAllPages();
      setPages(allPages);
    } catch (error: any) {
      console.error('Error loading pages:', error);
      setError(error.message || 'Failed to load pages');
    } finally {
      setLoading(false);
    }
  };

  // Default content for each page (used when page doesn't exist in DB)
  const getDefaultPageContent = (slug: 'home' | 'about' | 'services' | 'contact' | 'testimonials') => {
    const defaults: Record<string, any> = {
      home: {
        hero: {
          mainTitle: "Modern Services",
          subtitle: "Your Trusted Partner for Property Management in England",
          description: "Seamless, profitable, and stress-free property solutions tailored for international investors.",
          ctaPrimary: "Get a Free Consultation",
          ctaSecondary: "Explore Our Services"
        },
        about: {
          title: "About Modern Services",
          description1: "For over 10 years, Modern Services has empowered international investors with exceptional property management across England. We enhance both your investments and the communities we manage.",
          description2: "Our comprehensive approach combines expert property management with integrated accounting services, ensuring your investments are professionally managed, fully compliant, and optimized for maximum returns."
        },
        benefits: {
          title: "Why International Investors Choose Us",
          description: "We provide comprehensive solutions that protect and grow your property investments in England.",
          cards: [
            {
              icon: "Shield",
              title: "Peace of Mind",
              description: "Rest easy knowing your properties are in expert hands with 24/7 support and proactive management."
            },
            {
              icon: "TrendingUp",
              title: "Maximized Returns",
              description: "Strategic rent optimization and cost-effective maintenance to enhance your investment performance."
            },
            {
              icon: "Clock",
              title: "Time Savings",
              description: "We handle everything from tenant screening to maintenance, freeing you to focus on growing your portfolio."
            },
            {
              icon: "FileCheck",
              title: "Legal & Tax Compliance",
              description: "Full UK regulatory compliance and expert tax guidance to protect your interests."
            }
          ]
        },
        services: {
          title: "Our Core Services",
          description: "Comprehensive property and financial management solutions tailored for international investors.",
          cards: [
            {
              icon: "Building2",
              title: "Property Management",
              description: "Full-service management from tenant sourcing to maintenance and compliance.",
              features: ["Tenant Screening", "Rent Collection", "24/7 Support"]
            },
            {
              icon: "Users",
              title: "Tenant Services",
              description: "Professional tenant sourcing, screening, and relationship management.",
              features: ["Background Checks", "Contract Management", "Tenant Support"]
            },
            {
              icon: "Wallet",
              title: "Financial Management",
              description: "Expert accounting, bookkeeping, and financial reporting services.",
              features: ["Monthly Reports", "Tax Planning", "Payroll Services"]
            },
            {
              icon: "Wrench",
              title: "Maintenance & Repairs",
              description: "Proactive maintenance and rapid response to keep properties in prime condition.",
              features: ["24/7 Emergency", "Quality Contractors", "Cost Control"]
            }
          ]
        },
        testimonials: {
          title: "What Our Clients Say",
          description: "Trusted by international investors worldwide"
        },
        cta: {
          title: "Ready to Optimize Your Property Investment?",
          description: "Get a free consultation with our property management experts today.",
          ctaPrimary: "Schedule Consultation",
          ctaSecondary: "Learn More"
        }
      },
      about: {
        hero: {
          title: "About Modern Services",
          description: "A decade of excellence in property management and accounting services"
        },
        story: {
          title: "Our Story",
          paragraphs: [
            "Founded over 10 years ago, Modern Services was born from a simple vision: to provide international property investors with the same level of care and attention they would give their own investments. What started as a small property management firm has grown into a comprehensive service provider, trusted by investors across the globe.",
            "Throughout our decade-long journey, we have successfully managed over fifty properties across England, ranging from luxury apartments in London to charming countryside homes. Our success is built on an unwavering commitment to our clients' prosperity and the communities we serve.",
            "Today, Modern Services stands as a trusted leader in property management, combining time-honoured values of integrity and service with modern technology and financial expertise. We don't just manage properties — we build long-term partnerships and deliver real value to our clients every single day."
          ]
        },
        values: {
          title: "Our Core Values",
          description: "These principles guide every decision we make and every service we provide.",
          cards: [
            {
              icon: "Heart",
              title: "Integrity",
              description: "We operate with honesty and transparency in all our dealings, building trust through ethical practices."
            },
            {
              icon: "Eye",
              title: "Transparency",
              description: "Clear, open communication and detailed reporting keep you informed every step of the way."
            },
            {
              icon: "Users",
              title: "Client-Centricity",
              description: "Your success is our success. We tailor our services to meet your unique investment goals."
            },
            {
              icon: "Lightbulb",
              title: "Innovation",
              description: "We embrace technology and modern practices to deliver superior service and results."
            },
            {
              icon: "Award",
              title: "Expertise",
              description: "A decade of experience combined with continuous learning keeps us at the industry forefront."
            }
          ]
        },
        whyChoose: {
          title: "Why Choose Modern Services?",
          description: "We offer a unique combination of expertise, technology, and personalized service that sets us apart.",
          cards: [
            {
              icon: "Target",
              title: "Specialized Expertise",
              description: "Deep knowledge of UK property laws, regulations, and market dynamics specifically for international investors."
            },
            {
              icon: "Shield",
              title: "Comprehensive Solutions",
              description: "From property management to accounting and tax compliance, we handle all aspects of your investment."
            },
            {
              icon: "BarChart",
              title: "Transparent Reporting",
              description: "Detailed monthly reports and real-time access to your property's financial performance through our online portal."
            },
            {
              icon: "UserCheck",
              title: "Dedicated Account Management",
              description: "Your personal account manager knows your portfolio inside out and is always available to assist."
            },
            {
              icon: "Calculator",
              title: "Integrated Tax & Financial Support",
              description: "Expert accounting services and tax planning through our partnership with Pluto Consultancy."
            },
            {
              icon: "Laptop",
              title: "Advanced Technology",
              description: "State-of-the-art property management software and online portal for 24/7 access to your investment data."
            }
          ]
        },
        mission: {
          title: "Our Mission",
          content: "To empower international property investors with exceptional management services that maximize returns, ensure compliance, and provide complete peace of mind. We strive to be the most trusted partner for property investment in England."
        },
        vision: {
          title: "Our Vision",
          content: "To be recognized as the leading property management company for international investors in England, known for our integrity, innovation, and unwavering commitment to client success and community enhancement."
        },
        stats: {
          years: "10+",
          properties: "50+",
          satisfaction: "98%",
          support: "24/7"
        },
        cta: {
          title: "Ready to Partner With Us?",
          description: "Let's discuss how we can help you achieve your property investment goals in England."
        }
      },
      services: {
        hero: {
          title: "Our Services",
          description: "Comprehensive property management and accounting solutions for international investors"
        },
        propertyManagement: {
          title: "Comprehensive Property Management",
          description: "Full-service property management designed specifically for international investors. We handle every aspect of your property investment, allowing you to enjoy passive income with complete peace of mind.",
          quickFeatures: [
            "Professional tenant screening",
            "24/7 emergency support",
            "Rent collection & management",
            "Property maintenance & repairs",
            "Legal compliance & reporting",
            "Market analysis & advice"
          ],
          subServices: [
            {
              id: "rent-collection",
              icon: "Wallet",
              title: "Rent Collection & Financial Management",
              description: "We ensure timely rent collection and provide transparent financial reporting for your peace of mind.",
              features: [
                "Automated monthly rent collection",
                "Detailed monthly financial statements",
                "Direct deposit to your international account",
                "Arrears management and recovery",
                "Online portal access to financial data"
              ]
            },
            {
              id: "tax-compliance",
              icon: "FileCheck",
              title: "Tax & Legal Compliance",
              description: "Stay compliant with UK property laws and tax regulations while optimizing your tax position.",
              features: [
                "Safety certificate management (Gas, EPC, EICR)",
                "Landlord licensing and registration",
                "Tenancy deposit protection",
                "Tax reporting and HMRC compliance",
                "Right to Rent checks"
              ]
            },
            {
              id: "tenant-sourcing",
              icon: "Users",
              title: "Tenant Sourcing & Management",
              description: "Find and retain high-quality tenants through our rigorous screening and relationship management process.",
              features: [
                "Professional property marketing",
                "Comprehensive tenant screening (credit, employment, references)",
                "Property viewings and tenant selection",
                "Tenancy agreement preparation",
                "Move-in inspections and inventory",
                "Ongoing tenant relationship management"
              ]
            },
            {
              id: "short-term",
              icon: "Home",
              title: "Short-Term Rental Management",
              description: "Maximize returns with professional Airbnb and short-term rental management.",
              features: [
                "Listing optimization on multiple platforms",
                "Dynamic pricing strategies",
                "Guest communication and support",
                "Professional cleaning and turnover",
                "Review management"
              ]
            },
            {
              id: "maintenance",
              icon: "Wrench",
              title: "Property Maintenance & Repairs",
              description: "Keep your property in prime condition with proactive maintenance and rapid response repairs.",
              features: [
                "24/7 emergency maintenance hotline",
                "Network of vetted, reliable contractors",
                "Preventive maintenance programs",
                "Property inspections (quarterly/bi-annual)",
                "Cost-effective repair solutions",
                "Detailed repair reports with photos"
              ]
            },
            {
              id: "market-analysis",
              icon: "TrendingUp",
              title: "Market Analysis & Investment Advice",
              description: "Make informed decisions with expert market insights and investment guidance.",
              features: [
                "Local market analysis and trends",
                "Rental yield optimization",
                "Property valuation services",
                "Portfolio growth strategies",
                "Investment opportunity identification"
              ]
            },
            {
              id: "marketing",
              icon: "Search",
              title: "Property Marketing",
              description: "Minimize void periods with professional property marketing and advertising.",
              features: [
                "Professional photography and videography",
                "Listing on major property portals (Rightmove, Zoopla)",
                "Social media promotion",
                "Virtual tours and 3D walkthroughs",
                "Targeted advertising campaigns"
              ]
            },
            {
              id: "support",
              icon: "Clock",
              title: "24/7 Dedicated Support",
              description: "Round-the-clock support for you and your tenants, wherever you are in the world.",
              features: [
                "Dedicated account manager",
                "24/7 emergency hotline",
                "Multi-language support",
                "Online owner portal access",
                "Regular performance reviews"
              ]
            }
          ]
        },
        accounting: {
          title: "Accounting Services",
          description: "Professional accounting and financial services to keep your property business compliant and profitable.",
          services: [
            {
              icon: "BookOpen",
              title: "Bookkeeping Services",
              description: "Accurate record-keeping of all property-related transactions and expenses.",
              features: [
                "Income and expense tracking",
                "Bank reconciliation",
                "Financial reporting"
              ]
            },
            {
              icon: "UserCheck",
              title: "Payroll Processing",
              description: "Efficient payroll management for property staff and contractors.",
              features: [
                "Employee payment processing",
                "PAYE and NI calculations",
                "Pension auto-enrolment"
              ]
            },
            {
              icon: "BarChart",
              title: "Accounts Preparation",
              description: "Year-end accounts preparation for tax filing and business planning.",
              features: [
                "Annual financial statements",
                "Management accounts",
                "Budget forecasting"
              ]
            },
            {
              icon: "FileCheck",
              title: "Tax Compliance",
              description: "Comprehensive tax support for UK property investors.",
              features: [
                "Self-assessment tax returns",
                "Corporation tax filing",
                "VAT registration and returns"
              ]
            },
            {
              icon: "Briefcase",
              title: "Business Start-up Support",
              description: "Guidance for launching and structuring your property business.",
              features: [
                "Company formation",
                "Business structure advice",
                "Registration services"
              ]
            }
          ],
          plutoCta: {
            title: "Expert Accountancy & Tax Advice",
            description: "For comprehensive accountancy and tax consultancy services, visit our specialist partner Pluto Consultancy.",
            buttonText: "Visit Pluto Consultancy",
            url: "https://plutoconsultancy.com"
          }
        },
        cta: {
          title: "Let's Discuss Your Property Needs",
          description: "Schedule a free consultation to learn how our services can benefit your property investment."
        }
      },
      contact: {
        hero: {
          title: "Get In Touch",
          description: "Let's discuss how we can help you achieve your property investment goals"
        },
        form: {
          title: "Send Us a Message",
          description: "Fill out the form below and our team will get back to you within 24 hours."
        },
        contactInfo: {
          title: "Contact Information",
          description: "Reach out to us through any of the following channels. We're here to help!",
          phones: [
            {
              number: "+44 20 8058 7635",
              note: "International rates may apply"
            }
          ],
          emails: [
            {
              address: "info@modernservices.org.uk",
              note: "We respond within 24 hours"
            }
          ],
          companyRegs: [
            {
              label: "Company Registration",
              number: "OC407556"
            }
          ],
          hours: {
            weekdays: "Monday - Friday: 9:00 AM - 6:00 PM GMT",
            saturday: "Saturday: 10:00 AM - 2:00 PM GMT",
            sunday: "Sunday: Closed"
          },
          emergencySupport: "24/7 Emergency Support Available"
        },
        visit: {
          title: "Visit Our Office",
          description: "Located in Harrow, we welcome visits by appointment"
        },
        faq: {
          title: "Have Questions?",
          description: "Here are some quick answers to common questions. For more detailed information, please contact us directly.",
          questions: [
            {
              question: "How quickly can you start managing my property?",
              answer: "We can typically onboard new properties within 5-7 business days after our initial consultation and agreement."
            },
            {
              question: "Do you manage properties outside London?",
              answer: "Yes, we manage properties throughout England, including Manchester, Birmingham, Leeds, and other major cities."
            },
            {
              question: "What are your management fees?",
              answer: "Our fees are competitive and transparent, varying based on property type and services required. Contact us for a personalized quote."
            }
          ]
        },
        cta: {
          title: "Ready to Get Started?",
          description: "Join hundreds of satisfied international investors who trust Modern Services with their UK property investments."
        }
      },
      testimonials: {
        countries: {
          title: "Serving Investors Globally",
          description: "We proudly serve property investors from around the world who trust us with their UK investments.",
          countriesList: ['UAE', 'USA', 'Saudi', 'Spain', 'France', 'Germany', 'Australia', 'Japan', 'India', 'Qatar', 'Mexico', 'Ireland']
        }
      }
    };
    return defaults[slug] || {};
  };

  const handleEdit = (page: Page | null, slug: 'home' | 'about' | 'services' | 'contact' | 'testimonials') => {
    if (page) {
      // Edit existing page
      setEditingPage(page);
      setFormData({
        title: page.title,
        content: typeof page.content === 'string' ? page.content : JSON.stringify(page.content, null, 2),
      });
    } else {
      // Edit default content (page doesn't exist yet)
      const defaultContent = getDefaultPageContent(slug);
      setEditingPage({
        slug,
        title: PAGE_CONFIG[slug].label,
        content: defaultContent,
        createdAt: new Date(),
      } as Page);
      setFormData({
        title: PAGE_CONFIG[slug].label,
        content: JSON.stringify(defaultContent, null, 2),
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title) {
      alert('Please fill in the title');
      return;
    }

    try {
      setProcessing('saving');
      
      // Parse content JSON
      let parsedContent: any;
      try {
        parsedContent = JSON.parse(formData.content);
      } catch (parseError) {
        // If it's not valid JSON, treat it as a string
        parsedContent = formData.content;
      }

      if (editingPage?.id) {
        // Update existing page
        await updatePage(editingPage.slug, {
          title: formData.title,
          content: parsedContent,
        });
      } else if (editingPage) {
        // Create new page
        await createPage(editingPage.slug, formData.title, parsedContent);
      }
      
      setEditingPage(null);
      setFormData({ title: '', content: '' });
      await loadPages();
    } catch (error) {
      console.error('Error saving page:', error);
      alert('Failed to save page. Please try again.');
    } finally {
      setProcessing(null);
    }
  };


  const formatDate = (date: Date | string) => {
    if (!date) return 'N/A';
    const d = date instanceof Date ? date : new Date(date);
    return d.toLocaleDateString('en-GB', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

    // Get page by slug or return null
    const getPageBySlug = (slug: 'home' | 'about' | 'services' | 'contact' | 'testimonials') => {
      return pages.find(p => p.slug === slug);
    };

  return (
    <div className="min-h-screen bg-[#F4F5F7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <FadeIn>
          <div className="mb-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-[#0A1A2F] mb-2">
                    Page Management
                  </h2>
                  <p className="text-gray-600 text-sm">
                    Manage content for Home, About, Services, and Contact pages
                  </p>
                  {error && (
                    <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded text-red-800 text-sm">
                      <strong>Error:</strong> {error}
                    </div>
                  )}
                </div>
                <Button
                  onClick={loadPages}
                  variant="outline"
                  disabled={loading}
                >
                  {loading ? 'Loading...' : 'Refresh'}
                </Button>
              </div>
            </div>
          </div>

          {/* Form Modal */}
          {editingPage && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                <div className="sticky top-0 bg-white border-b p-4 flex items-center justify-between">
                  <h3 className="text-xl font-semibold text-[#0A1A2F]">
                    {editingPage.id ? 'Edit Page' : 'Create Page'} - {PAGE_CONFIG[editingPage.slug].label}
                  </h3>
                  <button
                    onClick={() => {
                      setEditingPage(null);
                      setFormData({ title: '', content: '' });
                    }}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <X size={24} />
                  </button>
                </div>
                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Page Title *
                    </label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#C8A75B]"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Content (JSON format) *
                    </label>
                    <p className="text-xs text-gray-500 mb-2">
                      Enter content as JSON. This allows flexible structure for each page. Example: {'{"hero": {"title": "Welcome", "description": "..."}, "sections": [...]}'}
                    </p>
                    <textarea
                      value={formData.content}
                      onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                      rows={20}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#C8A75B] font-mono text-sm"
                      required
                      placeholder='{"hero": {"title": "Welcome", "description": "..."}}'
                    />
                  </div>
                  <div className="flex gap-2 pt-4">
                    <Button
                      type="submit"
                      disabled={processing === 'saving'}
                      className="bg-[#C8A75B] text-white hover:bg-[#B8964A]"
                    >
                      <Save size={18} className="mr-2" />
                      {processing === 'saving' ? 'Saving...' : 'Save'}
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        setEditingPage(null);
                        setFormData({ title: '', content: '' });
                      }}
                    >
                      Cancel
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#C8A75B]"></div>
              <p className="mt-4 text-gray-600">Loading pages...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {(['home', 'about', 'services', 'contact', 'testimonials'] as const).map((slug) => {
                const page = getPageBySlug(slug);
                const Icon = PAGE_CONFIG[slug].icon;
                
                return (
                  <div
                    key={slug}
                    className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-[#C8A75B]/10 rounded-full flex items-center justify-center">
                          <Icon size={24} className="text-[#C8A75B]" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-[#0A1A2F]">
                            {PAGE_CONFIG[slug].label} Page
                          </h3>
                          {page && (
                            <p className="text-sm text-gray-500">
                              Last updated: {formatDate(page.updatedAt || page.createdAt)}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      {page ? (
                        <>
                          <div>
                            <p className="text-sm text-gray-600 mb-1">Title:</p>
                            <p className="text-[#0A1A2F] font-medium">{page.title}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600 mb-1">Content Preview:</p>
                            <p className="text-gray-700 text-sm line-clamp-2">
                              {typeof page.content === 'string' 
                                ? page.content 
                                : JSON.stringify(page.content).substring(0, 100) + '...'}
                            </p>
                          </div>
                        </>
                      ) : (
                        <div>
                          <p className="text-sm text-gray-600 mb-1">Status:</p>
                          <p className="text-gray-500 text-sm">
                            Using default content. Click "Edit" to customize and save.
                          </p>
                        </div>
                      )}
                      <div className="pt-2">
                        <Button
                          onClick={() => handleEdit(page || null, slug)}
                          variant="outline"
                          className="border-blue-300 text-blue-600 hover:bg-blue-50"
                          fullWidth
                        >
                          <Edit size={18} className="mr-2" />
                          {page ? 'Edit' : 'Edit Default Content'}
                        </Button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </FadeIn>
      </div>
    </div>
  );
}

