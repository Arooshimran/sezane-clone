'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Product } from './types';
import { getImageUrl } from '../lib/api';
import ProductHoverBox from './ProductHoverBox';

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
                            <div className="absolute bottom-2 right-2 bg-white/70 rounded px-2 py-1 text-xs">
                                {currentImgIdx + 1} / {images.length}
                            </div>
                        </>
                    )}
                </div>
                {/* Only the reusable hover box remains */}
                {isHovered && (
                    <ProductHoverBox
                        product={product}
                        isWishlisted={isWishlisted}
                        toggleWishlist={toggleWishlist}
                    />
                )}
            </div>
            <div className="text-center mt-4 font-semibold text-base text-black">
                {product.title}
            </div>
        </div>
    );
};

export default ProductCard;
