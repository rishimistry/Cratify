"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { pexelsImages } from "../../utils/imageUtils";

export default function ArtisanProcess() {
  const processes = [
    {
      title: "Traditional Tools",
      description: "Our artisans use time-honored tools and techniques, often passed down through generations, to create pieces with authentic character and soul.",
      image: pexelsImages.artisans.workshops.tools,
      alt: "Traditional artisan tools"
    },
    {
      title: "Meticulous Process",
      description: "Each piece is carefully crafted by hand, often taking days or weeks to complete. This slow, deliberate process ensures exceptional quality and attention to detail.",
      image: pexelsImages.artisans.workshops.process,
      alt: "Artisan working on handcrafted item"
    },
    {
      title: "Sustainable Materials",
      description: "We prioritize ethically sourced, natural materials that minimize environmental impact while honoring traditional crafting methods.",
      image: pexelsImages.artisans.workshops.materials,
      alt: "Natural crafting materials"
    },
    {
      title: "Community Impact",
      description: "By supporting our artisans, you're helping preserve cultural heritage and sustain local communities around the world.",
      image: pexelsImages.artisans.workshops.community,
      alt: "Artisans in their community"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section id="artisan-process" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-4">
            The Crafting Process
          </h2>
          <div className="h-1 w-16 bg-primary-500 mx-auto mb-6"></div>
          <p className="max-w-2xl mx-auto text-gray-600">
            Discover the dedication, skill, and tradition behind every handcrafted piece
          </p>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {processes.map((process, index) => (
            <motion.div 
              key={index}
              className="flex flex-col md:flex-row items-center gap-6 bg-white p-6 rounded-lg shadow-sm"
              variants={itemVariants}
              whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
              transition={{ duration: 0.3 }}
            >
              <div className="w-full md:w-1/2 relative h-60 rounded-lg overflow-hidden">
                <Image
                  src={process.image}
                  alt={process.alt}
                  fill
                  className="object-cover"
                />
              </div>
              
              <div className="w-full md:w-1/2">
                <h3 className="text-xl font-medium text-gray-900 mb-3">{process.title}</h3>
                <div className="h-0.5 w-12 bg-primary-500 mb-4"></div>
                <p className="text-gray-600">{process.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        <motion.div 
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <a 
            href="/shop" 
            className="inline-flex items-center px-6 py-3 bg-primary-500 text-white font-medium rounded-md hover:bg-primary-600 transition-colors"
          >
            Explore Our Collection
            <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
} 