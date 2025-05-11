/**
 * This file contains image URLs from Pexels and Unsplash for use throughout the site
 * All images are free to use under their respective licenses
 */

export const pexelsImages = {
  // About page images
  about: {
    hero: "https://images.pexels.com/photos/6195086/pexels-photo-6195086.jpeg", // Artisan workshop - better lighting
    workshop: "https://images.pexels.com/photos/5708072/pexels-photo-5708072.jpeg", // Pottery workshop
    ceramics: "https://images.pexels.com/photos/6195080/pexels-photo-6195080.jpeg", // Ceramic crafting - clearer image
    weaving: "https://images.pexels.com/photos/6195245/pexels-photo-6195245.jpeg", // Traditional weaving - higher quality
    packaging: "https://images.pexels.com/photos/7319158/pexels-photo-7319158.jpeg", // Sustainable packaging - more aesthetic
  },
  
  // Team member images - higher quality professional portraits
  team: {
    emily: "https://images.pexels.com/photos/5393594/pexels-photo-5393594.jpeg", // CEO - professional woman
    marco: "https://images.pexels.com/photos/937481/pexels-photo-937481.jpeg", // Head of Curation - creative professional
    amara: "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg", // Community Manager - friendly appearance
    david: "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg", // Lead Developer - tech professional
  },
  
  // Testimonial images - diverse, professional portraits
  testimonials: {
    maria: "https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg", // Ceramic Artist - creative professional
    thomas: "https://images.pexels.com/photos/2269872/pexels-photo-2269872.jpeg", // Customer - casual professional
    arun: "https://images.pexels.com/photos/2531553/pexels-photo-2531553.jpeg", // Textile Weaver - artisan appearance
    sarah: "https://images.pexels.com/photos/1181695/pexels-photo-1181695.jpeg", // Interior Designer - creative professional
    liam: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg", // Woodworker - craftsman appearance
  },
  
  // Product category images - clearer, higher quality images
  categories: {
    jewelry: "https://images.pexels.com/photos/9420617/pexels-photo-9420617.jpeg", // Clear jewelry image
    homeDecor: "https://images.pexels.com/photos/6045400/pexels-photo-6045400.jpeg", // Aesthetic home decor
    stationery: "https://images.pexels.com/photos/6690901/pexels-photo-6690901.jpeg", // Clear stationery image
    apparel: "https://images.pexels.com/photos/5709665/pexels-photo-5709665.jpeg", // Handmade apparel
  },
  
  // Artisan page images - improved artisan workshop images
  artisans: {
    hero: "https://images.pexels.com/photos/6195218/pexels-photo-6195218.jpeg", // Artisan marketplace - colorful
    featuredArtisans: [
      {
        id: 1,
        name: "Sofia Martinez",
        craft: "Pottery & Ceramics",
        location: "Mexico City, Mexico",
        image: "https://images.pexels.com/photos/6195111/pexels-photo-6195111.jpeg", // Female potter
        workshop: "https://images.pexels.com/photos/6195089/pexels-photo-6195089.jpeg", // Pottery workshop
        bio: "Sofia brings traditional Mexican ceramic techniques into contemporary designs. Each piece tells a story of her heritage while embracing modern aesthetics."
      },
      {
        id: 2,
        name: "Akira Tanaka",
        craft: "Woodworking",
        location: "Kyoto, Japan",
        image: "https://images.pexels.com/photos/5708582/pexels-photo-5708582.jpeg", // Male woodworker
        workshop: "https://images.pexels.com/photos/5708816/pexels-photo-5708816.jpeg", // Woodworking shop
        bio: "Akira's wooden tableware and utensils are made using traditional Japanese carpentry techniques passed down through generations in his family."
      },
      {
        id: 3,
        name: "Elena Petrova",
        craft: "Textile Weaving",
        location: "Sofia, Bulgaria",
        image: "https://images.pexels.com/photos/6195239/pexels-photo-6195239.jpeg", // Female weaver
        workshop: "https://images.pexels.com/photos/6195245/pexels-photo-6195245.jpeg", // Weaving loom
        bio: "Elena creates intricate hand-woven textiles using patterns and techniques from Bulgaria's rich cultural heritage, giving new life to traditional designs."
      },
      {
        id: 4,
        name: "Kwame Osei",
        craft: "Jewelry Making",
        location: "Accra, Ghana",
        image: "https://images.pexels.com/photos/5708860/pexels-photo-5708860.jpeg", // Jewelry craftsman
        workshop: "https://images.pexels.com/photos/5708859/pexels-photo-5708859.jpeg", // Jewelry workshop
        bio: "Kwame combines traditional West African metalworking techniques with contemporary designs to create unique and meaningful jewelry pieces."
      },
      {
        id: 5,
        name: "Isabella Romano",
        craft: "Glassblowing",
        location: "Venice, Italy",
        image: "https://images.pexels.com/photos/7584538/pexels-photo-7584538.jpeg", // Glassblower
        workshop: "https://images.pexels.com/photos/7584542/pexels-photo-7584542.jpeg", // Glass workshop
        bio: "Isabella comes from a long line of Venetian glass artisans. Her colorful creations honor tradition while introducing innovative shapes and techniques."
      },
      {
        id: 6,
        name: "Raj Patel",
        craft: "Block Printing",
        location: "Jaipur, India",
        image: "https://images.pexels.com/photos/4993095/pexels-photo-4993095.jpeg", // Block printer
        workshop: "https://images.pexels.com/photos/4992434/pexels-photo-4992434.jpeg", // Block printing workshop
        bio: "Raj preserves the ancient art of hand block printing, creating textiles with intricate patterns using carved wooden blocks and natural dyes."
      }
    ],
    // Generic workshop images for sections - improved quality and relevance
    workshops: {
      tools: "https://images.pexels.com/photos/5708053/pexels-photo-5708053.jpeg", // Artisan tools
      process: "https://images.pexels.com/photos/4992651/pexels-photo-4992651.jpeg", // Crafting process
      materials: "https://images.pexels.com/photos/6195053/pexels-photo-6195053.jpeg", // Raw materials
      community: "https://images.pexels.com/photos/6195216/pexels-photo-6195216.jpeg" // Artisan community
    }
  }
}; 