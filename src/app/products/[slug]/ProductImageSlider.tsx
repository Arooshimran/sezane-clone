'use client';

import React, { useState } from 'react';

type ProductImage = {
  id: number | string;
  url: string;
  formats?: any;
};

const API_URL = 'https://celebrated-love-44f06665d3.strapiapp.com';

function getImageUrl(img: ProductImage) {
  if (!img) return 'https://dummyimage.com/400x500';
  const url = img.formats?.large?.url || img.formats?.medium?.url || img.url;
  return url?.startsWith('http') ? url : API_URL + url;
}

export default function ProductImageSlider({
  images,
  title,
}: {
  images: ProductImage[];
  title: string;
}) {
  const [currentImgIdx, setCurrentImgIdx] = useState(0);

  if (!images || images.length === 0) return null;

  const mainImg = getImageUrl(images[currentImgIdx]);

  const handlePrev = () => {
    setCurrentImgIdx(idx => (idx === 0 ? images.length - 1 : idx - 1));
  };

  const handleNext = () => {
    setCurrentImgIdx(idx => (idx === images.length - 1 ? 0 : idx + 1));
  };

  return (
    <div className="flex flex-row items-start gap-4">
      {/* Main Image with arrows */}
      <div className="relative aspect-[4/5] bg-gray-100 flex items-center justify-center w-full max-w-md">
        <img
          src={mainImg}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700 ease-out"
        />
        {images.length > 1 && (
          <>
            <button
              onClick={handlePrev}
              className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full p-2 z-10"
              aria-label="Previous image"
              type="button"
            >
              <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 22l-8-8 8-8" />
              </svg>
            </button>
            <button
              onClick={handleNext}
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full p-2  z-10"
              aria-label="Next image"
              type="button"
            >
              <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M10 6l8 8-8 8" />
              </svg>
            </button>
            <div className="absolute bottom-2 right-2 bg-white/70 rounded px-2 py-1 text-xs">
              {currentImgIdx + 1} / {images.length}
            </div>
          </>
        )}
      </div>
      {/* Thumbnails on the right */}
      {images.length > 1 && (
        <div className="flex flex-col gap-2">
          {images.map((img, idx) => (
            <button
              key={img.id}
              className={`w-16 aspect-[4/5] border ${idx === currentImgIdx ? 'border-black' : 'border-gray-200'} rounded overflow-hidden`}
              onClick={() => setCurrentImgIdx(idx)}
              aria-label={`Show image ${idx + 1}`}
              type="button"
            >
              <img
                src={getImageUrl(img)}
                alt={`${title} ${idx + 1}`}
                className="w-full h-full object-cover border-black hover:border-2"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}