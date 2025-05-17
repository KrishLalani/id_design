import React from 'react';
import './Hero.css';

const Hero = () => {
  const socials = [
    {
      name: 'Instagram',
      icon: '/icons/instagram.svg',
      link: 'https://www.instagram.com',
    },
    {
      name: 'WhatsApp',
      icon: '/icons/whatsapp.svg',
      link: 'https://wa.me/',
    },
    {
      name: 'Facebook',
      icon: '/icons/facebook.svg',
      link: 'https://www.facebook.com',
    },
    {
      name: 'YouTube',
      icon: '/icons/youtube.svg',
      link: 'https://www.youtube.com',
    },
    {
      name: 'LinkedIn',
      icon: '/icons/linkedin.svg',
      link: 'https://www.linkedin.com',
    },
    {
      name: 'Pinterest',
      icon: '/icons/pinterest.svg',
      link: 'https://www.pinterest.com',
    },
    {
      name: 'Houzz',
      icon: '/icons/houzz.svg',
      link: 'https://www.houzz.com',
    },
  ];

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
    >
      {/* Background Image + Overlay */}
      <div className="absolute inset-0 z-0 bg-opacity-50">
  <video
    className="w-full h-full object-cover"
    src='/video/video2.mp4' // replace with your video path
    autoPlay
    loop
    muted
    playsInline
  />
  <div className="absolute inset-0 bg-black bg-opacity-50"></div>
</div>


      {/* Geometric Accent Elements */}
      <div className="absolute inset-0 z-1 opacity-20">
        <div className="absolute top-10 left-10 w-32 h-32 border-2 rounded-full border-accent animate-spin-slow"></div>
        <div className="absolute bottom-20 right-20 w-48 h-48 border-2 border-accent rotate-45"></div>
      </div>

      {/* Social Media Sidebar */}
      <div className="hidden sm:flex fixed top-1/3 left-0 z-50 flex-col items-center space-y-4 bg-white/90 p-3 rounded-r-lg shadow-xl border-r border-t border-b border-accent">
        {socials.map((social, index) => (
          <a
            key={index}
            href={social.link}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-transform duration-300 hover:scale-110"
          >
            <img
              src={social.icon}
              alt={social.name}
              className="w-6 h-6 sm:w-7 sm:h-7 object-contain"
              title={social.name}
            />
          </a>
        ))}
      </div>

      {/* Mobile Social Media Icons */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 z-50 flex justify-center items-center bg-white/90 py-2 border-t border-accent">
        <div className="flex space-x-5">
          {socials.slice(0, 5).map((social, index) => (
            <a
              key={index}
              href={social.link}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={social.icon}
                alt={social.name}
                className="w-6 h-6 object-contain"
                title={social.name}
              />
            </a>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 z-10 text-center">
        <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 md:mb-6 animate-fadeIn drop-shadow-lg font-heading">
          Transforming Spaces into <span className="text-accent">Masterpieces</span>
        </h1>
        <div className="w-24 h-1 bg-accent mx-auto mb-6 md:mb-8"></div>
        <p className="text-xl md:text-2xl text-gray-200 mb-6 md:mb-8 animate-slideIn max-w-3xl mx-auto">
          Crafting personalized, luxurious interiors that reflect your unique style and vision.
        </p>
        <div className="flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-6">
          <a
            href="#services"
            className="bg-white text-gray-800 px-6 md:px-8 py-3 md:py-4 rounded-lg hover:bg-gray-200 transition-colors animate-pulse font-semibold shadow-lg border border-accent"
          >
            Discover Our Expertise
          </a>
          <a
            href="#portfolio"
            className="bg-accent text-white px-6 md:px-8 py-3 md:py-4 rounded-lg hover:bg-accent-dark transition-colors font-semibold shadow-lg"
          >
            Explore Our Portfolio
          </a>
        </div>
      </div>

      {/* Elegant Decorative Element */}
      <div className="absolute bottom-32 left-10 hidden md:block">
        <div className="w-16 h-16 border-l-2 border-b-2 border-accent opacity-70"></div>
      </div>

      {/* Floating WhatsApp Button */}
      <div className="floating-chair">
        <a
          href="https://wa.me/919999999999?text=Hi%20there!%20I%20love%20your%20interior%20design%20work.%20Let's%20chat!"
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center"
        >
          <div className="p-3 bg-white rounded-full shadow-xl hover:scale-110 transition-transform duration-300">
            <img
              src="/icons/whatsapp_2.svg"
              alt="WhatsApp"
              className="w-10 h-10 md:w-12 md:h-12"
            />
          </div>
          <p className="floating-text mt-2">Free Consultation</p>
        </a>
      </div>

    </section>
  );
};

export default Hero;