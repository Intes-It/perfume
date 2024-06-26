import Rating from "@components/rating/rating";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { addProduct } from "@redux/actions";
import { Product } from "@types";
import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { addFavoriteItem, removeFavoriteItem } from "@redux/slices/favorite";
import { showToast } from "@redux/slices/toast/toastSlice";
import { api } from "@utils/apiRoute";
import { DELETE, POST } from "@utils/fetch";
import { getCookie } from "cookies-next";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import useSWR from "swr";

type ProductProps = {
  onFavoriteChanged?: (state?: boolean) => void;
  favorite?: boolean;
  showFavorite?: boolean;
  product: Product;
  showButton?: boolean;
};

const ProductItem: React.FC<ProductProps> = ({
  showFavorite = false,
  product,
  showButton = true,
}) => {
  const { mutate } = useSWR("get-server-cart");

  const dispatch = useDispatch();

  const [newProduct, setNewProduct] = useState<Product>(product);
  const route = useRouter();

  const token = getCookie("access_token");

  const handleAddProduct = async () => {
    if (
      (product?.package?.length > 0 ||
        product?.color?.length > 0 ||
        product?.capacity?.length > 0) &&
      product?.id
    ) {
      route.push(`/product/${product.id}`);
      return;
    }

    if (!token) {
      route.push(`/my-account?before=${route.asPath}`);
      return;
    }

    try {
      //check exist product
      const payload = {
        data: [
          {
            product_id: product?.id,
            quantity: 1,
          },
        ],
      };

      const res = await POST(api.addProduct, payload);

      if (res?.status === 201 || res?.status === 200) {
        dispatch(addProduct(res.data));
        await mutate("get-server-cart");
        dispatch(showToast({ message: "Add successfully!", error: false }));
      } else {
        dispatch(showToast({ message: res?.data?.message, error: true }));
      }
    } catch (error: any) {
      dispatch(showToast({ message: "Something went wrong!", error: true }));
      console.log("error", error);
    }
  };

  const handleAddFavorite = async () => {
    try {
      const res = await POST(api.add_favourite, { product_id: product?.id });
      if (res.status === 200 || res.status === 201) {
        dispatch(addFavoriteItem({ ...product, is_favourite: true }));
        dispatch(
          showToast({ message: "Add to favorite successfully!", error: false })
        );
        setNewProduct({ ...newProduct, is_favourite: true });
      } else {
        dispatch(
          showToast({ message: "Please login to add favorite !", error: true })
        );
      }
    } catch (error) {
      console.log("error", error);
      dispatch(showToast({ message: "Something went wrong!", error: true }));
    }
  };

  const handleRemoveFavorite = async () => {
    try {
      const res = await DELETE(
        api.remove_favourite + `?product_id=${product.id}`
      );
      if (res.status === 200 || res.status === 204) {
        dispatch(removeFavoriteItem({ ...product, is_favourite: false }));
        dispatch(showToast({ message: "Remove successfully!", error: false }));
        setNewProduct({ ...product, is_favourite: false });
      } else {
        dispatch(
          showToast({
            message: "Please login to remove favorite !",
            error: true,
          })
        );
      }
    } catch (error) {
      console.log("error", error);
      dispatch(showToast({ message: "Something went wrong!", error: true }));
    }
  };

  const handleChangeFavorite = () => {
    !newProduct.is_favourite ? handleAddFavorite() : handleRemoveFavorite();
  };

  return (
    <div className="relative flex flex-col  items-center text-[16px] mb-2 bg-white">
      {showFavorite && (
        <FontAwesomeIcon
          className={`absolute top-[5%] z-50 right-[4%] mobile:top-[2%]  mobile:right-[0%] 
                  cursor-pointer hover:text-red-500 ${
                    newProduct?.is_favourite ? "text-red-500" : ""
                  } `}
          icon={newProduct?.is_favourite ? faCheck : faHeart}
          onClick={handleChangeFavorite}
        />
      )}
      <Link href={`/product/${product?.id}`}>
        <div>
          <Image
            className="object-scale-down md:w-[20vw] md:h-[20vw] w-[80vw] h-[80vw]  cursor-pointer"
            // src={`${server_link}${product?.image}`}
            src={
              product?.thumbnail?.url ||
              (product?.images?.length > 0 && product?.images[0]?.url)
            }
            alt="{title}"
            width={400}
            height={400}
          />
        </div>
      </Link>
      <h5 className="text-[#603813] text-center">{product?.name}</h5>
      <div className="flex flex-col items-center mt-5 space-y-2">
        <Rating score={product?.rating || 0} />
        <p className="font-semibold">{Number(product?.price).toFixed(2)}$</p>
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
