"use client";

import { useState, ReactNode, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { toast } from "react-hot-toast";
import { 
  FiHome, 
  FiBox, 
  FiUsers, 
  FiShoppingBag, 
  FiSettings, 
  FiFileText, 
  FiMenu, 
  FiX, 
  FiLogOut,
  FiBell,
  FiUser
} from "react-icons/fi";

interface AdminLayoutProps {
  children: ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [avatarError, setAvatarError] = useState(false);
  const [user, setUser] = useState<any>(null);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    // Fetch current user info
    const fetchCurrentUser = async () => {
      try {
        const response = await fetch("/api/auth/me");
        if (response.ok) {
          const data = await response.json();
          if (data.user) {
            setUser(data.user);
          }
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchCurrentUser();
  }, []);

  const navigation = [
    { name: "Dashboard", href: "/admin", icon: FiHome },
    { name: "Products", href: "/admin/products", icon: FiBox },
    { name: "Orders", href: "/admin/orders", icon: FiShoppingBag },
    { name: "Customers", href: "/admin/customers", icon: FiUsers },
    { name: "Artisans", href: "/admin/artisans", icon: FiUsers },
    { name: "Reports", href: "/admin/reports", icon: FiFileText },
    { name: "Settings", href: "/admin/settings", icon: FiSettings },
  ];

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      const response = await fetch("/api/auth/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        toast.success("Successfully logged out");
        router.push("/login");
        router.refresh();
      } else {
        toast.error("Failed to log out");
      }
    } catch (error) {
      console.error("Logout failed:", error);
      toast.error("An error occurred while logging out");
    } finally {
      setIsLoggingOut(false);
    }
  };

  // Get user display name
  const getUserName = () => {
    if (user) {
      if (user.firstName && user.lastName) {
        return `${user.firstName} ${user.lastName}`;
      }
      return user.username;
    }
    return "Admin User";
  };

  // Get user email
  const getUserEmail = () => {
    if (user && user.email) {
      return user.email;
    }
    return "admin@cratify.com";
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile sidebar */}
      <div 
        className={`fixed inset-0 bg-gray-800 bg-opacity-75 z-40 md:hidden transition-opacity duration-300 ${
          sidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setSidebarOpen(false)}
      />

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 bottom-0 w-64 bg-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out md:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Sidebar header */}
        <div className="flex items-center justify-between px-4 py-5 border-b border-gray-200">
          <div className="flex items-center">
            <span className="font-serif text-2xl font-bold text-primary-600">Cratify</span>
            <span className="ml-2 bg-primary-100 text-primary-800 text-xs px-2 py-1 rounded-md">Admin</span>
          </div>
          <button
            type="button"
            className="md:hidden text-gray-500 hover:text-gray-600"
            onClick={() => setSidebarOpen(false)}
          >
            <span className="sr-only">Close sidebar</span>
            <FiX className="h-6 w-6" />
          </button>
        </div>

        {/* Sidebar content */}
        <nav className="mt-5 px-2 space-y-1">
          {navigation.map((item) => {
            const isActive = pathname === item.href || pathname?.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`group flex items-center px-3 py-3 text-sm font-medium rounded-md ${
                  isActive
                    ? "bg-primary-50 text-primary-600"
                    : "text-gray-700 hover:bg-gray-50 hover:text-primary-600"
                }`}
              >
                <item.icon
                  className={`mr-3 h-5 w-5 ${
                    isActive ? "text-primary-600" : "text-gray-500 group-hover:text-primary-600"
                  }`}
                />
                {item.name}
                {isActive && (
                  <div className="ml-auto w-1 h-6 bg-primary-600 rounded-full" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Sidebar footer */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200">
          <div className="flex items-center mb-4">
            <div className="relative h-10 w-10 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
              {!avatarError ? (
                <Image
                  src="/images/avatar.jpg"
                  alt="Admin user"
                  fill
                  className="object-cover"
                  onError={() => setAvatarError(true)}
                />
              ) : (
                <FiUser className="h-6 w-6 text-gray-400" />
              )}
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-900">{getUserName()}</p>
              <p className="text-xs text-gray-500">{getUserEmail()}</p>
            </div>
          </div>
          <button 
            className="w-full flex items-center justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none disabled:opacity-50"
            onClick={handleLogout}
            disabled={isLoggingOut}
          >
            <FiLogOut className="mr-2 h-4 w-4" />
            {isLoggingOut ? "Signing out..." : "Sign out"}
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className={`md:pl-64 flex flex-col min-h-screen`}>
        {/* Top header */}
        <header className="sticky top-0 z-10 bg-white border-b border-gray-200">
          <div className="flex items-center justify-between h-16 px-4 sm:px-6 md:px-8">
            <button
              type="button"
              className="md:hidden text-gray-500 hover:text-gray-600 focus:outline-none"
              onClick={() => setSidebarOpen(true)}
            >
              <span className="sr-only">Open sidebar</span>
              <FiMenu className="h-6 w-6" />
            </button>
            
            <div className="flex items-center space-x-4">
              <div className="relative">
                <button className="text-gray-500 hover:text-gray-600 focus:outline-none">
                  <FiBell className="h-6 w-6" />
                  <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-primary-600 text-xs text-white flex items-center justify-center">3</span>
                </button>
              </div>
              <Link href="/" className="text-sm text-primary-600 hover:text-primary-700">
                View Site
              </Link>
            </div>
          </div>
        </header>

        {/* Main content container */}
        <main className="flex-1 py-8 px-4 sm:px-6 md:px-8 bg-gray-50">
          {children}
        </main>
      </div>
    </div>
  );
} 