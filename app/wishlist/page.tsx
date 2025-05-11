"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FiArrowLeft, FiShoppingCart, FiTrash2, FiHeart } from "react-icons/fi";
import { useWishlist } from "@/context/WishlistContext";
import { useCart } from "@/context/CartContext";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Image from "next/image";

export default function WishlistPage() {
  const { wishlistItems, removeFromWishlist, clearWishlist } = useWishlist();
  const { addToCart } = useCart();

  const handleAddToCart = (product: any) => {
    addToCart(product, 1);
  };

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
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  if (wishlistItems.length === 0) {
    return (
      <>
        <Navbar />
        <div className="container mx-auto px-4 py-16 min-h-[calc(100vh-200px)]">
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="text-3xl font-semibold mb-6">Wishlist</h1>
            <div className="p-8 border border-gray-200 rounded-lg bg-white shadow-sm">
              <div className="flex justify-center mb-6">
                <FiHeart className="text-gray-300 text-6xl" />
              </div>
              <p className="text-lg text-gray-600 mb-6">Your wishlist is empty</p>
              <Link href="/shop">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex items-center px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition"
                >
                  <FiArrowLeft className="mr-2" />
                  Browse Products
                </motion.button>
              </Link>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-10 min-h-[calc(100vh-200px)]">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-semibold">My Wishlist</h1>
          <button
            onClick={clearWishlist}
            className="text-sm text-gray-600 hover:text-primary-600 flex items-center"
          >
            <FiTrash2 className="mr-1" />
            Clear All
          </button>
        </div>

        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {wishlistItems.map((product) => (
            <motion.div 
              key={product.id} 
              className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
              variants={itemVariants}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <div className="relative h-60 w-full overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-300 hover:scale-110"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                />
              </div>

              <div className="p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-semibold mb-1 line-clamp-1">{product.name}</h3>
                    <p className="text-primary-600 font-medium">${product.price.toFixed(2)}</p>
                  </div>
                  <button
                    onClick={() => removeFromWishlist(product.id)}
                    className="text-gray-400 hover:text-red-500 transition"
                  >
                    <FiTrash2 />
                  </button>
                </div>

                <div className="mt-4 flex space-x-2">
                  <Link 
                    href={`/products/${product.id}`}
                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg text-center text-sm hover:bg-gray-50 transition"
                  >
                    View Details
                  </Link>
                  
                  <motion.button
                    onClick={() => handleAddToCart(product)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-4 py-2 bg-primary-600 text-white rounded-lg text-sm hover:bg-primary-700 transition flex items-center justify-center"
                  >
                    <FiShoppingCart className="mr-1" />
                    Add to Cart
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <div className="mt-10 flex justify-center">
          <Link href="/shop">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center px-6 py-3 border border-primary-600 text-primary-600 rounded-lg hover:bg-primary-50 transition"
            >
              <FiArrowLeft className="mr-2" />
              Continue Shopping
            </motion.button>
          </Link>
        </div>
      </div>
      <Footer />
    </>
  );
} 