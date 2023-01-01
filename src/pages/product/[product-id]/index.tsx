import { Container } from "@components/container";
import ProductItem from "@components/product-item";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { totalProducts } from "@utils/fakeData";
import { faStar as solidFaStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as regularFaStar } from "@fortawesome/free-regular-svg-icons";

import { useRouter } from "next/router";
import React, { useMemo } from "react";

const ProductDetail: React.FC = () => {
  const router = useRouter();
  const product = useMemo(() => {
    const productId = router.query["product-id"];
    return totalProducts?.find((item) => item?.id === productId) || null;
  }, [router.query]);

  const ratingStar = useMemo(() => {
    const array = [0, 0, 0, 0, 0];
    if (!product?.rating) return array;
    return array.map((item, index) => (index < (product?.rating || 0) ? 1 : 0));
  }, [product]);

  const setShowModal = (isOpen: boolean) => {console.log(isOpen)};

  return (
    <Container>
      <div className="grid md:grid-cols-2 grid-cols-1 gap-4 md:m-20 m-8">
        {/* product image */}
        <div className="overflow-clip relative">
          <img
            className="hover:scale-150 transition duration-100 w-full md:h-[40vw] object-cover"
            src={product?.image}
            alt={product?.title}
          />
          <button className="absolute right-0 top-0 bg-white rounded-full w-[2.2rem] h-[2.2rem]">
            <FontAwesomeIcon
              onClick={() => setShowModal(true)}
              icon={faSearch}
              fontSize={"1.1rem"}
            />
          </button>
        </div>

        {/* product info */}
        <div className="">
          <div>
            <span className="text-[#383e42] text-[30px]">{product?.title}</span>
          </div>
          <div className="my-3">
            <span className="text-[#603913]">{product?.shortDescription}</span>
          </div>
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
          <div>
          <span className="text-[#383e42] text-[24px] font-semibold">{`${product?.price} €`}</span>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ProductDetail;
