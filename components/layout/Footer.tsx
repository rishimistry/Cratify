import Link from "next/link";
import { FiInstagram, FiTwitter, FiFacebook, FiMail } from "react-icons/fi";

const footerNavigation = {
  shop: [
    { name: "All Products", href: "/shop" },
    { name: "Featured", href: "/shop?featured=true" },
    { name: "New Arrivals", href: "/shop?new=true" },
    { name: "Best Sellers", href: "/shop?bestsellers=true" },
  ],
  categories: [
    { name: "Jewelry", href: "/categories/jewelry" },
    { name: "Home Decor", href: "/categories/home-decor" },
    { name: "Stationery", href: "/categories/stationery" },
    { name: "Apparel", href: "/categories/apparel" },
  ],
  company: [
    { name: "About Us", href: "/about" },
    { name: "Our Artisans", href: "/artisans" },
    { name: "Careers", href: "/careers" },
    { name: "Terms & Conditions", href: "/terms" },
    { name: "Privacy Policy", href: "/privacy" },
  ],
  support: [
    { name: "FAQ", href: "/faq" },
    { name: "Contact Us", href: "/contact" },
    { name: "Shipping & Returns", href: "/shipping-returns" },
    { name: "Track Order", href: "/track-order" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-gray-100">
      <div className="container mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
        <div className="xl:grid xl:grid-cols-5 xl:gap-8">
          <div className="space-y-8 xl:col-span-1">
            <div>
              <span className="font-serif text-2xl font-bold text-primary-600">Cratify</span>
              <p className="text-gray-600 mt-2 text-sm">
                Handmade & Local Artisan Marketplace
              </p>
            </div>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-500 hover:text-primary-500">
                <span className="sr-only">Instagram</span>
                <FiInstagram className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-500 hover:text-primary-500">
                <span className="sr-only">Twitter</span>
                <FiTwitter className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-500 hover:text-primary-500">
                <span className="sr-only">Facebook</span>
                <FiFacebook className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-500 hover:text-primary-500">
                <span className="sr-only">Email</span>
                <FiMail className="h-6 w-6" />
              </a>
            </div>
          </div>
          <div className="mt-12 grid grid-cols-2 gap-8 xl:col-span-4 xl:mt-0">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-base font-medium text-gray-900">Shop</h3>
                <ul className="mt-4 space-y-4">
                  {footerNavigation.shop.map((item) => (
                    <li key={item.name}>
                      <Link href={item.href} className="text-sm text-gray-600 hover:text-primary-500">
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-12 md:mt-0">
                <h3 className="text-base font-medium text-gray-900">Categories</h3>
                <ul className="mt-4 space-y-4">
                  {footerNavigation.categories.map((item) => (
                    <li key={item.name}>
                      <Link href={item.href} className="text-sm text-gray-600 hover:text-primary-500">
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-base font-medium text-gray-900">Company</h3>
                <ul className="mt-4 space-y-4">
                  {footerNavigation.company.map((item) => (
                    <li key={item.name}>
                      <Link href={item.href} className="text-sm text-gray-600 hover:text-primary-500">
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-12 md:mt-0">
                <h3 className="text-base font-medium text-gray-900">Support</h3>
                <ul className="mt-4 space-y-4">
                  {footerNavigation.support.map((item) => (
                    <li key={item.name}>
                      <Link href={item.href} className="text-sm text-gray-600 hover:text-primary-500">
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t border-gray-200 pt-8">
          <p className="text-base text-gray-500 xl:text-center">
            &copy; {new Date().getFullYear()} Cratify. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
} 