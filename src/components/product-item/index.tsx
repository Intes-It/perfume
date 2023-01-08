import * as React from "react";
import NextLink from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-regular-svg-icons";

import Rating from "@components/rating/rating";

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
  return (
    <div className=" relative flex flex-col items-center text-[16px] mb-2">
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
        <Rating score={score || 0} />
        <p className="font-semibold">{price}€</p>
        <div>
          {showButton && (
            <button
              type="submit"
              className=" p-3 text-[14.4px] font-semibold text-[#262238]  bg-[#ACD051] rounded-md shadow hover:bg-[#603813] hover:text-white"
            >
              Choix des options
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
