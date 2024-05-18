import { api } from "@utils/apiRoute";
import { GET } from "@utils/fetch";
import { ParsedUrlQuery, encode } from "querystring";
import { useState } from "react";
import { useQuery, useQueryClient } from "react-query";

export const useProducts = () => {
  const queryClient = useQueryClient();
  const [products, setProducts] = useState(null);

  async function getProducts() {
    const res = await queryClient.fetchQuery("get-product", () =>
      GET(api.products)
    );
    setProducts(res?.data?.data?.results);
  }

  async function getFilterProducts(query: ParsedUrlQuery) {
    const res = await queryClient.fetchQuery("filter-product", () =>
      GET(`${api.productByCategory}?${encode(query)}`)
    );

    setProducts(res?.data?.data?.results);
  }

  const { isLoading } = useQuery("get-products", getProducts);

  return {
    products: products as any,
    isLoading: isLoading,
    fetchFilterProducts: getFilterProducts,
    fetchProducts: getProducts,
  };
};

export const useBestSallingProducts = () => {
  async function getBestProducts() {
    const res = await GET(api.products + "?is_best_seller=true");
    return res.data;
  }
  const { data } = useQuery("get-best-products", getBestProducts);
  return {
    products: data?.results,
  };
};

export const useProductDetail = ({ id }: { id: string }) => {
  async function getProductDetail() {
    const res = await GET(`${api.productDetail}/${id}`);
    return res.data;
  }
  const { data, isLoading } = useQuery("get-product-detail", getProductDetail);
  return {
    product: data,
    isLoading: isLoading,
  };
};
