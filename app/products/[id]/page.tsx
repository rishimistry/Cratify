"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FiArrowLeft, FiHeart, FiShoppingCart } from "react-icons/fi";
import { useRouter } from "next/navigation";
import { products } from "../../../data/products";
import RootLayout from "../../../components/layout/RootLayout";
import { motion } from "framer-motion";
import { use } from "react";
import { useCart } from "@/context/CartContext";
import { toast } from "react-hot-toast";

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const resolvedParams = use(params);
  const product = products.find((p) => p.id === resolvedParams.id);
  const [activeImage, setActiveImage] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  if (!product) {
    return (
      <RootLayout>
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Product not found</h1>
          <button
            onClick={() => router.back()}
            className="inline-flex items-center text-primary hover:text-primary/90"
          >
            <FiArrowLeft className="mr-2" /> Go back
          </button>
        </div>
      </RootLayout>
    );
  }

  const relatedProducts = products
    .filter(
      (p) => p.category === product.category && p.id !== product.id
    )
    .slice(0, 4);

  const incrementQuantity = () => {
    if (quantity < product.stock) {
      setQuantity(quantity + 1);
    }
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const toggleWishlist = () => {
    setIsWishlisted(!isWishlisted);
  };

  const handleAddToCart = () => {
    addToCart(product, quantity);
    toast.success(`${product.name} added to cart`);
  };

  return (
    <RootLayout>
      <div className="bg-white">
        <div className="container mx-auto px-4 py-8 sm:py-16">
          {/* Back button */}
          <motion.button
            onClick={() => router.back()}
            className="inline-flex items-center text-gray-600 hover:text-primary mb-8"
            whileHover={{ x: -5 }}
            whileTap={{ scale: 0.95 }}
          >
            <FiArrowLeft className="mr-2" /> Back to products
          </motion.button>

          <div className="lg:grid lg:grid-cols-2 lg:gap-x-12">
            {/* Product images */}
            <motion.div 
              className="mb-8 lg:mb-0"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="relative aspect-square rounded-lg overflow-hidden bg-gray-100">
                <div
                  key={activeImage}
                  className="h-full w-full"
                >
                  <Image
                    src={product.images[activeImage]}
                    alt={product.name}
                    fill
                    className="object-cover object-center"
                    priority
                  />
                </div>
              </div>
              
              {/* Image thumbnails */}
              <div className="grid grid-cols-4 gap-4 mt-4">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    className={`relative aspect-square rounded-md overflow-hidden transform transition-transform hover:scale-105 active:scale-95 ${
                      activeImage === index ? "ring-2 ring-primary" : "ring-1 ring-gray-200"
                    }`}
                    onClick={() => setActiveImage(index)}
                  >
                    <Image
                      src={image}
                      alt={`${product.name} - image ${index + 1}`}
                      fill
                      className="object-cover object-center"
                    />
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Product details */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.3 }}
              >
                <Link 
                  href={`/categories/${product.category.toLowerCase()}`}
                  className="text-sm text-primary hover:text-primary/90"
                >
                  {product.category}
                </Link>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mt-2">{product.name}</h1>
                
                <div className="mt-3 flex items-center">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <motion.svg
                        key={i}
                        className={`h-5 w-5 ${
                          i < Math.floor(product.rating) 
                            ? "text-yellow-400" 
                            : "text-gray-300"
                        }`}
                        initial={{ scale: 0, rotateZ: -30 }}
                        animate={{ scale: 1, rotateZ: 0 }}
                        transition={{ delay: 0.4 + i * 0.1, type: "spring" }}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </motion.svg>
                    ))}
                  </div>
                  <p className="ml-2 text-sm text-gray-600">({product.numReviews} reviews)</p>
                </div>
                
                <motion.p 
                  className="text-3xl font-bold text-gray-900 mt-4"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  ${product.price.toFixed(2)}
                </motion.p>
                
                <div className="mt-6">
                  <h2 className="text-sm font-medium text-gray-900">Description</h2>
                  <motion.p 
                    className="mt-2 text-gray-600"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                  >
                    {product.description}
                  </motion.p>
                </div>
                
                <div className="mt-6">
                  <h2 className="text-sm font-medium text-gray-900">Artisan</h2>
                  <motion.div 
                    className="mt-2 flex items-center"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                  >
                    <div className="relative h-10 w-10 rounded-full overflow-hidden">
                      <Image
                        src={product.artisan.image}
                        alt={product.artisan.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="ml-4">
                      <Link 
                        href={`/artisans/${product.artisan.id}`}
                        className="text-sm font-medium text-gray-900 hover:text-primary"
                      >
                        {product.artisan.name}
                      </Link>
                      <p className="text-xs text-gray-500">{product.artisan.bio.substring(0, 60)}...</p>
                    </div>
                  </motion.div>
                </div>
                
                <div className="mt-8">
                  <div className="flex items-center">
                    <h2 className="text-sm font-medium text-gray-900">Quantity</h2>
                    <p className="ml-auto text-sm text-gray-500">
                      {product.stock} units available
                    </p>
                  </div>
                  <div className="mt-2 flex items-center">
                    <motion.button
                      onClick={decrementQuantity}
                      disabled={quantity <= 1}
                      className="rounded-l-md border border-gray-300 px-3 py-2 text-gray-900 disabled:opacity-50"
                      whileTap={{ scale: 0.9 }}
                    >
                      -
                    </motion.button>
                    <input
                      type="text"
                      className="w-16 border-t border-b border-gray-300 px-3 py-2 text-center text-gray-900"
                      value={quantity}
                      readOnly
                    />
                    <motion.button
                      onClick={incrementQuantity}
                      disabled={quantity >= product.stock}
                      className="rounded-r-md border border-gray-300 px-3 py-2 text-gray-900 disabled:opacity-50"
                      whileTap={{ scale: 0.9 }}
                    >
                      +
                    </motion.button>
                  </div>
                </div>
                
                <div className="mt-8 flex items-center space-x-4">
                  <motion.button
                    className="flex-1 bg-primary-600 hover:bg-primary-700 text-white py-3 px-6 rounded-md font-medium focus:outline-none shadow-sm transition-colors"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                    onClick={handleAddToCart}
                  >
                    <span className="flex items-center justify-center">
                      <FiShoppingCart className="mr-2" />
                      Add to Cart
                    </span>
                  </motion.button>
                  <motion.button
                    onClick={toggleWishlist}
                    className={`p-3 rounded-md border ${
                      isWishlisted
                        ? "border-primary-600 text-primary-600"
                        : "border-gray-300 text-gray-600"
                    } transition-colors`}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9 }}
                  >
                    <FiHeart
                      className={isWishlisted ? "fill-primary-600" : ""}
                    />
                  </motion.button>
                </div>
                
                <div className="mt-8 border-t border-gray-200 pt-4">
                  <p className="text-sm text-gray-500">
                    Tags: {product.tags?.join(", ")}
                  </p>
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* Related products */}
          {relatedProducts.length > 0 && (
            <motion.div 
              className="mt-16"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">You might also like</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {relatedProducts.map((relatedProduct, index) => (
                  <motion.div 
                    key={relatedProduct.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                  >
                    <Link 
                      href={`/products/${relatedProduct.id}`}
                      className="group block"
                    >
                      <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-100">
                        <div className="h-full w-full transform transition-transform duration-500 ease-out group-hover:scale-105 will-change-transform">
                          <Image
                            src={relatedProduct.images ? relatedProduct.images[0] : relatedProduct.image}
                            alt={relatedProduct.name}
                            fill
                            className="object-cover object-center"
                            loading="eager"
                          />
                        </div>
                      </div>
                      <h3 className="mt-2 text-sm font-medium text-gray-900">{relatedProduct.name}</h3>
                      <p className="mt-1 text-sm text-gray-600">${relatedProduct.price.toFixed(2)}</p>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </RootLayout>
  );
} 