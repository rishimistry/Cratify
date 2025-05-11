"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useCart } from "@/context/CartContext";
import { FiArrowLeft, FiMinus, FiPlus, FiTrash2 } from "react-icons/fi";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function CartPage() {
  const { 
    cartItems, 
    removeFromCart, 
    updateQuantity, 
    clearCart, 
    totalItems, 
    totalPrice 
  } = useCart();

  if (totalItems === 0) {
    return (
      <>
        <Navbar />
        <div className="container mx-auto px-4 py-16 min-h-[calc(100vh-200px)]">
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="text-3xl font-semibold mb-6">Your Cart</h1>
            <div className="p-8 border border-gray-200 rounded-lg bg-white shadow-sm">
              <p className="text-lg text-gray-600 mb-6">Your cart is empty</p>
              <Link href="/shop">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex items-center px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition"
                >
                  <FiArrowLeft className="mr-2" />
                  Continue Shopping
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
        <h1 className="text-3xl font-semibold mb-8">Your Cart</h1>
        
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              {cartItems.map((item) => (
                <div 
                  key={item.id} 
                  className="p-6 border-b border-gray-200 last:border-b-0 flex flex-col sm:flex-row gap-4"
                >
                  <div className="flex-shrink-0 w-24 h-24 relative rounded-md overflow-hidden">
                    <Image 
                      src={item.images ? item.images[0] : "/images/product-placeholder.jpg"} 
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  
                  <div className="flex-grow">
                    <div className="flex justify-between">
                      <Link href={`/products/${item.id}`}>
                        <h3 className="font-medium text-lg hover:text-primary-600 transition">{item.name}</h3>
                      </Link>
                      <p className="font-semibold">${item.price.toFixed(2)}</p>
                    </div>
                    
                    <p className="text-gray-500 text-sm mt-1">
                      {item.artisan?.name || "Local Artisan"}
                    </p>
                    
                    <div className="flex justify-between items-center mt-4">
                      <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                        <motion.button
                          whileTap={{ scale: 0.9 }}
                          className="p-2 text-gray-500 hover:bg-gray-100 transition"
                          onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                          aria-label="Decrease quantity"
                        >
                          <FiMinus size={16} />
                        </motion.button>
                        
                        <span className="px-4 py-1 text-center w-12">
                          {item.quantity}
                        </span>
                        
                        <motion.button
                          whileTap={{ scale: 0.9 }}
                          className="p-2 text-gray-500 hover:bg-gray-100 transition"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          aria-label="Increase quantity"
                        >
                          <FiPlus size={16} />
                        </motion.button>
                      </div>
                      
                      <motion.button
                        whileTap={{ scale: 0.9 }}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-full transition"
                        onClick={() => removeFromCart(item.id)}
                        aria-label="Remove item"
                      >
                        <FiTrash2 size={18} />
                      </motion.button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-4 flex justify-between">
              <Link href="/shop">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex items-center px-4 py-2 text-primary-600 rounded-md hover:bg-primary-50 transition"
                >
                  <FiArrowLeft className="mr-2" />
                  Continue Shopping
                </motion.button>
              </Link>
              
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => clearCart()}
                className="px-4 py-2 text-red-600 rounded-md hover:bg-red-50 transition"
              >
                Clear Cart
              </motion.button>
            </div>
          </div>
          
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sticky top-4">
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal ({totalItems} items)</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span>Free</span>
                </div>
                <div className="border-t border-gray-200 pt-3 mt-3">
                  <div className="flex justify-between font-semibold">
                    <span>Total</span>
                    <span>${totalPrice.toFixed(2)}</span>
                  </div>
                </div>
              </div>
              
              <Link href="/checkout">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition"
                >
                  Proceed to Checkout
                </motion.button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
} 