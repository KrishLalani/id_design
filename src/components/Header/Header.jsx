// Header.jsx
import React, { useState, useEffect } from "react";
import "./Header.css";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      // Header transparency effect
      if (window.scrollY > 30) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      // Active section detection
      const sections = ["home", "services", "projects", "contact"];
      const currentSection = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });

      if (currentSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="header">
      <nav className={`floating-navbar ${scrolled ? "scrolled" : ""}`}>
        <div className="brand">
          <img src="../../../images/id_logo_black.png" alt="Logo" className="logo" />
          <span className="brand-inline">
            <span className="brand-main">INCRIVEL</span>
            <span className="brand-sub">Design Studio</span>
          </span>
        </div>

        <div className={`nav-links ${isMenuOpen ? "open" : ""}`}>
          <a 
            href="#home" 
            className={`nav-button ${activeSection === "home" ? "active" : ""}`}
            onClick={closeMenu}
          >
            Home
          </a>
          <a 
            href="#services" 
            className={`nav-button ${activeSection === "services" ? "active" : ""}`}
            onClick={closeMenu}
          >
            Services
          </a>
          <a 
            href="#projects" 
            className={`nav-button ${activeSection === "projects" ? "active" : ""}`}
            onClick={closeMenu}
          >
            Projects
          </a>
          <a 
            href="#contact" 
            className={`nav-button ${activeSection === "contact" ? "active" : ""}`}
            onClick={closeMenu}
          >
            Contact
          </a>
          <a 
            href="#quote" 
            className="quote-button"
            onClick={closeMenu}
          >
            Get Quote
          </a>
        </div>

        <button className="menu-toggle" onClick={toggleMenu} aria-label="Toggle menu">
          {isMenuOpen ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </nav>
      
      {/* Mobile overlay background */}
      {isMenuOpen && <div className="mobile-overlay" onClick={closeMenu}></div>}
    </header>
  );
};

export default Header;