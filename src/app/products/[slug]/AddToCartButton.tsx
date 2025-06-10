"use client";

import React from "react";
import { useCart } from "../../context/cartContext";
import { Product } from "../../components/types";

export default function AddToCartButton({ product }: { product: Product }) {
  const { addToCart, cart } = useCart();

  const handleAddToCart = () => {
    console.log("=== ADD TO CART DEBUG ===");
    console.log("1. Button clicked");
    console.log("2. Product prop received:", product);
    console.log("3. Product data:", JSON.stringify(product, null, 2));
    console.log("4. Cart before adding:", JSON.stringify(cart, null, 2));
    
    // Safety check for product
    if (!product) {
      console.error("ERROR: Product is undefined or null");
      return;
    }
    
    if (!product.id) {
      console.error("ERROR: Product ID is missing", product);
      return;
    }
    
    console.log("5. Product ID:", product.id, "Type:", typeof product.id);
    
    try {
      addToCart(product);
      console.log("6. addToCart function called successfully");
    } catch (error) {
      console.error("6. ERROR in addToCart:", error);
      return;
    }
    
    // Check cart immediately after
    console.log("7. Cart immediately after (might not update yet):", JSON.stringify(cart, null, 2));
    
    // Check cart after state update
    setTimeout(() => {
      console.log("8. Cart after timeout:", JSON.stringify(cart, null, 2));
    }, 100);
  };

  // Don't render if product is not available
  if (!product) {
    console.warn("AddToCartButton: Product prop is missing");
    return null;
  }

  return (
    <button
      onClick={handleAddToCart}
      disabled={!product || !product.id}
      className={`w-full py-4 px-8 text-sm font-medium font-['Oswald'] transition-colors ${
        !product || !product.id 
          ? 'bg-gray-400 text-gray-200 cursor-not-allowed' 
          : 'bg-black text-white hover:bg-gray-800'
      }`}
    >
      {!product ? 'LOADING...' : `ADD TO CART (${cart.length})`}
    </button>
  );
}