import React from 'react'
import logo from '../assets/images/manifest-of-hope-logo-white.png'
import heropic1 from '../assets/images/heropic1.jpg'
import heropic2 from '../assets/images/heropic2.jpg'
import heropic3 from '../assets/images/heropic3.jpg'
import heropic4 from '../assets/images/heropic4.jpg'

const Hero = () => {
  return (
    <section className="px-4 sm:px-6 lg:px-8">
      <div className='bg-hope-aquablue mx-auto mt-10 h-auto min-h-[55vh] w-full max-w-7xl rounded-2xl relative overflow-hidden'>
        {/* Background gradient overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-black/10 rounded-2xl"></div>
        
        <div className="relative z-10 h-full flex flex-col lg:flex-row items-center justify-between px-6 sm:px-8 lg:px-12 py-12 lg:py-16 gap-8 lg:gap-12">
          {/* Left Content */}
          <div className="flex-1 max-w-xl order-2 lg:order-1">
            <h4 className='text-white/90 text-xl sm:text-2xl font-semibold tracking-wide'>
              Holistic Wellness Practitioner
            </h4>
            <div className='mb-6 lg:mb-8'>
              <h1 className='text-white text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight mb-4'>
                Experience Growth & Transformation with{' '}
                <span className='font-playfair text-hope-platinum italic font-normal relative'>
                  Hope
                  <div className="absolute -bottom-1 lg:-bottom-2 left-0 w-full h-0.5 lg:h-1 bg-hope-platinum/60 rounded-full"></div>
                </span>
              </h1>
            </div>
            {/* Subtitle text */}
            <p className="text-white/80 text-sm sm:text-base font-belleza leading-relaxed mb-8 lg:mb-10">
              Discover your inner strength and unlock your potential through personalized wellness journeys designed to nurture your mind, body, and spirit.
              Our holistic approach blends mindfulness, movement, and meaningful habits tailored to your unique lifestyle and goals. Whether you're seeking balance, healing, or personal growth, our programs empower you to take control of your well-being with intention and purpose. Start your transformation today and embrace the vibrant, fulfilled life you deserve.
            </p>
            {/* CTA Button */}
            <button className="group bg-hope-platinum text-hope-aquablue px-8 sm:px-12 py-3 sm:py-4 rounded-full font-bold font-belleza text-base sm:text-lg hover:bg-white transform hover:scale-105 hover:-translate-y-1 transition-all duration-300 ease-in-out relative overflow-hidden">
              <span className="relative z-10">Learn More</span>
              <div className="absolute inset-0 bg-gradient-to-r from-white to-hope-platinum opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full"></div>
            </button>
          </div>
          
          {/* Right 2x2 Grid */}
          <div className="flex-shrink-0 relative order-1 lg:order-2">
            <div className="grid grid-cols-2 gap-3 sm:gap-4 w-full max-w-xs sm:max-w-sm lg:max-w-md">
              
              {/* Top Left - Logo */}
              <div className="aspect-square rounded-2xl overflow-hidden bg-hope-aquablue/20 backdrop-blur-sm flex items-center justify-center p-2 sm:p-3 transition-all duration-300 hover:scale-105 hover:bg-hope-aquablue/30">
                <img
                  src={logo}
                  alt='Manifest of Hope Logo'
                  className="h-24 sm:h-28 lg:h-32 w-auto hover:scale-110 transition-transform duration-500 ease-in-out filter drop-shadow-lg"
                />
              </div>
              
              {/* Top Right - Hero Pic 1 */}
              <div className="aspect-square rounded-2xl overflow-hidden transition-all duration-300 hover:scale-105 relative group">
                <img
                  src={heropic1}
                  alt='Wellness Journey'
                  className="w-full h-full object-cover hover:brightness-110 transition-all duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent group-hover:from-white/10 transition-all duration-300"></div>
              </div>
              
              {/* Bottom Left - Hero Pic 2 */}
              <div className="aspect-square rounded-2xl overflow-hidden transition-all duration-300 hover:scale-105 relative group">
                <img
                  src={heropic2}
                  alt='Holistic Wellness'
                  className="w-full h-full object-cover hover:brightness-110 transition-all duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent group-hover:from-white/10 transition-all duration-300"></div>
              </div>
              
              {/* Bottom Right - Hero Pic 3 */}
              <div className="aspect-square rounded-2xl overflow-hidden transition-all duration-300 hover:scale-105 relative group">
                <img
                  src={heropic4}
                  alt='Transformation'
                  className="w-full h-full object-cover hover:brightness-110 transition-all duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent group-hover:from-white/10 transition-all duration-300"></div>
              </div>
              
            </div>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-6 sm:top-10 right-6 sm:right-10 w-24 sm:w-32 h-24 sm:h-32 bg-white/10 rounded-full blur-2xl"></div>
        <div className="absolute bottom-6 sm:bottom-10 left-6 sm:left-10 w-16 sm:w-24 h-16 sm:h-24 bg-hope-platinum/20 rounded-full blur-xl"></div>
      </div>
    </section>
  )
}

export default Hero