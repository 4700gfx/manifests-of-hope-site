import hopeImage from '../assets/images/hopeimg.avif'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'

const AboutUs = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredService, setHoveredService] = useState(null);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const services = [
    {
      title: "Holistic Wellness Coaching",
      description: "Focused on providing quality direction in the realms of wellness to ensure a holistic lifestyle.",
      icon: "🌿"
    },
    {
      title: "Nutritional Guidance",
      description: "Sustainable eating plans designed for optimal health and wellness.",
      icon: "🥗"
    },
    {
      title: "Midwife Services",
      description: "A holistic and peaceful approach to facilitating the process of bringing life into this world.",
      icon: "🌸"
    }
  ];

  return (
    <section className='px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 xl:py-24 relative overflow-hidden' id='about'>
      <div className="mx-auto w-full max-w-7xl">
        <div className="flex flex-col xl:flex-row items-start gap-8 sm:gap-10 lg:gap-12 xl:gap-16">
          
          {/* Content Container */}
          <div className="w-full flex flex-col lg:flex-row gap-8 sm:gap-10 lg:gap-12 xl:gap-16">
            
            {/* Text Content */}
            <div className={`flex-1 text-center lg:text-left transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <h1 className='text-white text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-bold leading-tight mb-6 sm:mb-8 lg:mb-12 animate-fade-in'>
                About{' '}
                <span className='font-playfair text-hope-platinum italic font-normal relative inline-block group'>
                  Hope
                  <div className="absolute -bottom-1 lg:-bottom-2 left-0 w-full h-0.5 lg:h-1 bg-hope-platinum/60 rounded-full transition-all duration-500 group-hover:bg-hope-platinum group-hover:h-1 lg:group-hover:h-1.5"></div>
                </span>
              </h1>
              
              <div className="space-y-4 sm:space-y-5 lg:space-y-6 max-w-2xl mx-auto lg:mx-0">
                <p className={`font-belleza text-white/90 text-base sm:text-lg md:text-xl leading-relaxed transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
                  Hi, I'm Hope. My mission is to inspire others to experience the fullness, beauty, and balance that life has to offer.
                </p>
                
                <p className={`font-belleza text-white/80 text-sm sm:text-base md:text-lg leading-relaxed transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
                  As a Holistic Wellness Practitioner, I am here to walk beside you on your journey of growth, healing, and transformation. Drawing from a diverse educational background and a deep passion for holistic well-being, I offer an integrative approach that nurtures the physical, emotional, and mental aspects of your life.
                </p>
                
                <p className={`font-belleza text-white/80 text-sm sm:text-base md:text-lg leading-relaxed transition-all duration-700 delay-400 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
                  When you choose to work with me, you'll find a compassionate guide committed to supporting your path toward clarity, strength, and vitality. What I offer encompasses wellness in every sense of the word while providing an enriching experience.
                </p>
                
                <div className={`pt-4 sm:pt-6 lg:pt-8 transition-all duration-700 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                  <p className='font-belleza text-hope-platinum text-base sm:text-lg md:text-xl font-medium mb-4 sm:mb-6 hover:text-white transition-colors duration-300'>
                    Ready to begin? Explore the Journeys to discover what awaits you.
                  </p>
                  
                  {/* CTA Button with Navigation */}
                  <Link to="/journeys" className="inline-block group">
                    <button className="relative bg-hope-platinum text-hope-aquablue px-6 sm:px-8 py-2.5 sm:py-3 rounded-full font-bold font-belleza text-base sm:text-lg hover:bg-white transform hover:scale-105 hover:-translate-y-1 transition-all duration-300 ease-in-out overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-hope-platinum/20">
                      <span className="relative z-10 flex items-center gap-2">
                        Explore Journeys
                        <span className="inline-block transform group-hover:translate-x-1 transition-transform duration-300">→</span>
                      </span>
                      <div className="absolute inset-0 bg-gradient-to-r from-white to-hope-platinum opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full"></div>
                      <div className="absolute inset-0 bg-hope-platinum/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
                    </button>
                  </Link>
                </div>
              </div>
            </div>
            
            {/* Services Section */}
            <div className={`flex-shrink-0 w-full lg:w-80 xl:w-96 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-5 sm:p-6 lg:p-8 border border-white/10 shadow-xl hover:shadow-2xl hover:border-white/20 transition-all duration-500 hover:bg-white/10">
                <h2 className='text-white text-xl sm:text-2xl lg:text-3xl font-bold mb-5 sm:mb-6 text-center lg:text-left'>
                  <span className='font-playfair text-hope-platinum italic font-normal hover:text-white transition-colors duration-300 cursor-default'>
                    Services
                  </span>
                </h2>
                
                <div className="space-y-3 sm:space-y-4">
                  {services.map((service, index) => (
                    <div 
                      key={index}
                      onMouseEnter={() => setHoveredService(index)}
                      onMouseLeave={() => setHoveredService(null)}
                      className={`group p-4 sm:p-5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-hope-platinum/50 transition-all duration-300 cursor-pointer hover:shadow-lg transform hover:-translate-y-1 ${
                        hoveredService === index ? 'scale-[1.02]' : 'scale-100'
                      }`}
                      style={{
                        animationDelay: `${index * 100}ms`
                      }}
                    >
                      <div className="flex items-start gap-3">
                        <span className="text-2xl sm:text-3xl flex-shrink-0 transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                          {service.icon}
                        </span>
                        <div className="flex-1">
                          <h3 className='font-belleza text-hope-platinum font-medium text-base sm:text-lg lg:text-xl mb-1.5 sm:mb-2 group-hover:text-white transition-colors duration-300'>
                            {service.title}
                          </h3>
                          <p className='font-belleza text-white/70 text-xs sm:text-sm lg:text-base leading-relaxed group-hover:text-white/90 transition-colors duration-300'>
                            {service.description}
                          </p>
                        </div>
                      </div>
                      
                      {/* Progress indicator on hover */}
                      <div className="h-0.5 bg-hope-platinum/20 rounded-full mt-3 overflow-hidden">
                        <div className={`h-full bg-hope-platinum rounded-full transition-all duration-500 ${hoveredService === index ? 'w-full' : 'w-0'}`}></div>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Services CTA */}
                <div className="mt-6 sm:mt-8 text-center">
                  <Link to="/journeys#services" className="inline-block group">
                    <button className="relative bg-transparent border-2 border-hope-platinum text-hope-platinum px-5 sm:px-6 py-2 sm:py-2.5 rounded-full font-belleza text-sm sm:text-base hover:bg-hope-platinum hover:text-hope-aquablue transition-all duration-300 ease-in-out hover:shadow-lg hover:scale-105 overflow-hidden">
                      <span className="relative z-10 flex items-center gap-2 justify-center">
                        Learn More
                        <span className="inline-block transform group-hover:translate-x-1 transition-transform duration-300">→</span>
                      </span>
                      <div className="absolute inset-0 bg-hope-platinum scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-full -z-10"></div>
                    </button>
                  </Link>
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </div>
      
      {/* Enhanced Decorative background elements */}
      <div className="absolute -z-10 top-1/4 left-10 w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48 bg-hope-platinum/5 rounded-full blur-3xl animate-pulse-slow"></div>
      <div className="absolute -z-10 bottom-1/4 right-10 w-40 h-40 sm:w-48 sm:h-48 lg:w-56 lg:h-56 bg-hope-aquablue/10 rounded-full blur-3xl animate-pulse-slow" style={{animationDelay: '1s'}}></div>
      <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 sm:w-80 sm:h-80 bg-hope-platinum/5 rounded-full blur-3xl animate-pulse-slow" style={{animationDelay: '2s'}}></div>
    </section>
  )
}

export default AboutUs