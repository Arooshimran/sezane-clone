'use client';

export interface DescriptionChild {
  type: string;
  text: string;
}

export interface DescriptionBlock {
  type: string;
  children: DescriptionChild[];
}

export interface ProductImageFormat {
  url: string;
  // use unknown instead of any for extra properties
  [key: string]: unknown;
}

export interface ProductImage {
  id: number;
  url: string;
  formats?: {
    medium?: ProductImageFormat;
    large?: ProductImageFormat;
    small?: ProductImageFormat;
    [key: string]: ProductImageFormat | undefined;
  };
}

export interface Category {
  id: number;
  name: string;
  categories?: Category[]; // Subcategories recursively typed
}

export interface Product {
  id: number;
  documentId?: string;
  title: string; // required
  description?: DescriptionBlock[];
  price: number; // required
  slug?: string;
  images: ProductImage[]; // required
  category: Category;
   // required
}
export interface CartItem extends Product {
  quantity: number; // required
}