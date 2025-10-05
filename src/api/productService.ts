import api from "./index";
import { AllProductsResponse } from "./types";


export const searchProducts = async ({
  q,
  limit = 30,
  skip = 0,
}: {
  q: string;
  limit?: number;
  skip?: number;
}) => {
  const res = await api.get<AllProductsResponse>(`/products/search?q=${encodeURIComponent(q)}`);
  return res.data;
};

export const getAllProducts = async ({limit, skip}: {limit: number, skip: number}): Promise<AllProductsResponse> => {
  const response = await api.get<AllProductsResponse>(`/products?limit=${limit}&skip=${skip}`);
  return response.data;
};
