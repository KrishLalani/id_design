import React from 'react';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const socialLinks = [
    { name: 'Instagram', icon: '/instagram.png', url: '#' },
    { name: 'Pinterest', icon: '/pinterest.png', url: '#' },
    { name: 'Houzz', icon: '/houzz.png', url: '#' },
    { name: 'LinkedIn', icon: '/linkedin.png', url: '#' },
    { name: 'Facebook', icon: '/facebook.png', url: '#' }
  ];

  const serviceLinks = [
    { name: 'Residential Design', url: '/services/residential' },
    { name: 'Commercial Spaces', url: '/services/commercial' },
    { name: 'Space Planning', url: '/services/planning' },
    { name: 'Custom Furniture', url: '/services/furniture' },
    { name: 'Color Consultation', url: '/services/color' }
  ];

  const contactInfo = {
    address: '123 Design Avenue, Creative District',
    city: 'New York, NY 10001',
    email: 'hello@incriveldesign.com',
    phone: '+1 (555) 123-4567'
  };

  return (
    <footer className="bg-neutral-900 text-white py-16">
      <div className="container mx-auto px-4">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Column 1: About */}
          <div className="flex flex-col">
            <img src="/id_logo_white.png" alt="Incrivel Design Logo" className="h-12 mb-4" />
            <p className="text-gray-300 mb-6">
              Transforming spaces with innovative design solutions that blend aesthetics, 
              functionality, and your unique style into harmonious living environments.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:opacity-80 transition-opacity"
                  aria-label={`Follow us on ${social.name}`}
                >
                  <img
                    src={social.icon}
                    alt={social.name}
                    className="h-6 w-6"
                  />
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Services */}
          <div className="flex flex-col">
            <h3 className="text-xl font-semibold mb-4">Our Services</h3>
            <ul className="space-y-2">
              {serviceLinks.map((service, index) => (
                <li key={index}>
                  <a 
                    href={service.url} 
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    {service.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact */}
          <div className="flex flex-col">
            <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
            <address className="not-italic text-gray-300">
              <p className="mb-2">{contactInfo.address}</p>
              <p className="mb-4">{contactInfo.city}</p>
              <p className="mb-2">
                <span className="font-semibold">Email: </span>
                <a href={`mailto:${contactInfo.email}`} className="hover:text-white transition-colors">
                  {contactInfo.email}
                </a>
              </p>
              <p>
                <span className="font-semibold">Phone: </span>
                <a href={`tel:${contactInfo.phone}`} className="hover:text-white transition-colors">
                  {contactInfo.phone}
                </a>
              </p>
            </address>
          </div>

          {/* Column 4: Newsletter */}
          <div className="flex flex-col">
            <h3 className="text-xl font-semibold mb-4">Design Inspiration</h3>
            <p className="text-gray-300 mb-4">
              Subscribe to our newsletter for the latest design trends, tips, and inspiration.
            </p>
            <form className="flex flex-col sm:flex-row">
              <input
                type="email"
                placeholder="Your email"
                className="px-4 py-2 bg-neutral-800 text-white border border-neutral-700 focus:outline-none focus:border-neutral-500 mb-2 sm:mb-0 sm:mr-2"
                required
              />
              <button
                type="submit"
                className="px-4 py-2 bg-amber-600 text-white hover:bg-amber-700 transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-neutral-700 my-8"></div>

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center text-gray-400 text-sm">
          <p>&copy; {currentYear} INCRIVEL DESIGN STUDIO. All rights reserved.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="/privacy" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="/terms" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="/sitemap" className="hover:text-white transition-colors">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;