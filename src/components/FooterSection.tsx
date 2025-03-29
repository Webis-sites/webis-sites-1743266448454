import { FC } from 'react';
import Link from 'next/link';
import { FaFacebook, FaInstagram, FaTwitter, FaWhatsapp, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';

interface FooterLinkProps {
  href: string;
  label: string;
}

interface SocialIconProps {
  href: string;
  icon: JSX.Element;
  label: string;
}

const FooterLink: FC<FooterLinkProps> = ({ href, label }) => {
  return (
    <li className="mb-2">
      <Link 
        href={href} 
        className="text-gray-200 hover:text-white transition-colors duration-300 text-sm block"
        aria-label={label}
      >
        {label}
      </Link>
    </li>
  );
};

const SocialIcon: FC<SocialIconProps> = ({ href, icon, label }) => {
  return (
    <a 
      href={href} 
      target="_blank" 
      rel="noopener noreferrer" 
      className="bg-[#588C7E] hover:bg-[#96CEB4] text-white p-2 rounded-full mx-2 transition-transform duration-300 hover:scale-110"
      aria-label={label}
    >
      {icon}
    </a>
  );
};

const FooterSection: FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-800 text-white pt-12 pb-6 font-sans" dir="rtl">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* סטודיו מידע */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-[#96CEB4]">סטודיו לצילום דלתא</h3>
            <p className="text-gray-300 mb-4 text-sm leading-relaxed">
              אנחנו סטודיו לצילום מוביל בתחום עם ניסיון של שנים רבות. אנחנו מתמחים במתן שירות מקצועי ואיכותי ללקוחותינו.
            </p>
          </div>

          {/* קישורים מהירים */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-[#96CEB4]">ניווט מהיר</h3>
            <ul>
              <FooterLink href="/" label="דף הבית" />
              <FooterLink href="/services" label="שירותים" />
              <FooterLink href="/gallery" label="גלריה" />
              <FooterLink href="/about" label="אודות" />
              <FooterLink href="/contact" label="צור קשר" />
              <FooterLink href="/pricing" label="מחירון" />
            </ul>
          </div>

          {/* פרטי התקשרות */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-[#96CEB4]">צור קשר</h3>
            <ul className="text-gray-300">
              <li className="mb-3 flex items-center">
                <FaMapMarkerAlt className="ml-2 text-[#96CEB4]" />
                <span className="text-sm">רחוב הצלמים 123, תל אביב</span>
              </li>
              <li className="mb-3 flex items-center">
                <FaPhone className="ml-2 text-[#96CEB4]" />
                <span className="text-sm">03-1234567</span>
              </li>
              <li className="mb-3 flex items-center">
                <FaWhatsapp className="ml-2 text-[#96CEB4]" />
                <span className="text-sm">050-1234567</span>
              </li>
              <li className="mb-3 flex items-center">
                <FaEnvelope className="ml-2 text-[#96CEB4]" />
                <span className="text-sm">info@deltastudio.co.il</span>
              </li>
            </ul>
          </div>

          {/* שעות פעילות */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-[#96CEB4]">שעות פעילות</h3>
            <ul className="text-gray-300 text-sm">
              <li className="mb-2">ראשון - חמישי: 09:00 - 19:00</li>
              <li className="mb-2">שישי: 09:00 - 14:00</li>
              <li className="mb-2">שבת: סגור</li>
            </ul>
          </div>
        </div>

        {/* רשתות חברתיות */}
        <div className="mt-8 flex justify-center">
          <SocialIcon 
            href="https://facebook.com" 
            icon={<FaFacebook />}
            label="פייסבוק"
          />
          <SocialIcon 
            href="https://instagram.com" 
            icon={<FaInstagram />}
            label="אינסטגרם"
          />
          <SocialIcon 
            href="https://twitter.com" 
            icon={<FaTwitter />}
            label="טוויטר"
          />
          <SocialIcon 
            href="https://wa.me/9721234567" 
            icon={<FaWhatsapp />}
            label="וואטסאפ"
          />
        </div>

        {/* קו מפריד */}
        <div className="border-t border-gray-700 mt-8 pt-8">
          {/* זכויות יוצרים */}
          <div className="text-center text-gray-400 text-sm">
            <p>© {currentYear} סטודיו לצילום דלתא. כל הזכויות שמורות.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;