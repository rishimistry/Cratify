'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FadeIn } from '@/components/ui/FadeIn';

type Review = {
  id: string;
  author: {
    name: string;
    avatar: string;
  };
  rating: number;
  date: string;
  content: string;
  productId?: string;
  productName?: string;
  helpful: number;
  images?: string[];
};

type ArtisanReviewsProps = {
  artisanId: string;
};

// Sample review data - in a real app, this would come from an API
const sampleReviews: Review[] = [
  {
    id: 'review1',
    author: {
      name: 'Sarah Johnson',
      avatar: '/images/avatars/avatar1.jpg',
    },
    rating: 5,
    date: '2023-05-15',
    content: "I am absolutely in love with my new ceramic mug! The craftsmanship is outstanding, and the glaze is even more beautiful in person. It feels so good in my hands, and it keeps my coffee warm for longer than expected. This artisan clearly puts love and care into their work. I'll definitely be ordering more pieces soon!",
    productId: 'product1',
    productName: 'Handcrafted Ceramic Mug',
    helpful: 24,
    images: [
      '/images/reviews/review1-1.jpg',
      '/images/reviews/review1-2.jpg',
    ],
  },
  {
    id: 'review2',
    author: {
      name: 'Michael Rodriguez',
      avatar: '/images/avatars/avatar2.jpg',
    },
    rating: 4,
    date: '2023-04-22',
    content: "The leather journal I purchased is gorgeous and well-made. The leather is soft and smells amazing, and the paper quality is excellent. The only reason I'm giving 4 stars instead of 5 is that the binding is slightly loose on one section. Otherwise, it's a beautiful handcrafted item that I enjoy using daily.",
    productId: 'product7',
    productName: 'Handmade Leather Journal',
    helpful: 18,
  },
  {
    id: 'review3',
    author: {
      name: 'Emily Chen',
      avatar: '/images/avatars/avatar3.jpg',
    },
    rating: 5,
    date: '2023-06-03',
    content: "I ordered a custom piece from this artisan, and the communication throughout the process was excellent. They listened to my ideas and created exactly what I was envisioning. The quality is exceptional, and it arrived beautifully packaged with a handwritten note. Such a wonderful experience!",
    helpful: 31,
    images: [
      '/images/reviews/review3-1.jpg',
    ],
  },
  {
    id: 'review4',
    author: {
      name: 'David Thompson',
      avatar: '/images/avatars/avatar4.jpg',
    },
    rating: 5,
    date: '2023-03-18',
    content: "This was my second purchase from this artisan, and they consistently deliver exceptional quality. The attention to detail is remarkable, and you can tell each piece is made with care. The items make perfect gifts - both my mom and sister loved what I got them!",
    productId: 'product3',
    productName: 'Sterling Silver Hoop Earrings',
    helpful: 15,
  },
  {
    id: 'review5',
    author: {
      name: 'Jessica Williams',
      avatar: '/images/avatars/avatar5.jpg',
    },
    rating: 3,
    date: '2023-05-27',
    content: "The product itself is beautiful and well-crafted. However, the shipping took much longer than expected, and there was minimal communication about the delay. I understand handmade items take time, but better updates would have been appreciated.",
    productId: 'product8',
    productName: 'Botanical Print Art',
    helpful: 7,
  },
];

