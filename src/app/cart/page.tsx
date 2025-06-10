"use client";

import React from "react";
import { useCart } from "../context/cartContext";
import { Product } from "../components/types";

export default function AddToCartButton({ product }: { product: Product }) {
  const { addToCart, cart } = useCart();

  const handleAddToCart = () => {
    console.log("=== ADD TO CART DEBUG ===");
    console.log("1. Button clicked");
    console.log("2. Product data:", JSON.stringify(product, null, 2));
    console.log("3. Cart before adding:", JSON.stringify(cart, null, 2));
    console.log("4. Product ID:", product.id, "Type:", typeof product.id);
    
    try {
      addToCart(product);
      console.log("5. addToCart function called successfully");
    } catch (error) {
      console.error("5. ERROR in addToCart:", error);
    }
    
    // Check cart immediately after
    console.log("6. Cart immediately after (might not update yet):", JSON.stringify(cart, null, 2));
    
    // Check cart after state update
    setTimeout(() => {
      console.log("7. Cart after timeout:", JSON.stringify(cart, null, 2));
    }, 100);
  };

  return (
    <button
      onClick={handleAddToCart}
      className="w-full bg-black text-white py-4 px-8 text-sm font-medium font-['Oswald'] hover:bg-gray-800 transition-colors"
    >
      ADD TO CART ({cart.length})
    </button>
  );
}