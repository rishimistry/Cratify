import Image from "next/image";
import Link from "next/link";
import { FiTrendingUp, FiTrendingDown } from "react-icons/fi";

// Mock data for top products
const products = [
  {
    id: "1",
    name: "Handcrafted Ceramic Vase",
    image: "/images/products/ceramic-vase.jpg",
    sales: 28,
    revenue: "$1,320",
    trend: 8.2,
    isPositive: true
  },
  {
    id: "2",
    name: "Woven Seagrass Basket",
    image: "/images/products/basket.jpg",
    sales: 24,
    revenue: "$960",
    trend: 5.7,
    isPositive: true
  },
  {
    id: "3",
    name: "Macrame Wall Hanging",
    image: "/images/products/macrame.jpg",
    sales: 22,
    revenue: "$880",
    trend: -2.4,
    isPositive: false
  },
  {
    id: "4",
    name: "Hand-poured Soy Candle",
    image: "/images/products/candle.jpg",
    sales: 19,
    revenue: "$665",
    trend: 3.5,
    isPositive: true
  }
];

export default function TopProducts() {
  return (
    <div className="space-y-4">
      {products.map((product) => (
        <div key={product.id} className="flex items-center p-3 hover:bg-gray-50 rounded-lg transition-colors">
          <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0 flex items-center justify-center">
            <span className="text-gray-500 font-medium text-sm">
              {product.name.split(' ').map(word => word[0]).join('').substring(0, 2).toUpperCase()}
            </span>
          </div>
          
          <div className="ml-4 flex-1">
            <Link 
              href={`/admin/products/${product.id}`}
              className="text-sm font-medium text-gray-900 hover:text-primary-600"
            >
              {product.name}
            </Link>
            <p className="text-xs text-gray-500 mt-1">
              {product.sales} sold
            </p>
          </div>
          
          <div className="text-right">
            <p className="text-sm font-medium text-gray-900">{product.revenue}</p>
            <div
              className={`flex items-center justify-end text-xs font-medium mt-1 ${
                product.isPositive ? "text-green-600" : "text-red-600"
              }`}
            >
              {product.isPositive ? (
                <FiTrendingUp className="mr-1 h-3 w-3" />
              ) : (
                <FiTrendingDown className="mr-1 h-3 w-3" />
              )}
              {product.isPositive ? "+" : ""}{product.trend}%
            </div>
          </div>
        </div>
      ))}
    </div>
  );
} 