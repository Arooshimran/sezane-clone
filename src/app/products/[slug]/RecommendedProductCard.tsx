// 'use client';

// import React, { useState } from 'react';
// import Link from 'next/link';
// import ProductHoverBox from '../../components/ProductHoverBox';
// import { Product } from '../../components/types'; // Use shared Product type

// type ProductImage = {
//   id: number;
//   url: string;
//   formats?: any;
// };

// const API_URL = 'https://celebrated-love-44f06665d3.strapiapp.com';

// function getImageUrl(img: ProductImage) {
//   if (!img) return 'https://dummyimage.com/400x500';
//   const url = img.formats?.large?.url || img.formats?.medium?.url || img.url;
//   return url?.startsWith('http') ? url : API_URL + url;
// }

// export default function RecommendedProductCard({ product }: { product: Product }) {
//   const [isHovered, setIsHovered] = useState(false);
//   const [isWishlisted, setIsWishlisted] = useState(false);

//   const toggleWishlist = (e: React.MouseEvent<HTMLButtonElement>) => {
//     e.preventDefault();
//     setIsWishlisted(prev => !prev);
//   };

//   return (
//     <div
//       className="min-w-[260px] max-w-[320px] flex-shrink-0 group relative z-40"
//       onMouseEnter={() => setIsHovered(true)}
//       onMouseLeave={() => setIsHovered(false)}
//     >
//       <Link href={`/products/${product.slug}`}>
//         <div className="aspect-[4/5] bg-gray-100 rounded overflow-hidden mb-2">
//           <img
//             src={getImageUrl(product.images[0])}
//             alt={product.title}
//             className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
//             loading="lazy"
//           />
//         </div>
//         <div className="font-['Oswald'] font-bold text-lg text-black">
//           {product.title.toUpperCase()}
//         </div>
//       </Link>
//       {isHovered && (
//         <ProductHoverBox
//           product={product}
//           isWishlisted={isWishlisted}
//           toggleWishlist={toggleWishlist}
//         />
//       )}
//     </div>
//   );
// }