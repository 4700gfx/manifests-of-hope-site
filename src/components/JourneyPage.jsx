import React, { useState } from 'react'
import { ArrowRight, Heart, Leaf, Baby, Utensils } from 'lucide-react'
import birthpic1 from '../assets/images/birth-journey-pic1.jpg'
import birthpic2 from '../assets/images/birth-journey-pic2.jpg'
import birthpic3 from '../assets/images/birth-journey-pic3.jpg'
import birthpic4 from '../assets/images/birth-journey-pic4.jpg'
import nutritionpic1 from '../assets/images/nutrition-journey-pic1.jpg'
import nutritionpic2 from '../assets/images/nutrition-journey-pic2.jpg'
import nutritionpic3 from '../assets/images/nutrition-journey-pic3.jpg'
import nutritionpic4 from '../assets/images/nutrition-journey-pic4.jpg'
import homepic1 from '../assets/images/homeopathy-journey-pic1.jpg'
import homepic2 from '../assets/images/homeopathy-journey-pic2.jpg'
import homepic3 from '../assets/images/homeopathy-journey-pic3.jpg'
import homepic4 from '../assets/images/homeopathy-journey-pic4.jpg'
import wellnesspic1 from '../assets/images/wellness-journey-pic1.jpg'
import wellnesspic2 from '../assets/images/wellness-journey-pic2.jpg'
import wellnesspic3 from '../assets/images/wellness-journey-pic3.jpg'
import wellnesspic4 from '../assets/images/wellness-journey-pic4.jpg'

