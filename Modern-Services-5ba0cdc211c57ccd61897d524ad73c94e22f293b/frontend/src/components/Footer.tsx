import { Mail, Phone, FileText, Shield } from 'lucide-react';
import { useEffect, useState } from 'react';
import { getSiteSettings, SiteSettings } from '../lib/api';

interface FooterProps {
  onNavigate: (page: string) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  const currentYear = new Date().getFullYear();
  const [siteSettings, setSiteSettings] = useState<SiteSettings | null>(null);

  // Load site settings
  useEffect(() => {
    getSiteSettings().then(setSiteSettings).catch(() => null);
  }, []);

  return (
    <footer className="bg-[#0A1A2F] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-[#C8A75B]">Modern Services</h3>
            <p className="text-gray-300 text-sm mb-4">
              Your trusted partner for property management in England. Serving international investors with excellence for over {siteSettings?.yearsOfExperience || '10+'} years.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => onNavigate('home')}
                  className="text-gray-300 hover:text-[#C8A75B] transition-colors text-sm"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="text-gray-300 hover:text-[#C8A75B] transition-colors text-sm"
                >
                  About Us
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('services')}
                  className="text-gray-300 hover:text-[#C8A75B] transition-colors text-sm"
                >
                  Services
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('testimonials')}
                  className="text-gray-300 hover:text-[#C8A75B] transition-colors text-sm"
                >
                  Testimonials
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('contact')}
                  className="text-gray-300 hover:text-[#C8A75B] transition-colors text-sm"
                >
                  Contact
                </button>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>Property Management</li>
              <li>Tenant Services</li>
              <li>Financial Management</li>
              <li>Maintenance & Repairs</li>
              <li>Tax & Legal Compliance</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-3 text-sm text-gray-300">
              <li className="flex items-start space-x-2">
                <Phone size={16} className="text-[#C8A75B] mt-1 flex-shrink-0" />
                <span>+44 20 8058 7635</span>
              </li>
              <li className="flex items-start space-x-2">
                <Mail size={16} className="text-[#C8A75B] mt-1 flex-shrink-0" />
                <span>info@modernservices.org.uk</span>
              </li>
              <li className="flex items-start space-x-2">
                <FileText size={16} className="text-[#C8A75B] mt-1 flex-shrink-0" />
                <span>Company Registration No: OC407556 </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm">
              © {currentYear} Modern Services. All rights reserved.
            </p>
            <div className="flex items-center space-x-6 text-sm text-gray-400">
              <button className="hover:text-[#C8A75B] transition-colors">Privacy Policy</button>
              <button className="hover:text-[#C8A75B] transition-colors">Terms of Service</button>
              <button
                onClick={() => onNavigate('admin')}
                className="flex items-center space-x-1 hover:text-[#C8A75B] transition-colors"
                title="Admin Login"
              >
                <Shield size={16} />
                <span>Admin</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

