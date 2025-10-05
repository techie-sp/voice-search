import { useState, useCallback, useEffect } from "react";
import { Product } from "../api/types";
import { getAllProducts, searchProducts } from "../api/productService";

const LIMIT = 30;

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [skip, setSkip] = useState(0);
  const [loading, setLoading] = useState(false);
  const [allLoaded, setAllLoaded] = useState(false);
  const [query, setQuery] = useState<string>("");

  const fetchProducts = useCallback(async () => {
    if (loading || allLoaded) return;

    setLoading(true);
    try {
      const response = query
        ? await searchProducts({ q: query, limit: LIMIT, skip })
        : await getAllProducts({ limit: LIMIT, skip });

      const newProducts = response.products || [];
      setProducts((prev) => (skip === 0 ? newProducts : [...prev, ...newProducts]));
      setSkip((prev) => prev + newProducts.length);

      if (skip + newProducts.length >= response.total) {
        setAllLoaded(true);
      }
    } catch (err) {
      console.error("Failed to load products", err);
    } finally {
      setLoading(false);
    }
  }, [loading, allLoaded, skip, query]);

  // Initial load
  useEffect(() => {
    fetchProducts();
  }, [query]);

  const loadMore = useCallback(() => {
    if (!loading && !allLoaded) {
      fetchProducts();
    }
  }, [loading, allLoaded, fetchProducts]);

  const search = useCallback((text: string) => {
    setQuery(text);
    setSkip(0);
    setAllLoaded(false);
    setProducts([]);
  }, []);

  return {
    products,
    loadMore,
    allLoaded,
    loading,
    search,
    query,
  };
};
