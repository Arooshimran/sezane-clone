import { useState, useEffect, useRef, useCallback } from 'react';
import { Product, Category } from './types';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || 'https://celebrated-love-44f06665d3.strapiapp.com';

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  
  // Use refs to track current values without causing re-renders
  const currentPageRef = useRef(1);
  const isLoadingRef = useRef(false);
  const loadedProductIds = useRef(new Set<number>());

  const fetchData = useCallback(async (pageNum: number) => {
    // Prevent duplicate requests
    if (isLoadingRef.current) return;
    
    try {
      isLoadingRef.current = true;
      
      if (pageNum === 1) {
        setLoading(true);
        loadedProductIds.current.clear(); // Clear tracking for fresh start
      } else {
        setIsFetchingMore(true);
      }

      const prodRes = await fetch(
        `${API_BASE}/api/products?populate=*&pagination[page]=${pageNum}&pagination[pageSize]=12`,
        {
          cache: 'no-store',
        }
      );

      if (!prodRes.ok) throw new Error(`Failed to fetch products: ${prodRes.status}`);
      const prodData = await prodRes.json();

      // Filter out duplicates using product IDs
      const newProducts = (prodData.data || []).filter((product: Product) => {
        if (loadedProductIds.current.has(product.id)) {
          return false; // Skip duplicate
        }
        loadedProductIds.current.add(product.id);
        return true;
      });

      setProducts(prev => {
        if (pageNum === 1) {
          return newProducts;
        } else {
          // Double-check for duplicates when appending
          const existingIds = new Set(prev.map(p => p.id));
          const uniqueNewProducts = newProducts.filter((p: Product) => !existingIds.has(p.id));
          return [...prev, ...uniqueNewProducts];
        }
      });

      // Update pagination info
      const meta = prodData.meta?.pagination;
      if (meta) {
        currentPageRef.current = meta.page;
        if (meta.page >= meta.pageCount) {
          setHasMore(false);
        }
      }

      // Fetch categories only on first load
      if (pageNum === 1) {
        try {
          const catRes = await fetch(`${API_BASE}/api/categories?populate=categories`, {
            cache: 'no-store',
          });
          if (catRes.ok) {
            const catData = await catRes.json();
            setCategories(catData.data || []);
          }
        } catch (catError) {
          console.warn('Failed to fetch categories:', catError);
        }
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
      setIsFetchingMore(false);
      isLoadingRef.current = false;
    }
  }, []);

  // Initial data fetch
  useEffect(() => {
    fetchData(1);
  }, [fetchData]);

  // Infinite scroll effect
  useEffect(() => {
    const handleScroll = () => {
      // Check if we're near the bottom
      const nearBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 100;
      
      // Prevent multiple simultaneous requests
      if (nearBottom && !loading && !isFetchingMore && hasMore && !isLoadingRef.current) {
        const nextPage = currentPageRef.current + 1;
        fetchData(nextPage);
      }
    };

    // Throttle scroll events to prevent excessive calls
    let ticking = false;
    const throttledHandleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', throttledHandleScroll, { passive: true });
    return () => window.removeEventListener('scroll', throttledHandleScroll);
  }, [loading, isFetchingMore, hasMore, fetchData]);

  return {
    products,
    categories,
    loading,
    isFetchingMore,
    error,
    fetchData,
  };
};