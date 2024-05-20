import Rating from "@components/rating/rating";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useCart from "@hooks/useCart";
import { addProduct } from "@redux/actions";
import { ExProduct, Product } from "@types";
import { formatCurrency } from "@utils/formatNumber";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { showToast } from "@redux/slices/toast/toastSlice";
import Link from "next/link";
import { useRouter } from "next/router";
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

  const { mutate } = useSWR("get-server-cart");
  const { addProductToCart } = useCart();
  const dispatch = useDispatch();
  const totalMoney = localCart?.reduce(
    (pre, curr) =>
      pre + curr.amount * Number.parseFloat(curr?.product?.price || "0"),
    0
  );

  const route = useRouter();

  const handleAddProduct = async () => {
    if (
      (product?.packaging && Object.values(product?.packaging)?.length > 0) ||
      (product?.color && Object.values(product?.color)?.length > 0) ||
      (product?.capacity && Object.values(product?.capacity)?.length > 0)
    ) {
      route.push(`/product/${product.id}`);
      return;
    }

    try {
      //check exist product
      const payload = {
        product_id: product?.id,
      };

      const res = await addProductToCart(payload);

      if (res?.status === 201 || res?.status === 200) {
        dispatch(
          addProduct({
            ...res.data,
          })
        );
        await mutate("get-server-cart");
        dispatch(showToast({ message: "Add successfully!", error: false }));
      } else {
        route.push("/my-account");
      }
    } catch (error) {
      dispatch(showToast({ message: "Something went wrong!", error: true }));
      console.log("error", error);
    }
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
      <Link href={`/product/${product?.id}`}>
        <div>
          <img
            className="object-scale-down md:w-[20vw] md:h-[20vw] w-[80vw] h-[80vw]  cursor-pointer"
            // src={`${server_link}${product?.image}`}
            src={product?.thumbnail?.url}
            alt="{title}"
          />
        </div>
      </Link>
      <h5 className="text-[#603813] text-center">{product?.name}</h5>
      <div className="flex flex-col items-center mt-5 space-y-2">
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
              Add To Cart
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
