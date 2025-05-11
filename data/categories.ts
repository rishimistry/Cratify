export interface Category {
  name: string;
  image: string;
  description: string;
  href: string;
  productCount: number;
}

export const categories: Category[] = [
  {
    name: "Jewelry",
    image: "https://images.pexels.com/photos/10458835/pexels-photo-10458835.jpeg",
    description: "Handcrafted accessories to elevate any outfit",
    href: "/categories/jewelry",
    productCount: 12
  },
  {
    name: "Home Decor",
    image: "https://images.pexels.com/photos/3735205/pexels-photo-3735205.jpeg",
    description: "Beautiful pieces to make your space unique",
    href: "/categories/home-decor",
    productCount: 18
  },
  {
    name: "Stationery",
    image: "https://images.pexels.com/photos/6006273/pexels-photo-6006273.jpeg",
    description: "Unique paper goods and writing instruments",
    href: "/categories/stationery",
    productCount: 9
  },
  {
    name: "Apparel",
    image: "https://images.pexels.com/photos/6194031/pexels-photo-6194031.jpeg",
    description: "Handmade clothing and wearable art",
    href: "/categories/apparel",
    productCount: 15
  },
]; 