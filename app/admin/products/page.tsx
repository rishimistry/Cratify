"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { 
  FiSearch, 
  FiFilter, 
  FiEdit2, 
  FiTrash2, 
  FiPlus, 
  FiChevronLeft, 
  FiChevronRight 
} from "react-icons/fi";
import AdminLayout from "../../../components/admin/AdminLayout";

// Mock product data
const products = [
  {
    id: "1",
    name: "Handcrafted Ceramic Vase",
    image: "/images/products/ceramic-vase.jpg",
    category: "Home Decor",
    price: "$45.00",
    stock: 12,
    artisan: "Sarah Johnson",
    status: "Active"
  },
  {
    id: "2",
    name: "Woven Seagrass Basket",
    image: "/images/products/basket.jpg",
    category: "Home Decor",
    price: "$38.00",
    stock: 8,
    artisan: "Michael Chen",
    status: "Active"
  },
  {
    id: "3",
    name: "Macrame Wall Hanging",
    image: "/images/products/macrame.jpg",
    category: "Wall Art",
    price: "$65.00",
    stock: 5,
    artisan: "Emily Rodriguez",
    status: "Active"
  },
  {
    id: "4",
    name: "Hand-poured Soy Candle",
    image: "/images/products/candle.jpg",
    category: "Candles",
    price: "$28.00",
    stock: 24,
    artisan: "David Kim",
    status: "Active"
  },
  {
    id: "5",
    name: "Wooden Serving Board",
    image: "/images/products/serving-board.jpg",
    category: "Kitchen",
    price: "$42.00",
    stock: 6,
    artisan: "Robert Thompson",
    status: "Active"
  },
  {
    id: "6",
    name: "Hand-knitted Wool Throw",
    image: "/images/products/wool-throw.jpg",
    category: "Textiles",
    price: "$85.00",
    stock: 3,
    artisan: "Lisa Wang",
    status: "Out of Stock"
  },
  {
    id: "7",
    name: "Ceramic Dinner Plates (Set of 4)",
    image: "/images/products/plates.jpg",
    category: "Kitchen",
    price: "$120.00",
    stock: 9,
    artisan: "Maria Santos",
    status: "Active"
  },
  {
    id: "8",
    name: "Handmade Leather Journal",
    image: "/images/products/journal.jpg",
    category: "Stationery",
    price: "$32.00",
    stock: 15,
    artisan: "James Wilson",
    status: "Active"
  }
];

export default function ProductsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check authentication status
    const checkAuth = async () => {
      try {
        const response = await fetch("/api/admin/check-auth");
        
        if (!response.ok) {
          throw new Error('Failed to check authentication');
        }
        
        const data = await response.json();
        
        if (!data.authenticated) {
          router.push("/admin/login");
        }
      } catch (error) {
        console.error("Authentication check failed:", error);
        router.push("/admin/login");
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    );
  }
  
  // Filter products based on search term
  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.artisan.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  return (
    <AdminLayout>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-3xl font-serif font-bold text-gray-900">Products</h1>
          <p className="mt-1 text-gray-600">Manage your product inventory</p>
        </div>
        <div className="mt-4 md:mt-0">
          <Link 
            href="/admin/products/new" 
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700"
          >
            <FiPlus className="mr-2 h-4 w-4" />
            Add Product
          </Link>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-lg shadow-md p-4 mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiSearch className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-4">
            <button className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
              <FiFilter className="mr-2 h-4 w-4" />
              Filters
            </button>
            <div className="flex gap-2">
              <button className="px-3 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                Export
              </button>
              <select
                className="px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
              >
                <option>Bulk Actions</option>
                <option>Delete Selected</option>
                <option>Change Status</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <input
                    type="checkbox"
                    className="h-4 w-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                  />
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Product
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Stock
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Artisan
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredProducts.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input
                      type="checkbox"
                      className="h-4 w-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="relative h-10 w-10 rounded overflow-hidden bg-gray-100 flex-shrink-0 flex items-center justify-center">
                        <span className="text-gray-400 text-xs">
                          {product.name.charAt(0)}
                        </span>
                      </div>
                      <div className="ml-4">
                        <Link 
                          href={`/admin/products/${product.id}`}
                          className="text-sm font-medium text-gray-900 hover:text-primary-600"
                        >
                          {product.name}
                        </Link>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {product.category}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {product.price}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {product.stock}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {product.artisan}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      product.status === "Active" 
                        ? "bg-green-100 text-green-800" 
                        : "bg-red-100 text-red-800"
                    }`}>
                      {product.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end space-x-2">
                      <Link 
                        href={`/admin/products/${product.id}/edit`}
                        className="text-primary-600 hover:text-primary-800"
                      >
                        <FiEdit2 className="h-4 w-4" />
                      </Link>
                      <button className="text-red-600 hover:text-red-800">
                        <FiTrash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Showing <span className="font-medium">1</span> to <span className="font-medium">8</span> of{" "}
                <span className="font-medium">24</span> results
              </p>
            </div>
            <div>
              <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                <button
                  className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                >
                  <span className="sr-only">Previous</span>
                  <FiChevronLeft className="h-5 w-5" />
                </button>
                <button
                  className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  1
                </button>
                <button
                  className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-primary-50 text-sm font-medium text-primary-600 hover:bg-primary-100"
                >
                  2
                </button>
                <button
                  className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  3
                </button>
                <span className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700">
                  ...
                </span>
                <button
                  className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  8
                </button>
                <button
                  className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                >
                  <span className="sr-only">Next</span>
                  <FiChevronRight className="h-5 w-5" />
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
} 