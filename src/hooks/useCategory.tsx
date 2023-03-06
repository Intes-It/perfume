import { useQuery } from "react-query";
import { api } from "@utils/apiRoute";
import { GET } from "@utils/fetch";

export const useCategory = () => {
  async function getCategory() {
    const res = await GET(api.category);
    return res.data;
  }
  const { data } = useQuery("get-category", getCategory);
  return {
    categories: data,
  };
};

export const useAllCategory = () => {
  async function getAllCategory() {
    const res = await GET(api.getAllCategory);
    return res.data;
  }
  const { data } = useQuery("get-all-category", getAllCategory);
  return {
    categories: data?.category,
    subCategories: data?.sub_category_serializer,
    subsubCategories: data?.sub_sub_category_serializer,
  };
};
