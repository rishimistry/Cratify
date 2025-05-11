"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { pexelsImages } from "../../utils/imageUtils";

interface Testimonial {
  id: number;
  quote: string;
  name: string;
  title: string;
  image: string;
  type: "customer" | "artisan";
}

export default function TestimonialSection() {
  const testimonials: Testimonial[] = [
    {
      id: 1,
      quote: "Cratify has transformed my business. I now reach customers worldwide who truly appreciate traditional craftsmanship. The platform's focus on telling my story has created a real connection with buyers.",
      name: "Maria Gonzalez",
      title: "Ceramic Artist, Mexico",
      image: pexelsImages.testimonials.maria,
      type: "artisan"
    },
    {
      id: 2,
      quote: "I've been looking for authentic, handcrafted items that tell a story. Cratify delivers exactly that - beautiful products with real character, and I love knowing exactly who made each piece.",
      name: "Thomas Wright",
      title: "Loyal Customer",
      image: pexelsImages.testimonials.thomas,
      type: "customer"
    },
    {
      id: 3,
      quote: "What I love about selling through Cratify is how they value tradition. They understand that each piece I create carries cultural significance and help me communicate that to customers.",
      name: "Arun Patel",
      title: "Textile Weaver, India",
      image: pexelsImages.testimonials.arun,
      type: "artisan"
    },
    {
      id: 4,
      quote: "The quality of items I've purchased from Cratify is exceptional. It's clear these are made with care and skill - something you just don't find in mass-produced products.",
      name: "Sarah Johnson",
      title: "Interior Designer & Customer",
      image: pexelsImages.testimonials.sarah,
      type: "customer"
    },
    {
      id: 5,
      quote: "Being part of Cratify has given me not just a marketplace, but a community. The platform's commitment to sustainable practices aligns perfectly with my own values as a craftsman.",
      name: "Liam Anderson",
      title: "Woodworker, Canada",
      image: pexelsImages.testimonials.liam,
      type: "artisan"
    }
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  
  // Auto-advance testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % testimonials.length);
    }, 8000);
    
    return () => clearInterval(interval);
  }, [testimonials.length]);

  return (
    <section className="py-20 bg-gray-50 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-16 bg-white z-10" 
        style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 0)" }} />
      <div className="absolute bottom-0 right-0 w-full h-16 bg-white z-10" 
        style={{ clipPath: "polygon(0 100%, 100% 0, 100% 100%, 0 100%)" }} />
        
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-4">
            What People Say
          </h2>
          <div className="h-1 w-16 bg-primary-500 mx-auto mb-6"></div>
          <p className="max-w-2xl mx-auto text-gray-600">
            From artisans to customers, hear what our community has to say about Cratify
          </p>
        </motion.div>
        
        {/* Testimonial Slider */}
        <div className="relative max-w-4xl mx-auto">
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-700 ease-in-out" 
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              {testimonials.map((testimonial) => (
                <div 
                  key={testimonial.id} 
                  className="w-full flex-shrink-0 px-4"
                >
                  <motion.div 
                    className="bg-white rounded-lg shadow-md p-8 flex flex-col items-center text-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    whileHover={{ y: -5, boxShadow: "0 15px 30px -5px rgba(0, 0, 0, 0.1)" }}
                  >
                    <div className="relative w-20 h-20 rounded-full overflow-hidden mb-6 border-2 border-primary-500 shadow-sm">
                      <Image
                        src={testimonial.image}
                        alt={testimonial.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    
                    <div className="mb-6">
                      <svg className="w-10 h-10 text-primary-200 mx-auto mb-4" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                      </svg>
                      <p className="text-gray-700 italic leading-relaxed">{testimonial.quote}</p>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-gray-900 text-lg">{testimonial.name}</h4>
                      <p className="text-sm text-primary-500 mb-2">{testimonial.title}</p>
                      <span className="inline-block px-3 py-1 bg-gray-100 text-xs rounded-full">
                        {testimonial.type === "artisan" ? "Artisan" : "Customer"}
                      </span>
                    </div>
                  </motion.div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Navigation Buttons */}
          <motion.button 
            className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-6 w-12 h-12 rounded-full bg-white shadow-md flex items-center justify-center text-gray-600 hover:text-primary-500 z-10"
            onClick={() => setActiveIndex((current) => (current === 0 ? testimonials.length - 1 : current - 1))}
            whileHover={{ scale: 1.1, backgroundColor: "#f9fafb" }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
          </motion.button>
          
          <motion.button 
            className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-6 w-12 h-12 rounded-full bg-white shadow-md flex items-center justify-center text-gray-600 hover:text-primary-500 z-10"
            onClick={() => setActiveIndex((current) => (current + 1) % testimonials.length)}
            whileHover={{ scale: 1.1, backgroundColor: "#f9fafb" }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </motion.button>
        </div>
        
        {/* Indicators */}
        <div className="flex justify-center space-x-2 mt-10">
          {testimonials.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${index === activeIndex ? 'bg-primary-500 w-6' : 'bg-gray-300'}`}
              onClick={() => setActiveIndex(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
} 