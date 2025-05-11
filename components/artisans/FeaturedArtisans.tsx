"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { FadeIn } from "@/components/ui/FadeIn";

type Artisan = {
  id: string;
  name: string;
  specialty: string;
  location: string;
  description: string;
  image: string;
  rating: number;
  products: number;
};

const featuredArtisans: Artisan[] = [
  {
    id: 'artisan-1',
    name: 'Maria Fernandez',
    specialty: 'Ceramic Pottery',
    location: 'Oaxaca, Mexico',
    description: 'Maria combines traditional techniques with contemporary designs to create unique ceramic pieces that tell stories of her heritage.',
    image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    rating: 4.9,
    products: 42
  },
  {
    id: 'artisan-2',
    name: 'Takumi Nakamura',
    specialty: 'Woodworking',
    location: 'Kyoto, Japan',
    description: 'With over 25 years of experience, Takumi creates wooden items using traditional Japanese joinery techniques without nails or screws.',
    image: 'https://images.pexels.com/photos/769772/pexels-photo-769772.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    rating: 4.8,
    products: 36
  },
  {
    id: 'artisan-3',
    name: 'Amara Okafor',
    specialty: 'Textile Art',
    location: 'Lagos, Nigeria',
    description: 'Amara weaves vibrant textiles using traditional looms and natural dyes, preserving her community\'s centuries-old techniques.',
    image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    rating: 4.9,
    products: 58
  },
  {
    id: 'artisan-4',
    name: 'Paolo Rossi',
    specialty: 'Leather Crafting',
    location: 'Florence, Italy',
    description: 'A third-generation leather artisan, Paolo handcrafts leather goods using the same tools his grandfather used decades ago.',
    image: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    rating: 4.7,
    products: 29
  }
];

export default function FeaturedArtisans() {
  const [hoveredArtisan, setHoveredArtisan] = useState<string | null>(null);

  return (
    <section id="featured-artisans" className="bg-gray-50 py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Featured Artisans</h2>
            <p className="mx-auto max-w-2xl text-lg text-gray-600">
              Meet the skilled craftspeople whose passion and expertise bring unique handmade treasures to life.
            </p>
          </div>
        </FadeIn>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {featuredArtisans.map((artisan) => (
            <FadeIn key={artisan.id}>
              <Link href={`/artisans/${artisan.id}`}>
                <motion.div 
                  className="group h-full overflow-hidden rounded-lg bg-white shadow-md transition-all duration-300 hover:shadow-xl"
                  onMouseEnter={() => setHoveredArtisan(artisan.id)}
                  onMouseLeave={() => setHoveredArtisan(null)}
                  whileHover={{ y: -5 }}
                >
                  <div className="relative h-64 overflow-hidden">
                    <Image
                      src={artisan.image}
                      alt={artisan.name}
                      fill
                      className="object-cover object-center transition-transform duration-500 ease-in-out group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  </div>
                  
                  <div className="p-6">
                    <div className="mb-3 flex items-center justify-between">
                      <h3 className="text-xl font-semibold text-gray-900">{artisan.name}</h3>
                      <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                        {artisan.specialty}
                      </span>
                    </div>
                    
                    <p className="mb-4 text-sm text-gray-600">{artisan.description}</p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1 text-sm text-gray-600">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-500" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <span>{artisan.rating}</span>
                      </div>
                      
                      <div className="text-sm text-gray-600">
                        <span className="font-medium">{artisan.products}</span> Products
                      </div>
                    </div>
                    
                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-600">{artisan.location}</span>
                      <motion.span 
                        className="flex items-center text-sm font-medium text-primary"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ 
                          opacity: hoveredArtisan === artisan.id ? 1 : 0, 
                          x: hoveredArtisan === artisan.id ? 0 : -10 
                        }}
                        transition={{ duration: 0.2 }}
                      >
                        View Profile
                        <svg xmlns="http://www.w3.org/2000/svg" className="ml-1 h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </motion.span>
                    </div>
                  </div>
                </motion.div>
              </Link>
            </FadeIn>
          ))}
        </div>

        <FadeIn>
          <div className="mt-12 text-center">
            <Link 
              href="/artisans/all" 
              className="inline-flex items-center rounded-md border border-transparent bg-primary px-6 py-3 text-base font-medium text-white shadow-sm transition-colors hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            >
              View All Artisans
              <svg xmlns="http://www.w3.org/2000/svg" className="ml-2 h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </Link>
          </div>
        </FadeIn>
      </div>
    </section>
  );
} 