'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { FiUser, FiShoppingBag, FiMapPin, FiHeart, FiEdit2, FiLogOut, FiAlertCircle } from 'react-icons/fi';
import Link from 'next/link';
import Image from 'next/image';
import { toast } from 'react-hot-toast';
import RootLayout from '@/components/layout/RootLayout';

// Tab data
const tabs = [
  { id: 'profile', label: 'Profile', icon: FiUser },
  { id: 'orders', label: 'Orders', icon: FiShoppingBag },
  { id: 'addresses', label: 'Addresses', icon: FiMapPin },
  { id: 'wishlist', label: 'Wishlist', icon: FiHeart }
];

// Default profile image if user doesn't have one
const defaultProfileImage = 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=256&auto=format&fit=crop';

export default function ProfilePage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('profile');
  const [editMode, setEditMode] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: ''
  });
  const [orders, setOrders] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    // Check authentication and get user data
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/auth/me');
        const data = await response.json();
        
        if (!data.authenticated) {
          // Not authenticated, redirect to login
          router.push('/login');
          return;
        }
        
        // User is authenticated, get user details
        setUser(data.user);
        setFormData({
          firstName: data.user.firstName || '',
          lastName: data.user.lastName || '',
          email: data.user.email || '',
          phone: data.user.phone || ''
        });
        
        // Get orders, addresses, and wishlist items
        await Promise.all([
          fetchOrders(),
          fetchAddresses(),
          fetchWishlist()
        ]);
        
        setIsLoading(false);
      } catch (error) {
        console.error('Error checking authentication:', error);
        setIsLoading(false);
        // Show error notification
        toast.error('Failed to load profile data');
      }
    };
    
    checkAuth();
  }, [router]);
  
  const fetchOrders = async () => {
    try {
      const response = await fetch('/api/user/orders');
      if (response.ok) {
        const data = await response.json();
        setOrders(data.orders || []);
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };
  
  const fetchAddresses = async () => {
    try {
      const response = await fetch('/api/user/addresses');
      if (response.ok) {
        const data = await response.json();
        setAddresses(data.addresses || []);
      }
    } catch (error) {
      console.error('Error fetching addresses:', error);
    }
  };
  
  const fetchWishlist = async () => {
    try {
      const response = await fetch('/api/user/wishlist');
      if (response.ok) {
        const data = await response.json();
        setWishlist(data.items || []);
      }
    } catch (error) {
      console.error('Error fetching wishlist:', error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleEditProfile = () => {
    setEditMode(!editMode);
  };

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const response = await fetch('/api/user/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      
      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
        setEditMode(false);
        toast.success('Profile updated successfully');
      } else {
        const error = await response.json();
        toast.error(error.message || 'Failed to update profile');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('An error occurred while updating your profile');
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleLogout = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/auth/logout', {
        method: 'POST'
      });
      
      if (response.ok) {
        toast.success('Logged out successfully');
        router.push('/login');
      } else {
        toast.error('Failed to log out');
      }
    } catch (error) {
      console.error('Error logging out:', error);
      toast.error('An error occurred while logging out');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <RootLayout>
        <div className="h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
        </div>
      </RootLayout>
    );
  }

  return (
    <RootLayout>
      <div className="bg-gray-50">
        {/* Hero section with background pattern */}
        <div className="relative bg-primary-600 h-48 md:h-64">
          <div className="absolute inset-0 opacity-20 bg-pattern"></div>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-end">
            <div className="pb-6">
              <h1 className="text-2xl md:text-3xl font-serif font-bold text-white">My Account</h1>
              <p className="text-primary-100 mt-1">Manage your profile, orders, and preferences</p>
            </div>
          </div>
        </div>
        
        {/* Main content */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col md:flex-row gap-8"
          >
            {/* Sidebar */}
            <div className="md:w-1/4">
              <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden sticky top-24">
                <div className="p-6 border-b border-gray-200 flex flex-col items-center">
                  <div className="relative h-24 w-24 rounded-full overflow-hidden mb-4 border-4 border-white shadow-sm">
                    <Image 
                      src={user?.profileImage || defaultProfileImage} 
                      alt={`${user?.firstName || 'User'}'s profile`}
                      fill
                      sizes="96px"
                      className="object-cover"
                    />
                  </div>
                  <h2 className="text-xl font-medium text-gray-900">
                    {user?.firstName ? `${user.firstName} ${user.lastName || ''}` : user?.username}
                  </h2>
                  <p className="text-sm text-gray-500 mt-1">{user?.email}</p>
                </div>
                
                <nav className="p-2">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center px-4 py-3 rounded-md text-left transition-colors ${
                        activeTab === tab.id
                          ? 'bg-primary-600 text-white'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <tab.icon className="h-5 w-5 mr-3" />
                      <span>{tab.label}</span>
                    </button>
                  ))}
                  
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center px-4 py-3 rounded-md text-left text-gray-700 hover:bg-gray-100 transition-colors mt-2"
                  >
                    <FiLogOut className="h-5 w-5 mr-3" />
                    <span>Logout</span>
                  </button>
                </nav>
              </div>
            </div>
            
            {/* Main Content */}
            <div className="md:w-3/4">
              {/* Profile Tab */}
              {activeTab === 'profile' && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden"
                >
                  <div className="p-6 border-b border-gray-200 flex justify-between items-center">
                    <h2 className="text-xl font-medium text-gray-900">Personal Information</h2>
                    <button
                      onClick={handleEditProfile}
                      className={`flex items-center px-4 py-2 rounded-md border transition-colors ${
                        editMode 
                          ? 'border-gray-300 text-gray-600 hover:bg-gray-50' 
                          : 'border-primary-600 text-primary-600 hover:bg-primary-50'
                      }`}
                    >
                      {editMode ? 'Cancel' : 'Edit Profile'} 
                      <FiEdit2 className="ml-2 h-4 w-4" />
                    </button>
                  </div>
                  
                  <div className="p-6">
                    {editMode ? (
                      <form onSubmit={handleSaveProfile}>
                        <div className="space-y-4">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                              <input 
                                type="text" 
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                              />
                            </div>
                            
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                              <input 
                                type="text" 
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                              />
                            </div>
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                            <input 
                              type="email" 
                              name="email"
                              value={formData.email}
                              onChange={handleChange}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                            />
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                            <input 
                              type="tel" 
                              name="phone"
                              value={formData.phone}
                              onChange={handleChange}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                            />
                          </div>
                          
                          <div className="flex justify-end">
                            <button 
                              type="submit"
                              className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-md transition-colors"
                              disabled={isLoading}
                            >
                              {isLoading ? 'Saving...' : 'Save Changes'}
                            </button>
                          </div>
                        </div>
                      </form>
                    ) : (
                      <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="bg-gray-50 p-4 rounded-md">
                            <h3 className="text-sm font-medium text-gray-500">Full Name</h3>
                            <p className="mt-1 text-gray-900">
                              {user?.firstName ? `${user.firstName} ${user.lastName || ''}` : 'Not provided'}
                            </p>
                          </div>
                          
                          <div className="bg-gray-50 p-4 rounded-md">
                            <h3 className="text-sm font-medium text-gray-500">Username</h3>
                            <p className="mt-1 text-gray-900">{user?.username || 'Not provided'}</p>
                          </div>
                          
                          <div className="bg-gray-50 p-4 rounded-md">
                            <h3 className="text-sm font-medium text-gray-500">Email</h3>
                            <p className="mt-1 text-gray-900">{user?.email || 'Not provided'}</p>
                          </div>
                          
                          <div className="bg-gray-50 p-4 rounded-md">
                            <h3 className="text-sm font-medium text-gray-500">Phone</h3>
                            <p className="mt-1 text-gray-900">{user?.phone || 'Not provided'}</p>
                          </div>
                        </div>
                        
                        <div className="bg-primary-50 border border-primary-100 p-4 rounded-md">
                          <div className="flex">
                            <FiAlertCircle className="h-5 w-5 text-primary-600 mr-2 flex-shrink-0" />
                            <div>
                              <h3 className="text-sm font-medium text-primary-800">Account Security</h3>
                              <p className="mt-1 text-sm text-primary-700">
                                To change your password or update account security settings, visit the
                                <Link href="/profile/security" className="ml-1 text-primary-600 hover:underline">
                                  security settings
                                </Link> page.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
              
              {/* Orders Tab */}
              {activeTab === 'orders' && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden"
                >
                  <div className="p-6 border-b border-gray-200">
                    <h2 className="text-xl font-medium text-gray-900">My Orders</h2>
                  </div>
                  
                  <div className="divide-y divide-gray-200">
                    {orders && orders.length > 0 ? (
                      orders.map((order: any) => (
                        <div key={order.id} className="p-6">
                          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4">
                            <div>
                              <span className="text-sm text-gray-500">Order ID:</span>
                              <span className="ml-2 font-medium">{order.id}</span>
                            </div>
                            <div className="mt-2 sm:mt-0">
                              <span className={`px-2 py-1 text-xs rounded-full ${
                                order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                                order.status === 'Processing' ? 'bg-blue-100 text-blue-800' :
                                order.status === 'Shipped' ? 'bg-indigo-100 text-indigo-800' :
                                'bg-gray-100 text-gray-800'
                              }`}>
                                {order.status}
                              </span>
                            </div>
                          </div>
                          
                          <div className="border-t border-b border-gray-200 py-4 my-4">
                            {order.items.map((item: any) => (
                              <div key={item.id} className="flex items-center py-2">
                                <div className="h-16 w-16 rounded-md overflow-hidden bg-gray-100 flex-shrink-0">
                                  {item.image && (
                                    <Image
                                      src={item.image}
                                      alt={item.name}
                                      width={64}
                                      height={64}
                                      className="object-cover"
                                    />
                                  )}
                                </div>
                                <div className="ml-4 flex-1">
                                  <h4 className="text-sm font-medium">{item.name}</h4>
                                  <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                                </div>
                                <div className="text-sm font-medium">${item.price.toFixed(2)}</div>
                              </div>
                            ))}
                          </div>
                          
                          <div className="flex justify-between items-center">
                            <div>
                              <span className="text-sm text-gray-500">Order Date:</span>
                              <span className="ml-2">{new Date(order.date).toLocaleDateString()}</span>
                            </div>
                            <div className="text-right">
                              <div className="text-sm text-gray-500">Total</div>
                              <div className="text-lg font-medium">${order.total.toFixed(2)}</div>
                            </div>
                          </div>
                          
                          <div className="mt-4 flex justify-end">
                            <Link href={`/orders/${order.id}`}
                              className="text-primary-600 hover:text-primary-700 text-sm font-medium"
                            >
                              View Details
                            </Link>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="p-6 text-center">
                        <p className="text-gray-500">You haven't placed any orders yet.</p>
                        <Link href="/shop" className="mt-2 inline-block text-primary-600 hover:text-primary-700">
                          Start shopping
                        </Link>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
              
              {/* Addresses Tab */}
              {activeTab === 'addresses' && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden"
                >
                  <div className="p-6 border-b border-gray-200 flex justify-between items-center">
                    <h2 className="text-xl font-medium text-gray-900">My Addresses</h2>
                    <Link
                      href="/profile/addresses/new"
                      className="flex items-center px-4 py-2 rounded-md border border-primary-600 text-primary-600 hover:bg-primary-50 transition-colors"
                    >
                      Add New Address
                    </Link>
                  </div>
                  
                  <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                    {addresses && addresses.length > 0 ? (
                      addresses.map((address: any) => (
                        <div key={address.id} className="border border-gray-200 rounded-lg p-4 relative">
                          {address.isDefault && (
                            <span className="absolute top-2 right-2 bg-primary-100 text-primary-800 text-xs px-2 py-1 rounded-full">
                              Default
                            </span>
                          )}
                          <h3 className="font-medium">{address.type}</h3>
                          <p className="text-sm text-gray-600 mt-1">{address.street}</p>
                          <p className="text-sm text-gray-600">{address.city}, {address.state} {address.zip}</p>
                          <p className="text-sm text-gray-600">{address.country}</p>
                          
                          <div className="mt-4 flex space-x-4">
                            <Link
                              href={`/profile/addresses/edit/${address.id}`}
                              className="text-sm text-primary-600 hover:text-primary-700"
                            >
                              Edit
                            </Link>
                            <button
                              className="text-sm text-gray-500 hover:text-gray-700"
                            >
                              Delete
                            </button>
                            {!address.isDefault && (
                              <button
                                className="text-sm text-gray-500 hover:text-gray-700"
                              >
                                Set as Default
                              </button>
                            )}
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="col-span-2 text-center py-8">
                        <p className="text-gray-500">You haven't added any addresses yet.</p>
                        <Link
                          href="/profile/addresses/new"
                          className="mt-2 inline-block text-primary-600 hover:text-primary-700"
                        >
                          Add your first address
                        </Link>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
              
              {/* Wishlist Tab */}
              {activeTab === 'wishlist' && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden"
                >
                  <div className="p-6 border-b border-gray-200">
                    <h2 className="text-xl font-medium text-gray-900">My Wishlist</h2>
                  </div>
                  
                  <div className="p-6">
                    {wishlist && wishlist.length > 0 ? (
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {wishlist.map((item: any) => (
                          <div key={item.id} className="border border-gray-200 rounded-lg overflow-hidden group">
                            <div className="aspect-square relative">
                              <Image
                                src={item.image}
                                alt={item.name}
                                fill
                                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                className="object-cover group-hover:scale-105 transition-transform duration-300"
                              />
                            </div>
                            <div className="p-4">
                              <h3 className="font-medium line-clamp-1">{item.name}</h3>
                              <p className="text-primary-600 font-medium mt-1">${item.price.toFixed(2)}</p>
                              
                              <div className="mt-4 flex justify-between">
                                <Link
                                  href={`/products/${item.id}`}
                                  className="text-sm text-primary-600 hover:text-primary-700"
                                >
                                  View Product
                                </Link>
                                <button
                                  className="text-sm text-gray-500 hover:text-gray-700"
                                >
                                  Remove
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <p className="text-gray-500">Your wishlist is empty.</p>
                        <Link href="/shop" className="mt-2 inline-block text-primary-600 hover:text-primary-700">
                          Discover products
                        </Link>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </RootLayout>
  );
} 