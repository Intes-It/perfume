import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import Rating from "@components/rating/rating";
import { useDispatch, useSelector } from "react-redux";
import { addProduct } from "@redux/actions";
import { ExProduct, Product } from "@types";
import { formatCurrency } from "@utils/formatNumber";
import useCart from "@hooks/useCart";
import useUser from "@hooks/useUser";
import React from "react";
import { GET } from "@utils/fetch";
import { api } from "@utils/apiRoute";

import useSWR from "swr";
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
  async function getCart() {
    const res = await GET(api.getCart);
    return res.data;
  }
  const { data, mutate } = useSWR("get-server-cart", getCart);
  const cart = data?.cart;
  const { addProductToCart, addExistProductToCart } = useCart();
  const { isAuthenticated } = useUser();
  const dispatch = useDispatch();
  const totalMoney = localCart?.reduce(
    (pre, curr) =>
      pre + curr.quantity * Number.parseFloat(curr?.product?.price || "0"),
    0
  );
  const totalProducts = localCart?.reduce(
    (pre, curr) => pre + curr.quantity,
    0
  );

  const handleAddProduct = async () => {
    if (isAuthenticated) {
      //check exist product

      const existProduct = localCart?.find(
        (item: any) => item?.product?.id === product?.id
      );

      let res;
      if (existProduct) {
        const data = {
          order_item_id: existProduct?.orderId,
          order_id: cart?.id || null,
          amount: existProduct.quantity + 1,
        };
        res = await addExistProductToCart(data);
        // if (res) {
        //   return await mutate("get-server-cart");
        // }
      } else {
        const data = {
          order_id: cart?.id || null,
          product_id: product?.id,
          amount: 1,
          total_amount_cart: totalProducts + 1,
          price: product?.price,
          image: product?.url_image,
          total_price_item: Number.parseFloat(product?.price || "0"),
          total_price_cart:
            Number.parseFloat(product?.price || "0") + totalMoney,
        };
        res = await addProductToCart(data);
        if (res) {
          await mutate("get-server-cart");
        }
      }
      if (res?.status === 201 || res?.status === 200) {
        dispatch(
          addProduct({
            product,
            quantity: 1,
            orderId: res?.data?.data?.id,
            price: product?.price,
            image: product?.url_image,
          })
        );
        // console.log("res:%o", res?.data?.data);
      }
    } else
      dispatch(
        addProduct({
          product,
          quantity: 1,
          image: product?.url_image,
          price: product?.price,
        })
      );
  };

  return (
    <div className="relative flex flex-col  items-center text-[16px] mb-2 bg-white">
      {showFavorite && (
        <FontAwesomeIcon
          className={`absolute top-[5%] right-[4%] mobile:top-[2%]  mobile:right-[0%] 
                  cursor-pointer hover:text-red-500 ${
                    favorite ? "text-red-500" : ""
                  } `}
          icon={favorite ? faCheck : faHeart}
          onClick={() => onFavoriteChanged?.(favorite)}
        />
      )}
      <a href={`/product/${product?.id}`}>
        <div>
          <img
            className="object-scale-down md:w-[20vw] md:h-[20vw] w-[80vw] h-[80vw]  cursor-pointer"
            // src={`${server_link}${product?.image}`}
            src={(product as any)?.url_image}
            alt="{title}"
          />
        </div>
      </a>
      <h5 className="text-[#603813] text-center">{product?.name}</h5>
      <div className="flex flex-col mt-5 items-center space-y-2">
        <Rating score={product?.evaluate || 0} />
        <p className="font-semibold">
          {formatCurrency(String(product?.price))}€
        </p>
        <div>
          {showButton && (
            <button
              onClick={handleAddProduct}
              type="submit"
              className=" p-3 text-[14.4px] font-semibold text-[#262238]  bg-[#ACD051] rounded-md shadow hover:bg-[#603813] hover:text-white"
            >
              Ajouter au panier
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
