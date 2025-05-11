"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { categories } from "../../data/categories";

export default function CategoriesSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 50,
        damping: 13
      }
    }
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-4">
            Shop by Category
          </h2>
          <p className="max-w-2xl mx-auto text-gray-600">
            Explore our collection of handcrafted products across various categories
          </p>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible" 
          viewport={{ once: true, margin: "-100px" }}
        >
          {categories.map((category) => (
            <motion.div
              key={category.name}
              variants={itemVariants}
              className="transform transition-transform duration-300 hover:-translate-y-3"
            >
              <Link
                href={category.href}
                className="group block overflow-hidden rounded-lg bg-white shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <div className="relative h-60 overflow-hidden">
                  <div className="h-full w-full transform transition-transform duration-500 ease-out group-hover:scale-105 will-change-transform">
                    <Image
                      src={category.image}
                      alt={category.name}
                      fill
                      className="object-cover"
                      loading="eager"
                    />
                  </div>
                  <div 
                    className="absolute inset-0 bg-black bg-opacity-20 transition-opacity duration-300 group-hover:bg-opacity-10"
                  ></div>
                </div>
                <div 
                  className="p-4 text-center transition-colors duration-300 group-hover:bg-gray-50"
                >
                  <h3 className="text-lg font-medium text-gray-900">{category.name}</h3>
                  <p className="mt-1 text-sm text-gray-500 transition-colors duration-300 group-hover:text-primary-600">
                    {category.productCount} products
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
} 