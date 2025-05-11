import ArtisanReviews from '@/components/artisans/ArtisanReviews';
import { Metadata } from 'next';

type Props = {
  params: {
    id: string;
  };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // In a real app, you would fetch the artisan data from an API to use in the metadata
  return {
    title: 'Artisan Reviews | Cratify',
    description: 'Customer reviews and ratings for this artisan and their products',
  };
}

export default function ArtisanReviewsPage({ params }: Props) {
  const { id } = params;
  
  return (
    <main className="bg-gray-50 pb-16 pt-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="mb-8 text-center text-3xl font-bold text-gray-900 sm:text-left">
          Customer Reviews
        </h1>
        
        <ArtisanReviews artisanId={id} />
      </div>
    </main>
  );
} 