"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FiMenu, FiX, FiShoppingCart, FiUser, FiHeart } from "react-icons/fi";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";

const navigation = [
  { name: "Home", href: "/" },
  { name: "Shop", href: "/shop" },
  { name: "Categories", href: "/categories" },
  { name: "About", href: "/about" },
  { name: "Artisans", href: "/artisans" },
];

export default function Navbar() {
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [hidden, setHidden] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const pathname = usePathname();
  const { totalItems } = useCart();
  const { totalItems: wishlistCount } = useWishlist();

  // Check authentication status
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/auth/me');
        const data = await response.json();
        setIsAuthenticated(data.authenticated);
      } catch (error) {
        console.error('Error checking authentication:', error);
        setIsAuthenticated(false);
      }
    };
    
    checkAuth();
  }, [pathname]);

  // Close mobile menu when pathname changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // Handle scroll event with direction detection
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const isScrolled = currentScrollY > 20;
      
      // Determine if navbar should be hidden (scrolling down) or shown (scrolling up)
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setHidden(true);
        // Close mobile menu when scrolling down
        if (mobileMenuOpen) setMobileMenuOpen(false);
      } else {
        setHidden(false);
      }
      
      setLastScrollY(currentScrollY);
      setScrolled(isScrolled);
    };

    // Add scroll event listener
    window.addEventListener("scroll", handleScroll, { passive: true });
    
    // Call once to set initial state
    handleScroll();
    
    // Remove event listener on cleanup
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY, mobileMenuOpen]);

  const iconVariants = {
    initial: { scale: 1 },
    hover: { scale: 1.2, rotate: 5 }
  };

  // Navbar variants for animation
  const navbarVariants = {
    visible: { 
      y: 0,
      transition: { 
        duration: 0.3, 
        ease: "easeInOut" 
      }
    },
    hidden: { 
      y: -100, 
      transition: { 
        duration: 0.3, 
        ease: "easeInOut" 
      }
    }
  };
  
  const handleProfileClick = (e) => {
    if (!isAuthenticated) {
      e.preventDefault();
      router.push('/login');
    }
  };

  return (
    <motion.header 
      className={`${scrolled ? "fixed top-0 left-0 right-0 z-50 shadow-md w-full" : "relative shadow-sm"} transition-all duration-300 bg-white`}
      variants={navbarVariants}
      animate={hidden && scrolled ? "hidden" : "visible"}
      layout
    >
      <div className="container mx-auto py-4 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              <span className="font-serif text-2xl font-bold text-primary-600 hover:scale-105 transition-transform duration-200">
                Cratify
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            {navigation.map((item) => (
              <div
                key={item.name}
                className="hover:-translate-y-[2px] transition-transform duration-200"
              >
                <Link
                  href={item.href}
                  className={`text-sm font-medium transition-colors ${
                    pathname === item.href
                      ? "text-primary-600"
                      : "text-gray-700 hover:text-primary-500"
                  }`}
                >
                  {pathname === item.href ? (
                    <span className="relative block">
                      {item.name}
                      <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary-600" />
                    </span>
                  ) : (
                    item.name
                  )}
                </Link>
              </div>
            ))}
          </div>

          {/* Right side icons */}
          <div className="flex items-center space-x-6">
            <div className="relative w-6 h-6 flex items-center justify-center hover:scale-110 transition-transform duration-200">
              <Link href="/wishlist" className="text-gray-600 hover:text-primary-600 flex items-center justify-center">
                <span className="sr-only">Wishlist</span>
                <div className="relative flex items-center justify-center">
                  <FiHeart className="h-6 w-6" />
                  {wishlistCount > 0 && (
                    <span className="absolute -top-2 -right-2 h-4 w-4 rounded-full bg-primary-600 text-xs text-white flex items-center justify-center">
                      {wishlistCount}
                    </span>
                  )}
                </div>
              </Link>
            </div>
            
            <div className="relative w-6 h-6 flex items-center justify-center hover:scale-110 transition-transform duration-200">
              <Link href="/cart" className="text-gray-600 hover:text-primary-600 flex items-center justify-center">
                <span className="sr-only">Cart</span>
                <div className="relative flex items-center justify-center">
                  <FiShoppingCart className="h-6 w-6" />
                  {totalItems > 0 && (
                    <span className="absolute -top-2 -right-2 h-4 w-4 rounded-full bg-primary-600 text-xs text-white flex items-center justify-center">
                      {totalItems}
                    </span>
                  )}
                </div>
              </Link>
            </div>
            
            <div className="relative w-6 h-6 flex items-center justify-center hover:scale-110 transition-transform duration-200">
              <Link 
                href={isAuthenticated ? "/profile" : "/login"} 
                className="text-gray-600 hover:text-primary-600 flex items-center justify-center"
                onClick={handleProfileClick}
              >
                <span className="sr-only">Account</span>
                <FiUser className="h-6 w-6" />
              </Link>
            </div>
            
            {/* Mobile menu button */}
            <button
              type="button"
              className="md:hidden text-gray-600 hover:text-primary-600 active:scale-95 transition-transform duration-100"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <span className="sr-only">Open main menu</span>
              {mobileMenuOpen ? (
                <FiX className="h-6 w-6" />
              ) : (
                <FiMenu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu, show/hide based on mobile menu state */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div 
              className="md:hidden overflow-hidden border-t border-gray-200 mt-4"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="space-y-1 px-2 py-3">
                {navigation.map((item, index) => (
                  <motion.div 
                    key={item.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      href={item.href}
                      className={`block px-3 py-2 rounded-md text-base font-medium ${
                        pathname === item.href
                          ? "text-primary-600 bg-primary-50"
                          : "text-gray-700 hover:text-primary-600 hover:bg-gray-50"
                      }`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
} 