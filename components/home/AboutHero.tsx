"use client";

import { motion } from "framer-motion";
import { pexelsImages } from "../../utils/imageUtils";

export default function AboutHero() {
  return (
    <section className="relative h-80 md:h-96 lg:h-[500px] flex items-center justify-center overflow-hidden">
      {/* Background Image with overlay gradient */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0"
        style={{ backgroundImage: `url('${pexelsImages.about.hero}')` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-primary-900/70 to-gray-900/70 z-0" />
      
      {/* Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1 
            className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Our Story
          </motion.h1>
          
          <motion.p 
            className="text-xl md:text-2xl text-white max-w-3xl mx-auto font-light"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            Connecting artisans and craft lovers around the world
          </motion.p>
          
          <motion.div 
            className="h-1 w-24 bg-primary-500 mx-auto mt-8"
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 96, opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
          />
        </motion.div>
      </div>
      
      {/* Decorative elements */}
      <motion.div 
        className="absolute bottom-0 left-0 w-full h-16 bg-white z-10"
        style={{ clipPath: "polygon(0 100%, 100% 100%, 100% 0, 0 100%)" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.7 }}
      />
    </section>
  );
} 