const JourneyPage = () => {
  const [hoveredCard, setHoveredCard] = useState(null);

  const journeySections = [
    {
      heading: "Birth Deliveries & Mid-Wife Services",
      text: "Bringing life into this world is one of the most extraordinary experiences in a human lifetime. Manifest of Hope works to make sure that this process is as easy as possible. Providing high quality care to the mother and child while providing an environment of ease for the whole family.",
      tags: ['#newlife', '#birth', '#doula'],
      images: [birthpic1, birthpic2, birthpic3, birthpic4],
      icon: Baby,
      color: 'from-pink-500/20 to-rose-500/20',
      accentColor: 'text-pink-400'
    },
    {
      heading: "Nutritional Coaching",
      text: "Our approach to Nutritional Coaching is providing a personal plan to help you achieve your health and lifestyle goals with the least resistance. By emphasizing whole foods, balanced nutrition, and mindful eating practices, I help you achieve sustainable changes that enhance their overall well-being.",
      tags: ['#nutrition', '#health', '#wellness'],
      images: [nutritionpic1, nutritionpic2, nutritionpic3, nutritionpic4],
      icon: Utensils,
      color: 'from-green-500/20 to-emerald-500/20',
      accentColor: 'text-green-400'
    },
    {
      heading: "Homeopathy",
      text: "Holistic Health is a way of life. Through using nature's solutions, Manifest of Hope works to provide an alternative but natural treatments and lifestyle to optimize your health. As a Homeopathic Consultant, I harness the power of natural remedies to support clients in achieving optimal health.",
      tags: ['#holistic', '#natural', '#healing'],
      images: [homepic1, homepic2, homepic3, homepic4],
      icon: Leaf,
      color: 'from-blue-500/20 to-cyan-500/20',
      accentColor: 'text-blue-400'
    },
    {
      heading: "Wellness Coaching",
      text: "Wellness is an all-encompassing term that takes on different contexts. Here at Manifest of Hope, we provide education and coaching that helps to lead to a well-driven life towards wellness. We offer different plans that help you achieve your best level of wellness.",
      tags: ['#wellness', '#coaching', '#lifestyle'],
      images: [wellnesspic1, wellnesspic2, wellnesspic3, wellnesspic4],
      icon: Heart,
      color: 'from-purple-500/20 to-violet-500/20',
      accentColor: 'text-purple-400'
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      {/* Hero Section */}
      <section className="relative py-24 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-hope-platinum/10 to-hope-aquablue/10"></div>
        <div className="relative max-w-6xl mx-auto text-center">
          <div className="mb-8 transform hover:scale-105 transition-transform duration-500">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6">
              <span className="font-playfair text-hope-platinum italic">Your Journey</span>
              <br />
              <span className="text-white">Begins Here</span>
            </h1>
          </div>
          <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed font-belleza">
            Discover transformative paths to wellness, healing, and personal growth. Each journey is uniquely crafted to support your individual needs and aspirations.
          </p>
          
          {/* Floating elements */}
          <div className="absolute top-20 left-10 w-4 h-4 bg-hope-platinum/30 rounded-full animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-6 h-6 bg-hope-aquablue/30 rounded-full animate-pulse delay-1000"></div>
          <div className="absolute top-40 right-20 w-3 h-3 bg-white/20 rounded-full animate-pulse delay-500"></div>
        </div>
      </section>

      {/* Journey Sections */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto space-y-24">
          {journeySections.map((journey, index) => {
            const IconComponent = journey.icon;
            const isEven = index % 2 === 0;
            
            return (
              <div 
                key={index}
                className={`group relative ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} flex flex-col lg:flex gap-12 items-center`}
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                {/* Text Content */}
                <div className="flex-1 space-y-6">
                  <div className="flex items-center space-x-4 mb-6">
                    <div className={`p-3 rounded-full bg-gradient-to-r ${journey.color} backdrop-blur-sm border border-white/10 group-hover:scale-110 transition-transform duration-300`}>
                      <IconComponent className={`w-8 h-8 ${journey.accentColor}`} />
                    </div>
                    <div className="h-px flex-1 bg-gradient-to-r from-hope-platinum/50 to-transparent"></div>
                  </div>
                  
                  <h2 className="text-4xl lg:text-5xl font-bold group-hover:text-hope-platinum transition-colors duration-300">
                    <span className="font-playfair italic">{journey.heading}</span>
                  </h2>
                  
                  <p className="text-lg text-white/80 leading-relaxed font-belleza group-hover:text-white transition-colors duration-300">
                    {journey.text}
                  </p>
                  
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {journey.tags.map((tag, tagIndex) => (
                      <span 
                        key={tagIndex}
                        className={`px-4 py-2 rounded-full text-sm font-semibold bg-gradient-to-r ${journey.color} border border-white/10 ${journey.accentColor} hover:scale-105 transition-transform duration-200`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  {/* CTA Button */}
                  <button className="group/btn mt-8 bg-hope-platinum text-hope-aquablue px-8 py-3 rounded-full font-bold font-belleza hover:bg-white hover:scale-105 hover:-translate-y-1 hover:shadow-xl transition-all duration-300 ease-in-out relative overflow-hidden flex items-center space-x-2">
                    <span className="relative z-10">Learn More</span>
                    <ArrowRight className="w-5 h-5 relative z-10 group-hover/btn:translate-x-1 transition-transform duration-300" />
                    <div className="absolute inset-0 bg-gradient-to-r from-white to-hope-platinum opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300 rounded-full"></div>
                  </button>
                </div>

                {/* Image Gallery */}
                <div className="flex-1">
                  <div className="grid grid-cols-2 gap-4 max-w-lg mx-auto">
                    {journey.images.slice(0, 4).map((image, imgIndex) => (
                      <div 
                        key={imgIndex}
                        className={`relative overflow-hidden rounded-xl aspect-square group-hover:scale-105 transition-all duration-500 ${
                          imgIndex === 0 ? 'delay-0' : 
                          imgIndex === 1 ? 'delay-100' : 
                          imgIndex === 2 ? 'delay-200' : 'delay-300'
                        }`}
                        style={{
                          transform: hoveredCard === index ? 'scale(1.05)' : 'scale(1)',
                        }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10"></div>
                        <img 
                          src={image} 
                          alt={`${journey.heading} ${imgIndex + 1}`}
                          className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
                        />
                        
                        {/* Hover overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-hope-platinum/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20"></div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Background accent */}
                <div className={`absolute inset-0 bg-gradient-to-r ${journey.color} rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-xl`}></div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-hope-platinum/10 to-hope-aquablue/10"></div>
        <div className="relative max-w-4xl mx-auto text-center">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            <span className="font-playfair text-hope-platinum italic">Ready to Begin</span>
            <br />
            <span className="text-white">Your Transformation?</span>
          </h2>
          <p className="text-xl text-white/80 mb-8 font-belleza">
            Take the first step towards your wellness journey. Let's work together to manifest your best life.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="group bg-hope-platinum text-hope-aquablue px-10 py-4 rounded-full font-bold font-belleza hover:bg-white hover:scale-105 hover:-translate-y-1 hover:shadow-xl transition-all duration-300 ease-in-out relative overflow-hidden">
              <span className="relative z-10">Schedule Consultation</span>
              <div className="absolute inset-0 bg-gradient-to-r from-white to-hope-platinum opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full"></div>
            </button>
            <button className="group bg-transparent border-2 border-hope-platinum text-hope-platinum px-10 py-4 rounded-full font-bold font-belleza hover:bg-hope-platinum hover:text-hope-aquablue hover:scale-105 hover:-translate-y-1 hover:shadow-xl transition-all duration-300 ease-in-out">
              Contact Me
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default JourneyPage;