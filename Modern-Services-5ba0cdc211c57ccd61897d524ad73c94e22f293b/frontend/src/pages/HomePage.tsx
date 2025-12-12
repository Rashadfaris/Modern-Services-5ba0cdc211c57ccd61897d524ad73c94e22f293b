import { Button } from '../components/ui/button';
import { BenefitCard } from '../components/BenefitCard';
import { ServiceCard } from '../components/ServiceCard';
import { TestimonialCard } from '../components/TestimonialCard';
import { Shield, TrendingUp, Clock, FileCheck, Building2, Users, Wallet, Wrench } from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { FadeIn } from '../components/FadeIn';
import { useState, useEffect, useMemo } from 'react';
import { usePageContent } from '../hooks/usePageContent';
import { getSiteSettings, SiteSettings } from '../lib/api';

interface HomePageProps {
  onNavigate: (page: string) => void;
}

export function HomePage({ onNavigate }: HomePageProps) {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [siteSettings, setSiteSettings] = useState<SiteSettings | null>(null);
  const { pageContent } = usePageContent('home');
  
  // Load site settings
  useEffect(() => {
    getSiteSettings().then(setSiteSettings).catch(() => null);
  }, []);
  
  // Default content (fallback if API content not available)
  // Use useMemo to recalculate when siteSettings changes
  const defaultContent = useMemo(() => ({
    hero: {
      mainTitle: "Modern Services",
      subtitle: "Your Trusted Partner for Property Management in England",
      description: "Seamless, profitable, and stress-free property solutions tailored for international investors.",
      ctaPrimary: "Get a Free Consultation",
      ctaSecondary: "Explore Our Services"
    },
    about: {
      title: "About Modern Services",
      description1: `For over ${siteSettings?.yearsOfExperience || '10+'} years, Modern Services has empowered international investors with exceptional property management across England. We enhance both your investments and the communities we manage.`,
      description2: "Our comprehensive approach combines expert property management with integrated accounting services, ensuring your investments are professionally managed, fully compliant, and optimized for maximum returns."
    },
    benefits: {
      title: "Why International Investors Choose Us",
      description: "We provide comprehensive solutions that protect and grow your property investments in England."
    },
    services: {
      title: "Our Core Services",
      description: "Comprehensive property and financial management solutions tailored for international investors."
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
  }), [siteSettings?.yearsOfExperience]);

  // Helper function to replace hardcoded years values with dynamic value
  const replaceYearsInText = (text: string): string => {
    if (!siteSettings?.yearsOfExperience) return text;
    const yearsValue = siteSettings.yearsOfExperience;
    // Replace patterns like "10 years", "10+ years", "over 10 years", "10+", etc.
    return text
      .replace(/\b\d+\+?\s*years?\b/gi, `${yearsValue} years`)
      .replace(/\bover\s+\d+\+?\s*years?\b/gi, `over ${yearsValue} years`)
      .replace(/\bfor\s+over\s+\d+\+?\s*years?\b/gi, `For over ${yearsValue} years`);
  };

  // Use API content if available, otherwise use defaults
  const content = pageContent?.content || defaultContent;
  
  // Process about description1 to replace any hardcoded years
  const aboutDescription1 = useMemo(() => {
    const desc = content.about?.description1 || defaultContent.about.description1;
    return replaceYearsInText(desc);
  }, [content.about?.description1, defaultContent.about.description1, siteSettings?.yearsOfExperience]);

  const testimonials = [
    {
      name: "Sarah Mitchell",
      role: "Property Investor, Dubai",
      content: "Modern Services has transformed how I manage my UK properties. Their attention to detail and transparent reporting give me complete peace of mind from abroad."
    },
    {
      name: "James Chen",
      role: "International Investor, Singapore",
      content: "The team's expertise in both property management and UK tax compliance is invaluable. They've maximized my returns while ensuring full legal compliance."
    },
    {
      name: "Maria Rodriguez",
      role: "Real Estate Portfolio Owner, Spain",
      content: "After 5 years with Modern Services, I can confidently say they are the best in the business. Professional, responsive, and truly care about my investments."
    },
    {
      name: "Robert Thompson",
      role: "Property Developer, USA",
      content: "Their integrated approach to property management and accounting has streamlined my entire UK operation. Exceptional service and results."
    },
    {
      name: "Amira Hassan",
      role: "Investor, UAE",
      content: "From tenant sourcing to financial reporting, Modern Services handles everything seamlessly. I couldn't ask for a better partner in managing my London properties."
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[500px] sm:h-[600px] md:h-[700px] flex items-center justify-center overflow-hidden py-8 sm:py-0">
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A1A2F]/90 to-[#0A1A2F]/70 z-10"></div>
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1740595198785-e3d0f90442e3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxMb25kb24lMjBza3lsaW5lJTIwbHV4dXJ5fGVufDF8fHx8MTc2NDI3NjU0M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
          alt="London skyline"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="relative z-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-white mb-4 sm:mb-6">
            <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold block mb-2 sm:mb-3">{content.hero?.mainTitle || defaultContent.hero.mainTitle}</span>
            <span className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-semibold block px-1 sm:px-2 leading-snug sm:leading-tight">{content.hero?.subtitle || defaultContent.hero.subtitle}</span>
          </h1>
          <p className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl text-gray-200 mb-6 sm:mb-8 leading-relaxed px-2 sm:px-4">
            {content.hero?.description || defaultContent.hero.description}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-2">
            <Button onClick={() => onNavigate('contact')} className="w-full sm:w-auto text-sm sm:text-base bg-[#C8A75B] text-white hover:bg-[#B8964A]">
              {content.hero?.ctaPrimary || defaultContent.hero.ctaPrimary}
            </Button>
            <Button variant="outline" className="bg-white/10 border-white text-white hover:bg-white hover:text-[#0A1A2F] w-full sm:w-auto text-sm sm:text-base" onClick={() => onNavigate('services')}>
              {content.hero?.ctaSecondary || defaultContent.hero.ctaSecondary}
            </Button>
          </div>
        </div>
      </section>

      {/* About Preview */}
      <section className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center">
            <div className="text-center lg:text-left">
              <h2 className="text-2xl sm:text-3xl md:text-4xl text-[#0A1A2F] mb-4 sm:mb-6">{content.about?.title || defaultContent.about.title}</h2>
              <p className="text-sm sm:text-base text-gray-700 mb-4 sm:mb-6 leading-relaxed">
                {aboutDescription1}
              </p>
              <p className="text-sm sm:text-base text-gray-700 mb-6 sm:mb-8 leading-relaxed">
                {content.about?.description2 || defaultContent.about.description2}
              </p>
              <Button onClick={() => onNavigate('about')} className="w-full sm:w-auto">
                Learn More About Us
              </Button>
            </div>
            <div className="relative h-[400px] rounded-lg overflow-hidden shadow-xl">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1642522029686-5485ea7e6042?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBvZmZpY2UlMjBtZWV0aW5nfGVufDF8fHx8MTc2NDE5ODMzOXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Professional team meeting"
                className="w-full h-full object-cover"
              />
            </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Key Investor Benefits */}
      <section className="py-12 sm:py-16 md:py-20 bg-[#F4F5F7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl text-[#0A1A2F] mb-3 sm:mb-4">{content.benefits?.title || defaultContent.benefits.title}</h2>
            <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto px-2">
              {content.benefits?.description || defaultContent.benefits.description}
            </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            <BenefitCard
              icon={Shield}
              title="Peace of Mind"
              description="Rest easy knowing your properties are in expert hands with 24/7 support and proactive management."
            />
            <BenefitCard
              icon={TrendingUp}
              title="Maximized Returns"
              description="Strategic rent optimization and cost-effective maintenance to enhance your investment performance."
            />
            <BenefitCard
              icon={Clock}
              title="Time Savings"
              description="We handle everything from tenant screening to maintenance, freeing you to focus on growing your portfolio."
            />
            <BenefitCard
              icon={FileCheck}
              title="Legal & Tax Compliance"
              description="Full UK regulatory compliance and expert tax guidance to protect your interests."
            />
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl text-[#0A1A2F] mb-3 sm:mb-4">{content.services?.title || defaultContent.services.title}</h2>
            <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto px-2">
              {content.services?.description || defaultContent.services.description}
            </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            <ServiceCard
              icon={Building2}
              title="Property Management"
              description="Full-service management from tenant sourcing to maintenance and compliance."
              features={['Tenant Screening', 'Rent Collection', '24/7 Support']}
              onLearnMore={() => onNavigate('services')}
            />
            <ServiceCard
              icon={Users}
              title="Tenant Services"
              description="Professional tenant sourcing, screening, and relationship management."
              features={['Background Checks', 'Contract Management', 'Tenant Support']}
              onLearnMore={() => onNavigate('services')}
            />
            <ServiceCard
              icon={Wallet}
              title="Financial Management"
              description="Expert accounting, bookkeeping, and financial reporting services."
              features={['Monthly Reports', 'Tax Planning', 'Payroll Services']}
              onLearnMore={() => onNavigate('services')}
            />
            <ServiceCard
              icon={Wrench}
              title="Maintenance & Repairs"
              description="Proactive maintenance and rapid response to keep properties in prime condition."
              features={['24/7 Emergency', 'Quality Contractors', 'Cost Control']}
              onLearnMore={() => onNavigate('services')}
            />
            </div>
            <div className="text-center mt-12">
              <Button onClick={() => onNavigate('services')}>
                View All Services
              </Button>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Testimonials Slider */}
      <section className="py-12 sm:py-16 md:py-20 bg-[#0A1A2F]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl text-white mb-3 sm:mb-4">{content.testimonials?.title || defaultContent.testimonials.title}</h2>
            <p className="text-sm sm:text-base text-gray-300 px-2">
              {content.testimonials?.description || defaultContent.testimonials.description}
            </p>
            </div>
            <div className="relative">
            <TestimonialCard
              name={testimonials[currentTestimonial].name}
              role={testimonials[currentTestimonial].role}
              content={testimonials[currentTestimonial].content}
            />
            <div className="flex justify-center space-x-2 mt-8">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === currentTestimonial ? 'bg-[#C8A75B] w-8' : 'bg-gray-500'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
            </div>
            <div className="text-center mt-12">
              <Button variant="outline" className="bg-white/10 border-white text-white hover:bg-white hover:text-[#0A1A2F]" onClick={() => onNavigate('testimonials')}>
                Read More Testimonials
              </Button>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-[#C8A75B]">
        <FadeIn>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-white mb-4 sm:mb-6 px-2">{content.cta?.title || defaultContent.cta.title}</h2>
          <p className="text-sm sm:text-base md:text-lg text-white/90 mb-6 sm:mb-8 px-2">
            {content.cta?.description || defaultContent.cta.description}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-2">
            <Button variant="secondary" className="bg-white text-[#0A1A2F] hover:bg-gray-100 w-full sm:w-auto" onClick={() => onNavigate('contact')}>
              {content.cta?.ctaPrimary || defaultContent.cta.ctaPrimary}
            </Button>
            <Button variant="outline" className="bg-white/10 border-white text-white hover:bg-white hover:text-[#0A1A2F] w-full sm:w-auto" onClick={() => onNavigate('services')}>
              {content.cta?.ctaSecondary || defaultContent.cta.ctaSecondary}
            </Button>
          </div>
          </div>
        </FadeIn>
      </section>
    </div>
  );
}
