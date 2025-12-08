import { useState } from 'react';
import { Button } from '../components/ui/button';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { FadeIn } from '../components/FadeIn';
import { Phone, Mail, MapPin, Clock, Send, MessageCircle, FileText } from 'lucide-react';
import { sendContactMessage } from '../lib/api';

interface ContactPageProps {
  onNavigate: (page: string) => void;
}

export function ContactPage({ onNavigate }: ContactPageProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError('');
    setIsSubmitting(true);

    try {
      await sendContactMessage(
        formData.name,
        formData.email,
        formData.phone,
        formData.message
      );
      setFormSubmitted(true);
      setFormData({ name: '', email: '', phone: '', message: '' });
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setFormSubmitted(false);
      }, 5000);
    } catch (error: any) {
      console.error('Error submitting contact form:', error);
      setSubmitError(error.message || 'Failed to send message. Please try again or contact us directly at info@modernservices.org.uk');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[400px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A1A2F]/90 to-[#0A1A2F]/70 z-10"></div>
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1740595198785-e3d0f90442e3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxMb25kb24lMjBza3lsaW5lJTIwbHV4dXJ5fGVufDF8fHx8MTc2NDI3NjU0M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
          alt="Contact us"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="relative z-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-white mb-4">Get In Touch</h1>
          <p className="text-xl text-gray-200">
            Let's discuss how we can help you achieve your property investment goals
          </p>
        </div>
      </section>

      {/* Contact Form & Info Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="text-[#0A1A2F] mb-6">Send Us a Message</h2>
              <p className="text-gray-600 mb-8">
                Fill out the form below and our team will get back to you within 24 hours.
              </p>

              {formSubmitted ? (
                <div className="bg-green-50 border border-green-200 text-green-800 p-6 rounded-lg mb-8">
                  <h4 className="text-green-900 mb-2">Thank You!</h4>
                  <p className="text-sm">Your message has been sent successfully to info@modernservices.org.uk. We'll be in touch soon.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {submitError && (
                    <div className="bg-red-50 border border-red-200 text-red-800 p-4 rounded-lg">
                      <p className="text-sm">{submitError}</p>
                    </div>
                  )}
                  <div>
                    <label htmlFor="name" className="block text-sm text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-sm focus:outline-none focus:border-[#C8A75B] transition-colors"
                      placeholder="John Smith"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-sm focus:outline-none focus:border-[#C8A75B] transition-colors"
                      placeholder="john.smith@email.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-sm focus:outline-none focus:border-[#C8A75B] transition-colors"
                      placeholder="+44 20 8058 7635"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm text-gray-700 mb-2">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="w-full px-4 py-3 border border-gray-300 rounded-sm focus:outline-none focus:border-[#C8A75B] transition-colors resize-none"
                      placeholder="Tell us about your property management needs..."
                    />
                  </div>

                  <Button type="submit" fullWidth className="bg-[#C8A75B] text-white hover:bg-[#B8964A] disabled:opacity-50" disabled={isSubmitting}>
                    <span className="flex items-center justify-center space-x-2">
                      <Send size={20} />
                      <span>{isSubmitting ? 'Sending...' : 'Send Message'}</span>
                    </span>
                  </Button>
                </form>
              )}
            </div>

            {/* Contact Information */}
            <div>
              <h2 className="text-[#0A1A2F] mb-6">Contact Information</h2>
              <p className="text-gray-600 mb-8">
                Reach out to us through any of the following channels. We're here to help!
              </p>

              <div className="space-y-6 mb-12">
                {/* Phone */}
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-[#F4F5F7] rounded-full flex items-center justify-center flex-shrink-0">
                    <Phone size={24} className="text-[#C8A75B]" />
                  </div>
                  <div>
                    <h4 className="text-[#0A1A2F] mb-2">Phone</h4>
                    <p className="text-gray-600">+44 20 8058 7635</p>
                    <p className="text-sm text-gray-500 mt-1">International rates may apply</p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-[#F4F5F7] rounded-full flex items-center justify-center flex-shrink-0">
                    <Mail size={24} className="text-[#C8A75B]" />
                  </div>
                  <div>
                    <h4 className="text-[#0A1A2F] mb-2">Email</h4>
                    <p className="text-gray-600">info@modernservices.org.uk</p>
                    <p className="text-sm text-gray-500 mt-1">We respond within 24 hours</p>
                  </div>
                </div>

                {/* Company Registration */}
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-[#F4F5F7] rounded-full flex items-center justify-center flex-shrink-0">
                    <FileText size={24} className="text-[#C8A75B]" />
                  </div>
                  <div>
                    <h4 className="text-[#0A1A2F] mb-2">Company Registration</h4>
                    <p className="text-gray-600">Company Registration No: OC407556 </p>
                  </div>
                </div>

                {/* Hours */}
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-[#F4F5F7] rounded-full flex items-center justify-center flex-shrink-0">
                    <Clock size={24} className="text-[#C8A75B]" />
                  </div>
                  <div>
                    <h4 className="text-[#0A1A2F] mb-2">Operating Hours</h4>
                    <p className="text-gray-600">Monday - Friday: 9:00 AM - 6:00 PM GMT</p>
                    <p className="text-gray-600">Saturday: 10:00 AM - 2:00 PM GMT</p>
                    <p className="text-gray-600">Sunday: Closed</p>
                    <p className="text-sm text-[#C8A75B] mt-1">24/7 Emergency Support Available</p>
                  </div>
                </div>
              </div>

              {/* WhatsApp CTA */}
              <div className="bg-[#25D366] p-6 rounded-lg text-white">
                <div className="flex items-center space-x-4 mb-4">
                  <MessageCircle size={32} />
                  <h4 className="text-white">Chat With Us Instantly</h4>
                </div>
                <p className="mb-6 text-white/90">
                  Get immediate assistance through WhatsApp. Perfect for quick questions or urgent matters.
                </p>
                <a
                  href="https://wa.me/447808646056"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-white text-[#25D366] px-6 py-3 rounded-sm hover:bg-gray-100 transition-colors"
                >
                  Start WhatsApp Chat
                </a>
              </div>
            </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-20 bg-[#F4F5F7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="text-center mb-12">
              <h2 className="text-[#0A1A2F] mb-4">Visit Our Office</h2>
              <p className="text-gray-600">
                Located in Harrow, we welcome visits by appointment
              </p>
            </div>
            
            {/* Embedded Google Map */}
            <div className="rounded-lg overflow-hidden shadow-lg max-w-4xl mx-auto">
              <iframe
                src="https://www.google.com/maps?q=51.5815206,-0.3381921&hl=en&z=14&output=embed"
                width="100%"
                height="400"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-[260px] sm:h-[320px] md:h-[400px]"
                title="Harrow Town Centre Location"
              ></iframe>
              <div className="bg-white px-4 py-3 sm:px-6 sm:py-4 flex items-center justify-center gap-2 border-t border-gray-200">
                <MapPin size={20} className="text-[#C8A75B]" />
                <a
                  href="https://www.google.com/maps/place/Harrow+Town+Centre/@51.5709394,-0.3559589,11.84z/data=!4m6!3m5!1s0x48761333164b39cb:0x9de5350251e21376!8m2!3d51.5815206!4d-0.3381921!16s%2Fg%2F11gtzgby1z?hl=en-US&entry=ttu&g_ep=EgoyMDI1MTIwMS4wIKXMDSoASAFQAw%3D%3D"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm sm:text-base text-[#0A1A2F] hover:text-[#C8A75B] underline underline-offset-4"
                >
                  Harrow Town Centre
                </a>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* FAQ Preview / Quick Info */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="text-center mb-12">
            <h2 className="text-[#0A1A2F] mb-4">Have Questions?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Here are some quick answers to common questions. For more detailed information, please contact us directly.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-[#F4F5F7] p-6 rounded-lg">
              <h4 className="text-[#0A1A2F] mb-3">How quickly can you start managing my property?</h4>
              <p className="text-gray-600 text-sm">
                We can typically onboard new properties within 5-7 business days after our initial consultation and agreement.
              </p>
            </div>

            <div className="bg-[#F4F5F7] p-6 rounded-lg">
              <h4 className="text-[#0A1A2F] mb-3">Do you manage properties outside London?</h4>
              <p className="text-gray-600 text-sm">
                Yes, we manage properties throughout England, including Manchester, Birmingham, Leeds, and other major cities.
              </p>
            </div>

            <div className="bg-[#F4F5F7] p-6 rounded-lg">
              <h4 className="text-[#0A1A2F] mb-3">What are your management fees?</h4>
              <p className="text-gray-600 text-sm">
                Our fees are competitive and transparent, varying based on property type and services required. Contact us for a personalized quote.
              </p>
            </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[#0A1A2F]">
        <FadeIn>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-white mb-6">Ready to Get Started?</h2>
          <p className="text-gray-300 text-lg mb-8">
            Join hundreds of satisfied international investors who trust Modern Services with their UK property investments.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button onClick={() => onNavigate('services')} className="bg-[#C8A75B] text-white hover:bg-[#B8964A]">
              Explore Our Services
            </Button>
            <Button variant="outline" className="bg-white/10 border-white text-white hover:bg-white hover:text-[#0A1A2F]" onClick={() => onNavigate('about')}>
              Learn About Us
            </Button>
          </div>
          </div>
        </FadeIn>
      </section>
    </div>
  );
}
