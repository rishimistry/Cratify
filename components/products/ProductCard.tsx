"use client";

import Image from "next/image";
import Link from "next/link";
import { FiHeart, FiShoppingCart } from "react-icons/fi";
import { useState } from "react";
import { motion } from "framer-motion";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { toast } from "react-hot-toast";

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  image: string;
  artisan: {
    name: string;
    id: string;
  };
  category: string;
}

export default function ProductCard({ id, name, price, image, artisan, category }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  
  const productData = { id, name, price, image, artisan, category };
  const inWishlist = isInWishlist(id);

  const toggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (inWishlist) {
      removeFromWishlist(id);
    } else {
      addToWishlist(productData);
    }
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Add to cart
    addToCart(productData, 1);
    toast.success(`${name} added to cart`);
  };

  return (
    <div 
      className="group relative h-full flex flex-col transition-transform duration-300 hover:-translate-y-2"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative h-64 w-full overflow-hidden rounded-lg bg-gray-200">
        <Link href={`/products/${id}`}>
          <div className="h-full w-full">
            <div 
              className="h-full w-full transform transition-transform duration-500 ease-out"
              style={{ 
                transform: isHovered ? 'scale(1.05)' : 'scale(1)',
                transformOrigin: 'center center',
                willChange: 'transform'
              }}
            >
              <Image
                src={image}
                alt={name}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className="object-cover object-center"
                priority={true}
                loading="eager"
              />
            </div>
          </div>
          <motion.button
            onClick={toggleWishlist}
            whileTap={{ scale: 0.9 }}
            className="absolute top-2 right-2 p-2 rounded-full bg-white bg-opacity-70 hover:bg-opacity-100 hover:scale-110 transition-all z-10"
          >
            <FiHeart
              className={`h-5 w-5 ${
                inWishlist ? "fill-primary-600 text-primary-600" : "text-gray-500"
              }`}
            />
          </motion.button>
        </Link>
      </div>
      
      <div className="mt-4 flex-grow">
        <h3 className="text-sm font-medium text-gray-900 line-clamp-1 hover:text-primary-600 transition-colors">
          <Link href={`/products/${id}`}>
            {name}
          </Link>
        </h3>
        <p className="mt-1 text-xs text-gray-500">
          <Link href={`/artisans/${artisan.id}`} className="hover:text-primary-600 transition-colors">
            {artisan.name}
          </Link>
        </p>
        <p className="mt-1 text-xs text-gray-500">
          <Link href={`/categories/${category.toLowerCase()}`} className="hover:text-primary-600 transition-colors">
            {category}
          </Link>
        </p>
      </div>
      <div className="flex items-center justify-between mt-2">
        <p className="text-sm font-medium text-gray-900 hover:scale-105 transition-transform">
          ${price.toFixed(2)}
        </p>
        <button
          onClick={handleAddToCart}
          className="bg-primary-600 hover:bg-primary-700 text-white p-2 rounded-full transition-all hover:scale-110 active:scale-95"
        >
          <FiShoppingCart className="h-4 w-4" />
        </button>
      </div>
      <Link href={`/products/${id}`} className="absolute inset-0 z-0" aria-hidden="true"></Link>
    </div>
  );
} 