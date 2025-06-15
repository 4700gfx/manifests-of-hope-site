import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const Questions = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const questions = [
    {
      question: "What services do you provide through Manifest of Hope?",
      answer: "Through Manifest of Hope, I offer a comprehensive range of services designed to support your personal and professional growth. This includes life coaching sessions, mindfulness workshops, spiritual guidance, goal-setting strategies, and personalized development plans. Each service is tailored to meet your unique needs and help you manifest your highest potential."
    },
    {
      question: "How long does it typically take to see results?",
      answer: "Results vary depending on your commitment level and specific goals. Many clients begin experiencing positive shifts within the first few sessions, often reporting increased clarity and motivation within 2-3 weeks. However, lasting transformation is a journey that typically unfolds over 3-6 months of consistent work together. Remember, meaningful change takes time, and I'm here to support you throughout the entire process."
    },
    {
      question: "What makes your approach different from other coaches?",
      answer: "My approach combines traditional coaching methodologies with spiritual practices and mindfulness techniques. I believe in addressing the whole person - mind, body, and spirit. What sets me apart is my focus on manifestation principles, energy alignment, and creating sustainable change from the inside out. I also provide ongoing support between sessions and personalized resources to keep you moving forward on your journey."
    },
    {
      question: "Do you offer both individual and group sessions?",
      answer: "Yes, I offer both individual one-on-one coaching sessions and group workshops. Individual sessions provide personalized attention and customized strategies for your specific situation. Group sessions offer the benefit of community support and shared learning experiences. Many clients find value in combining both approaches - starting with individual sessions to establish a foundation, then joining group workshops for ongoing support and connection with like-minded individuals."
    },
    {
      question: "What should I expect during our first session together?",
      answer: "Your first session is all about getting to know each other and establishing a clear path forward. We'll spend time discussing your current situation, identifying your goals and aspirations, and exploring any challenges you're facing. I'll share my coaching approach and we'll establish expectations for our work together. By the end of our first session, you'll have clarity on your priorities and a preliminary action plan to begin your transformation journey."
    }
  ];

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col mt-20">
          <h1 className='text-white mx-auto text-4xl sm:text-5xl lg:text-6xl font-bold mb-8'>
            <span className='font-playfair text-hope-platinum italic'>Questions?</span>
          </h1>
          <p className="font-belleza w-full max-w-2xl mx-auto mb-12 text-white/80 text-center leading-relaxed">
            This section will assist in answering any questions that you may have when it comes to working with me or any of the services that I provide with Manifest of Hope. Feel free to look through my commonly asked questions for further assistance. If the question you have is not listed below then feel free to contact me.
          </p>
        </div>

        <div className="space-y-4">
          {questions.map((item, index) => (
            <div 
              key={index} 
              className="bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 overflow-hidden transition-all duration-300 hover:bg-white/15"
            >
              <button
                onClick={() => toggleAccordion(index)}
                className="w-full px-6 py-4 text-left flex justify-between items-center focus:outline-none focus:ring-2 focus:ring-hope-platinum/50 rounded-lg"
              >
                <h3 className="text-white font-semibold text-lg pr-4">
                  {item.question}
                </h3>
                <div className="flex-shrink-0 text-hope-platinum">
                  {openIndex === index ? (
                    <ChevronUp className="w-5 h-5 transition-transform duration-200" />
                  ) : (
                    <ChevronDown className="w-5 h-5 transition-transform duration-200" />
                  )}
                </div>
              </button>
              
              <div 
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="px-6 pb-4">
                  <div className="border-t border-white/20 pt-4">
                    <p className="text-white/90 leading-relaxed font-belleza">
                      {item.answer}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-white/70 font-belleza mb-4">
            Still have questions? I'm here to help.
          </p>
          <button className="bg-hope-platinum text-white px-8 py-3 rounded-lg font-semibold hover:bg-hope-platinum/90 transition-colors duration-200">
            Contact Me
          </button>
        </div>
      </div>
    </section>
  );
};

export default Questions;