'use client';

import React, { useState } from 'react';
import { Product, Category } from './types';
import { useProducts } from './useProducts';
import ProductCard from './productCard';

// Main Products Component
const Products = () => {
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

  const {
    products = [],
    categories = [],
    loading,
    isFetchingMore,
    error,
  } = useProducts();

  // Filter products by selected category
  const filteredProducts = (selectedCategory
    ? products.filter((product) => product.category?.id === selectedCategory)
    : products
  ).filter(
    (product) =>
      !!product.title &&
      typeof product.price === 'number' &&
      Array.isArray(product.images) &&
      !!product.category
  ) as Product[];

  // Helper to chunk products into [2,3,3,2,3,3,...] pattern
  function chunkProducts(arr: Product[]) {
    const result: Product[][] = [];
    let i = 0;
    let toggle = true;
    while (i < arr.length) {
      const size = toggle ? 2 : 3;
      result.push(arr.slice(i, i + size));
      i += size;
      toggle = !toggle;
    }
    return result;
  }

  const chunkedProducts = chunkProducts(filteredProducts);

  return (
    <div className="min-h-screen bg-white">
      {/* Category Navigation */}
      <div className="border-b border-gray-200">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-center space-x-12 py-4">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`text-sm tracking-wider transition-colors duration-200 ${
                selectedCategory === null
                  ? 'text-black font-medium'
                  : 'text-gray-500 hover:text-black'
              }`}
            >
              ALL
            </button>
            {categories.map((category: Category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`text-sm tracking-wider transition-colors duration-200 ${
                  selectedCategory === category.id
                    ? 'text-black font-medium'
                    : 'text-gray-500 hover:text-black'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="container mx-auto px-6 py-12">
        {error && (
          <div className="text-red-500 text-center mb-4">
            {error}
          </div>
        )}
        {loading && (
          <div className="space-y-8">
            {[2, 3, 3].map((count, rowIdx) => (
              <div key={rowIdx} className={`grid gap-8 ${count === 2 ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1 md:grid-cols-3'}`}>
                {Array.from({ length: count }).map((_, idx) => (
                  <div key={idx} className="animate-pulse">
                    <div className="bg-gray-200 h-[500px] mb-4"></div>
                    <div className="h-4 bg-gray-200 mb-2"></div>
                    <div className="h-4 bg-gray-200 w-20"></div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}
        {!loading && (
          <div className="space-y-8">
            {chunkedProducts.map((row, rowIdx) => (
              <div
                key={rowIdx}
                className={`grid gap-8 ${row.length === 2 ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1 md:grid-cols-3'}`}
              >
                {/* {row.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))} */}
              </div>
            ))}
          </div>
        )}
        {isFetchingMore && (
          <div className="text-center text-gray-500 mt-4">Loading more products...</div>
        )}
      </div>

      {/* Bottom spacing */}
      <div className="h-20"></div>
    </div>
  );
};

export default Products;
