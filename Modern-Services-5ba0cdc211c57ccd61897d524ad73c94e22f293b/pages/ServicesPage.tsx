import { useState } from 'react';
import { Button } from '../components/ui/button';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { FadeIn } from '../components/FadeIn';
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

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

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
          <h1 className="text-white mb-4">Our Services</h1>
          <p className="text-xl text-gray-200">
            Comprehensive property management and accounting solutions for international investors
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
                  <h2 className="text-[#0A1A2F] mb-4">Comprehensive Property Management</h2>
                  <p className="text-gray-600 max-w-3xl mx-auto text-lg">
                    Full-service property management designed specifically for international investors. We handle every aspect of your property investment, allowing you to enjoy passive income with complete peace of mind.
                  </p>
                </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            <div className="bg-[#F4F5F7] p-6 rounded-lg">
              <div className="flex items-center space-x-2 mb-3">
                <span className="text-[#C8A75B] text-2xl">✓</span>
                <span className="text-[#0A1A2F]">Professional tenant screening</span>
              </div>
            </div>
            <div className="bg-[#F4F5F7] p-6 rounded-lg">
              <div className="flex items-center space-x-2 mb-3">
                <span className="text-[#C8A75B] text-2xl">✓</span>
                <span className="text-[#0A1A2F]">24/7 emergency support</span>
              </div>
            </div>
            <div className="bg-[#F4F5F7] p-6 rounded-lg">
              <div className="flex items-center space-x-2 mb-3">
                <span className="text-[#C8A75B] text-2xl">✓</span>
                <span className="text-[#0A1A2F]">Rent collection & management</span>
              </div>
            </div>
            <div className="bg-[#F4F5F7] p-6 rounded-lg">
              <div className="flex items-center space-x-2 mb-3">
                <span className="text-[#C8A75B] text-2xl">✓</span>
                <span className="text-[#0A1A2F]">Property maintenance & repairs</span>
              </div>
            </div>
            <div className="bg-[#F4F5F7] p-6 rounded-lg">
              <div className="flex items-center space-x-2 mb-3">
                <span className="text-[#C8A75B] text-2xl">✓</span>
                <span className="text-[#0A1A2F]">Legal compliance & reporting</span>
              </div>
            </div>
            <div className="bg-[#F4F5F7] p-6 rounded-lg">
              <div className="flex items-center space-x-2 mb-3">
                <span className="text-[#C8A75B] text-2xl">✓</span>
                <span className="text-[#0A1A2F]">Market analysis & advice</span>
              </div>
            </div>
          </div>

          {/* Expandable Sub-Services */}
          <div className="space-y-4">
            {/* Rent Collection */}
            <div className="border border-gray-200 rounded-lg overflow-hidden">
              <button
                onClick={() => toggleSection('rent-collection')}
                className="w-full flex items-center justify-between p-6 bg-white hover:bg-[#F4F5F7] transition-colors"
              >
                <div className="flex items-center space-x-4">
                  <Wallet size={24} className="text-[#C8A75B]" />
                  <h3 className="text-[#0A1A2F]">Rent Collection & Financial Management</h3>
                </div>
                {expandedSection === 'rent-collection' ? <ChevronUp /> : <ChevronDown />}
              </button>
              {expandedSection === 'rent-collection' && (
                <div className="p-6 bg-[#F4F5F7] border-t border-gray-200">
                  <p className="text-gray-700 mb-4">
                    We ensure timely rent collection and provide transparent financial reporting for your peace of mind.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start space-x-2">
                      <span className="text-[#C8A75B] mt-1">•</span>
                      <span className="text-gray-700">Automated monthly rent collection</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-[#C8A75B] mt-1">•</span>
                      <span className="text-gray-700">Detailed monthly financial statements</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-[#C8A75B] mt-1">•</span>
                      <span className="text-gray-700">Direct deposit to your international account</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-[#C8A75B] mt-1">•</span>
                      <span className="text-gray-700">Arrears management and recovery</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-[#C8A75B] mt-1">•</span>
                      <span className="text-gray-700">Online portal access to financial data</span>
                    </li>
                  </ul>
                </div>
              )}
            </div>

            {/* Tax & Legal Compliance */}
            <div className="border border-gray-200 rounded-lg overflow-hidden">
              <button
                onClick={() => toggleSection('tax-compliance')}
                className="w-full flex items-center justify-between p-6 bg-white hover:bg-[#F4F5F7] transition-colors"
              >
                <div className="flex items-center space-x-4">
                  <FileCheck size={24} className="text-[#C8A75B]" />
                  <h3 className="text-[#0A1A2F]">Tax & Legal Compliance</h3>
                </div>
                {expandedSection === 'tax-compliance' ? <ChevronUp /> : <ChevronDown />}
              </button>
              {expandedSection === 'tax-compliance' && (
                <div className="p-6 bg-[#F4F5F7] border-t border-gray-200">
                  <p className="text-gray-700 mb-4">
                    Stay compliant with UK property laws and tax regulations while optimizing your tax position.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start space-x-2">
                      <span className="text-[#C8A75B] mt-1">•</span>
                      <span className="text-gray-700">Safety certificate management (Gas, EPC, EICR)</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-[#C8A75B] mt-1">•</span>
                      <span className="text-gray-700">Landlord licensing and registration</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-[#C8A75B] mt-1">•</span>
                      <span className="text-gray-700">Tenancy deposit protection</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-[#C8A75B] mt-1">•</span>
                      <span className="text-gray-700">Tax reporting and HMRC compliance</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-[#C8A75B] mt-1">•</span>
                      <span className="text-gray-700">Right to Rent checks</span>
                    </li>
                  </ul>
                </div>
              )}
            </div>

            {/* Tenant Sourcing */}
            <div className="border border-gray-200 rounded-lg overflow-hidden">
              <button
                onClick={() => toggleSection('tenant-sourcing')}
                className="w-full flex items-center justify-between p-6 bg-white hover:bg-[#F4F5F7] transition-colors"
              >
                <div className="flex items-center space-x-4">
                  <Users size={24} className="text-[#C8A75B]" />
                  <h3 className="text-[#0A1A2F]">Tenant Sourcing & Management</h3>
                </div>
                {expandedSection === 'tenant-sourcing' ? <ChevronUp /> : <ChevronDown />}
              </button>
              {expandedSection === 'tenant-sourcing' && (
                <div className="p-6 bg-[#F4F5F7] border-t border-gray-200">
                  <p className="text-gray-700 mb-4">
                    Find and retain high-quality tenants through our rigorous screening and relationship management process.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start space-x-2">
                      <span className="text-[#C8A75B] mt-1">•</span>
                      <span className="text-gray-700">Professional property marketing</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-[#C8A75B] mt-1">•</span>
                      <span className="text-gray-700">Comprehensive tenant screening (credit, employment, references)</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-[#C8A75B] mt-1">•</span>
                      <span className="text-gray-700">Property viewings and tenant selection</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-[#C8A75B] mt-1">•</span>
                      <span className="text-gray-700">Tenancy agreement preparation</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-[#C8A75B] mt-1">•</span>
                      <span className="text-gray-700">Move-in inspections and inventory</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-[#C8A75B] mt-1">•</span>
                      <span className="text-gray-700">Ongoing tenant relationship management</span>
                    </li>
                  </ul>
                </div>
              )}
            </div>

            {/* Short-Term Rentals */}
            <div className="border border-gray-200 rounded-lg overflow-hidden">
              <button
                onClick={() => toggleSection('short-term')}
                className="w-full flex items-center justify-between p-6 bg-white hover:bg-[#F4F5F7] transition-colors"
              >
                <div className="flex items-center space-x-4">
                  <Home size={24} className="text-[#C8A75B]" />
                  <h3 className="text-[#0A1A2F]">Short-Term Rental Management</h3>
                </div>
                {expandedSection === 'short-term' ? <ChevronUp /> : <ChevronDown />}
              </button>
              {expandedSection === 'short-term' && (
                <div className="p-6 bg-[#F4F5F7] border-t border-gray-200">
                  <p className="text-gray-700 mb-4">
                    Maximize returns with professional Airbnb and short-term rental management.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start space-x-2">
                      <span className="text-[#C8A75B] mt-1">•</span>
                      <span className="text-gray-700">Listing optimization on multiple platforms</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-[#C8A75B] mt-1">•</span>
                      <span className="text-gray-700">Dynamic pricing strategies</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-[#C8A75B] mt-1">•</span>
                      <span className="text-gray-700">Guest communication and support</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-[#C8A75B] mt-1">•</span>
                      <span className="text-gray-700">Professional cleaning and turnover</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-[#C8A75B] mt-1">•</span>
                      <span className="text-gray-700">Review management</span>
                    </li>
                  </ul>
                </div>
              )}
            </div>

            {/* Maintenance */}
            <div className="border border-gray-200 rounded-lg overflow-hidden">
              <button
                onClick={() => toggleSection('maintenance')}
                className="w-full flex items-center justify-between p-6 bg-white hover:bg-[#F4F5F7] transition-colors"
              >
                <div className="flex items-center space-x-4">
                  <Wrench size={24} className="text-[#C8A75B]" />
                  <h3 className="text-[#0A1A2F]">Property Maintenance & Repairs</h3>
                </div>
                {expandedSection === 'maintenance' ? <ChevronUp /> : <ChevronDown />}
              </button>
              {expandedSection === 'maintenance' && (
                <div className="p-6 bg-[#F4F5F7] border-t border-gray-200">
                  <p className="text-gray-700 mb-4">
                    Keep your property in prime condition with proactive maintenance and rapid response repairs.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start space-x-2">
                      <span className="text-[#C8A75B] mt-1">•</span>
                      <span className="text-gray-700">24/7 emergency maintenance hotline</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-[#C8A75B] mt-1">•</span>
                      <span className="text-gray-700">Network of vetted, reliable contractors</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-[#C8A75B] mt-1">•</span>
                      <span className="text-gray-700">Preventive maintenance programs</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-[#C8A75B] mt-1">•</span>
                      <span className="text-gray-700">Property inspections (quarterly/bi-annual)</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-[#C8A75B] mt-1">•</span>
                      <span className="text-gray-700">Cost-effective repair solutions</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-[#C8A75B] mt-1">•</span>
                      <span className="text-gray-700">Detailed repair reports with photos</span>
                    </li>
                  </ul>
                </div>
              )}
            </div>

            {/* Market Analysis */}
            <div className="border border-gray-200 rounded-lg overflow-hidden">
              <button
                onClick={() => toggleSection('market-analysis')}
                className="w-full flex items-center justify-between p-6 bg-white hover:bg-[#F4F5F7] transition-colors"
              >
                <div className="flex items-center space-x-4">
                  <TrendingUp size={24} className="text-[#C8A75B]" />
                  <h3 className="text-[#0A1A2F]">Market Analysis & Investment Advice</h3>
                </div>
                {expandedSection === 'market-analysis' ? <ChevronUp /> : <ChevronDown />}
              </button>
              {expandedSection === 'market-analysis' && (
                <div className="p-6 bg-[#F4F5F7] border-t border-gray-200">
                  <p className="text-gray-700 mb-4">
                    Make informed decisions with expert market insights and investment guidance.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start space-x-2">
                      <span className="text-[#C8A75B] mt-1">•</span>
                      <span className="text-gray-700">Local market analysis and trends</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-[#C8A75B] mt-1">•</span>
                      <span className="text-gray-700">Rental yield optimization</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-[#C8A75B] mt-1">•</span>
                      <span className="text-gray-700">Property valuation services</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-[#C8A75B] mt-1">•</span>
                      <span className="text-gray-700">Portfolio growth strategies</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-[#C8A75B] mt-1">•</span>
                      <span className="text-gray-700">Investment opportunity identification</span>
                    </li>
                  </ul>
                </div>
              )}
            </div>

            {/* Property Marketing */}
            <div className="border border-gray-200 rounded-lg overflow-hidden">
              <button
                onClick={() => toggleSection('marketing')}
                className="w-full flex items-center justify-between p-6 bg-white hover:bg-[#F4F5F7] transition-colors"
              >
                <div className="flex items-center space-x-4">
                  <Search size={24} className="text-[#C8A75B]" />
                  <h3 className="text-[#0A1A2F]">Property Marketing</h3>
                </div>
                {expandedSection === 'marketing' ? <ChevronUp /> : <ChevronDown />}
              </button>
              {expandedSection === 'marketing' && (
                <div className="p-6 bg-[#F4F5F7] border-t border-gray-200">
                  <p className="text-gray-700 mb-4">
                    Minimize void periods with professional property marketing and advertising.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start space-x-2">
                      <span className="text-[#C8A75B] mt-1">•</span>
                      <span className="text-gray-700">Professional photography and videography</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-[#C8A75B] mt-1">•</span>
                      <span className="text-gray-700">Listing on major property portals (Rightmove, Zoopla)</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-[#C8A75B] mt-1">•</span>
                      <span className="text-gray-700">Social media promotion</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-[#C8A75B] mt-1">•</span>
                      <span className="text-gray-700">Virtual tours and 3D walkthroughs</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-[#C8A75B] mt-1">•</span>
                      <span className="text-gray-700">Targeted advertising campaigns</span>
                    </li>
                  </ul>
                </div>
              )}
            </div>

            {/* 24/7 Support */}
            <div className="border border-gray-200 rounded-lg overflow-hidden">
              <button
                onClick={() => toggleSection('support')}
                className="w-full flex items-center justify-between p-6 bg-white hover:bg-[#F4F5F7] transition-colors"
              >
                <div className="flex items-center space-x-4">
                  <Clock size={24} className="text-[#C8A75B]" />
                  <h3 className="text-[#0A1A2F]">24/7 Dedicated Support</h3>
                </div>
                {expandedSection === 'support' ? <ChevronUp /> : <ChevronDown />}
              </button>
              {expandedSection === 'support' && (
                <div className="p-6 bg-[#F4F5F7] border-t border-gray-200">
                  <p className="text-gray-700 mb-4">
                    Round-the-clock support for you and your tenants, wherever you are in the world.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start space-x-2">
                      <span className="text-[#C8A75B] mt-1">•</span>
                      <span className="text-gray-700">Dedicated account manager</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-[#C8A75B] mt-1">•</span>
                      <span className="text-gray-700">24/7 emergency hotline</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-[#C8A75B] mt-1">•</span>
                      <span className="text-gray-700">Multi-language support</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-[#C8A75B] mt-1">•</span>
                      <span className="text-gray-700">Online owner portal access</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-[#C8A75B] mt-1">•</span>
                      <span className="text-gray-700">Regular performance reviews</span>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
              </div>

              {/* Accounting Services */}
              <div>
                <div className="text-center mb-12">
                  <div className="w-20 h-20 bg-[#0A1A2F] rounded-full flex items-center justify-center mx-auto mb-6">
                    <Calculator size={40} className="text-[#C8A75B]" />
                  </div>
                  <h2 className="text-[#0A1A2F] mb-4">Accounting Services</h2>
                  <p className="text-gray-600 max-w-3xl mx-auto text-lg">
                    Professional accounting and financial services to keep your property business compliant and profitable.
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-6 mb-12">
            <div className="bg-white p-8 rounded-lg shadow-md">
              <BookOpen size={32} className="text-[#C8A75B] mb-4" />
              <h4 className="text-[#0A1A2F] mb-3">Bookkeeping Services</h4>
              <p className="text-gray-600 text-sm mb-4">
                Accurate record-keeping of all property-related transactions and expenses.
              </p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start space-x-2">
                  <span className="text-[#C8A75B]">•</span>
                  <span className="text-gray-700">Income and expense tracking</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-[#C8A75B]">•</span>
                  <span className="text-gray-700">Bank reconciliation</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-[#C8A75B]">•</span>
                  <span className="text-gray-700">Financial reporting</span>
                </li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md">
              <UserCheck size={32} className="text-[#C8A75B] mb-4" />
              <h4 className="text-[#0A1A2F] mb-3">Payroll Processing</h4>
              <p className="text-gray-600 text-sm mb-4">
                Efficient payroll management for property staff and contractors.
              </p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start space-x-2">
                  <span className="text-[#C8A75B]">•</span>
                  <span className="text-gray-700">Employee payment processing</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-[#C8A75B]">•</span>
                  <span className="text-gray-700">PAYE and NI calculations</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-[#C8A75B]">•</span>
                  <span className="text-gray-700">Pension auto-enrolment</span>
                </li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md">
              <BarChart size={32} className="text-[#C8A75B] mb-4" />
              <h4 className="text-[#0A1A2F] mb-3">Accounts Preparation</h4>
              <p className="text-gray-600 text-sm mb-4">
                Year-end accounts preparation for tax filing and business planning.
              </p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start space-x-2">
                  <span className="text-[#C8A75B]">•</span>
                  <span className="text-gray-700">Annual financial statements</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-[#C8A75B]">•</span>
                  <span className="text-gray-700">Management accounts</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-[#C8A75B]">•</span>
                  <span className="text-gray-700">Budget forecasting</span>
                </li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md">
              <FileCheck size={32} className="text-[#C8A75B] mb-4" />
              <h4 className="text-[#0A1A2F] mb-3">Tax Compliance</h4>
              <p className="text-gray-600 text-sm mb-4">
                Comprehensive tax support for UK property investors.
              </p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start space-x-2">
                  <span className="text-[#C8A75B]">•</span>
                  <span className="text-gray-700">Self-assessment tax returns</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-[#C8A75B]">•</span>
                  <span className="text-gray-700">Corporation tax filing</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-[#C8A75B]">•</span>
                  <span className="text-gray-700">VAT registration and returns</span>
                </li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md">
              <Briefcase size={32} className="text-[#C8A75B] mb-4" />
              <h4 className="text-[#0A1A2F] mb-3">Business Start-up Support</h4>
              <p className="text-gray-600 text-sm mb-4">
                Guidance for launching and structuring your property business.
              </p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start space-x-2">
                  <span className="text-[#C8A75B]">•</span>
                  <span className="text-gray-700">Company formation</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-[#C8A75B]">•</span>
                  <span className="text-gray-700">Business structure advice</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-[#C8A75B]">•</span>
                  <span className="text-gray-700">Registration services</span>
                </li>
              </ul>
            </div>
          </div>

                {/* Pluto Consultancy CTA */}
                <div className="bg-[#0A1A2F] p-8 rounded-lg text-center">
                  <h3 className="text-white mb-4">Expert Accountancy & Tax Advice</h3>
                  <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
                    For comprehensive accountancy and tax consultancy services, visit our specialist partner Pluto Consultancy.
                  </p>
                  <a
                    href="https://plutoconsultancy.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-2 bg-[#C8A75B] text-white px-8 py-3 rounded-sm hover:bg-[#B39650] transition-colors"
                  >
                    <span>Visit Pluto Consultancy</span>
                    <ExternalLink size={20} />
                  </a>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <FadeIn>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-[#0A1A2F] mb-6">Let's Discuss Your Property Needs</h2>
          <p className="text-gray-600 text-lg mb-8">
            Schedule a free consultation to learn how our services can benefit your property investment.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button onClick={() => onNavigate('contact')}>
              Get Free Consultation
            </Button>
            <Button variant="outline" onClick={() => onNavigate('testimonials')}>
              Read Client Stories
            </Button>
          </div>
          </div>
        </FadeIn>
      </section>
    </div>
  );
}
