import type { Metadata } from 'next';
import ArtisansHero from '@/components/artisans/ArtisansHero';
import FeaturedArtisans from '@/components/artisans/FeaturedArtisans';
import ArtisanCategories from '@/components/artisans/ArtisanCategories';
import ArtisanProcess from '@/components/artisans/ArtisanProcess';
import JoinArtisans from '@/components/artisans/JoinArtisans';
import RootLayout from '@/components/layout/RootLayout';

export const metadata: Metadata = {
  title: 'Artisans | Cratify',
  description: 'Discover the skilled artisans behind our handcrafted products. Learn about their crafts, processes, and stories.',
};

export default function ArtisansPage() {
  return (
    <RootLayout>
      {/* Hero section with background pattern */}
      <ArtisansHero />
      
      {/* Featured artisans with a light background */}
      <FeaturedArtisans />
      
      {/* Categories with a white background */}
      <ArtisanCategories />
      
      {/* Process section with a light background */}
      <ArtisanProcess />
      
      {/* Join artisans CTA with gradient background */}
      <JoinArtisans />
    </RootLayout>
  );
} 