import hopeImage from '../assets/images/hopeimg.avif'
import { Link } from 'react-router-dom'

const AboutUs = () => {
  const services = [
    {
      title: "Holistic Wellness Coaching",
      description: "Focused on providing quality direction in the realms of wellness to ensure a holistic lifestyle."
    },
    {
      title: "Nutritional Guidance",
      description: "Sustainable eating plans designed for optimal health and wellness."
    },
    {
      title: "Midwife Services",
      description: "A holistic and peaceful approach to facilitating the process of bringing life into this world."
    }
  ];

  return (
    <section className='px-4 sm:px-6 lg:px-8 py-16 lg:py-20 relative' id='about'>
      <div className="mx-auto w-full max-w-7xl">
        <div className="flex flex-col xl:flex-row items-start gap-12 lg:gap-16">
          
          {/* Content Container */}
          <div className="w-full flex flex-col lg:flex-row gap-8 lg:gap-12 xl:gap-16">
            
            {/* Text Content */}
            <div className='flex-1 text-center lg:text-left'>
              <h1 className='text-white text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight mb-8 lg:mb-12'>
                About{' '}
                <span className='font-playfair text-hope-platinum italic font-normal relative inline-block'>
                  Hope
                  <div className="absolute -bottom-1 lg:-bottom-2 left-0 w-full h-0.5 lg:h-1 bg-hope-platinum/60 rounded-full"></div>
                </span>
              </h1>
              
              <div className="space-y-6 max-w-2xl mx-auto lg:mx-0">
                <p className='font-belleza text-white/90 text-lg sm:text-xl leading-relaxed'>
                  Hi, I'm Hope. My mission is to inspire others to experience the fullness, beauty, and balance that life has to offer.
                </p>
                
                <p className='font-belleza text-white/80 text-base sm:text-lg leading-relaxed'>
                  As a Holistic Wellness Practitioner, I am here to walk beside you on your journey of growth, healing, and transformation. Drawing from a diverse educational background and a deep passion for holistic well-being, I offer an integrative approach that nurtures the physical, emotional, and mental aspects of your life.
                </p>
                
                <p className='font-belleza text-white/80 text-base sm:text-lg leading-relaxed'>
                  When you choose to work with me, you'll find a compassionate guide committed to supporting your path toward clarity, strength, and vitality. What I offer encompasses wellness in every sense of the word while providing an enriching experience.
                </p>
                
                <div className="pt-6">
                  <p className='font-belleza text-hope-platinum text-lg sm:text-xl font-medium mb-6'>
                    Ready to begin? Explore the Journeys to discover what awaits you.
                  </p>
                  
                  {/* CTA Button with Navigation */}
                  <Link to="/journeys" className="inline-block">
                    <button className="group bg-hope-platinum text-hope-aquablue px-8 py-3 rounded-full font-bold font-belleza text-lg hover:bg-white transform hover:scale-105 hover:-translate-y-1 transition-all duration-300 ease-in-out relative overflow-hidden shadow-lg hover:shadow-xl">
                      <span className="relative z-10">
                        Explore Journeys
                      </span>
                      <div className="absolute inset-0 bg-gradient-to-r from-white to-hope-platinum opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full"></div>
                    </button>
                  </Link>
                </div>
              </div>
            </div>
            
            {/* Services Section */}
            <div className='flex-shrink-0 w-full lg:w-80 xl:w-96'>
              <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-6 lg:p-8 border border-white/10 shadow-xl">
                <h2 className='text-white text-2xl lg:text-3xl font-bold mb-6 text-center lg:text-left'>
                  <span className='font-playfair text-hope-platinum italic font-normal'>
                    Services
                  </span>
                </h2>
                
                <div className="space-y-4">
                  {services.map((service, index) => (
                    <div 
                      key={index} 
                      className="group p-4 lg:p-5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-hope-platinum/30 transition-all duration-300 cursor-pointer hover:shadow-lg"
                    >
                      <h3 className='font-belleza text-hope-platinum font-medium text-lg lg:text-xl mb-2 group-hover:text-white transition-colors duration-300'>
                        {service.title}
                      </h3>
                      <p className='font-belleza text-white/70 text-sm lg:text-base leading-relaxed group-hover:text-white/90 transition-colors duration-300'>
                        {service.description}
                      </p>
                    </div>
                  ))}
                </div>
                
                {/* Services CTA */}
                <div className="mt-8 text-center">
                  <Link to="/journeys#services">
                    <button className="group bg-transparent border-2 border-hope-platinum text-hope-platinum px-6 py-2.5 rounded-full font-belleza text-base hover:bg-hope-platinum hover:text-hope-aquablue transition-all duration-300 ease-in-out hover:shadow-lg">
                      <span className="relative z-10">
                        Learn More
                      </span>
                    </button>
                  </Link>
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </div>
      
      {/* Decorative background elements */}
      <div className="absolute -z-10 top-1/4 left-10 w-32 h-32 bg-hope-platinum/5 rounded-full blur-3xl"></div>
      <div className="absolute -z-10 bottom-1/4 right-10 w-40 h-40 bg-hope-aquablue/10 rounded-full blur-3xl"></div>
    </section>
  )
}

export default AboutUs