'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

interface AnimatedElementProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

const AnimatedElement: React.FC<AnimatedElementProps> = ({ 
  children, 
  delay = 0,
  className = '' 
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsVisible(true);
          }, delay);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.1,
      }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, [delay]);

  return (
    <div
      ref={elementRef}
      className={`transition-all duration-1000 ease-in-out ${
        isVisible 
          ? 'opacity-100 translate-y-0' 
          : 'opacity-0 translate-y-10'
      } ${className}`}
    >
      {children}
    </div>
  );
};

const AboutUsSection: React.FC = () => {
  return (
    <section 
      className="py-16 bg-gradient-to-br from-white to-gray-100 rtl"
      dir="rtl"
      aria-labelledby="about-heading"
    >
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          
          {/* Text Content */}
          <div className="order-2 md:order-1">
            <AnimatedElement>
              <h2 
                id="about-heading" 
                className="text-3xl md:text-4xl font-bold mb-6 text-[#588C7E]"
              >
                אודות סטודיו לצילום דלתא
              </h2>
            </AnimatedElement>
            
            <AnimatedElement delay={200}>
              <p className="text-lg mb-6 leading-relaxed text-gray-700">
                אנחנו סטודיו לצילום מוביל בתחום עם ניסיון של שנים רבות. אנחנו מתמחים במתן שירות מקצועי ואיכותי ללקוחותינו.
              </p>
            </AnimatedElement>
            
            <AnimatedElement delay={400}>
              <div className="bg-white p-6 rounded-lg shadow-md border-r-4 border-[#96CEB4] mb-6">
                <h3 className="text-xl font-semibold mb-3 text-[#588C7E]">המומחיות שלנו</h3>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <span className="inline-block w-2 h-2 rounded-full bg-[#96CEB4] mr-2"></span>
                    <span>צילומי פורטרט מקצועיים</span>
                  </li>
                  <li className="flex items-center">
                    <span className="inline-block w-2 h-2 rounded-full bg-[#96CEB4] mr-2"></span>
                    <span>צילומי אירועים וחתונות</span>
                  </li>
                  <li className="flex items-center">
                    <span className="inline-block w-2 h-2 rounded-full bg-[#96CEB4] mr-2"></span>
                    <span>צילומי מוצר לעסקים</span>
                  </li>
                  <li className="flex items-center">
                    <span className="inline-block w-2 h-2 rounded-full bg-[#96CEB4] mr-2"></span>
                    <span>עריכת תמונות מתקדמת</span>
                  </li>
                </ul>
              </div>
            </AnimatedElement>
            
            <AnimatedElement delay={600}>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center bg-white py-3 px-5 rounded-full shadow-sm">
                  <span className="text-2xl font-bold text-[#96CEB4] ml-2">15+</span>
                  <span className="text-gray-700">שנות ניסיון</span>
                </div>
                <div className="flex items-center bg-white py-3 px-5 rounded-full shadow-sm">
                  <span className="text-2xl font-bold text-[#96CEB4] ml-2">1000+</span>
                  <span className="text-gray-700">לקוחות מרוצים</span>
                </div>
                <div className="flex items-center bg-white py-3 px-5 rounded-full shadow-sm">
                  <span className="text-2xl font-bold text-[#96CEB4] ml-2">5000+</span>
                  <span className="text-gray-700">פרויקטים</span>
                </div>
              </div>
            </AnimatedElement>
          </div>
          
          {/* Image Gallery */}
          <div className="order-1 md:order-2">
            <div className="grid grid-cols-2 gap-4 relative">
              <AnimatedElement className="col-span-2">
                <div className="relative h-64 overflow-hidden rounded-lg shadow-lg">
                  <Image
                    src="/images/studio-main.jpg" 
                    alt="סטודיו צילום מקצועי"
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                    onError={(e) => {
                      // Fallback for missing image
                      const target = e.target as HTMLImageElement;
                      target.src = "https://via.placeholder.com/600x400?text=סטודיו+צילום";
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                    <p className="text-white p-4 font-medium">הסטודיו שלנו</p>
                  </div>
                </div>
              </AnimatedElement>
              
              <AnimatedElement delay={300}>
                <div className="relative h-48 overflow-hidden rounded-lg shadow-lg">
                  <Image
                    src="/images/camera-equipment.jpg" 
                    alt="ציוד צילום מתקדם"
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = "https://via.placeholder.com/300x200?text=ציוד+צילום";
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                    <p className="text-white p-3 text-sm">ציוד מתקדם</p>
                  </div>
                </div>
              </AnimatedElement>
              
              <AnimatedElement delay={500}>
                <div className="relative h-48 overflow-hidden rounded-lg shadow-lg">
                  <Image
                    src="/images/team-working.jpg" 
                    alt="צוות מקצועי בעבודה"
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = "https://via.placeholder.com/300x200?text=צוות+מקצועי";
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                    <p className="text-white p-3 text-sm">הצוות שלנו</p>
                  </div>
                </div>
              </AnimatedElement>
              
              <AnimatedElement delay={700} className="col-span-2">
                <div className="bg-[#588C7E]/10 p-4 rounded-lg border border-[#588C7E]/30">
                  <blockquote className="italic text-gray-700">
                    <span className="text-4xl text-[#96CEB4]">"</span>
                    אנו מאמינים שכל רגע ראוי להנצחה, וזו המשימה שלנו - לתפוס את הרגעים המיוחדים שלכם באיכות הגבוהה ביותר.
                    <span className="text-4xl text-[#96CEB4]">"</span>
                  </blockquote>
                  <p className="text-left mt-2 text-sm text-gray-600">- צוות סטודיו דלתא</p>
                </div>
              </AnimatedElement>
            </div>
          </div>
        </div>
        
        {/* Call to Action */}
        <AnimatedElement delay={800} className="mt-16 text-center">
          <div className="bg-[#588C7E] text-white p-8 rounded-lg shadow-lg max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">מעוניינים לשמוע עוד?</h3>
            <p className="mb-6">אנחנו כאן כדי להפוך את החזון שלכם למציאות מצולמת. צרו איתנו קשר עוד היום!</p>
            <button 
              className="bg-white text-[#588C7E] px-6 py-3 rounded-full font-medium hover:bg-gray-100 transition-colors duration-300 shadow-md"
              aria-label="צור קשר עם הסטודיו"
            >
              צרו קשר עכשיו
            </button>
          </div>
        </AnimatedElement>
      </div>
    </section>
  );
};

export default AboutUsSection;