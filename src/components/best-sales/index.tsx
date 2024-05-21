import React, { useMemo } from "react";
import { useWindowSize } from "react-use";

import ProductItem from "@components/product-item";
import { Product } from "@types";
import { Carousel } from "flowbite-react";

type BestSalesProps = {
  products: Product[];
  showButton?: boolean;
};

export const BestSales: React.FC<BestSalesProps> = ({
  products,
  showButton = false,
}) => {
  const { width } = useWindowSize();
  const stepProductSlide = useMemo(() => (width > 740 ? 4 : 1), [width]);
 

  const productLeadGroup = products?.filter(
    (product: Product, index: number) => index % stepProductSlide == 0
  );

  return (
    <div className="right-0 bottom-0 left-0 z-[2] flex list-none justify-center p-0">
      <Carousel indicators={false}>
        {productLeadGroup?.map((product: Product, index: number) => {
          return (
            <div
              key={index}
              className={`relative float-left -mr-[100%] w-full transition-transform duration-[600ms] ease-in-out motion-reduce:transition-none`}
            >
              <div
                className={`grid md:grid-cols-4 grid-cols-1 text-center space-x-4 mx-8`}
              >
                {products
                  ?.slice(
                    index * stepProductSlide,
                    index * stepProductSlide + stepProductSlide
                  )
                  ?.map((item: Product, index2: number) => {
                    return (
                      <div
                        key={index2}
                        className="border border-gray duration-300 hover:shadow-2xl"
                      >
                        <ProductItem product={item} showButton={showButton} />
                      </div>
                    );
                  })}
              </div>
            </div>
          );
        })}
      </Carousel>
    </div>
  );
};
