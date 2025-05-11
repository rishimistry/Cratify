"use client";

import { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [navHeight, setNavHeight] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    // Measure navbar height only once on initial load
    const navbar = document.querySelector('header');
    if (navbar) {
      const updateNavHeight = () => {
        // Use getBoundingClientRect for more accurate height
        const rect = navbar.getBoundingClientRect();
        setNavHeight(rect.height);
      };
      
      // Update on initial load and layout shifts
      updateNavHeight();
      
      // Also update after images load which can cause layout shifts
      window.addEventListener('load', updateNavHeight);
      window.addEventListener('resize', updateNavHeight);
      
      // Track scroll position
      const handleScroll = () => {
        setIsScrolled(window.scrollY > 20);
      };
      
      window.addEventListener('scroll', handleScroll, { passive: true });
      
      return () => {
        window.removeEventListener('resize', updateNavHeight);
        window.removeEventListener('load', updateNavHeight);
        window.removeEventListener('scroll', handleScroll);
      };
    }
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      {isScrolled && (
        <div 
          style={{ height: `${navHeight}px` }} 
          className="transition-all duration-300" 
          aria-hidden="true"
        />
      )}
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
} 