"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FiHome, FiBox, FiUsers, FiShoppingBag, FiSettings, FiFileText, FiPieChart } from "react-icons/fi";
import AdminLayout from "../../components/admin/AdminLayout";
import StatCard from "../../components/admin/StatCard";
import RecentOrders from "../../components/admin/RecentOrders";
import TopProducts from "../../components/admin/TopProducts";

export default function AdminDashboard() {
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

  return (
    <AdminLayout>
      <div className="mb-6">
        <h1 className="text-3xl font-serif font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-1">Welcome to the Cratify admin panel</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard 
          title="Total Revenue" 
          value="$12,456" 
          change="+12.3%" 
          isPositive={true}
          icon={<FiPieChart className="h-6 w-6 text-primary-600" />}
        />
        <StatCard 
          title="Orders" 
          value="156" 
          change="+8.2%" 
          isPositive={true}
          icon={<FiShoppingBag className="h-6 w-6 text-secondary-600" />}
        />
        <StatCard 
          title="Customers" 
          value="2,154" 
          change="+5.1%" 
          isPositive={true}
          icon={<FiUsers className="h-6 w-6 text-green-600" />}
        />
        <StatCard 
          title="Products" 
          value="86" 
          change="+3.7%" 
          isPositive={true}
          icon={<FiBox className="h-6 w-6 text-purple-600" />}
        />
      </div>

      {/* Recent Orders and Top Products */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-medium text-gray-900">Recent Orders</h2>
            <Link href="/admin/orders" className="text-primary-600 hover:text-primary-700 text-sm font-medium">
              View All
            </Link>
          </div>
          <RecentOrders />
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-medium text-gray-900">Top Products</h2>
            <Link href="/admin/products" className="text-primary-600 hover:text-primary-700 text-sm font-medium">
              View All
            </Link>
          </div>
          <TopProducts />
        </div>
      </div>
    </AdminLayout>
  );
} 