import React, { useState } from 'react';
import './Services.css';

const Services = () => {
  const [activeService, setActiveService] = useState(0);
  
  const services = [
    {
      title: 'Interior Designing (2D/3D)',
      description: 'Transform your space with our expert interior design services. We blend artistic vision with technical precision to create stunning 2D concepts and immersive 3D visualizations that bring your dreams to life.',
      icon: '🛋️'
    },
    {
      title: 'Exterior Designing (3D)',
      description: 'Make a lasting impression with our photorealistic 3D exterior designs. We carefully consider architectural elements, landscaping, and lighting to create harmonious and striking exteriors.',
      icon: '🏡'
    },
    {
      title: 'Turnkey Interior Projects',
      description: 'Experience hassle-free transformations with our comprehensive turnkey service. From initial concept to final installation, we handle every aspect of your interior project with meticulous attention to detail.',
      icon: '🛠️'
    },
    {
      title: 'Commercial Projects',
      description: 'Elevate your business environment with our specialized commercial design services. We create functional, inspiring spaces for retail, hospitality, and corporate settings that enhance brand experience.',
      icon: '🏢'
    },
    {
      title: 'Luxury Home Projects',
      description: 'Indulge in bespoke luxury interiors crafted to reflect your unique personality and lifestyle. We specialize in curating high-end finishes, exclusive materials, and custom elements for discerning clients.',
      icon: '✨'
    },
  ];

  return (
    <section id="services" className="services-section">
      <div className="services-container">
        <div className="services-header">
          <h2>Our Design <span>Services</span></h2>
          <p>Transforming spaces with expertise and creativity</p>
        </div>
        
        <div className="services-content">
          <div className="services-tabs">
            {services.map((service, index) => (
              <div 
                key={index} 
                className={`service-tab ${activeService === index ? 'active' : ''}`}
                onClick={() => setActiveService(index)}
              >
                <span className="service-icon">{service.icon}</span>
                <h3>{service.title}</h3>
              </div>
            ))}
          </div>
          
          <div className="service-card">
            <div className="service-info">
              <h3>{services[activeService].title}</h3>
              <p>{services[activeService].description}</p>
              <button className="service-cta">Request Consultation</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;