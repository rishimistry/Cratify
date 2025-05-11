"use client";

import { useState, useEffect } from "react";
import { products } from "../../data/products";
import ProductCard from "../../components/products/ProductCard";
import RootLayout from "../../components/layout/RootLayout";
import { FiFilter, FiX } from "react-icons/fi";
import debounce from "debounce";
import { motion } from "framer-motion";

export default function ShopPage() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [filterMenuOpen, setFilterMenuOpen] = useState(false);

  const categories = ["All", ...Array.from(new Set(products.map(product => product.category)))];

  // Filter products whenever filters change
  useEffect(() => {
    const debouncedFilter = debounce(() => {
      let filtered = [...products];

      // Category filter
      if (activeFilter !== "All") {
        filtered = filtered.filter(product => product.category === activeFilter);
      }

      // Search query filter
      if (searchQuery.trim() !== "") {
        const query = searchQuery.toLowerCase();
        filtered = filtered.filter(
          product =>
            product.name.toLowerCase().includes(query) ||
            product.description.toLowerCase().includes(query) ||
            product.artisan.name.toLowerCase().includes(query) ||
            (product.tags && product.tags.some(tag => tag.toLowerCase().includes(query)))
        );
      }

      // Price range filter
      filtered = filtered.filter(
        product => product.price >= priceRange[0] && product.price <= priceRange[1]
      );

      setFilteredProducts(filtered);
    }, 300);

    debouncedFilter();
    return () => debouncedFilter.clear();
  }, [activeFilter, searchQuery, priceRange]);

  // Get min and max price from products
  const minPrice = Math.floor(Math.min(...products.map(p => p.price)));
  const maxPrice = Math.ceil(Math.max(...products.map(p => p.price)));

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <RootLayout>
      <div className="bg-white">
        <div>
          {/* Hero section with page title and description */}
          <motion.div 
            className="relative bg-gray-50 py-16"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <motion.h1 
                className="text-4xl font-serif font-bold text-gray-900 text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                Shop Our Collection
              </motion.h1>
              <motion.p 
                className="mt-4 max-w-xl mx-auto text-center text-gray-600"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.6 }}
              >
                Discover unique handcrafted treasures from talented artisans around the world.
              </motion.p>
            </div>
          </motion.div>

          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="lg:grid lg:grid-cols-4 lg:gap-x-8">
              {/* Mobile filter dialog */}
              <div className="lg:hidden mb-6">
                <div className="flex items-center justify-between">
                  <motion.button
                    type="button"
                    className="inline-flex items-center text-primary-600"
                    onClick={() => setFilterMenuOpen(true)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FiFilter className="h-5 w-5 mr-2" />
                    <span className="text-sm font-medium">Filters</span>
                  </motion.button>
                  <div>
                    <motion.span 
                      className="text-sm text-gray-500"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      key={filteredProducts.length}
                    >
                      {filteredProducts.length} products
                    </motion.span>
                  </div>
                </div>
              </div>

              {/* Filters - Desktop */}
              <motion.div 
                className="hidden lg:block"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="divide-y divide-gray-200 space-y-6">
                  {/* Search */}
                  <div className="py-6">
                    <h3 className="font-medium text-gray-900">Search</h3>
                    <div className="mt-2">
                      <motion.input
                        type="text"
                        className="w-full border border-gray-300 rounded-md py-2 px-3 text-sm"
                        placeholder="Search products..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        whileFocus={{ scale: 1.02, borderColor: "#4F46E5" }}
                        transition={{ duration: 0.2 }}
                      />
                    </div>
                  </div>

                  {/* Categories */}
                  <div className="py-6">
                    <h3 className="font-medium text-gray-900">Categories</h3>
                    <ul className="mt-2 space-y-2">
                      {categories.map((category, index) => (
                        <motion.li 
                          key={category}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05, duration: 0.3 }}
                        >
                          <motion.button
                            className={`text-sm ${
                              activeFilter === category
                                ? "text-primary-600 font-medium"
                                : "text-gray-600 hover:text-primary-500"
                            }`}
                            onClick={() => setActiveFilter(category)}
                            whileHover={{ x: 2 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            {category}
                          </motion.button>
                        </motion.li>
                      ))}
                    </ul>
                  </div>

                  {/* Price Range */}
                  <div className="py-6">
                    <h3 className="font-medium text-gray-900">Price Range</h3>
                    <div className="mt-2 space-y-4">
                      <div className="flex items-center justify-between">
                        <motion.span 
                          className="text-sm text-gray-600"
                          key={priceRange[0]}
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 0.3 }}
                        >
                          ${priceRange[0]}
                        </motion.span>
                        <motion.span 
                          className="text-sm text-gray-600"
                          key={priceRange[1]}
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 0.3 }}
                        >
                          ${priceRange[1]}
                        </motion.span>
                      </div>
                      <motion.input
                        type="range"
                        min={minPrice}
                        max={maxPrice}
                        value={priceRange[1]}
                        onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                        className="w-full h-2 bg-gray-200 rounded-md appearance-none cursor-pointer"
                        whileTap={{ scale: 1.03 }}
                      />
                      <motion.input
                        type="range"
                        min={minPrice}
                        max={maxPrice}
                        value={priceRange[0]}
                        onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                        className="w-full h-2 bg-gray-200 rounded-md appearance-none cursor-pointer"
                        whileTap={{ scale: 1.03 }}
                      />
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Mobile filter dialog */}
              {filterMenuOpen && (
                <div className="fixed inset-0 z-40 flex lg:hidden" role="dialog" aria-modal="true">
                  <motion.div 
                    className="fixed inset-0 bg-black bg-opacity-25" 
                    aria-hidden="true" 
                    onClick={() => setFilterMenuOpen(false)}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  ></motion.div>
                  <motion.div 
                    className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl"
                    initial={{ x: "100%" }}
                    animate={{ x: 0 }}
                    exit={{ x: "100%" }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  >
                    <div className="flex items-center justify-between px-4">
                      <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                      <motion.button
                        type="button"
                        className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                        onClick={() => setFilterMenuOpen(false)}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <span className="sr-only">Close menu</span>
                        <FiX className="h-6 w-6" aria-hidden="true" />
                      </motion.button>
                    </div>

                    <div className="mt-4 px-4">
                      {/* Search */}
                      <div className="py-4 border-b border-gray-200">
                        <h3 className="font-medium text-gray-900">Search</h3>
                        <div className="mt-2">
                          <motion.input
                            type="text"
                            className="w-full border border-gray-300 rounded-md py-2 px-3 text-sm"
                            placeholder="Search products..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            whileFocus={{ scale: 1.02, borderColor: "#4F46E5" }}
                          />
                        </div>
                      </div>

                      {/* Categories */}
                      <div className="py-4 border-b border-gray-200">
                        <h3 className="font-medium text-gray-900">Categories</h3>
                        <ul className="mt-2 space-y-2">
                          {categories.map((category, index) => (
                            <motion.li 
                              key={category}
                              initial={{ opacity: 0, y: 5 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: index * 0.05 }}
                            >
                              <motion.button
                                className={`text-sm ${
                                  activeFilter === category
                                    ? "text-primary-600 font-medium"
                                    : "text-gray-600 hover:text-primary-500"
                                }`}
                                onClick={() => {
                                  setActiveFilter(category);
                                  setFilterMenuOpen(false);
                                }}
                                whileTap={{ scale: 0.95 }}
                              >
                                {category}
                              </motion.button>
                            </motion.li>
                          ))}
                        </ul>
                      </div>

                      {/* Price Range */}
                      <div className="py-4 border-b border-gray-200">
                        <h3 className="font-medium text-gray-900">Price Range</h3>
                        <div className="mt-2 space-y-4">
                          <div className="flex items-center justify-between">
                            <motion.span 
                              className="text-sm text-gray-600"
                              key={priceRange[0]}
                              animate={{ scale: [1, 1.2, 1] }}
                              transition={{ duration: 0.3 }}
                            >
                              ${priceRange[0]}
                            </motion.span>
                            <motion.span 
                              className="text-sm text-gray-600"
                              key={priceRange[1]}
                              animate={{ scale: [1, 1.2, 1] }}
                              transition={{ duration: 0.3 }}
                            >
                              ${priceRange[1]}
                            </motion.span>
                          </div>
                          <motion.input
                            type="range"
                            min={minPrice}
                            max={maxPrice}
                            value={priceRange[1]}
                            onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                            className="w-full h-2 bg-gray-200 rounded-md appearance-none cursor-pointer"
                            whileTap={{ scale: 1.03 }}
                          />
                          <motion.input
                            type="range"
                            min={minPrice}
                            max={maxPrice}
                            value={priceRange[0]}
                            onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                            className="w-full h-2 bg-gray-200 rounded-md appearance-none cursor-pointer"
                            whileTap={{ scale: 1.03 }}
                          />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              )}

              {/* Product grid */}
              <div className="lg:col-span-3">
                {filteredProducts.length === 0 ? (
                  <motion.div 
                    className="text-center py-12"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <h3 className="text-lg font-medium text-gray-900">No products found</h3>
                    <p className="mt-1 text-sm text-gray-500">
                      Try adjusting your search or filter to find what you're looking for.
                    </p>
                  </motion.div>
                ) : (
                  <motion.div 
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    key={activeFilter + searchQuery + priceRange.join('-')}
                  >
                    {filteredProducts.map((product, index) => (
                      <motion.div 
                        key={product.id} 
                        className="h-full"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ 
                          delay: index * 0.05,
                          duration: 0.5
                        }}
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
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </RootLayout>
  );
} 