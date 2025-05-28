import React from 'react';
import ProductCard from '../components/productCard';
import { Product } from '../components/types';

async function getArtisanalAccessories(): Promise<Product[]> {
  const res = await fetch(
    'https://celebrated-love-44f06665d3.strapiapp.com/api/artisanal-accessories?populate=*',
    { next: { revalidate: 3600 } } // Cache for 1 hour
  );

  if (!res.ok) throw new Error('Failed to fetch');
  const data = await res.json();

  // Transform API data to match Product type
  return data.data.map((item: any) => ({
    id: item.id,
    documentId: item.documentId,
    title: item.name,
    description: item.description
      ? [
          {
            type: 'paragraph',
            children: item.description.split('\n').map((line: string) => ({
              type: 'text',
              text: line,
            })),
          },
        ]
      : [],
    price: item.price,
    slug: item.slug,
    images: (item.images || []).map((img: any) => ({
      id: img.id,
      url: img.url,
      formats: img.formats,
    })),
    category: item.category
      ? {
          id: item.category.id,
          name: item.category.name,
        }
      : { id: 0, name: 'Uncategorized' },
  }));
}

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
        backgroundColor: "#f8f6f1",
        backgroundImage: "url('/45-degree-fabric-light.webp')",
      }}
    >
      <div className="backdrop-blur-[2px] min-h-screen">
        <div className="container mx-auto px-6 py-12">
          <h1 className="text-5xl font-semibold mb-8 text-center text-black">New In</h1>
          {error && (
            <div className="text-red-500 text-center mb-4">{error}</div>
          )}
          {!error && products.length === 0 && (
            <div className="text-center text-gray-500">No products found.</div>
          )}
          <div className="flex flex-col gap-8">
            {productRows.map((row, idx) => (
              <div
                key={idx}
                className={`flex gap-8 w-full items-stretch ${row.length === 2 ? "justify-center" : ""}`}
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
