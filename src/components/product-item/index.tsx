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
import { ExProduct, Product } from '@types';
import { formatCurrency } from '@utils/formatNumber';
import useCart from '@hooks/useCart';
import useUser from '@hooks/useUser';

type ProductProps = {
  onFavoriteChanged?: (state?: boolean) => void;
  favorite?: boolean;
  showFavorite?: boolean;
  product?: Product;
  showButton?: boolean;
};

const ProductItem: React.FC<ProductProps> = ({
  onFavoriteChanged,
  favorite,
  showFavorite = false,
  product,
  showButton = true,
}) => {
  const localCart = useSelector(
    (state: any) => state.persistedReducer?.cart?.products
  ) as ExProduct[];

  const { addProductToCart, addExistProductToCart, cart } = useCart();
  const { isAuthenticated } = useUser();
  const dispatch = useDispatch();
  const server_link = process.env.NEXT_PUBLIC_API_URL;
  const totalMoney = localCart?.reduce(
    (pre, curr) => pre + curr.quantity * Number.parseFloat(curr?.product?.price || '0'),
    0
  );
  const totalProducts = localCart?.reduce((pre, curr) => pre + curr.quantity, 0);
  
  const handleAddProduct = async () => {
    if (isAuthenticated) {
       
      //check exist product 
      const existProduct = localCart?.find((item: any) => item?.product?.id === product?.id);
      let res;
      if (existProduct) {
        const data = {
          order_item_id : existProduct?.orderId,
          order_id : cart?.data?.cart?.id || null,
          amount : 1,
          total_amount: totalProducts + 1,
          total_price: Number.parseFloat(existProduct?.product?.price || '0') + totalMoney
        } 
        res = await addExistProductToCart(data)
      }
      else
      {
        const data = {
          order_id: cart?.data?.cart?.id || null,
          product_id: product?.id,
          amount: 1,
          total_amount_cart: totalProducts + 1,
          price: product?.price,
          total_price_item: Number.parseFloat(product?.price || '0'),
          total_price_cart: Number.parseFloat(product?.price || '0') + totalMoney,
        }
        res = await addProductToCart(data)
      }
      console.log('res:%o', res)
      if (res?.status === 201 || res?.status === 200 )
      { 
        dispatch(addProduct({ product, quantity: 1, orderId: res?.data?.data?.id }));
      }
    }
    else
      dispatch(addProduct({ product, quantity: 1 }));
  };

  return (
    <div className=" relative flex flex-col items-center text-[16px] mb-2">
      {showFavorite && (
        <FontAwesomeIcon
          className={`absolute top-[5%] right-[4%] mobile:top-[2%] mobile:right-[0%] 
                  cursor-pointer hover:text-red-500 ${favorite ? 'text-red-500' : ''} `}
          icon={favorite ? faCheck : faHeart}
          onClick={() => onFavoriteChanged?.(favorite)}
        />
      )}
      <NextLink href={`/product/${product?.id}`}>
        <img
          className="w-[22vw] tablet:w-[32vw] mobile:w-[45vw] cursor-pointer"
          // src={`${server_link}${product?.image}`}
          src={(product as any)?.url_image}
          alt="{title}"
        />
      </NextLink>
      <h5 className="text-[#603813] text-center">{product?.name}</h5>
      <div className="flex flex-col mt-5 items-center space-y-2">
        <Rating score={product?.evaluate || 0} />
        <p className="font-semibold">{formatCurrency(String(product?.price))}€</p>
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
