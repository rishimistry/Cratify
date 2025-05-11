"use client";

import { motion } from "framer-motion";

export default function JoinArtisans() {
  return (
    <section className="py-20 bg-primary-50 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-16 bg-white z-10" 
        style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 0)" }} />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
        <div className="max-w-4xl mx-auto">
          <motion.div 
            className="bg-white rounded-xl shadow-lg p-8 md:p-12 border border-gray-100"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="text-center mb-8">
              <motion.span 
                className="inline-block text-primary-600 font-medium mb-2"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                Join Our Community
              </motion.span>
              <motion.h2 
                className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                Become a Cratify Artisan
              </motion.h2>
              <motion.div 
                className="h-1 w-16 bg-primary-500 mx-auto mb-6"
                initial={{ width: 0, opacity: 0 }}
                whileInView={{ width: 64, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4 }}
              />
              <motion.p 
                className="text-gray-600 max-w-2xl mx-auto"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                Share your craft with customers worldwide. Join our platform of skilled artisans and grow your handmade business with Cratify.
              </motion.p>
            </div>
            
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              {[
                {
                  title: "Global Reach",
                  description: "Connect with customers worldwide who value authentic, handcrafted products."
                },
                {
                  title: "Fair Compensation",
                  description: "Set your own prices and receive fair payment for your skilled craftsmanship."
                },
                {
                  title: "Marketing Support",
                  description: "We professionally showcase your products and share your unique artisan story."
                }
              ].map((benefit, index) => (
                <div key={index} className="text-center p-4">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">{benefit.title}</h3>
                  <p className="text-gray-600 text-sm">{benefit.description}</p>
                </div>
              ))}
            </motion.div>
            
            <motion.div 
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              <a 
                href="/artisans/apply" 
                className="inline-flex items-center px-6 py-3 bg-primary-500 text-white font-medium rounded-md hover:bg-primary-600 transition-colors"
              >
                Apply to Join
                <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                </svg>
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
} 