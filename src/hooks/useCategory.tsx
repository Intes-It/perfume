import { useQuery } from "react-query";
import { api } from "@utils/apiRoute";
import { GET } from "@utils/fetch";

const useCategory = () => {
  async function getCategory() {
    const res = await GET(api.category);
    return res.data;
  }
  const { data } = useQuery("get-category", getCategory);
  return {
    category: data,
  };
};

export default useCategory;
