import React from 'react'
import logo from '../assets/images/manifest-of-hope-logo-white.png'
import heropic1 from '../assets/images/heropic1.jpg'
import heropic2 from '../assets/images/heropic2.jpg'
import heropic3 from '../assets/images/heropic3.jpg'
import heropic4 from '../assets/images/heropic4.jpg'

const Hero = () => {
  return (
    <section className="px-4 sm:px-6 lg:px-8">
      <div className='bg-hope-aquablue mx-auto mt-20 h-[65vh] w-9/12 rounded-2xl relative overflow-hidden'>
        {/* Background gradient overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-black/10 rounded-2xl"></div>
        <div className="relative z-10 h-full flex items-center justify-between px-12 py-16 gap-6">
          {/* Left Content */}
          <div className="flex-1 max-w-xl">
            <h4 className='text-white/90 text-2xl font-semibold tracking-wide'>
              Holistic Wellness Practitioner
            </h4>
            <div className='mb-8'>
              <h1 className='text-white text-5xl lg:text-6xl font-bold leading-tight mb-4'>
                Experience Growth & Transformation with{' '}
                <span className='font-playfair text-hope-platinum italic font-normal relative'>
                  Hope
                  <div className="absolute -bottom-2 left-0 w-full h-1 bg-hope-platinum/60 rounded-full"></div>
                </span>
              </h1>
            </div>
            {/* Subtitle text */}
            <p className="text-white/80 text-base font-belleza leading-relaxed mb-10">
              Discover your inner strength and unlock your potential through personalized wellness journeys designed to nurture your mind, body, and spirit.
              Our holistic approach blends mindfulness, movement, and meaningful habits tailored to your unique lifestyle and goals. Whether you're seeking balance, healing, or personal growth, our programs empower you to take control of your well-being with intention and purpose. Start your transformation today and embrace the vibrant, fulfilled life you deserve.
            </p>
            {/* CTA Button */}
            <button className="group bg-hope-platinum text-hope-aquablue px-12 py-4 rounded-full font-bold font-belleza text-lg hover:bg-white transform hover:scale-105 hover:-translate-y-1 transition-all duration-300 ease-in-out relative overflow-hidden">
              <span className="relative z-10">Learn More</span>
              <div className="absolute inset-0 bg-gradient-to-r from-white to-hope-platinum opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full"></div>
            </button>
          </div>
          
          {/* Right Image Grid Composition */}
          <div className="flex-shrink-0 relative">
            <div className="relative w-[480px] h-[480px]">
              {/* Stylishly overlapping images around logo */}
              
              {/* Top Left Image - Primary focus */}
              <div className="absolute top-4 left-4 w-56 h-48 rounded-2xl overflow-hidden transition-all duration-300 hover:scale-105 z-25 transform rotate-2">
                <img
                  src={heropic1}
                  alt='Wellness Journey'
                  className="w-full h-full object-cover hover:brightness-110 transition-all duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent"></div>
              </div>
              
              {/* Top Right Image - Overlapping top left */}
              <div className="absolute top-0 right-8 w-48 h-60 rounded-2xl overflow-hidden transition-all duration-300 hover:scale-105 z-20 transform -rotate-3">
                <img
                  src={heropic2}
                  alt='Holistic Wellness'
                  className="w-full h-full object-cover hover:brightness-110 transition-all duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent"></div>
              </div>
              
              {/* Bottom Left Image - Overlapping with top left */}
              <div className="absolute bottom-12 left-0 w-52 h-44 rounded-2xl overflow-hidden transition-all duration-300 hover:scale-105 z-20 transform rotate-6">
                <img
                  src={heropic3}
                  alt='Transformation'
                  className="w-full h-full object-cover hover:brightness-110 transition-all duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent"></div>
              </div>
              
              {/* Bottom Right Image - Fourth hero pic */}
              <div className="absolute bottom-4 right-4 w-44 h-52 rounded-2xl overflow-hidden transition-all duration-300 hover:scale-105 z-15 transform -rotate-8">
                <img
                  src={heropic4}
                  alt='Wellness Growth'
                  className="w-full h-full object-cover hover:brightness-110 transition-all duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent"></div>
              </div>
              
              {/* Center - Logo with perfect positioning */}
              <div className="absolute inset-0 flex items-center justify-center z-30">
                <div className="relative rounded-2xl p-6">
                  <img
                    src={logo}
                    alt='Manifest of Hope Logo'
                    className="h-32 w-auto hover:scale-110 transition-transform duration-500 ease-in-out"
                  />
                  {/* Enhanced glow effect behind logo */}
                  <div className="absolute inset-0 bg-hope-platinum/20 blur-xl scale-125 -z-10 rounded-2xl"></div>
                </div>
              </div>
              
            </div>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-10 right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
        <div className="absolute bottom-10 left-10 w-24 h-24 bg-hope-platinum/20 rounded-full blur-xl"></div>
      </div>
    </section>
  )
}

export default Hero