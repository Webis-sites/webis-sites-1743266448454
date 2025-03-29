'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Types for testimonial data
interface Testimonial {
  id: number;
  name: string;
  quote: string;
  avatar?: string;
}

// Props interface for the component
interface TestimonialsCarouselProps {
  autoPlayInterval?: number; // Time in ms between auto-transitions
}

const TestimonialsCarousel: React.FC<TestimonialsCarouselProps> = ({ 
  autoPlayInterval = 5000 
}) => {
  // Sample testimonial data in Hebrew
  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: "שרה לוי",
      quote: "הצילומים שקיבלנו מהסטודיו היו מדהימים! הצלם ידע בדיוק איך לתפוס את הרגעים המיוחדים שלנו. ממליצה בחום!",
      avatar: "/avatars/avatar1.jpg"
    },
    {
      id: 2,
      name: "יוסי כהן",
      quote: "שירות מקצועי ברמה הגבוהה ביותר. הצוות היה קשוב לכל הבקשות שלנו והתוצאות עלו על כל הציפיות.",
      avatar: "/avatars/avatar2.jpg"
    },
    {
      id: 3,
      name: "מיכל אברהם",
      quote: "הסטודיו הזה הוא פשוט מהטובים שעבדתי איתם. האיכות של התמונות והיחס האישי הם ברמה אחרת לגמרי.",
      avatar: "/avatars/avatar3.jpg"
    },
    {
      id: 4,
      name: "דוד ישראלי",
      quote: "בחרנו בסטודיו לצילום האירוע המשפחתי שלנו וזו הייתה החלטה מצוינת. התמונות מרגשות ומקצועיות.",
      avatar: "/avatars/avatar4.jpg"
    },
    {
      id: 5,
      name: "רונית שמעוני",
      quote: "הצלמים בסטודיו יודעים איך לגרום לך להרגיש בנוח מול המצלמה. התוצאות היו טבעיות ומדהימות!",
      avatar: "/avatars/avatar5.jpg"
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const autoPlayTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Function to move to the next testimonial
  const nextTestimonial = useCallback(() => {
    setCurrentIndex((prevIndex) => 
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  }, [testimonials.length]);

  // Function to move to the previous testimonial
  const prevTestimonial = useCallback(() => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  }, [testimonials.length]);

  // Function to jump to a specific testimonial
  const goToTestimonial = useCallback((index: number) => {
    setCurrentIndex(index);
    // Reset auto-play timer when manually changing testimonials
    if (autoPlayTimerRef.current) {
      clearInterval(autoPlayTimerRef.current);
      if (isAutoPlaying) {
        autoPlayTimerRef.current = setInterval(nextTestimonial, autoPlayInterval);
      }
    }
  }, [autoPlayInterval, isAutoPlaying, nextTestimonial]);

  // Toggle auto-play
  const toggleAutoPlay = useCallback(() => {
    setIsAutoPlaying(prev => !prev);
  }, []);

  // Setup auto-play
  useEffect(() => {
    if (isAutoPlaying) {
      autoPlayTimerRef.current = setInterval(nextTestimonial, autoPlayInterval);
    } else if (autoPlayTimerRef.current) {
      clearInterval(autoPlayTimerRef.current);
    }

    // Cleanup on unmount
    return () => {
      if (autoPlayTimerRef.current) {
        clearInterval(autoPlayTimerRef.current);
      }
    };
  }, [isAutoPlaying, nextTestimonial, autoPlayInterval]);

  // Pause auto-play when user interacts with the carousel
  const handleMouseEnter = () => {
    if (autoPlayTimerRef.current && isAutoPlaying) {
      clearInterval(autoPlayTimerRef.current);
    }
  };

  // Resume auto-play when user stops interacting
  const handleMouseLeave = () => {
    if (isAutoPlaying) {
      if (autoPlayTimerRef.current) {
        clearInterval(autoPlayTimerRef.current);
      }
      autoPlayTimerRef.current = setInterval(nextTestimonial, autoPlayInterval);
    }
  };

  return (
    <section 
      className="w-full py-12 bg-white overflow-hidden"
      dir="rtl" // Set RTL direction for Hebrew
      aria-label="המלצות לקוחות"
    >
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-semibold text-center mb-10 text-gray-800">
          מה הלקוחות שלנו אומרים
        </h2>

        {/* Testimonials Carousel */}
        <div 
          className="relative max-w-4xl mx-auto"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className="overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
                className="flex flex-col items-center"
              >
                <div className="bg-gray-50 rounded-lg p-8 shadow-md border border-gray-100 w-full">
                  {/* Quote Icon */}
                  <div className="flex justify-end mb-4">
                    <svg 
                      className="w-10 h-10 text-[#96CEB4]" 
                      fill="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                    </svg>
                  </div>
                  
                  {/* Testimonial Text */}
                  <p className="text-gray-700 text-lg mb-6 leading-relaxed">
                    {testimonials[currentIndex].quote}
                  </p>
                  
                  {/* Author Info */}
                  <div className="flex items-center mt-4">
                    {testimonials[currentIndex].avatar ? (
                      <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-[#588C7E]">
                        <img 
                          src={testimonials[currentIndex].avatar} 
                          alt={testimonials[currentIndex].name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ) : (
                      <div className="w-14 h-14 rounded-full bg-[#96CEB4] flex items-center justify-center text-white text-xl font-semibold">
                        {testimonials[currentIndex].name.charAt(0)}
                      </div>
                    )}
                    <div className="mr-4">
                      <h3 className="font-semibold text-lg text-gray-800">
                        {testimonials[currentIndex].name}
                      </h3>
                      <p className="text-[#588C7E] text-sm">לקוח/ה מרוצה</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8">
            <button
              onClick={prevTestimonial}
              className="bg-white p-3 rounded-full shadow-md hover:bg-gray-50 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-[#96CEB4]"
              aria-label="המלצה קודמת"
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-6 w-6 text-[#588C7E]" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
            
            <div className="flex space-x-2 rtl:space-x-reverse">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToTestimonial(index)}
                  className={`w-3 h-3 rounded-full focus:outline-none focus:ring-2 focus:ring-[#96CEB4] ${
                    currentIndex === index 
                      ? 'bg-[#588C7E]' 
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                  aria-label={`עבור להמלצה ${index + 1}`}
                  aria-current={currentIndex === index ? 'true' : 'false'}
                />
              ))}
            </div>
            
            <button
              onClick={nextTestimonial}
              className="bg-white p-3 rounded-full shadow-md hover:bg-gray-50 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-[#96CEB4]"
              aria-label="המלצה הבאה"
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-6 w-6 text-[#588C7E]" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          </div>

          {/* Auto-play control */}
          <div className="mt-6 text-center">
            <button
              onClick={toggleAutoPlay}
              className={`inline-flex items-center px-4 py-2 rounded-md text-sm font-medium transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-[#96CEB4] ${
                isAutoPlaying 
                  ? 'bg-[#588C7E] text-white hover:bg-[#4a7a6b]' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
              aria-pressed={isAutoPlaying}
            >
              {isAutoPlaying ? (
                <>
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-4 w-4 ml-2" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  השהה החלפה אוטומטית
                </>
              ) : (
                <>
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-4 w-4 ml-2" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  הפעל החלפה אוטומטית
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsCarousel;