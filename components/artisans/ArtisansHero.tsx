"use client";

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FadeIn } from '@/components/ui/FadeIn';

export default function ArtisansHero() {
  return (
    <section className="relative overflow-hidden bg-white">
      {/* Background pattern */}
      <div className="absolute inset-0 z-0 opacity-10">
        <div className="absolute inset-0 bg-[url('/patterns/pattern.svg')] bg-repeat opacity-30" />
      </div>

      <div className="container relative z-10 mx-auto px-4 py-24 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <FadeIn className="order-2 flex flex-col lg:order-1">
            <motion.h1 
              className="mb-6 text-4xl font-serif font-bold text-gray-900 sm:text-5xl md:text-6xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Meet Our <span className="text-primary-600">Artisans</span>
            </motion.h1>
            
            <motion.p 
              className="mb-8 max-w-2xl text-xl text-gray-600"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              Discover the passionate craftspeople behind our unique products. 
              Each artisan brings generations of skill, dedication, and artistry 
              to create remarkable items that tell a story.
            </motion.p>

            <motion.div
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <Link 
                href="#featured-artisans" 
                className="btn btn-primary px-6 py-3 text-base font-medium"
              >
                Explore Artisans
              </Link>
              <Link 
                href="#artisan-process" 
                className="btn bg-white text-primary-600 border border-primary-600 hover:bg-primary-50 px-6 py-3 text-base font-medium"
              >
                Learn More
              </Link>
            </motion.div>
          </FadeIn>

          <FadeIn className="order-1 lg:order-2">
            <div className="relative h-[400px] w-full overflow-hidden rounded-xl shadow-lg sm:h-[500px]">
              <Image
                src="https://images.pexels.com/photos/8285167/pexels-photo-8285167.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt="Artisan crafting a ceramic piece"
                fill
                className="object-cover object-center"
                priority
              />
              <div className="absolute -bottom-1 -left-1 h-24 w-24 rounded-br-3xl bg-primary-600" />
              <div className="absolute -right-1 -top-1 h-24 w-24 rounded-tl-3xl bg-secondary-500" />
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
} 