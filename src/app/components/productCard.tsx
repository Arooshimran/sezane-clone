'use client';

import React, { useState } from 'react';
import { Heart } from 'lucide-react';
import Link from 'next/link';
import { Product } from './types';
import { getImageUrl } from '../lib/api';


// const API_URL =
//    process.env.NEXT_PUBLIC_API_URL || 'https://celebrated-love-44f06665d3.strapiapp.com';

// const getImageUrl = (img: ProductImage | undefined) => {
//     if (!img) return 'https://dummyimage.com/720x960';
//     const url = img.formats?.large?.url || img.formats?.medium?.url || img.url;
//     return url?.startsWith('http') ? url : API_URL + url;
// };

const ProductCard = ({ product }: { product: Product }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [isWishlisted, setIsWishlisted] = useState(false);
    const [currentImgIdx, setCurrentImgIdx] = useState(0);

    const toggleWishlist = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setIsWishlisted(prev => !prev);
    };

    const images = product.images && product.images.length > 0 ? product.images : [];
    const mainImg = images[currentImgIdx]
        ? getImageUrl(images[currentImgIdx])
        : 'https://dummyimage.com/720x960';

    const handlePrev = (e: React.MouseEvent) => {
        e.stopPropagation();
        setCurrentImgIdx(idx => (idx === 0 ? images.length - 1 : idx - 1));
    };

    const handleNext = (e: React.MouseEvent) => {
        e.stopPropagation();
        setCurrentImgIdx(idx => (idx === images.length - 1 ? 0 : idx + 1));
    };

    return (
        <div
            className="group cursor-pointer relative"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="relative overflow-hidden bg-gray-50">
                <div className=" font-['Oswald'] w-full aspect-[3/4] overflow-hidden bg-gray-100 relative">
                    <img
                        src={mainImg}
                        alt={product.title || ''}
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    {/* Image slide arrows */}
                    {images.length > 1 && (
                        <>
                            <button
                                onClick={handlePrev}
                                className="absolute left-2 top-1/2 -translate-y-1/2  rounded-full p-1 z-10"
                                aria-label="Previous image"
                                tabIndex={0}
                            >
                                <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M15 18l-6-6 6-6" />
                                </svg>
                            </button>
                            <button
                                onClick={handleNext}
                                className="absolute right-2 top-1/2 -translate-y-1/2  rounded-full p-1 z-10"
                                aria-label="Next image"
                                tabIndex={0}
                            >
                                <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M9 6l6 6-6 6" />
                                </svg>
                            </button>
                            {/* Optional: image index indicator */}
                            <div className="absolute bottom-2 right-2 bg-white/70 rounded px-2 py-1 text-xs">
                                {currentImgIdx + 1} / {images.length}
                            </div>
                        </>
                    )}
                </div>

                {/* Hover box styled like Sezane */}
                {isHovered && (
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
                        style={{
                            boxSizing: 'border-box',
                        }}
                    >
                        <div className="flex justify-between items-start">
                            <div>
                                <h3 className="font-['Oswald'] font-bold text-lg uppercase tracking-wide leading-tight">
                                    {product.title}
                                </h3>
                                <p className="font-['Oswald'] font-bold text-base uppercase tracking-wide mt-1">
                                    {product.price}AR$
                                </p>
                            </div>
                            <button
                                onClick={toggleWishlist}
                                className="ml-2 mt-1 w-8 h-8 flex items-center justify-center bg-transparent hover:bg-gray-100 rounded-full transition-all duration-200"
                            >
                                <Heart
                                    size={20}
                                    className={`transition-colors duration-200 ${isWishlisted ? 'fill-black text-black' : 'text-gray-600 hover:text-black'
                                        }`}
                                />
                            </button>
                        </div>
                        {/* Product options/description */}
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
                                className="font-['Oswald'] flex items-center gap-2 text-xs font-semibold uppercase tracking-wide hover:underline"
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
                )}
            </div>
            {/* Product name below the card */}
            <div className="text-center mt-4 font-semibold text-base text-black">
                {product.title}
            </div>
        </div>
    );
};

export default ProductCard;
