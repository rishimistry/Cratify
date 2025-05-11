"use client";

import { useState } from "react";
import ProductCard from "../products/ProductCard";
import { products } from "../../data/products";
import { motion } from "framer-motion";

export default function FeaturedProducts() {
  const [activeFilter, setActiveFilter] = useState("All");
  
  const featuredProducts = products.filter(product => product.featured);
  
  const filters = [
    "All", 
    ...Array.from(new Set(featuredProducts.map(product => product.category)))
  ];
  
  const filteredProducts = activeFilter === "All" 
    ? featuredProducts 
    : featuredProducts.filter(product => product.category === activeFilter);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
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
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-4">
            Featured Products
          </h2>
          <p className="max-w-2xl mx-auto text-gray-600">
            Discover our most popular handcrafted items from talented artisans
          </p>
        </motion.div>
        
        {/* Category filters */}
        <motion.div 
          className="flex justify-center flex-wrap gap-2 mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {filters.map((filter, index) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 transform hover:-translate-y-1 ${
                activeFilter === filter
                  ? "bg-primary-500 text-white"
                  : "bg-gray-100 text-gray-800 hover:bg-gray-200"
              }`}
            >
              {filter}
            </button>
          ))}
        </motion.div>
        
        {/* Products grid */}
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          key={activeFilter}
        >
          {filteredProducts.map((product) => (
            <motion.div 
              key={product.id} 
              className="h-full"
              variants={itemVariants}
            >
              <ProductCard
                id={product.id}
                name={product.name}
                price={product.price}
                image={product.image}
                artisan={product.artisan}
                category={product.category}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
} 