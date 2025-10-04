import api from "./index";
import { AllProductsResponse } from "./types";

export const searchProducts = async (query: string): Promise<AllProductsResponse> => {
  const response = await api.get<AllProductsResponse>(`/products/search?q=${encodeURIComponent(query)}`);
  return response.data;
};

export const getAllProducts = async ({limit, skip}: {limit: number, skip: number}): Promise<AllProductsResponse> => {
  const response = await api.get<AllProductsResponse>(`/products?limit=${limit}&skip=${skip}`);
  return response.data;
};
