import React from 'react';
import { notFound } from 'next/navigation';
import { Product } from '../../components/types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://celebrated-love-44f06665d3.strapiapp.com';

function getImageUrl(img: any) {
  if (!img) return 'https://dummyimage.com/400x500';
  const url = img.formats?.large?.url || img.formats?.medium?.url || img.url;
  return url?.startsWith('http') ? url : API_URL + url;
}

async function getProductBySlug(slug: string): Promise<Product | null> {
  const res = await fetch(
    `${API_URL}/api/artisanal-accessories?filters[slug][$eq]=${slug}&populate=*`,
    { next: { revalidate: 3600 } }
  );
  if (!res.ok) return null;
  const data = await res.json();
  if (!data.data || !data.data[0]) return null;
  const item = data.data[0];
  return {
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
  };
}

export default async function ProductDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const product = await getProductBySlug(params.slug);

  if (!product) return notFound();

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Images */}
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              {product.images.slice(0, 2).map((img, idx) => (
                <div key={img.id} className="aspect-[3/4]">
                  <img
                    src={getImageUrl(img)}
                    alt={`${product.title} ${idx + 1}`}
                    className="w-full h-full object-cover rounded-md"
                  />
                </div>
              ))}
            </div>
            {product.images.length > 2 && (
              <div className="grid grid-cols-3 gap-3">
                {product.images.slice(2).map((img, idx) => (
                  <div key={img.id} className="aspect-[4/5]">
                    <img
                      src={getImageUrl(img)}
                      alt={`${product.title} ${idx + 3}`}
                      className="w-full h-full object-cover rounded"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-medium text-black mb-1">
                {product.category?.name || 'Brand'}
              </h2>
              <h1 className="text-lg text-black">{product.title}</h1>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xl font-medium text-red-600">
                ${Math.round(product.price)}
              </span>
            </div>
            <div className="space-y-4">
              <button className="flex-1 bg-black text-white py-3 px-6 rounded hover:bg-gray-800 transition-colors">
                Add To Bag
              </button>
              <button className="border border-gray-300 py-3 px-6 rounded hover:bg-gray-50 transition-colors flex items-center justify-center gap-2 bg-white">
                Wishlist ♡
              </button>
            </div>
            <div className="border-t pt-4">
              <h4 className="font-medium text-black mb-2">Product Description</h4>
              {product.description?.map((block, i) => (
                <p key={i}>
                  {block.children.map((child, j) => (
                    <span key={j}>{child.text}</span>
                  ))}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
