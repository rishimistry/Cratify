"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { products } from "../../../data/products";
import { categories } from "../../../data/categories";
import RootLayout from "../../../components/layout/RootLayout";
import ProductCard from "../../../components/products/ProductCard";
import { FiSliders } from "react-icons/fi";

export default function CategoryPage({ params }: { params: { category: string } }) {
  const [sortOption, setSortOption] = useState("featured");
  const [sortedProducts, setSortedProducts] = useState<typeof products>([]);
  const [isSortMenuOpen, setIsSortMenuOpen] = useState(false);
  
  const decodedCategory = decodeURIComponent(params.category);
  const categoryInfo = categories.find(cat => 
    cat.name.toLowerCase() === decodedCategory.toLowerCase()
  );
  
  const categoryProducts = products.filter(
    product => product.category.toLowerCase() === decodedCategory.toLowerCase()
  );
  
  useEffect(() => {
    let sorted = [...categoryProducts];
    
    switch (sortOption) {
      case "price-low":
        sorted.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        sorted.sort((a, b) => b.price - a.price);
        break;
      case "newest":
        sorted = sorted.filter(p => p.newArrival).concat(sorted.filter(p => !p.newArrival));
        break;
      case "bestselling":
        sorted = sorted.filter(p => p.bestseller).concat(sorted.filter(p => !p.bestseller));
        break;
      case "featured":
      default:
        sorted = sorted.filter(p => p.featured).concat(sorted.filter(p => !p.featured));
        break;
    }
    
    setSortedProducts(sorted);
  }, [sortOption, categoryProducts]);

  if (!categoryInfo) {
    return (
      <RootLayout>
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Category not found</h1>
          <Link 
            href="/categories"
            className="text-primary-600 hover:text-primary-800"
          >
            Back to categories
          </Link>
        </div>
      </RootLayout>
    );
  }

  return (
    <RootLayout>
      <div className="bg-white">
        {/* Hero section */}
        <div className="relative">
          <div className="h-64 md:h-80 w-full overflow-hidden">
            <Image
              src={categoryInfo.image}
              alt={categoryInfo.name}
              fill
              priority
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50" />
          </div>
          
          <motion.div 
            className="absolute inset-0 flex flex-col items-center justify-center text-white px-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.h1 
              className="text-4xl md:text-5xl font-serif font-bold mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              {categoryInfo.name}
            </motion.h1>
            <motion.p 
              className="text-lg md:text-xl max-w-2xl text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              {categoryInfo.description}
            </motion.p>
          </motion.div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Sorting controls */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 pb-6 border-b border-gray-200">
            <div>
              <h2 className="text-2xl font-medium text-gray-900">
                {sortedProducts.length} {sortedProducts.length === 1 ? 'product' : 'products'}
              </h2>
            </div>
            
            <div className="mt-4 sm:mt-0 relative">
              <div className="flex items-center">
                <FiSliders className="mr-2 text-gray-500" />
                <button 
                  onClick={() => setIsSortMenuOpen(!isSortMenuOpen)}
                  className="text-sm font-medium text-gray-700 hover:text-primary-600 focus:outline-none"
                >
                  Sort by: <span className="text-primary-600">{sortOption.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}</span>
                </button>
              </div>
              
              {isSortMenuOpen && (
                <motion.div 
                  className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="py-1" role="menu" aria-orientation="vertical">
                    {['featured', 'price-low', 'price-high', 'newest', 'bestselling'].map((option) => (
                      <motion.button
                        key={option}
                        onClick={() => {
                          setSortOption(option);
                          setIsSortMenuOpen(false);
                        }}
                        className={`block w-full text-left px-4 py-2 text-sm ${
                          sortOption === option ? 'bg-gray-100 text-primary-600' : 'text-gray-700'
                        } hover:bg-gray-100`}
                        role="menuitem"
                        whileHover={{ x: 5 }}
                        transition={{ duration: 0.2 }}
                      >
                        {option.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>
          </div>

          {/* Products grid */}
          {sortedProducts.length > 0 ? (
            <motion.div 
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              variants={{
                hidden: { opacity: 0 },
                visible: { 
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.05
                  }
                }
              }}
              initial="hidden"
              animate="visible"
              key={sortOption} // Re-run animation when sort changes
            >
              {sortedProducts.map((product, index) => (
                <motion.div 
                  key={product.id}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { 
                      opacity: 1, 
                      y: 0,
                      transition: {
                        delay: index * 0.05,
                        duration: 0.4,
                        type: "spring",
                        stiffness: 50
                      }
                    }
                  }}
                  className="h-full"
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
          ) : (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
              <p className="text-gray-500">
                We couldn&apos;t find any products in this category.
              </p>
            </div>
          )}
        </div>

        {/* Shop other categories section */}
        <div className="bg-gray-50 py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl font-serif font-bold text-gray-900 mb-4">
                Shop Other Categories
              </h2>
              <p className="max-w-2xl mx-auto text-gray-600">
                Explore more of our handcrafted collections
              </p>
            </motion.div>
            
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {categories
                .filter(cat => cat.name !== categoryInfo.name)
                .slice(0, 3)
                .map((category, index) => (
                  <motion.div
                    key={category.name}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    whileHover={{ y: -10 }}
                  >
                    <Link 
                      href={category.href}
                      className="block overflow-hidden rounded-lg shadow-md bg-white h-full"
                    >
                      <div className="relative h-48 overflow-hidden">
                        <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.4 }}>
                          <Image
                            src={category.image}
                            alt={category.name}
                            fill
                            className="object-cover object-center"
                          />
                        </motion.div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60" />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <h3 className="text-xl font-serif font-bold text-white">{category.name}</h3>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
              ))}
            </motion.div>
            
            <motion.div 
              className="text-center mt-12"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
            >
              <Link
                href="/categories"
                className="inline-flex items-center px-6 py-3 border border-primary-600 text-base font-medium rounded-md shadow-sm text-primary-600 bg-white hover:bg-primary-50"
              >
                View All Categories
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </RootLayout>
  );
} 