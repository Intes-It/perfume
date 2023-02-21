import { useQuery } from "react-query";
import { api } from "@utils/apiRoute";
import { GET } from "@utils/fetch";

export const useProducts = () => {
  async function getProducts() {
    const res = await GET(api.products);
    return res.data;
  }
  const { data } = useQuery("get-products", getProducts);
  return {
    products: data?.data?.results,
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
  const { data } = useQuery("get-product-detail", getProductDetail);
  return {
    product: data,
  };
};

