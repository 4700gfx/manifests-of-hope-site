import React from 'react'
import logo from '../assets/images/manifest-of-hope-logo-white.png'

const Navbar = () => {
  const navTabs = {
    home: "Home",
    aboutMe: "About Me",
    journeys: "Journeys",
    stories: "Stories",
  };

  return (
    <header className="text-white font-belleza">
      <nav className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">
        {/* Logo */}
        <div className="flex items-center space-x-3">
          <img src={logo} alt="logo" className="h-12 w-auto" />
        </div>

        {/* Nav links - centered */}
        <ul className="flex space-x-8 font-semibold">
          {Object.keys(navTabs).map((key) => (
            <li key={key} className="hover:bg-hope-aquablue hover:rounded-full transition duration-300">
              <a href="#" className="text-lg font-bold px-4 py-3 block">{navTabs[key]}</a>
            </li>
          ))}
        </ul>

        {/* Buttons - right side */}
        <div className="flex space-x-2">
          <button className='bg-hope-platinum text-black px-5 py-1 rounded-full hover:opacity-90 transition duration-300'>
            Contact Me
          </button>
          <button className='bg-hope-platinum text-black px-5 py-1 rounded-full hover:opacity-90 transition duration-300'>
            Learn More
          </button>
        </div>
      </nav>
    </header>
  );
}

export default Navbar