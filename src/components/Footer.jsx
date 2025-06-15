import React from 'react'
import logo from '../assets/images/manifest-of-hope-logo-white.png'

const Footer = () => {
  const navLinks = {
    home: "Home",
    aboutMe: "About Me",
    journeys: "Journeys",
    stories: "Stories",
  };

  const services = [
    "Life Coaching",
    "Spiritual Guidance",
    "Mindfulness Workshops",
    "Goal Setting",
    "Personal Development"
  ];

  const contactInfo = {
    email: "hello@manifestofhope.com",
    phone: "(555) 123-4567"
  };

  return (
    <footer className="bg-gradient-to-t from-black/50 to-transparent backdrop-blur-sm border-t border-white/10 text-white font-belleza mt-20">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          
          {/* Logo and Description */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-3 mb-4">
              <img 
                src={logo} 
                alt="Manifest of Hope Logo" 
                className="h-10 w-auto hover:scale-105 transition-transform duration-300" 
              />
            </div>
            <p className="text-white/80 leading-relaxed mb-3 text-sm">
              Empowering your journey to manifest your highest potential through personalized coaching and spiritual guidance.
            </p>
            
            {/* Social Media Icons */}
            <div className="flex items-center space-x-3">
              {/* Instagram */}
              <a 
                href="#" 
                className="group p-2 rounded-full hover:bg-hope-aquablue/20 hover:scale-110 transition-all duration-300 ease-in-out"
                aria-label="Instagram"
              >
                <svg className="w-5 h-5 text-white group-hover:text-hope-platinum transition-colors duration-300" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>

              {/* Facebook */}
              <a 
                href="#" 
                className="group p-2 rounded-full hover:bg-hope-aquablue/20 hover:scale-110 transition-all duration-300 ease-in-out"
                aria-label="Facebook"
              >
                <svg className="w-5 h-5 text-white group-hover:text-hope-platinum transition-colors duration-300" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>

              {/* X (Twitter) */}
              <a 
                href="#" 
                className="group p-2 rounded-full hover:bg-hope-aquablue/20 hover:scale-110 transition-all duration-300 ease-in-out"
                aria-label="X (Twitter)"
              >
                <svg className="w-5 h-5 text-white group-hover:text-hope-platinum transition-colors duration-300" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-hope-platinum font-bold mb-3">Quick Links</h3>
            <ul className="space-y-1">
              {Object.keys(navLinks).map((key) => (
                <li key={key}>
                  <a 
                    href="#" 
                    className="text-white/80 hover:text-hope-platinum transition-colors duration-300 hover:translate-x-1 inline-block text-sm"
                  >
                    {navLinks[key]}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-hope-platinum font-bold mb-3">Services</h3>
            <ul className="space-y-1">
              {services.slice(0, 4).map((service, index) => (
                <li key={index}>
                  <a 
                    href="#" 
                    className="text-white/80 hover:text-hope-platinum transition-colors duration-300 hover:translate-x-1 inline-block text-sm"
                  >
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-hope-platinum font-bold mb-3">Get In Touch</h3>
            <div className="space-y-2">
              <a 
                href={`mailto:${contactInfo.email}`}
                className="text-white/80 hover:text-hope-platinum transition-colors duration-300 block text-sm"
              >
                {contactInfo.email}
              </a>
              <a 
                href={`tel:${contactInfo.phone}`}
                className="text-white/80 hover:text-hope-platinum transition-colors duration-300 block text-sm"
              >
                {contactInfo.phone}
              </a>
              
              {/* CTA Button */}
              <div className="pt-2">
                <button className='group bg-hope-platinum text-hope-aquablue px-4 py-1.5 rounded-full font-bold font-belleza hover:bg-white hover:scale-105 transition-all duration-300 ease-in-out relative overflow-hidden text-sm'>
                  <span className="relative z-10">Contact Me</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-white to-hope-platinum opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full"></div>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-4 flex flex-col md:flex-row justify-between items-center text-xs text-white/60">
          <p>&copy; {new Date().getFullYear()} Manifest of Hope. All rights reserved.</p>
          <div className="flex space-x-4 mt-2 md:mt-0">
            <a href="#" className="hover:text-hope-platinum transition-colors duration-300">Privacy Policy</a>
            <a href="#" className="hover:text-hope-platinum transition-colors duration-300">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;