import * as React from "react";
import NextLink from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { faStar as solidFaStar } from "@fortawesome/free-solid-svg-icons";

import { faStar as regularFaStar } from "@fortawesome/free-regular-svg-icons";
import { useMemo } from "react";

type ProductProps = {
  favorites: () => void;
  image?: string;
  title?: string;
  price?: string;
  id?: string;
  rating?: number;
};

const ProductItem: React.FC<ProductProps> = ({
  favorites,
  image,
  title,
  price,
  id,
  rating,
}) => {
  const ratingStar = useMemo(() => {
    const array = [0, 0, 0, 0, 0];
    if (!rating) return array;
    return array.map((item, index) => (index < rating ? 1 : 0));
  }, [rating]);

  return (
    <div className=" relative flex flex-col items-center text-[16px] ">
      <FontAwesomeIcon
        className="absolute top-[5%] right-[4%] mobile:top-[2%] mobile:right-[0%]"
        icon={faHeart}
        onClick={favorites}
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
        <div>
          {ratingStar?.map((star, index) =>
            star === 1 ? (
              <FontAwesomeIcon
                key={index}
                className="text-yellow-400"
                icon={solidFaStar}
              />
            ) : (
              <FontAwesomeIcon
                key={index}
                className="text-[#22222222]"
                icon={regularFaStar}
              />
            )
          )}
        </div>
        <p className="font-semibold">{price}€</p>
        <div>
          <button
            type="submit"
            className=" p-3 text-[14.4px] font-semibold text-[#262238]  bg-[#ACD051] rounded-md shadow hover:bg-[#603813] hover:text-white"
          >
            Choix des options
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
