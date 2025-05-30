import React from 'react';
import { notFound } from 'next/navigation';
import { Product } from '../../components/types';
import ProductTabs from './ProductTabs';
import ProductImageSlider from './ProductImageSlider';

const API_URL = 'https://celebrated-love-44f06665d3.strapiapp.com';

// List all your collections here
const COLLECTIONS = ['artisanal-accessories', 'nautical-stripes'];

function getImageUrl(img: any) {
  if (!img) return 'https://dummyimage.com/400x500';
  const url = img.formats?.large?.url || img.formats?.medium?.url || img.url;
  return url?.startsWith('http') ? url : API_URL + url;
}

async function getProductBySlug(slug: string): Promise<Product | null> {
  for (const collection of COLLECTIONS) {
    const res = await fetch(
      `${API_URL}/api/${collection}?filters[slug][$eq]=${slug}&populate=*`,
      { next: { revalidate: 3600 } }
    );
    if (!res.ok) continue;
    const data = await res.json();
    if (!data.data || !data.data[0]) continue;
    const item = data.data[0];

    const category =
      item.category ||
      (typeof item.price === "undefined" && item.category) ||
      { id: 0, name: "Uncategorized" };

    const price =
      typeof item.price !== "undefined"
        ? item.price
        : (item.category && item.category.price) || 0;

    return {
      id: item.id,
      documentId: item.documentId,
      title: item.name,
      description: item.description
        ? [
            {
              type: "paragraph",
              children: item.description.split("\n").map((line: string) => ({
                type: "text",
                text: line,
              })),
            },
          ]
        : [],
      price,
      slug: item.slug,
      images: (item.images || []).map((img: any) => ({
        id: img.id,
        url: img.url,
        formats: img.formats,
      })),
      category: category
        ? {
            id: category.id,
            name: category.name,
          }
        : { id: 0, name: "Uncategorized" },
    };
  }
  return null;
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) return notFound();


  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat"
      style={{
        backgroundColor: "#f8f6f1",
        backgroundImage: "url('/45-degree-fabric-light.webp')",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left - Images Section */}
          <div className="relative">
            <ProductImageSlider images={product.images} title={product.title} />
          </div>

          {/* Right - Product Info */}
          <div className="space-y-2">
            {/* Product Title and Brand */}
            <div>
              <h1 className="text-3xl font-bold text-black font-['Oswald']">
                {product.title.toUpperCase()}
              </h1>
              <p className="text-lg text-gray-600 font-bold font-['Oswald']">
                {product.category?.name || 'Brand'} — {Math.round(product.price)} {product.price.toString().includes('.') ? product.price.toString().split('.')[1] : ''}ARS
              </p>
            </div>
            {/* Wishlist Icon */}
            <div className="flex justify-end">
              <button className="p-2 hover:bg-gray-50 rounded-full transition-colors">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
              </button>
            </div>

            {/* Product Description */}
            <ProductTabs description={product.description} />

            {/* Quality Icons */}
            <div className="grid grid-cols-4 gap-4 py-2 border-t border-gray-100">
              <div className="text-center relative group">
                <div className="w-12 h-12 mx-auto mb-2 rounded-full border border-gray-200 flex items-center justify-center bg-white overflow-hidden">
                  <img
                    src="/oeko-tex-certified.webp"
                    alt="OEKO TEX®"
                    className="w-8 h-8 object-contain"
                  />
                </div>
                <p className="text-xs text-gray-600 font-['Oswald']">OEKO TEX®</p>
                <p className="text-xs text-gray-500 font-['Oswald']">certified</p>
                {/* Hover tooltip */}
                <div className="font-['Oswald'] absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-white border border-gray-200 shadow-lg text-xs text-gray-700 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10 w-48">
                  OEKO-TEX® Standard 100 certified product ensures harmful substances are not present
                </div>
              </div>
              <div className="text-center relative group">
                <div className="w-12 h-12 mx-auto mb-2 rounded-full border border-gray-200 flex items-center justify-center bg-white overflow-hidden">
                  <img
                    src="/organic-materials.webp"
                    alt="Organic"
                    className="w-8 h-8 object-contain"
                  />
                </div>
                <p className="text-xs text-gray-600 font-['Oswald']">Organic</p>
                <p className="text-xs text-gray-500 font-['Oswald']">material</p>
                {/* Hover tooltip */}
                <div className=" font-['Oswald'] absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-white border border-gray-200 shadow-lg text-xs text-gray-700 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10 w-48">
                  Made with organic materials that are better for the environment
                </div>
              </div>
              <div className="text-center relative group">
                <div className="w-12 h-12 mx-auto mb-2 rounded-full border border-gray-200 flex items-center justify-center bg-white overflow-hidden">
                  <img
                    src="/recycled-packaging.webp"
                    alt="Recycled"
                    className="w-8 h-8 object-contain"
                  />
                </div>
                <p className="text-xs text-gray-600 font-['Oswald']">Recycled</p>
                <p className="text-xs text-gray-500 font-['Oswald']">packaging</p>
                {/* Hover tooltip */}
                <div className="font-['Oswald'] absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-white border border-gray-200 shadow-lg text-xs text-gray-700 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10 w-48">
                  Delivery packaging made from recycled and/or from sustainably managed forests certified fibres
                </div>
              </div>
              <div className="text-center relative group">
                <div className="w-12 h-12 mx-auto mb-2 rounded-full border border-gray-200 flex items-center justify-center bg-white overflow-hidden">
                  <img
                    src="/audited-factory.webp"
                    alt="Audited"
                    className="w-8 h-8 object-contain"
                  />
                </div>
                <p className="text-xs text-gray-600 font-['Oswald']">Audited</p>
                <p className="text-xs text-gray-500 font-['Oswald']">factory</p>
                {/* Hover tooltip */}
                <div className="font-['Oswald'] absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-white border border-gray-200 shadow-lg text-xs text-gray-700 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10 w-48">
                  Manufactured in facilities that meet our ethical and quality standards
                </div>
              </div>
            </div>

            {/* Size Selection */}
            <div className="space-y-2 mt-2">
              <h3 className="text-sm font-medium text-black font-['Oswald']">Size</h3>
              <div className="grid grid-cols-4 gap-2 text-black">
                {['34', '36', '38', '40', '42', '44', '46'].map((size) => (
                  <button
                    key={size}
                    className="border border-gray-300 py-3 px-4 text-center text-sm font-medium hover:border-black transition-colors bg-white"
                  style={{backgroundColor: "#f8f6f1"}}>
                    {size}
                  </button>
                ))}
              </div>
            </div>

           

            {/* Add to Cart Button */}
            <div className="space-y-4 pt-4">
              <button className="w-full bg-black text-white py-4 px-6 text-sm font-medium hover:bg-gray-800 transition-colors">
                ADD TO CART
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}