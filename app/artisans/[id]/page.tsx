import ArtisanProfile from '@/components/artisans/ArtisanProfile';
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
    title: `${artisanInfo.name} | Cratify`,
    description: `View the profile and handcrafted items from ${artisanInfo.name}, a talented artisan on Cratify`,
  };
}

export default function ArtisanProfilePage({ params }: Props) {
  const { id } = params;
  
  return (
    <main>
      <ArtisanProfile artisanId={id} />
    </main>
  );
} 