import React, { useState, useEffect, useRef } from 'react'
import profilePic from '../assets/images/profileimg.png'

const Stories = () => {
  const [currentStory, setCurrentStory] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [isPaused, setIsPaused] = useState(false)
  const [progress, setProgress] = useState(0)
  const intervalRef = useRef(null)
  const progressIntervalRef = useRef(null)

  const storiesInfo = [
    {
      name: "Amber M.",
      text: "I highly recommend Hope for doula services. She was extremely helpful from prenatal to postnatal. From her 'check-ins' providing additional resources/feedback, and advocating on my behalf. Hope assisted me with creating a thorough birth plan and ensured it was followed through during labor and delivery. She was very patient and also eased my husband's concerns. Without a doubt, I can't thank her enough for her continuous support for my family. Even currently 4 month's postpartum she's been helpful in linking me what additional services I made need. It's great to have a doula for emotional labor support, but it's even better to have someone who is knowledgeable, educates families, and who goes beyond 'labor and delivery' and Hope is just that exceptional",
      image: profilePic,
      rating: 5
    },
    {
      name: "Ebony W.",
      text: "Hope really is the best! She was very attentive, knowledgeable and because she's so in tune with herself, it truly gave me the guts to tap into the powerful woman I am. I decided on an at home water birth. Hope walked me and my family through the anatomy of a pregnant woman, gave me options on what type of atmosphere I'd like for my birthing space, provided a safe space for emotional support on my not so best days (she's super kind and easy to talk to!), came to doctor's visits with me and we had fun along the way! Thanks to The Universe and Hope, I had such easy pregnancy and birth!!!",
      image: profilePic,
      rating: 5
    },
    {
      name: "Joseph V.",
      text: "Hope Simmons was the miracle that we had been asking for. Our previous hospital experience for our first birth was very harsh, and life threatening. Naturally we wanted a better option and Hope was that! The birth of our daughter was beautiful and set up perfectly for what we needed. Our beautiful baby girl was born in our own home, in our own tub, and Hope helped us be confident in our own abilities every step of the way. Would 100% work with Hope again and recommend that EVERYONE should go through her for their birthing experience. Her prep, postpartum assistance, and natural remedies were the best. She's amazing!",
      image: profilePic,
      rating: 5
    }
  ]

  // Progress animation
  const startProgress = () => {
    setProgress(0)
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current)
    }
    
    progressIntervalRef.current = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          return 0
        }
        return prev + (100 / 100) // 10 seconds = 100 increments of 100ms
      })
    }, 100)
  }

  // Auto-rotate testimonials
  useEffect(() => {
    if (isAutoPlaying && !isPaused) {
      startProgress()
      intervalRef.current = setInterval(() => {
        setCurrentStory((prev) => (prev + 1) % storiesInfo.length)
      }, 10000)
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current)
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current)
      }
    }
  }, [isAutoPlaying, isPaused, storiesInfo.length])

  // Reset progress when story changes
  useEffect(() => {
    if (isAutoPlaying && !isPaused) {
      startProgress()
    }
  }, [currentStory])

  // Manual navigation functions
  const goToStory = (index) => {
    setCurrentStory(index)
    if (isAutoPlaying) {
      startProgress()
    }
  }

  const nextStory = () => {
    setCurrentStory((prev) => (prev + 1) % storiesInfo.length)
  }

  const prevStory = () => {
    setCurrentStory((prev) => (prev - 1 + storiesInfo.length) % storiesInfo.length)
  }

  const toggleAutoPlay = () => {
    setIsAutoPlaying(!isAutoPlaying)
    if (!isAutoPlaying) {
      setProgress(0)
    }
  }

  const handleMouseEnter = () => {
    setIsPaused(true)
  }

  const handleMouseLeave = () => {
    setIsPaused(false)
  }

  // Touch/swipe handling for mobile
  const [touchStart, setTouchStart] = useState(null)
  const [touchEnd, setTouchEnd] = useState(null)

  const minSwipeDistance = 50

  const onTouchStart = (e) => {
    setTouchEnd(null)
    setTouchStart(e.targetTouches[0].clientX)
  }

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > minSwipeDistance
    const isRightSwipe = distance < -minSwipeDistance

    if (isLeftSwipe) {
      nextStory()
    } else if (isRightSwipe) {
      prevStory()
    }
  }

  // Star rating component
  const StarRating = ({ rating }) => {
    return (
      <div className="flex gap-1 mb-2">
        {[...Array(5)].map((_, i) => (
          <svg
            key={i}
            className={`w-4 h-4 ${i < rating ? 'text-yellow-400' : 'text-gray-400'}`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
    )
  }

  return (  
    <section className="flex flex-col py-10 px-4 sm:px-6 lg:px-8" id='stories'>
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className='text-white mx-auto text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6'>
          <span className='font-playfair text-hope-platinum italic'>Our</span> Stories
        </h1>

        <p className="font-belleza max-w-4xl mx-auto text-sm sm:text-base lg:text-lg text-white/80 leading-relaxed px-4">
          Clients' voices tell the story of their experiences. I take pride in providing exceptional holistic wellness services that leave a lasting impact. Clients have shared their heartfelt testimonials about the transformative care they've received. I invite you to read their Stories and discover how my personalized approach has made a difference in their lives.
        </p>
      </div>

      {/* Stories Container */}
      <div className="max-w-6xl mx-auto w-full">
        <div 
          className="stories-container relative flex flex-col min-h-[500px] sm:min-h-[450px] md:min-h-[400px] lg:min-h-[450px] bg-gradient-to-br from-hope-blue to-hope-blue/90 rounded-2xl mx-auto overflow-hidden group hover:shadow-2xl hover:shadow-hope-blue/20 transition-all duration-500 backdrop-blur-sm"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          
          {/* Auto-play Toggle Button */}
          <button
            onClick={toggleAutoPlay}
            className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all duration-300 hover:scale-110"
            aria-label={isAutoPlaying ? "Pause auto-play" : "Start auto-play"}
          >
            {isAutoPlaying ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6M14 9v6" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1.586a1 1 0 01.707.293l.414.414a1 1 0 00.707.293H15" />
              </svg>
            )}
          </button>

          {/* Testimonial Content */}
          <div className="relative flex-1 p-4 sm:p-6 md:p-8 lg:p-12">
            {storiesInfo.map((story, index) => (
              <div
                key={index}
                className={`absolute inset-0 p-4 sm:p-6 md:p-8 lg:p-12 flex flex-col justify-center transition-all duration-1000 ease-in-out ${
                  index === currentStory 
                    ? 'opacity-100 translate-x-0' 
                    : index < currentStory 
                      ? 'opacity-0 -translate-x-full' 
                      : 'opacity-0 translate-x-full'
                }`}
              >
                {/* Quote Icon */}
                <div className="text-hope-platinum/30 text-4xl sm:text-5xl lg:text-6xl font-serif mb-4 leading-none select-none">"</div>
                
                {/* Testimonial Text */}
                <div className="flex-1 flex flex-col justify-center">
                  <blockquote className="text-white/90 font-belleza text-sm sm:text-base lg:text-lg leading-relaxed mb-6 max-h-[50vh] sm:max-h-[40vh] overflow-y-auto scrollbar-thin scrollbar-thumb-hope-platinum/20 scrollbar-track-transparent">
                    {story.text}
                  </blockquote>
                </div>
                
                {/* Author Info */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full overflow-hidden border-2 border-hope-platinum/30 flex-shrink-0">
                      <img 
                        src={story.image} 
                        alt={story.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex flex-col">
                      <StarRating rating={story.rating} />
                      <cite className="text-hope-platinum font-semibold text-base sm:text-lg not-italic">
                        {story.name}
                      </cite>
                      <p className="text-white/60 text-xs sm:text-sm">Verified Client</p>
                    </div>
                  </div>
                  
                  {/* Mobile story counter */}
                  <div className="sm:hidden ml-auto text-white/60 text-sm">
                    {currentStory + 1} of {storiesInfo.length}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop Navigation Controls */}
          <div className="hidden sm:flex absolute bottom-6 left-1/2 transform -translate-x-1/2 items-center gap-4">
            
            {/* Previous Button */}
            <button 
              onClick={prevStory}
              className="p-2 sm:p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all duration-300 hover:scale-110 disabled:opacity-50"
              aria-label="Previous testimonial"
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
              className="p-2 sm:p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all duration-300 hover:scale-110"
              aria-label="Next testimonial"
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Mobile Navigation Controls */}
          <div className="sm:hidden flex justify-between items-center px-4 pb-4">
            <button 
              onClick={prevStory}
              className="p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all duration-300 active:scale-95"
              aria-label="Previous testimonial"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Mobile Dot Indicators */}
            <div className="flex gap-2">
              {storiesInfo.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToStory(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentStory 
                      ? 'bg-hope-platinum scale-125' 
                      : 'bg-white/30'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>

            <button 
              onClick={nextStory}
              className="p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all duration-300 active:scale-95"
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
              className={`h-full bg-hope-platinum transition-all duration-100 ease-linear ${
                isAutoPlaying && !isPaused ? 'opacity-100' : 'opacity-50'
              }`}
              style={{
                width: isAutoPlaying && !isPaused ? `${progress}%` : `${((currentStory + 1) / storiesInfo.length) * 100}%`
              }}
            />
          </div>

          {/* Decorative Elements */}
          <div className="absolute top-6 right-6 w-16 h-16 sm:w-20 sm:h-20 bg-hope-platinum/10 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
          <div className="absolute bottom-6 left-6 w-12 h-12 sm:w-16 sm:h-16 bg-white/5 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-all duration-700 delay-200"></div>
          
          {/* Mobile swipe indicator */}
          <div className="sm:hidden absolute top-4 left-4 text-white/40 text-xs">
            Swipe to navigate
          </div>
        </div>

        {/* Mobile Summary Info */}
        <div className="sm:hidden mt-6 text-center">
          <p className="text-white/60 text-sm font-belleza">
            {currentStory + 1} of {storiesInfo.length} testimonials
          </p>
        </div>
      </div>
    </section>
  )
}

export default Stories