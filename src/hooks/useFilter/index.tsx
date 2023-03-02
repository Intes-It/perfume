import { api } from '@utils/apiRoute';
import { GET } from '@utils/fetch';
import { instance } from '@utils/_axios';
import { encode, ParsedUrlQuery,  } from 'querystring';
import { useQuery } from 'react-query';


export const useCategory = () => {
  async function getListCategory() {
    const res = await GET(api.category);
    return res.data;
  }
  const { data } = useQuery('get-best-products', getListCategory);
  return {
    categoryList: data,
  };
};

export const getProduct = async (query: ParsedUrlQuery) => {
  const res = await instance.get(`${api.productByCategory}?${encode(query)}`);
  return res.data;
};

export default useCategory;
