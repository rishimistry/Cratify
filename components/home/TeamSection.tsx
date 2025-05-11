"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { pexelsImages } from "../../utils/imageUtils";

interface TeamMember {
  id: number;
  name: string;
  role: string;
  bio: string;
  image: string;
  social: {
    twitter?: string;
    linkedin?: string;
    instagram?: string;
  };
}

export default function TeamSection() {
  const teamMembers: TeamMember[] = [
    {
      id: 1,
      name: "Emily Chen",
      role: "Founder & CEO",
      bio: "Emily founded Cratify with the vision of creating a global platform for artisans. With a background in design and e-commerce, she's passionate about connecting creators with customers who value handmade quality.",
      image: pexelsImages.team.emily,
      social: {
        twitter: "https://twitter.com/emilychen",
        linkedin: "https://linkedin.com/in/emilychen",
        instagram: "https://instagram.com/emilychen"
      }
    },
    {
      id: 2,
      name: "Marco Rodriguez",
      role: "Head of Curation",
      bio: "Marco works directly with artisans to bring their finest creations to Cratify. With a deep appreciation for traditional crafts, he ensures our product selection represents the best of global artisanship.",
      image: pexelsImages.team.marco,
      social: {
        twitter: "https://twitter.com/marcorodriguez",
        linkedin: "https://linkedin.com/in/marcorodriguez"
      }
    },
    {
      id: 3,
      name: "Amara Okafor",
      role: "Community Manager",
      bio: "Amara builds relationships with our artisan and customer communities. Her background in cultural anthropology helps her tell the stories behind our products and the people who make them.",
      image: pexelsImages.team.amara,
      social: {
        instagram: "https://instagram.com/amaraokafor",
        linkedin: "https://linkedin.com/in/amaraokafor"
      }
    },
    {
      id: 4,
      name: "David Kim",
      role: "Lead Developer",
      bio: "David is responsible for building and maintaining Cratify's digital platform. He's committed to creating a seamless shopping experience that showcases our artisans' work beautifully.",
      image: pexelsImages.team.david,
      social: {
        twitter: "https://twitter.com/davidkim",
        linkedin: "https://linkedin.com/in/davidkim"
      }
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section className="py-20 bg-white relative">
      {/* Decorative shape */}
      <div 
        className="absolute top-0 left-0 w-full h-32 bg-gray-50 z-0"
        style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 85%)" }}
      />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-4">
            Meet Our Team
          </h2>
          <div className="h-1 w-16 bg-primary-500 mx-auto mb-6"></div>
          <p className="max-w-2xl mx-auto text-gray-600">
            The passionate people behind Cratify who are dedicated to supporting artisans and bringing exceptional craftsmanship to your home
          </p>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {teamMembers.map((member) => (
            <motion.div 
              key={member.id}
              className="bg-white rounded-lg overflow-hidden shadow-md border border-gray-100"
              variants={itemVariants}
              whileHover={{ 
                y: -10, 
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" 
              }}
              transition={{ duration: 0.3 }}
            >
              {/* Team Member Image */}
              <div className="relative w-full h-80 overflow-hidden">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>
              
              {/* Team Member Info */}
              <div className="p-6">
                <h3 className="text-xl font-medium text-gray-900">{member.name}</h3>
                <p className="text-primary-500 mb-3 font-medium">{member.role}</p>
                <p className="text-gray-600 text-sm mb-4 line-clamp-4">{member.bio}</p>
                
                {/* Social Links */}
                <div className="flex space-x-3 pt-3 border-t border-gray-100">
                  {member.social.twitter && (
                    <a 
                      href={member.social.twitter} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-gray-500 hover:text-blue-400 transition-colors"
                      aria-label={`${member.name}'s Twitter`}
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 9.99 9.99 0 01-3.127 1.195 4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                      </svg>
                    </a>
                  )}
                  
                  {member.social.linkedin && (
                    <a 
                      href={member.social.linkedin} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-gray-500 hover:text-blue-700 transition-colors"
                      aria-label={`${member.name}'s LinkedIn`}
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                      </svg>
                    </a>
                  )}
                  
                  {member.social.instagram && (
                    <a 
                      href={member.social.instagram} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-gray-500 hover:text-pink-600 transition-colors"
                      aria-label={`${member.name}'s Instagram`}
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                      </svg>
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        <motion.div 
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <a 
            href="/careers" 
            className="inline-flex items-center px-6 py-3 border-2 border-primary-500 text-primary-500 font-medium rounded-md hover:bg-primary-50 transition-colors"
          >
            Join Our Team
            <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
} 