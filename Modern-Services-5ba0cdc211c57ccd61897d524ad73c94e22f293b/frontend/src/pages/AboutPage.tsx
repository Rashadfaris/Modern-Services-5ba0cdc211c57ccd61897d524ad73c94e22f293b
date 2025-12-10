import { ValueCard } from '../components/ValueCard';
import { BenefitCard } from '../components/BenefitCard';
import { Heart, Eye, Users, Lightbulb, Award, Target, Shield, BarChart, UserCheck, Calculator, Laptop } from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { Button } from '../components/ui/button';
import { FadeIn } from '../components/FadeIn';
import { usePageContent } from '../hooks/usePageContent';
import { getSiteSettings, SiteSettings } from '../lib/api';
import { useEffect, useState } from 'react';

interface AboutPageProps {
  onNavigate: (page: string) => void;
}

export function AboutPage({ onNavigate }: AboutPageProps) {
  const [siteSettings, setSiteSettings] = useState<SiteSettings | null>(null);
  const { pageContent } = usePageContent('about');
  
  // Load site settings
  useEffect(() => {
    getSiteSettings().then(setSiteSettings).catch(() => null);
  }, []);
  
  // Default content (fallback if API content not available)
  const defaultContent = {
    hero: {
      title: "About Modern Services",
      description: "A decade of excellence in property management and accounting services"
    },
    story: {
      title: "Our Story",
          paragraphs: [
            `Founded over ${siteSettings?.yearsOfExperience || '10+'} years ago, Modern Services was born from a simple vision: to provide international property investors with the same level of care and attention they would give their own investments. What started as a small property management firm has grown into a comprehensive service provider, trusted by investors across the globe.`,
        "Throughout our decade-long journey, we have successfully managed over fifty properties across England, ranging from luxury apartments in London to charming countryside homes. Our success is built on an unwavering commitment to our clients' prosperity and the communities we serve.",
        "Today, Modern Services stands as a trusted leader in property management, combining time-honoured values of integrity and service with modern technology and financial expertise. We don't just manage properties — we build long-term partnerships and deliver real value to our clients every single day."
      ]
    },
    values: {
      title: "Our Core Values",
      description: "These principles guide every decision we make and every service we provide."
    },
    whyChoose: {
      title: "Why Choose Modern Services?",
      description: "We offer a unique combination of expertise, technology, and personalized service that sets us apart."
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
  };

  // Use API content if available, otherwise use defaults
  const content = pageContent?.content || defaultContent;
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[400px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A1A2F]/90 to-[#0A1A2F]/70 z-10"></div>
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1659266900180-c8e868426e76?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBwcm9wZXJ0eSUyMExvbmRvbnxlbnwxfHx8fDE3NjQyNzY1NDR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
          alt="Luxury London property"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="relative z-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-white mb-4">{content.hero?.title || defaultContent.hero.title}</h1>
          <p className="text-xl text-gray-200">
            {content.hero?.description || defaultContent.hero.description}
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-[#0A1A2F] mb-6">{content.story?.title || defaultContent.story.title}</h2>
              {(content.story?.paragraphs || defaultContent.story.paragraphs).map((paragraph: string, index: number) => (
                <p key={index} className="text-gray-700 mb-4 leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
            <div className="relative h-[500px] rounded-lg overflow-hidden shadow-xl">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1695067438561-75492f7b6a9c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBidWlsZGluZyUyMGFyY2hpdGVjdHVyZXxlbnwxfHx8fDE3NjQyMjQ5MTZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Modern building architecture"
                className="w-full h-full object-cover"
              />
            </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20 bg-[#F4F5F7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="text-center mb-12">
            <h2 className="text-[#0A1A2F] mb-4">{content.values?.title || defaultContent.values.title}</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {content.values?.description || defaultContent.values.description}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            <ValueCard
              icon={Heart}
              title="Integrity"
              description="We operate with honesty and transparency in all our dealings, building trust through ethical practices."
            />
            <ValueCard
              icon={Eye}
              title="Transparency"
              description="Clear, open communication and detailed reporting keep you informed every step of the way."
            />
            <ValueCard
              icon={Users}
              title="Client-Centricity"
              description="Your success is our success. We tailor our services to meet your unique investment goals."
            />
            <ValueCard
              icon={Lightbulb}
              title="Innovation"
              description="We embrace technology and modern practices to deliver superior service and results."
            />
            <ValueCard
              icon={Award}
              title="Expertise"
              description="A decade of experience combined with continuous learning keeps us at the industry forefront."
            />
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="text-center mb-12">
            <h2 className="text-[#0A1A2F] mb-4">{content.whyChoose?.title || defaultContent.whyChoose.title}</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {content.whyChoose?.description || defaultContent.whyChoose.description}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <BenefitCard
              icon={Target}
              title="Specialized Expertise"
              description="Deep knowledge of UK property laws, regulations, and market dynamics specifically for international investors."
            />
            <BenefitCard
              icon={Shield}
              title="Comprehensive Solutions"
              description="From property management to accounting and tax compliance, we handle all aspects of your investment."
            />
            <BenefitCard
              icon={BarChart}
              title="Transparent Reporting"
              description="Detailed monthly reports and real-time access to your property's financial performance through our online portal."
            />
            <BenefitCard
              icon={UserCheck}
              title="Dedicated Account Management"
              description="Your personal account manager knows your portfolio inside out and is always available to assist."
            />
            <BenefitCard
              icon={Calculator}
              title="Integrated Tax & Financial Support"
              description="Expert accounting services and tax planning through our partnership with Pluto Consultancy."
            />
            <BenefitCard
              icon={Laptop}
              title="Advanced Technology"
              description="State-of-the-art property management software and online portal for 24/7 access to your investment data."
            />
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Our Mission & Vision */}
      <section className="py-20 bg-[#0A1A2F]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="bg-white/5 p-8 rounded-lg">
              <div className="w-16 h-16 bg-[#C8A75B] rounded-full flex items-center justify-center mb-6">
                <Target size={32} className="text-white" />
              </div>
              <h3 className="text-white mb-4">{content.mission?.title || defaultContent.mission.title}</h3>
              <p className="text-gray-300 leading-relaxed">
                {content.mission?.content || defaultContent.mission.content}
              </p>
            </div>
            <div className="bg-white/5 p-8 rounded-lg">
              <div className="w-16 h-16 bg-[#C8A75B] rounded-full flex items-center justify-center mb-6">
                <Eye size={32} className="text-white" />
              </div>
              <h3 className="text-white mb-4">{content.vision?.title || defaultContent.vision.title}</h3>
              <p className="text-gray-300 leading-relaxed">
                {content.vision?.content || defaultContent.vision.content}
              </p>
            </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-[#C8A75B]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-5xl text-white mb-2">{siteSettings?.yearsOfExperience || content.stats?.years || defaultContent.stats.years}</div>
              <div className="text-white/90">Years Experience</div>
            </div>
            <div>
              <div className="text-5xl text-white mb-2">{siteSettings?.propertiesManaged || content.stats?.properties || defaultContent.stats.properties}</div>
              <div className="text-white/90">Properties Managed</div>
            </div>
            <div>
              <div className="text-5xl text-white mb-2">{siteSettings?.clientSatisfaction || content.stats?.satisfaction || defaultContent.stats.satisfaction}</div>
              <div className="text-white/90">Client Satisfaction</div>
            </div>
            <div>
              <div className="text-5xl text-white mb-2">{content.stats?.support || defaultContent.stats.support}</div>
              <div className="text-white/90">Support Available</div>
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
            <Button onClick={() => onNavigate('contact')}>
              Get in Touch
            </Button>
            <Button variant="outline" onClick={() => onNavigate('services')}>
              Explore Our Services
            </Button>
          </div>
          </div>
        </FadeIn>
      </section>
    </div>
  );
}
