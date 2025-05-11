"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { categories } from "../../data/categories";
import RootLayout from "../../components/layout/RootLayout";
import { products } from "../../data/products";

export default function CategoriesPage() {
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  
  // Count products per category
  const categoryProductCounts = categories.reduce((acc, category) => {
    const count = products.filter(product => product.category === category.name).length;
    return { ...acc, [category.name]: count };
  }, {} as Record<string, number>);
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const categoryVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 50,
        damping: 12
      }
    }
  };

  const productVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 50,
        damping: 12
      }
    }
  };
  
  return (
    <RootLayout>
      <div className="bg-white">
        <motion.div 
          className="relative bg-gray-50 py-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.h1 
              className="text-4xl font-serif font-bold text-gray-900 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              Browse Categories
            </motion.h1>
            <motion.p 
              className="mt-4 max-w-xl mx-auto text-center text-gray-600"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              Explore our collection of handcrafted products across various categories
            </motion.p>
          </div>
        </motion.div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {categories.map((category) => (
              <motion.div
                key={category.name}
                variants={categoryVariants}
                className="transform transition-transform duration-300 hover:-translate-y-3"
                onMouseEnter={() => setHoveredCategory(category.name)}
                onMouseLeave={() => setHoveredCategory(null)}
              >
                <Link href={category.href} className="block">
                  <div className="relative overflow-hidden rounded-lg shadow-md bg-white h-full">
                    <div className="relative h-72 overflow-hidden">
                      <div 
                        className="h-full w-full transform transition-transform duration-500 ease-out will-change-transform"
                        style={{ 
                          transform: hoveredCategory === category.name ? 'scale(1.05)' : 'scale(1)',
                          transformOrigin: 'center'
                        }}
                      >
                        <Image
                          src={category.image}
                          alt={category.name}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          className="object-cover object-center"
                          loading="eager"
                          priority={true}
                        />
                      </div>
                      <div 
                        className="absolute inset-0 bg-gradient-to-t from-black to-transparent transition-opacity duration-300"
                        style={{ 
                          opacity: hoveredCategory === category.name ? 0.7 : 0.5
                        }}
                      />
                      <div className="absolute bottom-0 left-0 right-0 p-6">
                        <h2 
                          className="text-2xl font-serif font-bold text-white mb-2 transform transition-transform duration-300"
                          style={{ 
                            transform: hoveredCategory === category.name ? 'translateY(-5px)' : 'translateY(0)'
                          }}
                        >
                          {category.name}
                        </h2>
                        <p 
                          className="text-white text-sm transition-all duration-300"
                          style={{ 
                            transform: hoveredCategory === category.name ? 'translateY(-5px)' : 'translateY(0)',
                            opacity: hoveredCategory === category.name ? 1 : 0.9
                          }}
                        >
                          {categoryProductCounts[category.name]} products
                        </p>
                      </div>
                    </div>
                    <div className="p-6">
                      <p className="text-gray-600 mb-4">{category.description}</p>
                      <div 
                        className="inline-flex items-center text-primary-600 font-medium transition-transform duration-300"
                        style={{ 
                          transform: hoveredCategory === category.name ? 'translateX(5px)' : 'translateX(0)'
                        }}
                      >
                        Browse Collection
                        <svg 
                          xmlns="http://www.w3.org/2000/svg" 
                          className="h-4 w-4 ml-2" 
                          fill="none" 
                          viewBox="0 0 24 24" 
                          stroke="currentColor"
                        >
                          <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth={2} 
                            d="M14 5l7 7m0 0l-7 7m7-7H3" 
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
        
        {/* Popular Products Section */}
        <div className="bg-gray-50 py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-4">
                Popular Across Categories
              </h2>
              <p className="max-w-2xl mx-auto text-gray-600">
                Handpicked favorites from our most-loved categories
              </p>
            </motion.div>
            
            <motion.div 
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
            >
              {products
                .filter(product => product.bestseller)
                .slice(0, 4)
                .map((product) => (
                  <motion.div 
                    key={product.id}
                    variants={productVariants}
                    className="transform transition-transform duration-300 hover:-translate-y-2"
                  >
                    <Link href={`/products/${product.id}`} className="block">
                      <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-100">
                        <div className="h-full w-full transform transition-transform duration-500 ease-out group-hover:scale-105 will-change-transform">
                          <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            className="object-cover object-center"
                            loading="eager"
                          />
                        </div>
                        {product.bestseller && (
                          <div className="absolute top-2 left-2 bg-primary-600 text-white px-2 py-1 text-xs font-medium rounded">
                            Bestseller
                          </div>
                        )}
                      </div>
                      <h3 className="mt-4 text-sm font-medium text-gray-900">{product.name}</h3>
                      <p className="mt-1 text-xs text-gray-500">{product.category}</p>
                      <p className="mt-1 text-sm font-medium text-gray-900">${product.price.toFixed(2)}</p>
                    </Link>
                  </motion.div>
              ))}
            </motion.div>
            
            <motion.div 
              className="text-center mt-12"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, duration: 0.4 }}
            >
              <Link
                href="/shop"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700"
              >
                View All Products
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </RootLayout>
  );
} 