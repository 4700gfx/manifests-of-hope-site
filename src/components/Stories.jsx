import React, { useState, useEffect } from 'react'
import profilePic from '../assets/images/profileimg.png'

const Stories = () => {
  const [currentStory, setCurrentStory] = useState(0)

  const storiesInfo = [
    {
      name: "Amber M.",
      text: "I highly recommend Hope for doula services. She was extremely helpful from prenatal to postnatal. From her 'check-ins' providing additional resources/feedback, and advocating on my behalf. Hope assisted me with creating a thorough birth plan and ensured it was followed through during labor and delivery. She was very patient and also eased my husband's concerns. Without a doubt, I can't thank her enough for her continuous support for my family. Even currently 4 month's postpartum she's been helpful in linking me what additional services I made need. It's great to have a doula for emotional labor support, but it's even better to have someone who is knowledgeable, educates families, and who goes beyond 'labor and delivery' and Hope is just that exceptional",
      image: profilePic
    },
    {
      name: "Ebony W.",
      text: "Hope really is the best! She was very attentive, knowledgeable and because she's so in tune with herself, it truly gave me the guts to tap into the powerful woman I am. I decided on an at home water birth. Hope walked me and my family through the anatomy of a pregnant woman, gave me options on what type of atmosphere I'd like for my birthing space, provided a safe space for emotional support on my not so best days (she's super kind and easy to talk to!), came to doctor's visits with me and we had fun along the way! Thanks to The Universe and Hope, I had such easy pregnancy and birth!!!",
      image: profilePic
    },
    {
      name: "Joseph V.",
      text: "Hope Simmons was the miracle that we had been asking for. Our previous hospital experience for our first birth was very harsh, and life threatening. Naturally we wanted a better option and Hope was that! The birth of our daughter was beautiful and set up perfectly for what we needed. Our beautiful baby girl was born in our own home, in our own tub, and Hope helped us be confident in our own abilities every step of the way. Would 100% work with Hope again and recommend that EVERYONE should go through her for their birthing experience. Her prep, postpartum assistance, and natural remedies were the best. She's amazing!",
      image: profilePic
    }
  ]

  // Auto-rotate testimonials every 10 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStory((prev) => (prev + 1) % storiesInfo.length)
    }, 10000)

    return () => clearInterval(interval)
  }, [storiesInfo.length])

  // Manual navigation functions
  const goToStory = (index) => {
    setCurrentStory(index)
  }

  const nextStory = () => {
    setCurrentStory((prev) => (prev + 1) % storiesInfo.length)
  }

  const prevStory = () => {
    setCurrentStory((prev) => (prev - 1 + storiesInfo.length) % storiesInfo.length)
  }

  return (  
    <section className="flex flex-col mt-10" id='stories'>
      <h1 className='text-white mx-auto text-4xl sm:text-5xl lg:text-6xl font-bold mb-8'>
        <span className='font-playfair text-hope-platinum italic'>Our</span> Stories
      </h1>

      <p className="font-belleza w-1/2 mx-auto mb-5 text-white/80 text-center leading-relaxed">
        Clients' voices tell the story of their experiences. I take pride in providing exceptional holistic wellness services that leave a lasting impact. Clients have shared their heartfelt testimonials about the transformative care they've received. I invite you to read their Stories and discover how my personalized approach has made a difference in their lives. Your health and well-being are my top priorities, and I am grateful for the opportunity to support you on your journey to optimal wellness.
      </p>

      <div className="stories-container relative flex flex-col h-[40vh] w-8/12 bg-hope-blue rounded-2xl mx-auto mb-10 overflow-hidden group hover:shadow-2xl hover:shadow-hope-blue/20 transition-all duration-500">
        
        {/* Testimonial Content */}
        <div className="relative flex-1 p-8 lg:p-12">
          {storiesInfo.map((story, index) => (
            <div
              key={index}
              className={`absolute inset-0 p-8 lg:p-12 flex flex-col justify-center transition-all duration-1000 ease-in-out ${
                index === currentStory 
                  ? 'opacity-100 translate-x-0' 
                  : index < currentStory 
                    ? 'opacity-0 -translate-x-full' 
                    : 'opacity-0 translate-x-full'
              }`}
            >
              {/* Quote Icon */}
              <div className="text-hope-platinum/30 text-6xl font-serif mb-4 leading-none">"</div>
              
              {/* Testimonial Text */}
              <blockquote className="text-white/90 font-belleza text-base lg:text-lg leading-relaxed mb-6 max-h-[60%] overflow-y-auto scrollbar-thin scrollbar-thumb-hope-platinum/20 scrollbar-track-transparent">
                {story.text}
              </blockquote>
              
              {/* Author Info */}
              <div className="flex items-center gap-4 mt-auto">
                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-hope-platinum/30">
                  <img 
                    src={story.image} 
                    alt={story.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <cite className="text-hope-platinum font-semibold text-lg not-italic">
                    {story.name}
                  </cite>
                  <p className="text-white/60 text-sm">Verified Client</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Controls */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center gap-4">
          
          {/* Previous Button */}
          <button 
            onClick={prevStory}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all duration-300 hover:scale-110"
            aria-label="Previous testimonial"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Dot Indicators */}
          <div className="flex gap-2">
            {storiesInfo.map((_, index) => (
              <button
                key={index}
                onClick={() => goToStory(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentStory 
                    ? 'bg-hope-platinum scale-125' 
                    : 'bg-white/30 hover:bg-white/50'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>

          {/* Next Button */}
          <button 
            onClick={nextStory}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all duration-300 hover:scale-110"
            aria-label="Next testimonial"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Progress Bar */}
        <div className="absolute bottom-0 left-0 w-full h-1 bg-white/10">
          <div 
            className="h-full bg-hope-platinum transition-all duration-300 ease-linear"
            style={{
              width: `${((currentStory + 1) / storiesInfo.length) * 100}%`
            }}
          />
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-6 right-6 w-20 h-20 bg-hope-platinum/10 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
        <div className="absolute bottom-6 left-6 w-16 h-16 bg-white/5 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-all duration-700 delay-200"></div>
      </div>
    </section>
  )
}

export default Stories