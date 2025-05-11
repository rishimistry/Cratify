'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';

type ArtisanProfileNavProps = {
  artisanId: string;
  artisanName: string;
};

export default function ArtisanProfileNav({ artisanId, artisanName }: ArtisanProfileNavProps) {
  const pathname = usePathname();

  const links = [
    { name: 'Profile', href: `/artisans/${artisanId}` },
    { name: 'Products', href: `/artisans/${artisanId}/products` },
    { name: 'Reviews', href: `/artisans/${artisanId}/reviews` },
  ];
  
  return (
    <div className="bg-white border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between py-3 sm:py-0">
          <h1 className="text-xl font-bold text-gray-900 sm:py-4">
            {artisanName}
          </h1>
          
          <nav className="flex space-x-1 overflow-x-auto py-2 sm:py-0">
            {links.map((link) => {
              const isActive = pathname === link.href;
              
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`px-3 py-2 text-sm font-medium transition ${
                    isActive
                      ? 'border-b-2 border-primary-600 text-primary-600'
                      : 'border-b-2 border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                  }`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </div>
  );
} 