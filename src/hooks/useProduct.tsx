import { useQuery } from "react-query";
import { api } from "@utils/apiRoute";
import { GET } from "@utils/fetch";

const useProduct = () => {
  async function getProduct() {
    const res = await GET(api.product);
    return res.data;
  }
  const { data } = useQuery("get-product", getProduct);
  return {
    product: data,
  };
};

export default useProduct;
