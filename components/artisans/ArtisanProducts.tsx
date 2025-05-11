'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { products, Product } from '@/data/products';

interface ArtisanProductsProps {
  artisanId: string;
  artisanName: string;
}

const ArtisanProducts: React.FC<ArtisanProductsProps> = ({ artisanId, artisanName }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [sortOption, setSortOption] = useState<string>('default');
  const [showInStock, setShowInStock] = useState<boolean>(false);

  const artisanProducts = products.filter(product => product.artisan.id === artisanId);
  
  // Get unique categories
  const categories = ['All', ...new Set(artisanProducts.map(product => product.category))];

  // Filter products
  const filteredProducts = artisanProducts
    .filter(product => 
      (selectedCategory === 'All' || product.category === selectedCategory) &&
      (!showInStock || product.stock > 0)
    )
    .sort((a, b) => {
      if (sortOption === 'price-low') return a.price - b.price;
      if (sortOption === 'price-high') return b.price - a.price;
      if (sortOption === 'rating') {
        const ratingA = a.rating || 0;
        const ratingB = b.rating || 0;
        return ratingB - ratingA;
      }
      return 0;
    });

  return (
    <div className="py-8">
      <h2 className="text-2xl font-bold mb-6">{artisanName}&apos;s Products</h2>
      
      <div className="mb-8 space-y-4">
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-md transition ${
                selectedCategory === category
                  ? 'bg-amber-600 text-white'
                  : 'bg-gray-100 hover:bg-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
        
        <div className="flex flex-wrap gap-4 items-center">
          <div>
            <label htmlFor="sort" className="mr-2 font-medium">Sort by:</label>
            <select
              id="sort"
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="p-2 border rounded-md"
            >
              <option value="default">Default</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Rating</option>
            </select>
          </div>
          
          <div className="flex items-center">
            <input
              type="checkbox"
              id="inStock"
              checked={showInStock}
              onChange={() => setShowInStock(!showInStock)}
              className="mr-2"
            />
            <label htmlFor="inStock">Show in stock only</label>
          </div>
        </div>
      </div>

      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <AnimatePresence>
            {filteredProducts.map((product) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition"
              >
                <Link href={`/products/${product.id}`}>
                  <div className="relative h-64 w-full">
                    <Image
                      src={product.images[0]}
                      alt={product.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  
                  <div className="p-4">
                    <h3 className="text-lg font-semibold mb-1">{product.name}</h3>
                    <p className="text-sm text-gray-600 mb-2 line-clamp-2">{product.description}</p>
                    
                    <div className="flex justify-between items-center">
                      <p className="font-bold text-amber-600">${product.price.toFixed(2)}</p>
                      
                      <div className="flex items-center">
                        <span className="text-amber-500 mr-1">★</span>
                        <span>{product.rating?.toFixed(1) || 'N/A'}</span>
                      </div>
                    </div>
                    
                    <div className="mt-2 text-sm">
                      {product.stock > 0 ? (
                        <span className="text-green-600">In Stock ({product.stock})</span>
                      ) : (
                        <span className="text-red-600">Out of Stock</span>
                      )}
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <p className="text-lg text-gray-600">No products found matching your criteria.</p>
          <button
            onClick={() => {
              setSelectedCategory('All');
              setSortOption('default');
              setShowInStock(false);
            }}
            className="mt-4 px-4 py-2 bg-amber-600 text-white rounded-md hover:bg-amber-700 transition"
          >
            Reset Filters
          </button>
        </motion.div>
      )}

      <p className="text-gray-600">
        Browse through our artisan&apos;s unique collection of handcrafted products.
      </p>
    </div>
  );
};

export default ArtisanProducts; 