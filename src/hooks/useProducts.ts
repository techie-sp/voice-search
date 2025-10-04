import { useState, useCallback } from "react";
import { Product } from "../api/types";
import { getAllProducts } from "../api/productService";

const LIMIT = 30; 

export const useProducts = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [skip, setSkip] = useState(0);
    const [loading, setLoading] = useState(false);
    const [allLoaded, setAllLoaded] = useState(false);

    const loadMore = useCallback(async () => {
        if (loading || allLoaded) return;

        setLoading(true);
        try {
            const response = await getAllProducts({ limit: LIMIT, skip });

            const newProducts = response.products;
            setProducts(prev => [...prev, ...newProducts]);
            setSkip(prev => prev + newProducts.length);

            if (skip + newProducts.length >= response.total) {
                setAllLoaded(true);
            }
        } catch (err) {
            console.error("Failed to load products", err);
        } finally {
            setLoading(false);
        }
    }, [loading, allLoaded, skip]);

    return { products, loadMore, allLoaded };
};
