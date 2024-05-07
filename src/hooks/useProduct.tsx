import { useQuery, useQueryClient } from "react-query";
import { api } from "@utils/apiRoute";
import { GET } from "@utils/fetch";
import { encode, ParsedUrlQuery } from "querystring";
import { useState } from "react";

export const useProducts = () => {
  const queryClient = useQueryClient();
  const [products, setProducts] = useState();

  async function getProducts() {
  
    const res = await queryClient.fetchQuery("get-product", () => GET(api.products));
    setProducts(res?.data?.data?.results)
  }

  async function getFilterProducts(query: ParsedUrlQuery){
    const res = await queryClient.fetchQuery("filter-product", () => GET(`${api.productByCategory}?${encode(query)}`));
  
    setProducts(res?.data?.data?.results)
  }

  // const { data } = useQuery("get-products", getProducts);
  return {
    products:  products as any,
    fetchFilterProducts: getFilterProducts,
    fetchProducts: getProducts
  };
};

export const useBestSallingProducts = () => {
  async function getBestProducts() {
    const res = await GET(api.products);
    return res.data;
  }
  const { data } = useQuery("get-best-products", getBestProducts);
  return {
    products: data?.data?.results,
  };
};

export const useProductDetail = ({id}:{id:string}) => {
  async function getProductDetail() {
    const res = await GET(`${api.productDetail}/${id}`);
    return res.data;
  }
  const { data,isLoading } = useQuery("get-product-detail", getProductDetail);
  return {
    product: data,
    isLoading: isLoading,
  };
};

