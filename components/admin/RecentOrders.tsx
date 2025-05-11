import Link from "next/link";
import { FiMoreVertical, FiCheckCircle, FiClock, FiTruck, FiPackage } from "react-icons/fi";

// Mock data for recent orders
const orders = [
  {
    id: "ORD-2023-1234",
    customerName: "Emma Wilson",
    date: "Nov 12, 2023",
    amount: "$156.00",
    status: "Delivered",
    statusColor: "bg-green-100 text-green-800",
    statusIcon: FiCheckCircle
  },
  {
    id: "ORD-2023-1233",
    customerName: "Michael Brown",
    date: "Nov 11, 2023",
    amount: "$243.50",
    status: "Shipped",
    statusColor: "bg-blue-100 text-blue-800",
    statusIcon: FiTruck
  },
  {
    id: "ORD-2023-1232",
    customerName: "Sarah Johnson",
    date: "Nov 10, 2023",
    amount: "$89.25",
    status: "Processing",
    statusColor: "bg-yellow-100 text-yellow-800",
    statusIcon: FiPackage
  },
  {
    id: "ORD-2023-1231",
    customerName: "David Lee",
    date: "Nov 9, 2023",
    amount: "$125.75",
    status: "Pending",
    statusColor: "bg-gray-100 text-gray-800",
    statusIcon: FiClock
  }
];

export default function RecentOrders() {
  return (
    <div className="overflow-x-auto -mx-4 sm:-mx-6">
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
              Amount
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th scope="col" className="relative px-6 py-3">
              <span className="sr-only">Actions</span>
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {orders.map((order) => (
            <tr key={order.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-primary-600 hover:text-primary-800">
                <Link href={`/admin/orders/${order.id}`}>
                  {order.id}
                </Link>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {order.customerName}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {order.date}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                {order.amount}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${order.statusColor}`}>
                    <order.statusIcon className="inline mr-1 h-3 w-3" />
                    {order.status}
                  </span>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button className="text-gray-400 hover:text-gray-600 focus:outline-none">
                  <FiMoreVertical className="h-5 w-5" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
} 