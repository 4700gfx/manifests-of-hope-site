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
          <span className="text-2xl font-bold tracking-wider">Manifest of Hope</span>
        </div>

        {/* Nav links */}
        <ul className="flex space-x-8 font-semibold">
          {Object.keys(navTabs).map((key) => (
            <li key={key} className="hover:text-[#C0C0AF] transition duration-300">
              <a href="#" className="text-lg">{navTabs[key]}</a>
            </li>
          ))}
        </ul>
        <button className='bg-hope-platinum text-black px-8 py-1.5 rounded-full'>Contact Me</button>
      </nav>
    </header>
  );
}

export default Navbar
