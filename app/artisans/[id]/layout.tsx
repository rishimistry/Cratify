import ArtisanProfileNav from '@/components/artisans/ArtisanProfileNav';
import Breadcrumbs from '@/components/ui/Breadcrumbs';

type Props = {
  children: React.ReactNode;
  params: {
    id: string;
  };
};

export default function ArtisanLayout({ children, params }: Props) {
  const { id } = params;
  
  // In a real app, you would fetch this data based on the artisan ID
  const artisanName = "Elena Woodford";

  return (
    <>
      <div className="bg-gray-50 py-4">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs 
            items={[
              { label: 'Artisans', href: '/artisans' },
              { label: artisanName }
            ]} 
          />
        </div>
      </div>
      
      <ArtisanProfileNav artisanId={id} artisanName={artisanName} />
      {children}
    </>
  );
} 