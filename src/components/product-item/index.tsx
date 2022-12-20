import * as React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
type ProductProps = {
  favorites: () => void;
  image: string;
  title: string;
  price: string;
};
const ProductItem: React.FC<ProductProps> = ({
  favorites,
  image,
  title,
  price,
}) => {
  return (
    <div className=" relative flex flex-col items-center text-[16px] ">
      <FontAwesomeIcon
        className="absolute top-[5%] right-[4%] mobile:top-[2%] mobile:right-[0%]"
        icon={faHeart}
        onClick={favorites}
      />
      <img
        className="w-[22vw] tablet:w-[32vw] mobile:w-[45vw]"
        src={image}
        alt=""
      />
      <h5 className="text-[#603813]">{title}</h5>
      <div className="flex flex-col mt-9 items-center space-y-2">
        <div>
          <FontAwesomeIcon className="text-yellow-400" icon={faStar} />
          <FontAwesomeIcon className="text-yellow-400" icon={faStar} />
          <FontAwesomeIcon className="text-yellow-400" icon={faStar} />
          <FontAwesomeIcon className="text-yellow-400" icon={faStar} />
          <FontAwesomeIcon className="text-yellow-400" icon={faStar} />
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
