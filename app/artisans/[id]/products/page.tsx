import ArtisanProducts from '@/components/artisans/ArtisanProducts';
import { Metadata } from 'next';
import { products } from '@/data/products';
import { notFound } from 'next/navigation';

type Props = {
  params: {
    id: string;
  };
};

// Find artisan by ID from the products data
const getArtisanInfo = (artisanId: string) => {
  const product = products.find(p => p.artisan.id === artisanId);
  if (!product) return null;
  return product.artisan;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const artisanInfo = getArtisanInfo(params.id);
  
  if (!artisanInfo) {
    return {
      title: 'Artisan Not Found | Cratify',
      description: 'The artisan you are looking for could not be found',
    };
  }
  
  return {
    title: `${artisanInfo.name}\'s Products | Cratify`,
    description: `Browse handcrafted products from ${artisanInfo.name}, a talented artisan on Cratify`,
  };
}

export default function ArtisanProductsPage({ params }: Props) {
  const { id } = params;
  const artisanInfo = getArtisanInfo(id);
  
  // If artisan doesn't exist, show 404
  if (!artisanInfo) {
    notFound();
  }
  
  return (
    <main className="bg-gray-50 pb-16 pt-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="mb-8 text-center text-3xl font-bold text-gray-900 sm:text-left">
          {artisanInfo.name}&apos;s Products
        </h1>
        
        <p className="text-gray-600">
          Browse through our artisan&apos;s unique collection of handcrafted products.
        </p>
        
        <ArtisanProducts artisanId={id} artisanName={artisanInfo.name} />
      </div>
    </main>
  );
} 