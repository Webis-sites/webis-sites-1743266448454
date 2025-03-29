'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

// Define types for our services
interface Service {
  id: number;
  title: string;
  description: string;
  icon: string;
}

const ServicesSection: React.FC = () => {
  // Define services with Hebrew content
  const services: Service[] = [
    {
      id: 1,
      title: 'צילומי פורטרט',
      description: 'צילומי פורטרט מקצועיים המדגישים את האישיות והייחודיות שלך. מתאים ליחידים, משפחות וקבוצות.',
      icon: 'M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z',
    },
    {
      id: 2,
      title: 'צילומי מוצר',
      description: 'צילומי מוצר באיכות גבוהה לחנויות אונליין, קטלוגים ופרסום. מציג את המוצרים שלך בצורה המושכת ביותר.',
      icon: 'M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z',
    },
    {
      id: 3,
      title: 'צילומי אירועים',
      description: 'הנצחת רגעים מיוחדים באירועים שלך - חתונות, בר/בת מצווה, ימי הולדת ואירועים עסקיים.',
      icon: 'M17.38 10.79l-2.2-2.2c-.28-.28-.36-.67-.25-1.02.37-1.12.57-2.32.57-3.57 0-.55.45-1 1-1H20c.55 0 1 .45 1 1 0 9.39-7.61 17-17 17-.55 0-1-.45-1-1v-3.49c0-.55.45-1 1-1 1.24 0 2.45-.2 3.57-.57.35-.12.75-.03 1.02.24l2.2 2.2c2.83-1.45 5.15-3.76 6.59-6.59z',
    },
    {
      id: 4,
      title: 'צילומי נדל"ן',
      description: 'צילומי נכסים מקצועיים המדגישים את היתרונות של הנכס שלך. מושלם למכירה, השכרה או פרסום.',
      icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6',
    },
    {
      id: 5,
      title: 'צילומי תדמית',
      description: 'צילומים מקצועיים לעסקים, פרופילים תאגידיים וקמפיינים שיווקיים. מעצב את התדמית העסקית שלך.',
      icon: 'M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
    },
  ];

  // Ref for intersection observer
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  // Set up intersection observer to trigger animations when section is in viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.1,
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  // Animation variants for the cards
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 15,
      },
    },
  };

  return (
    <section 
      ref={sectionRef}
      dir="rtl" 
      className="py-16 px-4 bg-gray-50"
      aria-labelledby="services-heading"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <motion.h2 
            id="services-heading"
            className="text-3xl md:text-4xl font-bold mb-4 text-gray-800"
            initial={{ opacity: 0, y: -20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
            transition={{ duration: 0.6 }}
          >
            השירותים שלנו
          </motion.h2>
          <motion.div
            className="w-24 h-1 bg-[#96CEB4] mx-auto mb-6"
            initial={{ width: 0 }}
            animate={isVisible ? { width: 96 } : { width: 0 }}
            transition={{ duration: 0.8 }}
          />
          <motion.p 
            className="text-gray-600 max-w-2xl mx-auto text-lg"
            initial={{ opacity: 0 }}
            animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            אנו מציעים מגוון רחב של שירותי צילום מקצועיים המותאמים לצרכים האישיים והעסקיים שלך
          </motion.p>
        </div>

        {/* Services Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
        >
          {services.map((service) => (
            <motion.div
              key={service.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col h-full"
              variants={cardVariants}
              whileHover={{ 
                y: -10,
                transition: { duration: 0.3 }
              }}
            >
              <div className="p-6 flex flex-col h-full">
                <div className="mb-4 bg-[#96CEB4] bg-opacity-20 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
                  <svg 
                    className="w-8 h-8 text-[#588C7E]" 
                    fill="currentColor" 
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d={service.icon} />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3 text-center text-gray-800">
                  {service.title}
                </h3>
                <p className="text-gray-600 text-center flex-grow">
                  {service.description}
                </p>
                <div className="mt-6 text-center">
                  <button 
                    className="inline-flex items-center text-[#588C7E] hover:text-[#96CEB4] transition-colors duration-300 font-medium"
                    aria-label={`קרא עוד על ${service.title}`}
                  >
                    <span>קרא עוד</span>
                    <svg 
                      className="w-5 h-5 mr-2 transform rotate-180" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Call to Action */}
        <motion.div 
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <button 
            className="bg-[#588C7E] hover:bg-[#96CEB4] text-white font-medium py-3 px-8 rounded-lg transition-colors duration-300 shadow-md hover:shadow-lg"
            aria-label="צור קשר לתיאום פגישה"
          >
            צור קשר לתיאום פגישה
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection;