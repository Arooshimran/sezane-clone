'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

const API_URL = 'https://celebrated-love-44f06665d3.strapiapp.com';
const COLLECTIONS = ['artisanal-accessories', 'nautical-stripes'];

type ProductImage = {
  id: number | string;
  url: string;
  formats?: any;
};

type Product = {
  id: number | string;
  slug: string;
  title: string;
  images: ProductImage[];
};

function getImageUrl(img: ProductImage) {
  if (!img) return 'https://dummyimage.com/400x500';
  const url = img.formats?.large?.url || img.formats?.medium?.url || img.url;
  return url?.startsWith('http') ? url : API_URL + url;
}

export default function RecommendedProducts({
  currentSlug,
  categoryName,
}: {
  currentSlug: string;
  categoryName: string;
}) {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    async function fetchRecommended() {
      let recs: Product[] = [];
      for (const collection of COLLECTIONS) {
        const res = await fetch(
          `${API_URL}/api/${collection}?filters[category][name][$eq]=${encodeURIComponent(
            categoryName
          )}&populate=*`,
           { next: { revalidate: 3600 } }
        );
        if (!res.ok) continue;
        const data = await res.json();
        if (!data.data) continue;
        recs = recs.concat(
          data.data
            .filter((item: any) => (item.slug ?? '') !== currentSlug)
            .map((item: any) => ({
              id: item.id,
              slug: item.slug ?? '',
              title: item.name ?? '',
              images: (item.images || []).map((img: any) => ({
                id: img.id,
                url: img.url ?? '',
                formats: img.formats,
              })),
            }))
        );
      }
      setProducts(recs.slice(0, 3));
    }
    fetchRecommended();
  }, [currentSlug, categoryName]);

  if (!products.length) return null;

  return (
    <section className="mt-12">
      <h2 className=" font-['Oswald'] text-2xl font-bold mb-6 text-black">YOU MAY ALSO LIKE</h2>
      <div className="flex gap-8 overflow-x-auto pb-4">
        {products.map(product => (
          <Link
            key={product.id}
            href={`/products/${product.slug}`}
            className="min-w-[260px] max-w-[320px] flex-shrink-0 group"
          >
            <div className="aspect-[4/5] bg-gray-100 rounded overflow-hidden mb-2">
              <img
                src={getImageUrl(product.images[0])}
                alt={product.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="font-['Oswald'] font-bold text-lg text-black">{product.title}</div>
          </Link>
        ))}
      </div>
    </section>
  );
}