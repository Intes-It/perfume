import NextLink from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-regular-svg-icons';

import Rating from '@components/rating/rating';
import { DELETE, POST } from '@utils/fetch';
import { api } from '@utils/apiRoute';
import useFavorite from '@hooks/useFavoriteProduct';
import { useEffect, useState } from 'react';
import { faHeartbeat } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import {
  addFavoriteItem,
  fetchFavoriteList,
  removeFavoriteItem,
  setList,
} from '@redux/slices/favorite';
import { instance } from '@utils/_axios';

type ProductProps = {
  favorites: () => void;
  image?: string;
  title?: string;
  price?: string;
  id?: string;
  score?: number;
  showButton?: boolean;
};

const ProductItem: React.FC<ProductProps> = ({
  favorites,
  image,
  title,
  price,
  id,
  score,
  showButton = true,
}) => {
  const [state, setState] = useState({
    favoriteList: [] as any,
  });
  const dispatch = useDispatch();
  const { favorite } = useFavorite();
  const list = useSelector((state: any) => state.favorite.list);

  const addFavoriteProduct = () => {
    const postData = { product_id: id };
    console.log('add');
    POST(api.favouriteAdd, postData);
    dispatch(addFavoriteItem(id));
    console.log(list);
  };

  const removeFavoriteProduct = () => {
    console.log('delete');
    const postData = favorite.filter((item: any) => {
      return item.product === id;
    });
    if (postData.length !== 0) instance.delete(`${api.favouriteDelete}/${postData[0].id}`)

    const favoriteList = list
      .filter((item: any) => {
        return item !== id;
      })

    dispatch(removeFavoriteItem(favoriteList));
  };

  useEffect(() => {
    const favoriteList = favorite?.reduce((a: any[], item: any) => a.concat(item?.product), []);
    dispatch(setList(favoriteList));
    console.log(favoriteList);
  }, [favorite]);

  return (
    <div className=" relative flex flex-col items-center text-[16px] mb-2">
      <FontAwesomeIcon
        className="absolute top-[5%] right-[4%] mobile:top-[2%] mobile:right-[0%]"
        icon={list?.includes(id) ? faHeartbeat : faHeart}
        onClick={list?.includes(id) ? removeFavoriteProduct : addFavoriteProduct}
      />
      <NextLink href={`/product/${id}`}>
        <img
          className="w-[22vw] tablet:w-[32vw] mobile:w-[45vw] cursor-pointer"
          src={image}
          alt="{title}"
        />
      </NextLink>
      <h5 className="text-[#603813] text-center">{title}</h5>
      <div className="flex flex-col mt-5 items-center space-y-2">
        <Rating score={score || 0} />
        <p className="font-semibold">{price}€</p>
        <div>
          {showButton && (
            <button
              type="submit"
              className=" p-3 text-[14.4px] font-semibold text-[#262238]  bg-[#ACD051] rounded-md shadow hover:bg-[#603813] hover:text-white">
              Choix des options
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
