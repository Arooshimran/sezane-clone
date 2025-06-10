import React from 'react';
import ProductCard from '../components/productCard';
import { Product } from '../components/types';
import { getArtisanalAccessories } from '../lib/api'; 
import SezaneNavbar from '../components/navbar';

function chunkProducts(products: Product[]) {
  const chunks: Product[][] = [];
  let i = 0;
  const pattern = [2, 3];
  let pIndex = 0;

  while (i < products.length) {
    const size = pattern[pIndex % pattern.length];
    const chunk = products.slice(i, i + size);
    chunks.push(chunk);
    i += chunk.length;
    pIndex++;
  }

  return chunks;
}

export default async function ArtisanalAccessoriesPage() {
  let products: Product[] = [];
  let error = null;

  try {
    products = await getArtisanalAccessories();
  } catch (e: any) {
    error = e.message || 'Failed to load products';
  }

  const productRows = chunkProducts(products);

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat"
      style={{
        backgroundColor: '#f8f6f1',
        backgroundImage: "url('/45-degree-fabric-light.webp')",
      }}
    >
      <SezaneNavbar/>
      <div className="backdrop-blur-[2px] min-h-screen">
        <div className="container mx-auto px-6 py-12">
          <h1 className="font-['Oswald'] text-5xl font-semibold mb-8 text-center text-black">
            New In
          </h1>
          {error && <div className="text-red-500 text-center mb-4">{error}</div>}
          {!error && products.length === 0 && (
            <div className="text-center text-gray-500">No products found.</div>
          )}
          <div className="flex flex-col gap-8">
            {productRows.map((row, idx) => (
              <div
                key={idx}
                className={`flex gap-8 w-full items-stretch ${
                  row.length === 2 ? 'justify-center' : ''
                }`}
              >
                {row.map((product) => (
                  <div key={product.id} className="flex-1 overflow-hidden">
                    <ProductCard key={product.id} product={product} />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
        <div className="h-20"></div>
      </div>
    </div>
  );
}

// For static params (if you want to statically generate dynamic routes)
// Not usually needed for a static page like /new-in, but here's the pattern:
export async function getStaticParams() {
  // Example: return [{ slug: 'something' }]
  return [];
}

// For metadata (SEO, title, etc.)
export async function generateMetadata() {
  return {
    title: 'New In | Sézane',
    description: 'Discover the latest arrivals in our artisanal accessories collection.',
    openGraph: {
      title: 'New In | Sézane',
      description: 'Discover the latest arrivals in our artisanal accessories collection.',
      images: [
        {
          url: '/og-image.jpg',
          width: 1200,
          height: 630,
          alt: 'New In at Sézane',
        },
      ],
    },
  };
}
