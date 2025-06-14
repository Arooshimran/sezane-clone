import React from 'react';
import { Heart } from 'lucide-react';
import Link from 'next/link';
import { Product } from './types';

type Props = {
  product: Product;
  isWishlisted: boolean;
  toggleWishlist: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

const ProductHoverBox = ({ product, isWishlisted, toggleWishlist }: Props) => (
  <div
    className={`
      absolute z-20
      bottom-0
      right-0
      w-full
      max-w-[340px]
      min-w-[260px]
      bg-white
      shadow-lg
      p-6
      border border-gray-200
      flex flex-col gap-3
      md:bottom-6 md:right-6 md:w-[340px] md:max-w-[90%]
    `}
    style={{ boxSizing: 'border-box' }}
  >
    <div className="flex justify-between items-start">
      <div>
        <h3 className="font-['Oswald'] text-black font-bold text-lg uppercase tracking-wide leading-tight">
          {product.title}
        </h3>
        <p className="font-['Oswald'] text-black font-bold text-base uppercase tracking-wide mt-1">
          {product.price}AR$
        </p>
      </div>
      <button
        onClick={toggleWishlist}
        className="ml-2 mt-1 w-8 h-8 flex items-center justify-center bg-transparent hover:bg-gray-100 rounded-full transition-all duration-200"
      >
        <Heart
          size={20}
          className={`transition-colors duration-200 ${isWishlisted ? 'fill-black text-black' : 'text-gray-600 hover:text-black'}`}
        />
      </button>
    </div>
    <div className="font-['Oswald'] text-xs text-gray-700 mt-2 leading-snug">
      {product.description?.map((block, i) => (
        <p key={i}>
          {block.children.map((child, j) => (
            <span key={j}>{child.text}</span>
          ))}
        </p>
      ))}
    </div>
    <div className="flex justify-between items-center mt-4">
      <span className="text-xs text-gray-500 uppercase">TU</span>
      <Link
        href={`/products/${product.slug}`}
        className="font-['Oswald'] text-black flex items-center gap-2 text-xs font-semibold uppercase tracking-wide hover:underline"
      >
        View Details
        <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" className="inline-block">
          <path d="M6 6h9l-1.5 9h-9l-1.5-9z" />
          <circle cx="9" cy="15" r="1" />
          <circle cx="15" cy="15" r="1" />
        </svg>
      </Link>
    </div>
  </div>
);

export default ProductHoverBox;