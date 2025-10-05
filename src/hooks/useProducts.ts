import { useState, useCallback, useEffect } from "react";
import { Product } from "../api/types";
import { getAllProducts, searchProducts } from "../api/productService";
import { ParsedQuery } from "../utils/ParseVoiceQuery";
import { logQueryNoResults, logQuerySuccess } from "../utils/analytics/FirebaseAnalytics";
import { useNetworkStatus } from "./useNetworkStatus";
import { ToastService } from "../utils/ToastService";

const LIMIT = 30;

export const useProducts = () => {
  const { isConnected } = useNetworkStatus();
  const [products, setProducts] = useState<Product[]>([]);
  const [suggestions, setSuggestions] = useState<Product[]>([]);
  const [skip, setSkip] = useState(0);
  const [loading, setLoading] = useState(false);
  const [allLoaded, setAllLoaded] = useState(false);
  const [query, setQuery] = useState<ParsedQuery | null>(null);

  const fetchProducts = useCallback(async () => {
    if (loading || (query && query.keywords)) return;

    setLoading(true);
    try {
      // 🟢 Default: Fetch all products with pagination
      const response = await getAllProducts({ limit: LIMIT, skip });
      const newProducts = response.products || [];

      setProducts((prev) =>
        skip === 0 ? newProducts : [...prev, ...newProducts]
      );

      if (skip + newProducts.length >= response.total) {
        setAllLoaded(true);
      }
      setSkip((prev) => prev + newProducts.length);
    } catch (err) {
      console.error("❌ Failed to load products", err);
      ToastService.show("Failed to load products");
    } finally {
      setLoading(false);
    }
  }, [loading, skip, query]);

  const fetchSearchResults = useCallback(async () => {
    if (!query?.keywords?.length) return;

    setLoading(true);
    try {
      // 🔥 Search for each keyword in parallel
      const responses = await Promise.all(
        query.keywords.map((key) => searchProducts({ q: key, limit: LIMIT }))
      );

      const allResults = responses.flatMap((r) => r.products || []);

      // 🧩 Group by ID to find duplicates
      const grouped: Record<number, Product[]> = {};
      allResults.forEach((p) => {
        grouped[p.id] = grouped[p.id] ? [...grouped[p.id], p] : [p];
      });

      const duplicates: Product[] = [];
      const uniques: Product[] = [];

      Object.values(grouped).forEach((group) => {
        if (group.length > 1) duplicates.push(group[0]);
        else uniques.push(group[0]);
      });
      const mainProducts = Array.from(new Map(duplicates.map((p) => [p.id, p])).values())
      setProducts(mainProducts);
      setSuggestions(Array.from(new Map(uniques.map((p) => [p.id, p])).values()));
      // 📊 Analytics logging
      if (mainProducts.length === 0) {
        logQueryNoResults(query.keywords.join(", "));
      } else {
        logQuerySuccess(query.keywords.join(", "), mainProducts.length);
      }

      setAllLoaded(true); // 🧱 disable loadMore for search
    } catch (err) {
      console.error("❌ Search failed", err);
    } finally {
      setLoading(false);
    }
  }, [query]);

  // 🔄 Handle initial load or search trigger
  useEffect(() => {
    if (!isConnected) {
      ToastService.show("No internet connection");
      return
    };
    if (query && query.keywords?.length) {
      fetchSearchResults();
    } else {
      fetchProducts();
    }
  }, [query, isConnected]);

  const loadMore = useCallback(() => {
    if (!loading && !allLoaded && !query) fetchProducts();
  }, [loading, allLoaded, query, fetchProducts]);

  const reset = useCallback(() => {
    setQuery(null);
    setSkip(0);
    setAllLoaded(false);
    setProducts([]);
    setSuggestions([]);
  }, []);

  const search = useCallback((filters: ParsedQuery, text: string) => {
    if (!text) {
      reset();
      return;
    }
    filters.keywords?.push(text);
    setQuery(filters);
    setSkip(0);
    setAllLoaded(false);
    setProducts([]);
    setSuggestions([]);

  }, []);



  return {
    products,
    suggestions,
    loadMore,   // 🔹 active only for allProducts
    allLoaded,
    loading,
    search,     // 🔹 for voice/text search
    reset,      // 🔹 reset back to all products
    query,
  };
};
