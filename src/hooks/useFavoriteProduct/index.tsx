import { api } from '@utils/apiRoute';
import { GET } from '@utils/fetch';
import { useQuery } from 'react-query';

const useFavorite = () => {
  async function getFavoriteProduct() {
    const res = await GET(api.favouriteList);
    return res.data;
  }
  const { data } = useQuery('get-favorite', getFavoriteProduct);

  return {
    favorite: data,
  };
};

export default useFavorite;
