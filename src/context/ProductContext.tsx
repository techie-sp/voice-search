import React from "react";


type ProductContextType = {
    searchRef: React.RefObject<{
        search: (query: string) => void;
        reset: () => void;
    } | null>
} | null

export const ProductContext = React.createContext<ProductContextType>(null);

export const ProductProvider = ({ children }: { children: React.ReactNode }) => {
    const searchRef = React.useRef<null | {
        search: (query: string) => void;
        reset: () => void;
    }>(null);
    return (
        <ProductContext.Provider value={{
            searchRef
        }}>
            {children}
        </ProductContext.Provider>
    )
}

export const useProductContext = () => {
    const context = React.useContext(ProductContext);
    if (!context) {
        throw new Error("useProductContext must be used within a ProductProvider");
    }
    return context;
}

