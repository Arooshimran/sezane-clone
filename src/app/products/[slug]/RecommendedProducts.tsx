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

async function getRecommendedProducts(currentSlug: string, categoryName: string): Promise<Product[]> {
  try {
    // Make concurrent API calls - SERVER SIDE with proper caching
    const promises = COLLECTIONS.map(collection =>
      fetch(
        `${API_URL}/api/${collection}?filters[category][name][$eq]=${encodeURIComponent(
          categoryName
        )}&populate=images&pagination[limit]=4`,
        { 
          next: { revalidate: 3600 }, // Cache for 1 hour - ONLY works server-side
          headers: { 'Cache-Control': 'public, max-age=3600' }
        }
      ).then(res => res.ok ? res.json() : null)
    );

    const results = await Promise.all(promises);
    
    let recs: Product[] = [];
    
    results.forEach(data => {
      if (data?.data) {
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
    });

    // Shuffle and limit to 3 products
    const shuffled = recs.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 3);
  } catch (error) {
    console.error('Error fetching recommended products:', error);
    return [];
  }
}

// SERVER COMPONENT - No 'use client', no useState, no useEffect
export default async function RecommendedProducts({
  currentSlug,
  categoryName,
}: {
  currentSlug: string;
  categoryName: string;
}) {
  const products = await getRecommendedProducts(currentSlug, categoryName);

  if (!products.length) return null;

  return (
    <section className="mt-12">
      <h2 className="font-['Oswald'] text-2xl font-bold mb-6 text-black">YOU MAY ALSO LIKE</h2>
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
                loading="lazy"
              />
            </div>
            <div className="font-['Oswald'] font-bold text-lg text-black">
              {product.title.toUpperCase()}
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}