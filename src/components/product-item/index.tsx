import NextLink from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

import Rating from '@components/rating/rating'; 

import { useDispatch, useSelector } from 'react-redux';
import {
  addFavoriteItem,
  fetchFavoriteList,
  removeFavoriteItem,
  setList,
} from '@redux/slices/favorite';
import { instance } from '@utils/_axios';
import { addProduct } from '@redux/actions';
import { Product } from '@types';
import { formatCurrency } from '@utils/formatNumber';

type ProductProps = {
  onFavoriteChanged?: (state?:boolean) => void;
  favorite?:boolean;
  showFavorite ?:boolean;
  product ?:Product;
  showButton?: boolean; 
};

const ProductItem: React.FC<ProductProps> = ({
  onFavoriteChanged,
  favorite,
  showFavorite = false,
  product,
  showButton = true
}) => { 
  const dispatch = useDispatch();
  const server_link = process.env.NEXT_PUBLIC_API_URL;
  const handleAddProduct = () => {
    dispatch(addProduct({product, quantity:1})); 
    // console.log(quantity)
  };

  return (
    <div className=" relative flex flex-col items-center text-[16px] mb-2">
      {showFavorite && <FontAwesomeIcon 
        className={`absolute top-[5%] right-[4%] mobile:top-[2%] mobile:right-[0%] 
                  cursor-pointer hover:text-red-500 ${favorite ? 'text-red-500':''} `}
        icon={favorite ? faCheck : faHeart}
        onClick={
          ()=>onFavoriteChanged?.(favorite)
        }
      />
      }
      <NextLink href={`/product/${product?.id}`}>
        <img
          className="w-[22vw] tablet:w-[32vw] mobile:w-[45vw] cursor-pointer"
          src={`${server_link}${product?.image}`}
          alt="{title}"
        />
      </NextLink>
      <h5 className="text-[#603813] text-center">{product?.name}</h5>
      <div className="flex flex-col mt-5 items-center space-y-2">
        <Rating score={product?.score || 0} />
        <p className="font-semibold">{product?.price}€</p>
        <div>
          {showButton && (
            <button
              onClick={handleAddProduct}
              type="submit"
              className=" p-3 text-[14.4px] font-semibold text-[#262238]  bg-[#ACD051] rounded-md shadow hover:bg-[#603813] hover:text-white">
                Ajouter au panier 
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
