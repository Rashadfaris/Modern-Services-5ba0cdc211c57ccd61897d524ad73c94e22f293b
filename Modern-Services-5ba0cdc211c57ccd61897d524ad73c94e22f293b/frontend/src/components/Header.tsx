import { useState } from 'react';
import { Button } from './ui/button';
import { Menu, X } from 'lucide-react';

interface HeaderProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export function Header({ currentPage, onNavigate }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigation = [
    { name: 'Home', page: 'home' },
    { name: 'About', page: 'about' },
    { name: 'Services', page: 'services' },
    { name: 'Blog', page: 'blog' },
    { name: 'Testimonials', page: 'testimonials' },
    { name: 'Contact', page: 'contact' },
  ];

  const handleNavClick = (page: string) => {
    onNavigate(page);
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <button
              onClick={() => handleNavClick('home')}
              className="flex items-center gap-2 group"
              aria-label="Go to Modern Services home page"
            >
              <img
                src="/logo/Logo_with_House_and_Shield_Icon-removebg-preview.png"
                alt="Modern Services logo"
                className="h-12 w-auto sm:h-14 md:h-16 object-contain transition-transform duration-200 group-hover:scale-105"
              />
              <span className="text-xl sm:text-2xl font-bold text-[#0A1A2F] group-hover:text-[#C8A75B] transition-colors">
                Modern Services
              </span>
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:space-x-8">
            {navigation.map((item) => (
              <button
                key={item.page}
                onClick={() => handleNavClick(item.page)}
                className={`px-3 py-2 text-sm font-medium transition-colors ${
                  currentPage === item.page
                    ? 'text-[#C8A75B] border-b-2 border-[#C8A75B]'
                    : 'text-[#0A1A2F] hover:text-[#C8A75B]'
                }`}
              >
                {item.name}
              </button>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Button
              onClick={() => handleNavClick('contact')}
              className="bg-[#C8A75B] hover:bg-[#B39650] text-white"
            >
              Get Started
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-[#0A1A2F] hover:text-[#C8A75B] transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <div className="flex flex-col space-y-2">
              {navigation.map((item) => (
                <button
                  key={item.page}
                  onClick={() => handleNavClick(item.page)}
                  className={`px-4 py-2 text-left text-sm font-medium transition-colors ${
                    currentPage === item.page
                      ? 'text-[#C8A75B] bg-[#F4F5F7]'
                      : 'text-[#0A1A2F] hover:text-[#C8A75B] hover:bg-[#F4F5F7]'
                  }`}
                >
                  {item.name}
                </button>
              ))}
              <div className="pt-2">
                <Button
                  onClick={() => handleNavClick('contact')}
                  className="w-full bg-[#C8A75B] hover:bg-[#B39650] text-white"
                >
                  Get Started
                </Button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}

