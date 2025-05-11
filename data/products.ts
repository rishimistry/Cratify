export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  images?: string[];
  artisan: {
    name: string;
    id: string;
    bio?: string;
    image?: string;
  };
  category: string;
  tags?: string[];
  featured?: boolean;
  newArrival?: boolean;
  bestseller?: boolean;
  stock: number;
  rating?: number;
  numReviews?: number;
}

export const products: Product[] = [
  {
    id: "1",
    name: "Handcrafted Ceramic Mug",
    price: 28.00,
    description: "A beautifully handcrafted ceramic mug, perfect for your morning coffee or tea. Each piece is unique with slight variations in glaze and form, showcasing the artisan's craftsmanship.",
    image: "https://images.pexels.com/photos/3735205/pexels-photo-3735205.jpeg",
    images: [
      "https://images.pexels.com/photos/3735205/pexels-photo-3735205.jpeg",
      "https://images.pexels.com/photos/4207892/pexels-photo-4207892.jpeg",
      "https://images.pexels.com/photos/4207805/pexels-photo-4207805.jpeg",
    ],
    artisan: {
      name: "Clayworks Studio",
      id: "artisan1",
      bio: "Clayworks Studio is a small pottery workshop specializing in functional ceramics for everyday use. Each piece is thrown by hand and glazed with our signature finishes.",
      image: "https://images.pexels.com/photos/6195111/pexels-photo-6195111.jpeg",
    },
    category: "Home Decor",
    tags: ["ceramic", "pottery", "kitchenware", "handmade"],
    featured: true,
    stock: 15,
    rating: 4.8,
    numReviews: 24,
  },
  {
    id: "2",
    name: "Hand-woven Macrame Wall Hanging",
    price: 65.00,
    description: "Add texture and warmth to your space with this beautiful hand-woven macrame wall hanging. Made with 100% cotton rope in a neutral color that complements any decor style.",
    image: "https://images.pexels.com/photos/1099816/pexels-photo-1099816.jpeg",
    images: [
      "https://images.pexels.com/photos/1099816/pexels-photo-1099816.jpeg",
      "https://images.pexels.com/photos/7060304/pexels-photo-7060304.jpeg",
      "https://images.pexels.com/photos/7060301/pexels-photo-7060301.jpeg",
    ],
    artisan: {
      name: "Fiber & Thread",
      id: "artisan2",
      bio: "Fiber & Thread creates modern textile art using traditional macrame techniques. Each piece is meticulously hand-knotted in our studio.",
      image: "https://images.pexels.com/photos/6195239/pexels-photo-6195239.jpeg",
    },
    category: "Home Decor",
    tags: ["macrame", "wall hanging", "fiber art", "handmade"],
    featured: true,
    stock: 7,
    rating: 4.9,
    numReviews: 18,
  },
  {
    id: "3",
    name: "Sterling Silver Hoop Earrings",
    price: 42.00,
    description: "Classic handcrafted sterling silver hoop earrings with a modern twist. These versatile earrings are perfect for everyday wear or special occasions.",
    image: "https://images.pexels.com/photos/10458835/pexels-photo-10458835.jpeg",
    images: [
      "https://images.pexels.com/photos/10458835/pexels-photo-10458835.jpeg",
      "https://images.pexels.com/photos/8396639/pexels-photo-8396639.jpeg",
      "https://images.pexels.com/photos/8396571/pexels-photo-8396571.jpeg",
    ],
    artisan: {
      name: "Silver & Stone",
      id: "artisan3",
      bio: "Silver & Stone is a jewelry studio focused on creating simple, elegant pieces that stand the test of time. All jewelry is handcrafted using ethically sourced materials.",
      image: "https://images.pexels.com/photos/5708860/pexels-photo-5708860.jpeg",
    },
    category: "Jewelry",
    tags: ["silver", "earrings", "jewelry", "handmade"],
    featured: true,
    stock: 20,
    rating: 5.0,
    numReviews: 32,
  },
  {
    id: "4",
    name: "Hand-poured Soy Candle",
    price: 24.00,
    description: "These artisanal soy candles are hand-poured in small batches. Made with 100% soy wax and premium fragrance oils for a clean, long-lasting burn. Available in various scents.",
    image: "https://images.pexels.com/photos/4202325/pexels-photo-4202325.jpeg",
    images: [
      "https://images.pexels.com/photos/4202325/pexels-photo-4202325.jpeg",
      "https://images.pexels.com/photos/3926543/pexels-photo-3926543.jpeg",
      "https://images.pexels.com/photos/4202324/pexels-photo-4202324.jpeg",
    ],
    artisan: {
      name: "Glow Craft",
      id: "artisan4",
      bio: "Glow Craft specializes in hand-poured soy candles made with sustainable ingredients. Our candles are crafted in small batches to ensure quality and attention to detail.",
      image: "https://images.pexels.com/photos/5324973/pexels-photo-5324973.jpeg",
    },
    category: "Home Decor",
    tags: ["candle", "soy", "scented", "handmade"],
    featured: true,
    stock: 30,
    rating: 4.7,
    numReviews: 42,
  },
  {
    id: "5",
    name: "Letterpress Greeting Cards (Set of 5)",
    price: 18.50,
    description: "A set of 5 unique letterpress greeting cards, perfect for any occasion. Each card is printed on premium cotton paper using a vintage letterpress for a textured, high-quality finish.",
    image: "https://images.pexels.com/photos/6006273/pexels-photo-6006273.jpeg",
    images: [
      "https://images.pexels.com/photos/6006273/pexels-photo-6006273.jpeg",
      "https://images.pexels.com/photos/7319148/pexels-photo-7319148.jpeg",
      "https://images.pexels.com/photos/7319149/pexels-photo-7319149.jpeg",
    ],
    artisan: {
      name: "Paper & Ink",
      id: "artisan5",
      bio: "Paper & Ink is a small letterpress studio dedicated to the art of traditional printing methods. Each card is printed one at a time on our collection of vintage presses.",
      image: "https://images.pexels.com/photos/5708816/pexels-photo-5708816.jpeg",
    },
    category: "Stationery",
    tags: ["letterpress", "cards", "stationery", "handmade"],
    featured: true,
    newArrival: true,
    stock: 25,
    rating: 4.6,
    numReviews: 14,
  },
  {
    id: "6",
    name: "Hand-knit Wool Scarf",
    price: 48.00,
    description: "Stay warm in style with this luxurious hand-knit wool scarf. Made with premium merino wool in a classic pattern that never goes out of fashion. Available in multiple colors.",
    image: "https://images.pexels.com/photos/6194031/pexels-photo-6194031.jpeg",
    images: [
      "https://images.pexels.com/photos/6194031/pexels-photo-6194031.jpeg",
      "https://images.pexels.com/photos/6194027/pexels-photo-6194027.jpeg",
      "https://images.pexels.com/photos/8483665/pexels-photo-8483665.jpeg",
    ],
    artisan: {
      name: "Woolcraft Studio",
      id: "artisan6",
      bio: "Woolcraft Studio creates heirloom-quality knit goods using traditional techniques and ethically sourced natural fibers. Each item is knitted by hand with love and attention to detail.",
      image: "https://images.pexels.com/photos/6195239/pexels-photo-6195239.jpeg",
    },
    category: "Apparel",
    tags: ["scarf", "wool", "knit", "handmade", "winter"],
    featured: true,
    bestseller: true,
    stock: 12,
    rating: 4.9,
    numReviews: 27,
  },
  {
    id: "7",
    name: "Handmade Leather Journal",
    price: 32.00,
    description: "A beautiful handcrafted leather journal with handmade paper pages. Perfect for sketching, journaling, or as a thoughtful gift. Each journal features a unique leather cover and binding.",
    image: "https://images.pexels.com/photos/6044266/pexels-photo-6044266.jpeg",
    images: [
      "https://images.pexels.com/photos/6044266/pexels-photo-6044266.jpeg",
      "https://images.pexels.com/photos/6044226/pexels-photo-6044226.jpeg",
      "https://images.pexels.com/photos/6044250/pexels-photo-6044250.jpeg",
    ],
    artisan: {
      name: "Bound & Crafted",
      id: "artisan7",
      bio: "Bound & Crafted is a small bindery focusing on handmade journals and notebooks. We combine traditional bookbinding techniques with quality materials to create functional art.",
      image: "https://images.pexels.com/photos/5708879/pexels-photo-5708879.jpeg",
    },
    category: "Stationery",
    tags: ["journal", "leather", "paper", "handmade"],
    featured: true,
    bestseller: true,
    stock: 18,
    rating: 4.8,
    numReviews: 36,
  },
  {
    id: "8",
    name: "Botanical Print Art",
    price: 35.00,
    description: "Beautiful botanical illustration printed on archival-quality paper. These detailed nature prints bring a touch of the outdoors to your home or office. Available in various plant species.",
    image: "https://images.pexels.com/photos/5699514/pexels-photo-5699514.jpeg",
    images: [
      "https://images.pexels.com/photos/5699514/pexels-photo-5699514.jpeg",
      "https://images.pexels.com/photos/5699510/pexels-photo-5699510.jpeg",
      "https://images.pexels.com/photos/4207706/pexels-photo-4207706.jpeg",
    ],
    artisan: {
      name: "Nature & Ink",
      id: "artisan8",
      bio: "Nature & Ink creates detailed botanical illustrations inspired by vintage scientific drawings. Our prints are produced using eco-friendly methods and materials.",
      image: "https://images.pexels.com/photos/5324855/pexels-photo-5324855.jpeg",
    },
    category: "Home Decor",
    tags: ["art", "print", "botanical", "nature", "wall art"],
    featured: true,
    newArrival: true,
    stock: 22,
    rating: 4.7,
    numReviews: 19,
  },
]; 