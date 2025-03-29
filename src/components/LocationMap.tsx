'use client';

import { useEffect, useRef, useState } from 'react';
import { FaPhone, FaEnvelope, FaClock, FaMapMarkerAlt } from 'react-icons/fa';

interface BusinessHours {
  day: string;
  hours: string;
}

interface LocationMapProps {
  address: string;
  phone: string;
  email: string;
  businessHours: BusinessHours[];
  mapEmbedUrl?: string;
}

const LocationMap: React.FC<LocationMapProps> = ({
  address = 'רחוב הרצל 123, תל אביב',
  phone = '03-1234567',
  email = 'info@photostudio.co.il',
  businessHours = [
    { day: 'ראשון - חמישי', hours: '09:00 - 20:00' },
    { day: 'שישי', hours: '09:00 - 14:00' },
    { day: 'שבת', hours: 'סגור' },
  ],
  mapEmbedUrl = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3381.0223352426196!2d34.7818!3d32.0853!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzLCsDA1JzA3LjEiTiAzNMKwNDYnNTQuNSJF!5e0!3m2!1sen!2sil!4v1620000000000!5m2!1sen!2sil',
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

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
      observer.disconnect();
    };
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="w-full py-16 bg-gray-50 text-right"
      dir="rtl"
      aria-labelledby="location-heading"
    >
      <div className="container mx-auto px-4 md:px-8">
        <h2 
          id="location-heading"
          className="text-3xl font-bold mb-8 text-[#588C7E] border-r-4 border-[#96CEB4] pr-4"
        >
          המיקום שלנו
        </h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Map Container */}
          <div 
            className={`bg-white rounded-lg shadow-md overflow-hidden transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
            }`}
          >
            <div className="aspect-w-16 aspect-h-9 w-full">
              {mapEmbedUrl ? (
                <iframe
                  src={mapEmbedUrl}
                  title="מיקום הסטודיו"
                  className="w-full h-full border-0"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  aria-label="מפת מיקום הסטודיו"
                ></iframe>
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-600">
                  {/* Map Placeholder Instructions */}
                  <div className="text-center p-4">
                    <FaMapMarkerAlt className="mx-auto text-4xl mb-2 text-[#588C7E]" />
                    <p className="font-medium">להטמעת המפה, הוסף את כתובת ה-URL של המפה מ-Google Maps</p>
                    <p className="text-sm mt-2">
                      1. פתח את Google Maps והזן את כתובת העסק<br />
                      2. לחץ על "שתף" ובחר "הטמע מפה"<br />
                      3. העתק את קוד ה-iframe והשתמש ב-src URL בתוך ה-mapEmbedUrl prop
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {/* Contact Information */}
          <div 
            className={`bg-white rounded-lg shadow-md p-6 transition-all duration-700 delay-300 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
            }`}
          >
            <div className="space-y-6">
              {/* Address */}
              <div className="flex items-start gap-4">
                <div className="mt-1 bg-[#96CEB4] p-3 rounded-full text-white">
                  <FaMapMarkerAlt className="text-lg" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-[#588C7E]">כתובת</h3>
                  <p className="text-gray-700">{address}</p>
                </div>
              </div>
              
              {/* Phone */}
              <div className="flex items-start gap-4">
                <div className="mt-1 bg-[#96CEB4] p-3 rounded-full text-white">
                  <FaPhone className="text-lg" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-[#588C7E]">טלפון</h3>
                  <a 
                    href={`tel:${phone.replace(/-/g, '')}`} 
                    className="text-gray-700 hover:text-[#588C7E] transition-colors"
                  >
                    {phone}
                  </a>
                </div>
              </div>
              
              {/* Email */}
              <div className="flex items-start gap-4">
                <div className="mt-1 bg-[#96CEB4] p-3 rounded-full text-white">
                  <FaEnvelope className="text-lg" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-[#588C7E]">דוא״ל</h3>
                  <a 
                    href={`mailto:${email}`} 
                    className="text-gray-700 hover:text-[#588C7E] transition-colors"
                  >
                    {email}
                  </a>
                </div>
              </div>
              
              {/* Business Hours */}
              <div className="flex items-start gap-4">
                <div className="mt-1 bg-[#96CEB4] p-3 rounded-full text-white">
                  <FaClock className="text-lg" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-[#588C7E]">שעות פעילות</h3>
                  <ul className="space-y-1 text-gray-700">
                    {businessHours.map((item, index) => (
                      <li key={index} className="flex justify-between">
                        <span className="font-medium">{item.day}:</span>
                        <span className="mr-4">{item.hours}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LocationMap;