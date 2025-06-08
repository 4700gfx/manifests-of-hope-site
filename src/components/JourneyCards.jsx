import journeycardpic1 from '../assets/images/journeycardpic1.jpg'
import journeycardpic2 from '../assets/images/journeycardpic2.jpg'
import journeycardpic3 from '../assets/images/journeycardpic3.jpg'
import journeycardpic4 from '../assets/images/journeycardpic4.jpg'

const JourneyCards = () => {
  const journeyCards = [
    {
      heading: "Birth Deliveries",
      text: "When it comes to child birth, Manifests in Hope is dedicated to ensuring that transition to providing life into this world is as smooth as possible. We work to ensure that the health of Mother and Child is at their optimal levels.",
      image: journeycardpic1,
    },
    {
      heading: "Nutrition",
      text: "In Nutrition Coaching, I work closely with you to create personalized nutrition guides tailored to your health goals and lifestyle preferences. By emphasizing whole foods, balanced nutrition, and mindful eating practices, I help you achieve sustainable changes that enhance their overall well-being.",
      image: journeycardpic2,
    },
    {
      heading: "Homeopathy",
      text: "As a Homeopathic Consultant, I harness the power of natural remedies to support clients in achieving optimal health. Through holistic assessments and personalized treatment plans, I offer gentle and effective suggestions for managing chronic conditions, improving immunity, and promoting vitality.",
      image: journeycardpic3,
    },
    {
      heading: "Wellness Coaching",
      text: "As a Homeopathic Consultant, I harness the power of natural remedies to support clients in achieving optimal health. Through holistic assessments and personalized treatment plans, I offer gentle and effective suggestions for managing chronic conditions, improving immunity, and promoting vitality.",
      image: journeycardpic4,
    },
  ]

  return (
    <section className='flex flex-col px-4 sm:px-6 lg:px-8 py-14 lg:py-14'>
      <div className="mx-auto w-11/12 max-w-7xl">
        {/* Header Section */}
        <div className="text-center mb-10">
          <h1 className='text-white text-4xl sm:text-5xl lg:text-6xl font-bold mb-8'>
            <span className='font-playfair text-hope-platinum italic'>Journeys</span> Overview
          </h1>
          <p className='font-belleza text-white/80 text-base sm:text-md leading-relaxed max-w-4xl mx-auto'>
            I call my services journeys because they may take unpredictable turns, but we walk through anyways. At Manifests of Hope, I specialize in providing a range of personalized services designed to support your journey towards optimal well-being. Whether you're seeking nurturing care during pregnancy and childbirth, personalized nutrition guidance, natural remedies through homeopathy, or holistic wellness coaching, I am here to support you every step of the way. To see what others have said about my Journeys, check out the Stories
          </p>
        </div>

        {/* Cards Section */}
        <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8'>
          {journeyCards.map((card, index) => (
            <div 
              key={index}
              className="group relative h-80 sm:h-96 rounded-3xl overflow-hidden cursor-pointer transform transition-all duration-500 hover:scale-105 hover:-translate-y-2"
            >
              {/* Background Image */}
              <div className="absolute inset-0">
                <img 
                  src={card.image} 
                  alt={card.heading}
                  className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                />
                {/* Gradient overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/20"></div>
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>

              {/* Heading - Always visible at top */}
              <div className="absolute top-0 left-0 right-0 p-6 sm:p-8">
                <h3 className="text-white text-2xl font-playfair italic sm:text-3xl font-bold mb-4 drop-shadow-lg">
                  {card.heading}
                </h3>
              </div>

              {/* Text - Appears on hover at bottom */}
              <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
                <div className="transform translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out delay-100">
                  <p className="text-white/95 font-belleza text-sm sm:text-sm leading-relaxed mb-3">
                    {card.text}
                  </p>
                  
                  {/* Call to action */}
                  <div className="pt-3 border-t border-white/30">
                    <span className="inline-flex items-center text-hope-platinum font-belleza font-medium text-base group-hover:text-white transition-colors duration-300">
                      Learn More
                      <svg className="ml-2 w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </span>
                  </div>
                </div>
              </div>

              {/* Decorative border */}
              <div className="absolute inset-0 rounded-3xl ring-1 ring-white/10 group-hover:ring-hope-platinum/30 transition-all duration-500"></div>
              
              {/* Subtle glow effect on hover */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-t from-hope-platinum/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <button className="group bg-hope-platinum text-hope-aquablue px-8 py-2 rounded-full font-bold font-belleza text-xl hover:bg-white transform hover:scale-105 hover:-translate-y-1 transition-all duration-300 ease-in-out relative overflow-hidden">
            <span className="relative z-10">Explore All Stories</span>
            <div className="absolute inset-0 bg-gradient-to-r from-white to-hope-platinum opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full"></div>
          </button>
        </div>
      </div>
    </section>
  )
}

export default JourneyCards