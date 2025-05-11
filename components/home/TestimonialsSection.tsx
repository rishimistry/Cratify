"use client";

import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const testimonials = [
  {
    id: 1,
    content:
      "I found the most beautiful handcrafted earrings on Craftify. Each time I wear them, I get so many compliments! It&apos;s wonderful to own something so unique that also supports a local artist.",
    author: "Emma Thompson",
    role: "Fashion Designer",
    image: "https://randomuser.me/api/portraits/women/32.jpg",
  },
  {
    id: 2,
    content:
      "As an artisan, Craftify has been the perfect platform to showcase my work. The community is supportive, and I&apos;ve connected with customers who truly appreciate handmade quality.",
    author: "Michael Rodriguez",
    role: "Ceramic Artist",
    image: "https://randomuser.me/api/portraits/men/46.jpg",
  },
  {
    id: 3,
    content:
      "The leather journal I purchased is absolutely stunning. The craftsmanship is exceptional, and knowing the story behind who made it makes it even more special.",
    author: "Sarah Johnson",
    role: "Writer",
    image: "https://randomuser.me/api/portraits/women/65.jpg",
  },
];

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length
    );
  };

  return (
    <section className="py-16 bg-primary-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-4">
            What Our Community Says
          </h2>
          <p className="max-w-2xl mx-auto text-gray-600">
            Stories from artisans and buyers who are part of our growing community
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="relative overflow-hidden rounded-xl bg-white shadow-lg p-8 md:p-12">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="text-center"
              >
                <div className="flex justify-center mb-6">
                  <div className="relative h-20 w-20 rounded-full overflow-hidden border-4 border-primary-100">
                    <Image
                      src={testimonials[currentIndex].image}
                      alt={testimonials[currentIndex].author}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
                <blockquote className="text-lg text-gray-700 italic">
                  &ldquo;{testimonials[currentIndex].content}&rdquo;
                </blockquote>
                <div className="font-medium text-gray-900">
                  {testimonials[currentIndex].author}
                </div>
                <div className="text-sm text-gray-500">
                  {testimonials[currentIndex].role}
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation buttons */}
            <div className="absolute top-1/2 left-4 transform -translate-y-1/2">
              <button
                onClick={prevTestimonial}
                className="rounded-full bg-white p-2 shadow-md text-gray-600 hover:text-primary-500 focus:outline-none"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
            </div>
            <div className="absolute top-1/2 right-4 transform -translate-y-1/2">
              <button
                onClick={nextTestimonial}
                className="rounded-full bg-white p-2 shadow-md text-gray-600 hover:text-primary-500 focus:outline-none"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
            
            {/* Dots indicator */}
            <div className="flex justify-center mt-8 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`h-2 w-2 rounded-full ${
                    currentIndex === index ? "bg-primary-500" : "bg-gray-300"
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 