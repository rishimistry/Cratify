"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-white">
      {/* Background pattern */}
      <div className="absolute inset-0 z-0 opacity-10">
        <div className="absolute inset-0 bg-repeat" 
             style={{ backgroundImage: "url('/patterns/pattern.svg')" }}></div>
      </div>
      
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left column - Text content */}
          <div className="max-w-lg">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-gray-900 leading-tight mb-6">
                Discover <span className="text-primary-600">Handcrafted</span> Treasures
              </h1>
              <p className="text-lg text-gray-600 mb-8">
                Support local artisans and find one-of-a-kind items crafted with passion. 
                Each purchase tells a story and supports a dream.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link 
                  href="/shop" 
                  className="btn btn-primary px-8 py-3 rounded-md text-base font-medium"
                >
                  Shop Now
                </Link>
                <Link 
                  href="/artisans" 
                  className="btn bg-white text-primary-600 border-primary-600 hover:bg-primary-50 px-8 py-3 rounded-md text-base font-medium"
                >
                  Meet Artisans
                </Link>
              </div>
            </motion.div>
          </div>
          
          {/* Right column - Image grid */}
          <motion.div 
            className="relative"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <div className="grid grid-cols-2 gap-4">
              <motion.div 
                className="space-y-4"
                initial={{ y: 20 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.7 }}
              >
                <div className="overflow-hidden rounded-lg shadow-lg">
                  <Image
                    src="https://images.pexels.com/photos/4992599/pexels-photo-4992599.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                    alt="Handmade pottery"
                    width={320}
                    height={400}
                    className="w-full h-auto object-cover"
                  />
                </div>
                <div className="overflow-hidden rounded-lg shadow-lg">
                  <Image
                    src="https://images.pexels.com/photos/10983790/pexels-photo-10983790.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                    alt="Handcrafted jewelry"
                    width={320}
                    height={240}
                    className="w-full h-auto object-cover"
                  />
                </div>
              </motion.div>
              <motion.div 
                className="space-y-4 pt-8"
                initial={{ y: -20 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.7 }}
              >
                <div className="overflow-hidden rounded-lg shadow-lg">
                  <Image
                    src="https://images.pexels.com/photos/6311257/pexels-photo-6311257.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                    alt="Handmade candles"
                    width={320}
                    height={240}
                    className="w-full h-auto object-cover"
                  />
                </div>
                <div className="overflow-hidden rounded-lg shadow-lg">
                  <Image
                    src="https://images.pexels.com/photos/5705475/pexels-photo-5705475.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                    alt="Artisan textiles"
                    width={320}
                    height={400}
                    className="w-full h-auto object-cover"
                  />
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
} 