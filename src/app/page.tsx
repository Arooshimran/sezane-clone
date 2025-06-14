import Image from 'next/image';
import Link from 'next/link';
import { fetchHeroSections } from './lib/api';
import SezaneNavbar from './components/navbar';

// Define the type for hero section items
type HeroSection = {
  id: string | number;
  image?: { url: string };
  text?: string;
  link?: string;
};

export default async function SezaneClonePage() {
  const heroSections: HeroSection[] = await fetchHeroSections();

  return (
    <div className="bg-white text-black">
      <SezaneNavbar />

      {/* Hero section */}
      <div className="grid grid-cols-1 md:grid-cols-2 h-[150vh]">
        {heroSections.slice(0, 2).map((item) => {
          const imgUrl = item.image?.url;
          return (
            <Link
              key={item.id}
              href={item.link || '#'}
              className="relative w-full h-full block"
            >
              {imgUrl ? (
                <Image
                  src={imgUrl}
                  alt={item.text || 'Hero Image'}
                  fill
                  style={{ objectFit: 'cover' }}
                  priority
                />
              ) : (
                <div className="bg-gray-200 w-full h-full" />
              )}
              <div className="absolute inset-0 flex justify-center items-center">
                <h2 className="text-4xl font-bold text-white drop-shadow-lg ml-8">
                  {item.text || ''}
                </h2>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Product grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-0">
        {heroSections.slice(2).map((item) => {
          const imgUrl = item.image?.url;
          return (
            <Link key={item.id} href={item.link || '#'}>
              <div className="relative aspect-[3/4] w-full">
                {imgUrl ? (
                  <Image
                    src={imgUrl}
                    alt={item.text || 'Product'}
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                ) : (
                  <div className="bg-gray-200 w-full h-full" />
                )}
                <div className="absolute inset-0 flex justify-center items-center ml-8 text-white text-xl font-bold drop-shadow-md">
                  {item.text || ''}
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
