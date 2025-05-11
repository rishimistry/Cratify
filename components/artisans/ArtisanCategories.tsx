'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FadeIn } from '@/components/ui/FadeIn';
import { motion } from 'framer-motion';

type Category = {
  id: string;
  name: string;
  description: string;
  image: string;
  artisanCount: number;
  itemCount: number;
};

const categories: Category[] = [
  {
    id: 'ceramics',
    name: 'Ceramics & Pottery',
    description: 'Handcrafted clay pieces transformed into beautiful vessels, sculptures, and tableware.',
    image: 'https://images.pexels.com/photos/2162938/pexels-photo-2162938.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    artisanCount: 48,
    itemCount: 346
  },
  {
    id: 'textiles',
    name: 'Textiles & Fabrics',
    description: 'Woven, knitted, and handprinted fabrics crafted using traditional and innovative techniques.',
    image: 'https://images.pexels.com/photos/6850602/pexels-photo-6850602.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    artisanCount: 57,
    itemCount: 412
  },
  {
    id: 'woodworking',
    name: 'Woodworking',
    description: 'Skilfully crafted wooden objects from furniture to decorative pieces with expert joinery.',
    image: 'https://images.pexels.com/photos/7319025/pexels-photo-7319025.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    artisanCount: 39,
    itemCount: 284
  },
  {
    id: 'jewelry',
    name: 'Jewelry & Metalwork',
    description: 'Handcrafted jewelry and metal objects using traditional smithing and modern techniques.',
    image: 'https://images.pexels.com/photos/10067946/pexels-photo-10067946.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    artisanCount: 65,
    itemCount: 528
  },
  {
    id: 'leather',
    name: 'Leather Crafting',
    description: 'Quality leather goods handcrafted by skilled artisans using time-honored methods.',
    image: 'https://images.pexels.com/photos/5699514/pexels-photo-5699514.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    artisanCount: 32,
    itemCount: 196
  },
  {
    id: 'glass',
    name: 'Glass Art',
    description: 'Stunning glass creations from delicate blown glass to stained glass and fused designs.',
    image: 'https://images.pexels.com/photos/5255242/pexels-photo-5255242.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    artisanCount: 24,
    itemCount: 178
  }
];

export default function ArtisanCategories() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  return (
    <section className="bg-white py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Explore Craft Categories</h2>
            <p className="mx-auto max-w-2xl text-lg text-gray-600">
              Discover artisans and their creations by exploring our diverse categories of handcrafted treasures.
            </p>
          </div>
        </FadeIn>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <FadeIn key={category.id}>
              <Link href={`/artisans/categories/${category.id}`}>
                <motion.div 
                  className="group relative h-96 overflow-hidden rounded-lg shadow-md"
                  onMouseEnter={() => setActiveCategory(category.id)}
                  onMouseLeave={() => setActiveCategory(null)}
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Background Image */}
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    className="object-cover object-center transition-transform duration-700 ease-in-out group-hover:scale-110"
                  />
                  
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
                  
                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h3 className="mb-2 text-xl font-bold">{category.name}</h3>
                    <p className="mb-4 text-sm text-gray-200">{category.description}</p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex space-x-4">
                        <div className="flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="mr-1 h-4 w-4 text-primary-light" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                          <span className="text-sm">{category.artisanCount} Artisans</span>
                        </div>
                        <div className="flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="mr-1 h-4 w-4 text-primary-light" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                          </svg>
                          <span className="text-sm">{category.itemCount} Items</span>
                        </div>
                      </div>
                      
                      <motion.div
                        className="flex items-center"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ 
                          opacity: activeCategory === category.id ? 1 : 0,
                          x: activeCategory === category.id ? 0 : 20
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        <span className="text-sm font-medium">Explore</span>
                        <svg xmlns="http://www.w3.org/2000/svg" className="ml-1 h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              </Link>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
} 