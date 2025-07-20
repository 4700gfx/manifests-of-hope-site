import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useShopify } from '../context/ShopifyContext'
import logo from '../assets/images/manifest-of-hope-logo-white.png'

const Navbar = () => {
  const location = useLocation();
  const { cart } = useShopify();
  
  // Calculate total items in cart
  const cartItemCount = cart ? cart.lineItems.reduce((total, item) => total + item.quantity, 0) : 0;
  
  // Function to handle smooth scrolling to sections
  const handleScrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start',
        inline: 'nearest'
      });
    }
  };
  
  const navTabs = {
    home: { name: "Home", sectionId: "home", isScroll: true },
    aboutMe: { name: "About Me", sectionId: "about", isScroll: true },
    journeys: { name: "Journeys", path: "/journeys", isScroll: false },
    stories: { name: "Stories", sectionId: "stories", isScroll: true },
    shop: { name: "Shop", path: "/shop", isScroll: false },
  };

  return (
    <header className="text-white font-belleza relative z-50">
      <nav className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">
        {/* Logo */}
        <div className="flex items-center space-x-3">
          <Link to="/">
            <img src={logo} alt="logo" className="h-12 w-auto hover:scale-105 transition-transform duration-300" />
          </Link>
        </div>

        {/* Nav links - centered */}
        <ul className="flex space-x-2 font-semibold">
          {Object.keys(navTabs).map((key) => {
            const tab = navTabs[key];
            
            return (
              <li key={key} className="relative group">
                {tab.isScroll ? (
                  // Scroll to section button
                  <button 
                    onClick={() => handleScrollToSection(tab.sectionId)}
                    className={`text-lg font-bold px-5 py-2.5 block rounded-full transition-all duration-300 ease-in-out hover:bg-hope-aquablue/20 hover:backdrop-blur-sm hover:text-hope-platinum hover:scale-105 hover:-translate-y-0.5 relative overflow-hidden cursor-pointer`}
                  >
                    {tab.name}
                    {/* Subtle underline effect */}
                    <span className="absolute bottom-1 left-1/2 w-0 h-0.5 bg-hope-platinum rounded-full transition-all duration-300 group-hover:w-3/4 group-hover:left-1/8"></span>
                  </button>
                ) : (
                  // Regular router link
                  <Link 
                    to={tab.path}
                    className={`text-lg font-bold px-5 py-2.5 block rounded-full transition-all duration-300 ease-in-out hover:bg-hope-aquablue/20 hover:backdrop-blur-sm hover:text-hope-platinum hover:scale-105 hover:-translate-y-0.5 relative overflow-hidden ${
                      location.pathname === tab.path ? 'text-hope-platinum bg-hope-aquablue/10' : ''
                    }`}
                  >
                    {tab.name}
                    {/* Subtle underline effect */}
                    <span className="absolute bottom-1 left-1/2 w-0 h-0.5 bg-hope-platinum rounded-full transition-all duration-300 group-hover:w-3/4 group-hover:left-1/8"></span>
                  </Link>
                )}
              </li>
            )
          })}
        </ul>

        {/* Buttons, Cart, and Social Media - right side */}
        <div className="flex items-center space-x-4">
          {/* Cart Icon */}
          <Link 
            to="/cart" 
            className="group relative p-3 rounded-full hover:bg-hope-aquablue/20 hover:scale-110 transition-all duration-300 ease-in-out"
            aria-label="Shopping Cart"
          >
            <svg 
              className="w-6 h-6 text-white group-hover:text-hope-platinum transition-colors duration-300" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m0 0h8m-8 0a2 2 0 100 4 2 2 0 000-4zm8 0a2 2 0 100 4 2 2 0 000-4z" 
              />
            </svg>
            
            {/* Cart item count badge */}
            {cartItemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-hope-platinum text-hope-aquablue text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center animate-pulse shadow-lg">
                {cartItemCount > 99 ? '99+' : cartItemCount}
              </span>
            )}
            
            {/* Hover tooltip */}
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-black/80 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
              {cartItemCount > 0 ? `${cartItemCount} item${cartItemCount > 1 ? 's' : ''}` : 'Cart is empty'}
            </div>
          </Link>

          {/* Buttons */}
          <div className="flex space-x-3">
            <button className='group bg-hope-platinum text-hope-aquablue px-8 py-2 rounded-full font-bold font-belleza hover:bg-white hover:scale-105 hover:-translate-y-1 hover:shadow-lg transition-all duration-300 ease-in-out relative overflow-hidden'>
              <span className="relative z-10">Contact Me</span>
              <div className="absolute inset-0 bg-gradient-to-r from-white to-hope-platinum opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full"></div>
            </button>
            <button className='group bg-transparent border-2 border-hope-platinum text-hope-platinum px-8 py-2 rounded-full font-bold font-belleza hover:bg-hope-platinum hover:text-hope-aquablue hover:scale-105 hover:-translate-y-1 hover:shadow-lg transition-all duration-300 ease-in-out'>
              Learn More
            </button>
          </div>

          {/* Social Media Icons */}
          <div className="flex items-center space-x-3 ml-4 pl-4 border-l border-white/20">
            {/* Instagram */}
            <a 
              href="https://www.instagram.com/hopeyousmile" 
              className="group p-2 rounded-full hover:bg-hope-aquablue/20 hover:scale-110 transition-all duration-300 ease-in-out"
              aria-label="Instagram"
            >
              <svg className="w-5 h-5 text-white group-hover:text-hope-platinum transition-colors duration-300" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>

            {/* Facebook */}
            <a 
              href="https://www.facebook.com/HopeYouSmilee?mibextid=wwXIfr&rdid=tC8QRO4bPqZzf8DJ&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F18oWW1BBUx%2F%3Fmibextid%3DwwXIfr" 
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
      </nav>
    </header>
  );
}

export default Navbar