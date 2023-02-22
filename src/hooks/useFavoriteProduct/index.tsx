import { api } from '@utils/apiRoute';
import { GET } from '@utils/fetch';
import React from 'react';
import { useQuery } from 'react-query';

const useFavorite = () => {
  async function getFavoriteProduct() {
    const res = await GET(api.favourite);
    return res.data;
  }
  const { data } = useQuery('get-favorite', getFavoriteProduct);

  return {
    favorite: data,
  };
};

export default useFavorite;
