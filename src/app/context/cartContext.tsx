// 'use client';
// import React, { createContext, useContext, useState, ReactNode } from 'react';
// import { Product } from '../components/types';

// export type CartItem = Product & { quantity: number };

// type CartContextType = {
//   cart: CartItem[];
//   addToCart: (product: Product, quantity?: number) => void;
//   removeFromCart: (id: number) => void;
//   updateQuantity: (id: number, quantity: number) => void;
//   clearCart: () => void;
// };

// const CartContext = createContext<CartContextType | undefined>(undefined);

// export function useCart() {
//   const ctx = useContext(CartContext);
//   if (!ctx) throw new Error('useCart must be used within CartProvider');
//   return ctx;
// }

// export function CartProvider({ children }: { children: ReactNode }) {
//   const [cart, setCart] = useState<CartItem[]>([]);

//   const addToCart = (product: Product, quantity = 1) => {
//     setCart((prev) => {
//       const existing = prev.find((item) => item.id === product.id);
//       if (existing) {
//         return prev.map((item) =>
//           item.id === product.id
//             ? { ...item, quantity: item.quantity + quantity }
//             : item
//         );
//       }
//       return [...prev, { ...product, quantity }];
//     });
//   };

//   const removeFromCart = (id: number) => {
//     setCart((prev) => prev.filter((item) => item.id !== id));
//   };

//   const updateQuantity = (id: number, quantity: number) => {
//     setCart((prev) =>
//       prev.map((item) =>
//         item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item
//       )
//     );
//   };

//   const clearCart = () => setCart([]);

//   return (
//     <CartContext.Provider
//       value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart }}
//     >
//       {children}
//     </CartContext.Provider>
//   );
// }