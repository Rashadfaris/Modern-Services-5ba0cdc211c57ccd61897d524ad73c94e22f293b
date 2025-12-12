import { useState } from 'react';
import { Button } from '../components/ui/button';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { FadeIn } from '../components/FadeIn';
import { usePageContent } from '../hooks/usePageContent';
import { 
  Building2, 
  Users, 
  Wallet, 
  FileCheck, 
  Search, 
  Home, 
  Wrench, 
  TrendingUp, 
  Clock,
  ChevronDown,
  ChevronUp,
  Calculator,
  BookOpen,
  UserCheck,
  BarChart,
  Briefcase,
  ExternalLink
} from 'lucide-react';

interface ServicesPageProps {
  onNavigate: (page: string) => void;
}

export function ServicesPage({ onNavigate }: ServicesPageProps) {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const { pageContent } = usePageContent('services');
  
  // Default content (fallback if API content not available)
  const defaultContent = {
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
  };

  // Use API content if available, otherwise use defaults
  const content = pageContent?.content || defaultContent;

  // Icon mapping for sub-services
  const subServiceIconMap: Record<string, any> = {
    Wallet,
    FileCheck,
    Users,
    Home,
    Wrench,
    TrendingUp,
    Search,
    Clock
  };

  // Icon mapping for accounting services
  const accountingIconMap: Record<string, any> = {
    BookOpen,
    UserCheck,
    BarChart,
    FileCheck,
    Briefcase
  };

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  // Get content from API or defaults
  const propertyManagement = content.propertyManagement || defaultContent.propertyManagement;
  const accounting = content.accounting || defaultContent.accounting;

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[400px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A1A2F]/90 to-[#0A1A2F]/70 z-10"></div>
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1594873604892-b599f847e859?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBhcGFydG1lbnQlMjBpbnRlcmlvcnxlbnwxfHx8fDE3NjQxOTkzOTZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
          alt="Modern apartment interior"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="relative z-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-white mb-4">{content.hero?.title || defaultContent.hero.title}</h1>
          <p className="text-xl text-gray-200">
            {content.hero?.description || defaultContent.hero.description}
          </p>
        </div>
      </section>

      {/* Main Services: Side by Side */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
              {/* Comprehensive Property Management */}
              <div>
                <div className="text-center mb-12">
                  <div className="w-20 h-20 bg-[#C8A75B] rounded-full flex items-center justify-center mx-auto mb-6">
                    <Building2 size={40} className="text-white" />
                  </div>
                  <h2 className="text-[#0A1A2F] mb-4">{content.propertyManagement?.title || defaultContent.propertyManagement.title}</h2>
                  <p className="text-gray-600 max-w-3xl mx-auto text-lg">
                    {content.propertyManagement?.description || defaultContent.propertyManagement.description}
                  </p>
                </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {propertyManagement.quickFeatures?.map((feature: string, index: number) => (
              <div key={index} className="bg-[#F4F5F7] p-6 rounded-lg">
                <div className="flex items-center space-x-2 mb-3">
                  <span className="text-[#C8A75B] text-2xl">✓</span>
                  <span className="text-[#0A1A2F]">{feature}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Expandable Sub-Services */}
          <div className="space-y-4">
            {propertyManagement.subServices?.map((subService: any) => {
              const IconComponent = subServiceIconMap[subService.icon] || Wallet;
              return (
                <div key={subService.id} className="border border-gray-200 rounded-lg overflow-hidden">
                  <button
                    onClick={() => toggleSection(subService.id)}
                    className="w-full flex items-center justify-between p-6 bg-white hover:bg-[#F4F5F7] transition-colors"
                  >
                    <div className="flex items-center space-x-4">
                      <IconComponent size={24} className="text-[#C8A75B]" />
                      <h3 className="text-[#0A1A2F]">{subService.title}</h3>
                    </div>
                    {expandedSection === subService.id ? <ChevronUp /> : <ChevronDown />}
                  </button>
                  {expandedSection === subService.id && (
                    <div className="p-6 bg-[#F4F5F7] border-t border-gray-200">
                      <p className="text-gray-700 mb-4">
                        {subService.description}
                      </p>
                      <ul className="space-y-2">
                        {subService.features?.map((feature: string, index: number) => (
                          <li key={index} className="flex items-start space-x-2">
                            <span className="text-[#C8A75B] mt-1">•</span>
                            <span className="text-gray-700">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
              </div>

              {/* Accounting Services */}
              <div>
                <div className="text-center mb-12">
                  <div className="w-20 h-20 bg-[#0A1A2F] rounded-full flex items-center justify-center mx-auto mb-6">
                    <Calculator size={40} className="text-[#C8A75B]" />
                  </div>
                  <h2 className="text-[#0A1A2F] mb-4">{content.accounting?.title || defaultContent.accounting.title}</h2>
                  <p className="text-gray-600 max-w-3xl mx-auto text-lg">
                    {content.accounting?.description || defaultContent.accounting.description}
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-6 mb-12">
            {accounting.services?.map((service: any, index: number) => {
              const IconComponent = accountingIconMap[service.icon] || BookOpen;
              return (
                <div key={index} className="bg-white p-8 rounded-lg shadow-md">
                  <IconComponent size={32} className="text-[#C8A75B] mb-4" />
                  <h4 className="text-[#0A1A2F] mb-3">{service.title}</h4>
                  <p className="text-gray-600 text-sm mb-4">
                    {service.description}
                  </p>
                  <ul className="space-y-2 text-sm">
                    {service.features?.map((feature: string, featureIndex: number) => (
                      <li key={featureIndex} className="flex items-start space-x-2">
                        <span className="text-[#C8A75B]">•</span>
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>

                {/* Pluto Consultancy CTA */}
                {accounting.plutoCta && (
                  <div className="bg-[#0A1A2F] p-8 rounded-lg text-center">
                    <h3 className="text-white mb-4">{accounting.plutoCta.title}</h3>
                    <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
                      {accounting.plutoCta.description}
                    </p>
                    <a
                      href={accounting.plutoCta.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-2 bg-[#C8A75B] text-white px-8 py-3 rounded-sm hover:bg-[#B39650] transition-colors"
                    >
                      <span>{accounting.plutoCta.buttonText}</span>
                      <ExternalLink size={20} />
                    </a>
                  </div>
                )}
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <FadeIn>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-[#0A1A2F] mb-6">{content.cta?.title || defaultContent.cta.title}</h2>
          <p className="text-gray-600 text-lg mb-8">
            {content.cta?.description || defaultContent.cta.description}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button onClick={() => onNavigate('contact')} className="bg-[#C8A75B] text-white hover:bg-[#B8964A]">
              Get Free Consultation
            </Button>
            <Button variant="outline" onClick={() => onNavigate('testimonials')} className="border-[#C8A75B] text-[#C8A75B] hover:bg-[#C8A75B] hover:text-white">
              Read Client Stories
            </Button>
          </div>
          </div>
        </FadeIn>
      </section>
    </div>
  );
}
