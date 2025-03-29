'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

// Define product interface
interface Product {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  category: string;
}

// Sample product data
const productData: Product[] = [
  {
    id: 1,
    title: "אלבום תמונות משפחתי",
    description: "אלבום איכותי בכריכת עור לשמירת זכרונות משפחתיים",
    imageUrl: "/images/album.jpg",
    category: "אלבומים"
  },
  {
    id: 2,
    title: "הדפסות קנבס",
    description: "הדפסות איכותיות על קנבס בגדלים שונים",
    imageUrl: "/images/canvas.jpg",
    category: "הדפסות"
  },
  {
    id: 3,
    title: "מסגרות עץ מעוצבות",
    description: "מסגרות עץ בעבודת יד בסגנונות שונים",
    imageUrl: "/images/frame.jpg",
    category: "מסגרות"
  },
  {
    id: 4,
    title: "הדפסות פרימיום",
    description: "הדפסות באיכות גבוהה על נייר ארכיוני",
    imageUrl: "/images/print.jpg",
    category: "הדפסות"
  },
  {
    id: 5,
    title: "אלבום חתונה יוקרתי",
    description: "אלבום חתונה מפואר בעיצוב אישי",
    imageUrl: "/images/wedding-album.jpg",
    category: "אלבומים"
  },
  {
    id: 6,
    title: "קולאז' תמונות",
    description: "עיצוב קולאז' תמונות אישי בגדלים שונים",
    imageUrl: "/images/collage.jpg",
    category: "עיצובים מיוחדים"
  },
  {
    id: 7,
    title: "מגנטים לאירועים",
    description: "מגנטים מעוצבים לאירועים ומסיבות",
    imageUrl: "/images/magnets.jpg",
    category: "מוצרים לאירועים"
  },
  {
    id: 8,
    title: "לוח תמונות משפחתי",
    description: "לוח תמונות משפחתי מעוצב לתלייה",
    imageUrl: "/images/photo-board.jpg",
    category: "עיצובים מיוחדים"
  }
];

// ProductsGallery component
const ProductsGallery: React.FC = () => {
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('הכל');
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(productData);
  
  // Ref for intersection observer
  const galleryRef = useRef<HTMLDivElement>(null);

  // Extract unique categories
  useEffect(() => {
    const uniqueCategories = Array.from(new Set(productData.map(product => product.category)));
    setCategories(['הכל', ...uniqueCategories]);
  }, []);

  // Filter products based on selected category
  useEffect(() => {
    if (selectedCategory === 'הכל') {
      setFilteredProducts(productData);
    } else {
      setFilteredProducts(productData.filter(product => product.category === selectedCategory));
    }
  }, [selectedCategory]);

  // Animation variants for container
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  // Animation variants for items
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    }
  };

  // Handle category change
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  return (
    <div className="rtl-direction w-full py-12 px-4 md:px-8 bg-gray-50" dir="rtl" ref={galleryRef}>
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-2 text-[#588C7E]">
          המוצרים שלנו
        </h2>
        <p className="text-center text-gray-600 mb-8 max-w-2xl mx-auto">
          אנו מציעים מגוון רחב של מוצרי צילום איכותיים המיוצרים בסטנדרטים הגבוהים ביותר
        </p>

        {/* Category filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryChange(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                selectedCategory === category
                  ? 'bg-[#588C7E] text-white shadow-md'
                  : 'bg-white text-gray-700 hover:bg-[#96CEB4] hover:text-white'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Products grid */}
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {filteredProducts.map((product) => (
            <motion.div
              key={product.id}
              className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
              variants={itemVariants}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="relative h-64 overflow-hidden">
                {/* Placeholder for actual images */}
                <div className="absolute inset-0 bg-[#96CEB4] opacity-20"></div>
                <div className="w-full h-full relative">
                  {/* Replace with actual Image component when you have images */}
                  <div className="w-full h-full bg-gradient-to-br from-[#96CEB4]/40 to-[#588C7E]/40 flex items-center justify-center">
                    <span className="text-[#588C7E] text-sm">תמונה: {product.title}</span>
                  </div>
                  {/* Uncomment when you have actual images
                  <Image
                    src={product.imageUrl}
                    alt={product.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  */}
                </div>
                <div className="absolute top-3 left-3 bg-[#588C7E] text-white text-xs py-1 px-2 rounded-full">
                  {product.category}
                </div>
              </div>
              <div className="p-5">
                <h3 className="text-xl font-bold text-gray-800 mb-2">{product.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{product.description}</p>
                <button className="w-full bg-[#96CEB4] hover:bg-[#588C7E] text-white py-2 rounded-md transition-colors duration-300 font-medium">
                  לפרטים נוספים
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default ProductsGallery;