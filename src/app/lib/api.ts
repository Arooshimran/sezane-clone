import { Product } from '../components/types';

export const API_URL =
  process.env.NEXT_PUBLIC_API_URL || 'https://celebrated-love-44f06665d3.strapiapp.com';

export const getImageUrl = (img?: {
  url: string;
  formats?: {
    large?: { url: string };
    medium?: { url: string };
  };
}): string => {
  if (!img) return 'https://dummyimage.com/720x960';

  const url = img.formats?.large?.url || img.formats?.medium?.url || img.url;
  return url.startsWith('http') ? url : API_URL + url;
};



export async function getArtisanalAccessories(): Promise<Product[]> {
  const res = await fetch(`${API_URL}/api/artisanal-accessories?populate=*`, {
    next: { revalidate: 3600 }, // Cache for 1 hour
  });

  if (!res.ok) throw new Error('Failed to fetch');

  const data = await res.json();

  return data.data.map((item: any) => ({
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
  }));
}

export async function getNauticalStripe(): Promise<Product[]> {
  const res = await fetch(`${API_URL}/api/nautical-stripes?populate=*`, {
    next: { revalidate: 3600 }, // Cache for 1 hour
  });

  if (!res.ok) {
    throw new Error('Failed to fetch products');
  }

  const data = await res.json();

  return data.data.map((item: any) => ({
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
  }));
}





// const COLLECTIONS = ['artisanal-accessories', 'nautical-stripes'];

// export type Product = {
//   id: number;
//   documentId?: string;
//   title: string;
//   description: any[];
//   price: number;
//   slug: string;
//   images: { id: number; url: string; formats: any }[];
//   category: { id: number; name: string };
// };

// export async function fetchProductBySlug(slug: string): Promise<Product | null> {
//   for (const collection of COLLECTIONS) {
//     const res = await fetch(
//       `${API_URL}/api/${collection}?filters[slug][$eq]=${slug}&populate=*`,
//       { next: { revalidate: 3600 } }
//     );
//     if (!res.ok) continue;

//     const data = await res.json();
//     if (!data.data || !data.data[0]) continue;

//     const item = data.data[0];

//     const category =
//       item.category ||
//       (typeof item.price === 'undefined' && item.category) ||
//       { id: 0, name: 'Uncategorized' };

//     const price =
//       typeof item.price !== 'undefined'
//         ? item.price
//         : (item.category && item.category.price) || 0;

//     return {
//       id: item.id,
//       documentId: item.documentId,
//       title: item.name,
//       description: item.description
//         ? [
//             {
//               type: 'paragraph',
//               children: item.description.split('\n').map((line: string) => ({
//                 type: 'text',
//                 text: line,
//               })),
//             },
//           ]
//         : [],
//       price,
//       slug: item.slug,
//       images: (item.images || []).map((img: any) => ({
//         id: img.id,
//         url: img.url,
//         formats: img.formats,
//       })),
//       category: category
//         ? {
//             id: category.id,
//             name: category.name,
//           }
//         : { id: 0, name: 'Uncategorized' },
//     };
//   }
//   return null;
// }