export default function ArtisanReviews({ artisanId }: ArtisanReviewsProps) {
  // In a real app, we would fetch the reviews based on artisanId
  const reviews = sampleReviews;
  
  const [sortBy, setSortBy] = useState<'newest' | 'highest' | 'lowest' | 'helpful'>('newest');
  const [filterRating, setFilterRating] = useState<number | null>(null);
  
  const sortedReviews = [...reviews].sort((a, b) => {
    if (sortBy === 'newest') {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    } else if (sortBy === 'highest') {
      return b.rating - a.rating;
    } else if (sortBy === 'lowest') {
      return a.rating - b.rating;
    } else if (sortBy === 'helpful') {
      return b.helpful - a.helpful;
    }
    return 0;
  });
  
  const filteredReviews = filterRating 
    ? sortedReviews.filter(review => review.rating === filterRating)
    : sortedReviews;
    
  // Calculate average rating
  const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;
  
  // Calculate rating distribution
  const ratingCounts = [0, 0, 0, 0, 0]; // [1-star, 2-star, 3-star, 4-star, 5-star]
  reviews.forEach(review => {
    ratingCounts[review.rating - 1]++;
  });
  
  const getFormattedDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Customer Reviews</h2>
      
      <div className="grid md:grid-cols-12 gap-8 mb-8">
        {/* Rating summary */}
        <div className="md:col-span-4">
          <div className="bg-gray-50 rounded-lg p-6">
            <div className="text-center mb-4">
              <div className="text-5xl font-bold text-gray-900">{averageRating.toFixed(1)}</div>
              <div className="flex justify-center mt-2 mb-2">
                {[1, 2, 3, 4, 5].map(star => (
                  <svg 
                    key={star}
                    className={`w-5 h-5 ${
                      star <= Math.floor(averageRating) 
                        ? 'text-yellow-500' 
                        : star <= averageRating
                          ? 'text-yellow-300'
                          : 'text-gray-300'
                    }`}
                    fill="currentColor" 
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.799-2.034c-.784-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <div className="text-sm text-gray-500">{reviews.length} reviews</div>
            </div>
            
            <div className="space-y-2">
              {[5, 4, 3, 2, 1].map(rating => {
                const count = ratingCounts[rating - 1];
                const percentage = (count / reviews.length) * 100;
                
                return (
                  <div key={rating} className="flex items-center">
                    <button 
                      onClick={() => setFilterRating(filterRating === rating ? null : rating)}
                      className={`flex items-center hover:text-primary-600 ${
                        filterRating === rating ? 'font-medium text-primary-600' : 'text-gray-600'
                      }`}
                    >
                      <span className="w-4">{rating}</span>
                      <svg className="w-4 h-4 text-yellow-500 ml-1" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.799-2.034c-.784-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    </button>
                    
                    <div className="flex-1 h-4 mx-3 rounded-full bg-gray-200 overflow-hidden">
                      <motion.div 
                        className="h-full bg-primary-500"
                        initial={{ width: 0 }}
                        animate={{ width: `${percentage}%` }}
                        transition={{ duration: 0.8, delay: rating * 0.1 }}
                      />
                    </div>
                    
                    <div className="w-9 text-xs text-gray-500 text-right">
                      {count}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        
        {/* Review list */}
        <div className="md:col-span-8">
          <div className="flex justify-between items-center mb-6">
            <div className="text-gray-700">
              Showing {filteredReviews.length} of {reviews.length} reviews
              {filterRating && (
                <button 
                  onClick={() => setFilterRating(null)}
                  className="ml-2 text-primary-600 text-sm hover:underline"
                >
                  Clear filter
                </button>
              )}
            </div>
            
            <div className="flex items-center">
              <span className="text-sm text-gray-600 mr-2">Sort by:</span>
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="text-sm border rounded-md px-2 py-1"
              >
                <option value="newest">Newest</option>
                <option value="highest">Highest Rating</option>
                <option value="lowest">Lowest Rating</option>
                <option value="helpful">Most Helpful</option>
              </select>
            </div>
          </div>
          
          <div className="space-y-6">
            {filteredReviews.length > 0 ? (
              filteredReviews.map(review => (
                <FadeIn key={review.id}>
                  <motion.div 
                    className="border-b border-gray-200 pb-6 last:border-0"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex items-center">
                        <div className="relative h-10 w-10 rounded-full overflow-hidden">
                          <Image
                            src={review.author.avatar}
                            alt={review.author.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="ml-3">
                          <h3 className="text-sm font-medium text-gray-900">{review.author.name}</h3>
                          <div className="flex items-center mt-1">
                            <div className="flex">
                              {[1, 2, 3, 4, 5].map(star => (
                                <svg 
                                  key={star}
                                  className={`w-4 h-4 ${star <= review.rating ? 'text-yellow-500' : 'text-gray-300'}`}
                                  fill="currentColor" 
                                  viewBox="0 0 20 20"
                                >
                                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.799-2.034c-.784-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                              ))}
                            </div>
                            <span className="text-sm text-gray-500 ml-2">{getFormattedDate(review.date)}</span>
                          </div>
                        </div>
                      </div>
                      
                      {review.productName && (
                        <div className="text-xs text-gray-500">
                          Purchased: <span className="font-medium text-gray-700">{review.productName}</span>
                        </div>
                      )}
                    </div>
                    
                    <div className="mt-4">
                      <p className="text-sm text-gray-700">{review.content}</p>
                    </div>
                    
                    {review.images && review.images.length > 0 && (
                      <div className="mt-4 flex flex-wrap gap-2">
                        {review.images.map((image, index) => (
                          <div key={index} className="relative h-16 w-16 overflow-hidden rounded-md">
                            <Image
                              src={image}
                              alt={`Review image ${index + 1}`}
                              fill
                              className="object-cover"
                            />
                          </div>
                        ))}
                      </div>
                    )}
                    
                    <div className="mt-4 flex items-center space-x-4">
                      <button className="flex items-center text-sm text-gray-500 hover:text-gray-700">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                        </svg>
                        Helpful ({review.helpful})
                      </button>
                      
                      <button className="text-sm text-gray-500 hover:text-gray-700">
                        Report
                      </button>
                    </div>
                  </motion.div>
                </FadeIn>
              ))
            ) : (
              <div className="text-center py-8">
                <div className="text-gray-500">No reviews match your filter criteria.</div>
                <button 
                  onClick={() => setFilterRating(null)}
                  className="mt-2 text-primary-600 hover:underline"
                >
                  View all reviews
                </button>
              </div>
            )}
          </div>
          
          {filteredReviews.length > 0 && (
            <div className="mt-8 flex justify-center">
              <button className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
                Load more reviews
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 