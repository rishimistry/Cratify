"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { 
  FiSearch, 
  FiFilter, 
  FiEye, 
  FiEdit2, 
  FiDownload, 
  FiChevronLeft, 
  FiChevronRight,
  FiCheckCircle,
  FiClock,
  FiTruck,
  FiPackage,
  FiXCircle
} from "react-icons/fi";
import AdminLayout from "../../../components/admin/AdminLayout";

// Mock order data
const orders = [
  {
    id: "ORD-2023-1234",
    customer: "Emma Wilson",
    email: "emma.wilson@example.com",
    date: "Nov 12, 2023",
    total: "$156.00",
    status: "Delivered",
    statusColor: "bg-green-100 text-green-800",
    statusIcon: FiCheckCircle,
    items: 3,
    payment: "Credit Card"
  },
  {
    id: "ORD-2023-1233",
    customer: "Michael Brown",
    email: "michael.brown@example.com",
    date: "Nov 11, 2023",
    total: "$243.50",
    status: "Shipped",
    statusColor: "bg-blue-100 text-blue-800",
    statusIcon: FiTruck,
    items: 5,
    payment: "PayPal"
  },
  {
    id: "ORD-2023-1232",
    customer: "Sarah Johnson",
    email: "sarah.johnson@example.com",
    date: "Nov 10, 2023",
    total: "$89.25",
    status: "Processing",
    statusColor: "bg-yellow-100 text-yellow-800",
    statusIcon: FiPackage,
    items: 2,
    payment: "Credit Card"
  },
  {
    id: "ORD-2023-1231",
    customer: "David Lee",
    email: "david.lee@example.com",
    date: "Nov 9, 2023",
    total: "$125.75",
    status: "Pending",
    statusColor: "bg-gray-100 text-gray-800",
    statusIcon: FiClock,
    items: 3,
    payment: "PayPal"
  },
  {
    id: "ORD-2023-1230",
    customer: "Lisa Wang",
    email: "lisa.wang@example.com",
    date: "Nov 8, 2023",
    total: "$78.50",
    status: "Delivered",
    statusColor: "bg-green-100 text-green-800",
    statusIcon: FiCheckCircle,
    items: 1,
    payment: "Credit Card"
  },
  {
    id: "ORD-2023-1229",
    customer: "Robert Thompson",
    email: "robert.thompson@example.com",
    date: "Nov 7, 2023",
    total: "$332.00",
    status: "Cancelled",
    statusColor: "bg-red-100 text-red-800",
    statusIcon: FiXCircle,
    items: 6,
    payment: "Credit Card"
  },
  {
    id: "ORD-2023-1228",
    customer: "James Wilson",
    email: "james.wilson@example.com",
    date: "Nov 6, 2023",
    total: "$142.00",
    status: "Shipped",
    statusColor: "bg-blue-100 text-blue-800",
    statusIcon: FiTruck,
    items: 4,
    payment: "PayPal"
  },
  {
    id: "ORD-2023-1227",
    customer: "Emily Rodriguez",
    email: "emily.rodriguez@example.com",
    date: "Nov 5, 2023",
    total: "$65.00",
    status: "Delivered",
    statusColor: "bg-green-100 text-green-800",
    statusIcon: FiCheckCircle,
    items: 1,
    payment: "Credit Card"
  }
];

export default function OrdersPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState("All");
  
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
  
  // Filter orders based on search term and status
  const filteredOrders = orders.filter(order => 
    (order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.email.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (filterStatus === "All" || order.status === filterStatus)
  );

  const statusOptions = ["All", "Pending", "Processing", "Shipped", "Delivered", "Cancelled"];
  
  return (
    <AdminLayout>
      <div className="mb-6">
        <h1 className="text-3xl font-serif font-bold text-gray-900">Orders</h1>
        <p className="text-gray-600 mt-1">Manage and track customer orders</p>
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
              placeholder="Search by order ID, customer, or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center space-x-4">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
            >
              {statusOptions.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
            <button className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
              <FiFilter className="mr-2 h-4 w-4" />
              More Filters
            </button>
            <button className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
              <FiDownload className="mr-2 h-4 w-4" />
              Export
            </button>
          </div>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Order ID
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Payment
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Items
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-primary-600">
                    <Link href={`/admin/orders/${order.id}`} className="hover:underline">
                      {order.id}
                    </Link>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {order.customer}
                      </div>
                      <div className="text-sm text-gray-500">
                        {order.email}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {order.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {order.total}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${order.statusColor}`}>
                      <order.statusIcon className="mr-1 h-3 w-3" />
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {order.payment}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {order.items}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end space-x-2">
                      <Link 
                        href={`/admin/orders/${order.id}`}
                        className="text-primary-600 hover:text-primary-800"
                        title="View order details"
                      >
                        <FiEye className="h-4 w-4" />
                      </Link>
                      <Link 
                        href={`/admin/orders/${order.id}/edit`}
                        className="text-primary-600 hover:text-primary-800"
                        title="Edit order"
                      >
                        <FiEdit2 className="h-4 w-4" />
                      </Link>
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
                <span className="font-medium">32</span> results
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
                  className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-primary-50 text-sm font-medium text-primary-600 hover:bg-primary-100"
                >
                  1
                </button>
                <button
                  className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
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
                  4
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