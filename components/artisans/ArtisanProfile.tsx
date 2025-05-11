'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FadeIn } from '@/components/ui/FadeIn';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/Tabs';
import { products } from '@/data/products';
import { notFound } from 'next/navigation';

type Artisan = {
  id: string;
  name: string;
  image?: string;
  bio?: string;
};

// Sample artisan data - in a real app this would come from an API
const sampleArtisan: Artisan = {
  id: 'artisan1',
  name: 'Elena Woodford',
  avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  coverImage: 'https://images.pexels.com/photos/1470137/pexels-photo-1470137.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  location: 'Portland, Oregon',
  bio: 'I am a ceramic artist specializing in functional pottery with a minimalist aesthetic. My work is inspired by the natural landscapes of the Pacific Northwest and Japanese wabi-sabi philosophy. Each piece is wheel-thrown and glazed by hand in my small studio.',
  specialty: 'Ceramics',
  rating: 4.9,
  reviewCount: 142,
  memberSince: 'January 2020',
  achievements: [
    'Featured Artisan 2022',
    'Portland Craft Exhibition Gold Award',
    'Sustainable Crafting Certified'
  ],
  socialLinks: {
    website: 'https://elenawoodford.com',
    instagram: 'elena_ceramics',
    pinterest: 'elenawoodceramics'
  },
  galleryImages: [
    'https://images.pexels.com/photos/6045083/pexels-photo-6045083.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    'https://images.pexels.com/photos/4207791/pexels-photo-4207791.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    'https://images.pexels.com/photos/4207790/pexels-photo-4207790.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    'https://images.pexels.com/photos/4207892/pexels-photo-4207892.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    'https://images.pexels.com/photos/4207709/pexels-photo-4207709.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    'https://images.pexels.com/photos/4207805/pexels-photo-4207805.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  ]
};

type ArtisanProfileProps = {
  artisanId: string;
};

export default function ArtisanProfile({ artisanId }: ArtisanProfileProps) {
  // Find artisan in our products data
  const artisanInfo = useMemo(() => {
    // Get all products by this artisan
    const artisanProducts = products.filter(p => p.artisan.id === artisanId);
    
    if (artisanProducts.length === 0) {
      return null;
    }
    
    // Use the first product's artisan information
    return artisanProducts[0].artisan;
  }, [artisanId]);
  
  // If artisan doesn't exist, show 404
  if (!artisanInfo) {
    notFound();
  }
  
  // Calculate artisan stats from products
  const artisanStats = useMemo(() => {
    const artisanProducts = products.filter(p => p.artisan.id === artisanId);
    
    // Calculate average rating across all products
    const ratings = artisanProducts
      .filter(p => p.rating !== undefined)
      .map(p => p.rating as number);
    
    const averageRating = ratings.length > 0
      ? ratings.reduce((sum, rating) => sum + rating, 0) / ratings.length
      : 0;
    
    // Sum up all reviews
    const totalReviews = artisanProducts
      .reduce((sum, p) => sum + (p.numReviews || 0), 0);
    
    // Calculate total products
    const totalProducts = artisanProducts.length;
    
    // Get unique categories this artisan works with
    const categories = new Set(artisanProducts.map(p => p.category));
    
    return {
      rating: averageRating.toFixed(1),
      reviewCount: totalReviews,
      productCount: totalProducts,
      categories: Array.from(categories)
    };
  }, [artisanId]);
  
  const [selectedTab, setSelectedTab] = useState('about');
  const [isFollowing, setIsFollowing] = useState(false);

  // Placeholder image for missing images
  const placeholderAvatar = "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1";
  const placeholderCover = "https://images.pexels.com/photos/6311646/pexels-photo-6311646.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1";

  return (
    <div className="bg-gray-50 pb-16">
      {/* Cover Image */}
      <div className="relative h-80 w-full overflow-hidden sm:h-96">
        <Image
          src={placeholderCover}
          alt={`${artisanInfo.name}'s workshop`}
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Profile Header */}
        <div className="relative -mt-24 rounded-lg bg-white p-6 shadow-md sm:p-8">
          <div className="flex flex-col items-center sm:flex-row sm:items-start">
            <div className="relative h-32 w-32 overflow-hidden rounded-full border-4 border-white shadow-md sm:h-36 sm:w-36">
              <Image
                src={artisanInfo.image || placeholderAvatar}
                alt={artisanInfo.name}
                fill
                className="object-cover"
              />
            </div>
            
            <div className="mt-4 text-center sm:ml-6 sm:mt-0 sm:text-left">
              <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                {artisanInfo.name}
              </h1>
              
              <div className="mt-2 flex flex-wrap items-center justify-center gap-3 sm:justify-start">
                {artisanStats.rating && Number(artisanStats.rating) > 0 && (
                  <div className="flex items-center">
                    <svg className="h-5 w-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.799-2.034c-.784-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span className="ml-1 font-medium">{artisanStats.rating}</span>
                    {artisanStats.reviewCount > 0 && (
                      <span className="ml-1 text-sm text-gray-500">({artisanStats.reviewCount} reviews)</span>
                    )}
                  </div>
                )}
                
                {artisanStats.categories.length > 0 && (
                  <>
                    <span className="text-sm text-gray-500">•</span>
                    {artisanStats.categories.slice(0, 2).map((category, idx) => (
                      <div key={category} className="rounded-full bg-primary-50 px-3 py-1">
                        <span className="text-xs font-medium text-primary-800">{category}</span>
                      </div>
                    ))}
                  </>
                )}
              </div>
              
              <div className="mt-4 flex flex-wrap justify-center gap-3 sm:justify-start">
                <button
                  onClick={() => setIsFollowing(!isFollowing)}
                  className={`flex items-center rounded-full px-4 py-2 text-sm font-medium transition ${
                    isFollowing 
                      ? 'bg-gray-100 text-gray-800 hover:bg-gray-200' 
                      : 'bg-primary-600 text-white hover:bg-primary-700'
                  }`}
                >
                  {isFollowing ? (
                    <>
                      <svg className="mr-1.5 h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      Following
                    </>
                  ) : 'Follow'}
                </button>
                
                <Link 
                  href={`/messages/${artisanId}`}
                  className="flex items-center rounded-full border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  <svg className="mr-1.5 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  Message
                </Link>
              </div>
            </div>
            
            <div className="mt-4 flex flex-col items-center space-y-2 rounded-lg bg-gray-50 px-4 py-3 sm:ml-auto sm:mt-0">
              <div className="text-sm text-gray-500">Products</div>
              <div className="font-medium">{artisanStats.productCount}</div>
              <Link
                href={`/artisans/${artisanId}/products`}
                className="rounded-full bg-primary-600 px-4 py-1.5 text-sm font-medium text-white hover:bg-primary-700"
              >
                View All Products
              </Link>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <Tabs 
          value={selectedTab} 
          onValueChange={setSelectedTab}
          className="mt-8"
        >
          <TabsList className="mb-6 flex w-full justify-start space-x-4 border-b border-gray-200">
            <TabsTrigger 
              value="about" 
              className={`border-b-2 px-1 pb-3 text-sm font-medium ${
                selectedTab === 'about' 
                  ? 'border-primary-600 text-primary-600' 
                  : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
              }`}
            >
              About
            </TabsTrigger>
            <TabsTrigger 
              value="products" 
              className={`border-b-2 px-1 pb-3 text-sm font-medium ${
                selectedTab === 'products' 
                  ? 'border-primary-600 text-primary-600' 
                  : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
              }`}
            >
              Products
            </TabsTrigger>
            <TabsTrigger 
              value="reviews" 
              className={`border-b-2 px-1 pb-3 text-sm font-medium ${
                selectedTab === 'reviews' 
                  ? 'border-primary-600 text-primary-600' 
                  : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
              }`}
            >
              Reviews
            </TabsTrigger>
          </TabsList>

          <TabsContent value="about" className="focus-visible:outline-none">
            <div className="grid gap-6 md:grid-cols-3">
              <div className="md:col-span-2">
                <div className="rounded-lg bg-white p-6 shadow-sm">
                  <h2 className="mb-4 text-xl font-semibold text-gray-900">About {artisanInfo.name}</h2>
                  <div className="prose max-w-none text-gray-600">
                    {artisanInfo.bio ? (
                      <p>{artisanInfo.bio}</p>
                    ) : (
                      <p>This artisan has not provided a bio yet.</p>
                    )}
                  </div>
                </div>
                
                <div className="mt-6 rounded-lg bg-white p-6 shadow-sm">
                  <h2 className="mb-4 text-xl font-semibold text-gray-900">Skills & Specialties</h2>
                  <div className="flex flex-wrap gap-2">
                    {artisanStats.categories.map((category) => (
                      <span 
                        key={category}
                        className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-800"
                      >
                        {category}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              
              <div>
                <div className="rounded-lg bg-white p-6 shadow-sm">
                  <h2 className="mb-4 text-xl font-semibold text-gray-900">Featured Products</h2>
                  <div className="space-y-4">
                    {products.filter(p => p.artisan.id === artisanId).slice(0, 3).map((product) => (
                      <Link 
                        key={product.id} 
                        href={`/products/${product.id}`}
                        className="flex items-center space-x-4 rounded-lg p-2 transition hover:bg-gray-50"
                      >
                        <div className="relative h-16 w-16 overflow-hidden rounded">
                          <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900">{product.name}</h3>
                          <p className="text-sm text-primary-600">${product.price.toFixed(2)}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="products" className="focus-visible:outline-none">
            <div className="rounded-lg bg-white p-6 shadow-sm">
              <div className="mb-4 flex justify-between">
                <h2 className="text-xl font-semibold text-gray-900">All Products</h2>
                <Link 
                  href={`/artisans/${artisanId}/products`}
                  className="text-sm font-medium text-primary-600 hover:text-primary-700"
                >
                  View All
                </Link>
              </div>
              
              <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {products.filter(p => p.artisan.id === artisanId).slice(0, 8).map((product) => (
                  <Link 
                    key={product.id} 
                    href={`/products/${product.id}`}
                    className="group block overflow-hidden rounded-lg bg-gray-50 transition hover:shadow-md"
                  >
                    <div className="relative h-48 w-full overflow-hidden">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute right-2 top-2 rounded-full bg-white px-2 py-1 text-xs font-semibold text-gray-800">
                        ${product.price.toFixed(2)}
                      </div>
                    </div>
                    <div className="p-3">
                      <h3 className="text-sm font-medium text-gray-900 group-hover:text-primary-600">{product.name}</h3>
                      <p className="mt-1 text-xs text-gray-500 line-clamp-2">{product.description}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="reviews" className="focus-visible:outline-none">
            <div className="rounded-lg bg-white p-6 shadow-sm">
              <div className="mb-4 flex justify-between">
                <h2 className="text-xl font-semibold text-gray-900">Customer Reviews</h2>
                <Link 
                  href={`/artisans/${artisanId}/reviews`}
                  className="text-sm font-medium text-primary-600 hover:text-primary-700"
                >
                  View All
                </Link>
              </div>
              
              {artisanStats.reviewCount > 0 ? (
                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                      {Array.from({ length: 5 }).map((_, idx) => (
                        <svg 
                          key={idx}
                          className={`h-5 w-5 ${idx < Number(artisanStats.rating) ? 'text-yellow-500' : 'text-gray-300'}`} 
                          fill="currentColor" 
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.799-2.034c-.784-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <span className="text-lg font-semibold">{artisanStats.rating} out of 5</span>
                    <span className="text-sm text-gray-500">Based on {artisanStats.reviewCount} reviews</span>
                  </div>
                  
                  <p className="text-center text-gray-600">Reviews are available on individual product pages.</p>
                </div>
              ) : (
                <div className="py-8 text-center">
                  <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                  </svg>
                  <h3 className="mt-2 text-lg font-medium text-gray-900">No reviews yet</h3>
                  <p className="mt-1 text-gray-500">This artisan doesn&apos;t have any reviews yet.</p>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
} 