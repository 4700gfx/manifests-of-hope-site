import hopeImage from '../assets/images/hopeimg.avif'

const AboutUs = () => {
  return (
    <section className='px-4 sm:px-6 lg:px-8 py-16 lg:py-24'>
      <div className="mx-auto w-10/12 max-w-7xl">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          
          {/* Image Container */}
          <div className="flex-shrink-0 w-full lg:w-auto">
            <div className="relative mx-auto lg:mx-0 w-80 sm:w-96 lg:w-[420px] h-80 sm:h-96 lg:h-[500px] rounded-3xl overflow-hidden group">
              <img 
                className='w-full h-full object-cover transition-all duration-500 group-hover:scale-105' 
                src={hopeImage} 
                alt='Picture of Hope'
              />
              {/* Subtle overlay for depth */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent"></div>
              
              {/* Decorative border effect */}
              <div className="absolute inset-0 rounded-3xl ring-1 ring-white/10"></div>
            </div>
          </div>
          
          {/* Text Content */}
          <div className='flex-1 text-center lg:text-left'>
            <h1 className='text-white text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight mb-8 lg:mb-12'>
              About{' '}
              <span className='font-playfair text-hope-platinum italic font-normal relative'>
                Hope
                <div className="absolute -bottom-1 lg:-bottom-2 left-0 w-full h-0.5 lg:h-1 bg-hope-platinum/60 rounded-full"></div>
              </span>
            </h1>
            
            <div className="space-y-6">
              <p className='font-belleza text-white/90 text-lg sm:text-base leading-relaxed'>
                Hi, I'm Hope. My mission is to inspire others to experience the fullness, beauty, and balance that life has to offer.
              </p>
              
              <p className='font-belleza text-white/80 text-base sm:text-base leading-relaxed'>
                As a Holistic Wellness Practitioner, I am here to walk beside you on your journey of growth, healing, and transformation. Drawing from a diverse educational background and a deep passion for holistic well-being, I offer an integrative approach that nurtures the physical, emotional, and mental aspects of your life.
              </p>
              
              <p className='font-belleza text-white/80 text-base sm:text-base leading-relaxed'>
                When you choose to work with me, you'll find a compassionate guide committed to supporting your path toward clarity, strength, and vitality. What I offer encompasses wellness in every sense of the word while providing an enriching experience.
              </p>
              
              <div className="pt-4">
                <p className='font-belleza text-hope-platinum text-lg sm:text-base font-medium mb-6'>
                  Ready to begin? Explore the Journeys to discover what awaits you.
                </p>
                
                {/* Optional CTA Button */}
                <button className="group bg-hope-platinum text-hope-aquablue px-8 py-3 rounded-full font-bold font-belleza text-lg hover:bg-white transform hover:scale-105 hover:-translate-y-1 transition-all duration-300 ease-in-out relative overflow-hidden">
                  <span className="relative z-10">Explore Journeys</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-white to-hope-platinum opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full"></div>
                </button>
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