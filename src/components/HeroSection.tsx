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
      { threshold: 0.1 }
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
      className={`transition-all duration-1000 ease-out ${
        isVisible 
          ? 'opacity-100 translate-y-0' 
          : 'opacity-0 translate-y-10'
      } ${className}`}
    >
      {children}
    </div>
  );
};

const HeroSection: React.FC = () => {
  return (
    <section 
      className="relative h-screen w-full overflow-hidden bg-black text-right" 
      dir="rtl" 
      aria-label="סטודיו לצילום דלתא - סטודיו לצילום מוביל בישראל"
    >
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/photography-studio.jpg" // Replace with your actual image path
          alt="סטודיו לצילום דלתא"
          fill
          priority
          className="object-cover"
          sizes="100vw"
          placeholder="blur"
          blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+P+/HgAEtAJJXIDTiQAAAABJRU5ErkJggg=="
        />
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      </div>

      {/* Content Container */}
      <div className="relative z-10 h-full w-full flex flex-col justify-center items-end px-6 md:px-12 lg:px-24">
        <div className="max-w-2xl">
          {/* Studio Name */}
          <AnimatedElement delay={0} className="mb-4">
            <h2 className="text-lg md:text-xl text-white font-light tracking-wider">
              סטודיו לצילום דלתא
            </h2>
          </AnimatedElement>

          {/* Main Headline */}
          <AnimatedElement delay={200} className="mb-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
              <span className="text-[#96CEB4]">סטודיו לצילום</span> מוביל בישראל
            </h1>
          </AnimatedElement>

          {/* Subheadline */}
          <AnimatedElement delay={400} className="mb-8">
            <p className="text-xl md:text-2xl text-white/90 font-light">
              חווית לקוח מושלמת בכל ביקור
            </p>
          </AnimatedElement>

          {/* Description */}
          <AnimatedElement delay={600} className="mb-10">
            <p className="text-white/80 text-base md:text-lg max-w-md">
              אנחנו סטודיו לצילום מוביל בתחום עם ניסיון של שנים רבות. אנחנו מתמחים במתן שירות מקצועי ואיכותי ללקוחותינו.
            </p>
          </AnimatedElement>

          {/* CTA Button */}
          <AnimatedElement delay={800}>
            <button 
              className="px-8 py-4 bg-[#96CEB4] hover:bg-[#588C7E] text-white font-medium rounded-md transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#96CEB4] focus:ring-opacity-50"
              aria-label="קבע תור עכשיו בסטודיו לצילום דלתא"
            >
              קבע תור עכשיו
            </button>
          </AnimatedElement>
        </div>
      </div>

      {/* Decorative Elements */}
      <AnimatedElement delay={1000} className="absolute bottom-10 left-10 z-10">
        <div className="w-24 h-24 border-2 border-[#96CEB4] opacity-50 rounded-full animate-pulse"></div>
      </AnimatedElement>
      
      <AnimatedElement delay={1200} className="absolute top-20 right-20 z-10">
        <div className="w-16 h-16 border-2 border-[#588C7E] opacity-30 rounded-full animate-ping"></div>
      </AnimatedElement>
    </section>
  );
};

export default HeroSection;