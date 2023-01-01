import React, { useMemo } from "react";
import { useWindowSize } from "react-use";

import ProductItem from "@components/product-item";
import { Product } from "@types";

type BestSalesProps = {
  products: Product[];
};

export const BestSales: React.FC<BestSalesProps> = ({ products }) => {
  const { width } = useWindowSize();
  const stepProductSlide = useMemo(() => (width > 740 ? 4 : 1), [width]);

  return (
    <div
      id="bestSallingProductSlide"
      className="carousel carousel-dark slide relative overflow-hidden my-3"
      data-bs-ride="carousel"
    >
      <div className="carousel-inner relative w-full overflow-hidden mx-auto">
        {products?.map((product: Product, index: number) => {
          return (
            index % stepProductSlide == 0 && (
              <div
                key={index}
                className={`carousel-item ${
                  index === 0 ? "active" : ""
                } relative float-left w-full`}
              >
                <div
                  className={`grid md:grid-cols-4 grid-cols-1 text-center space-x-4 mx-8`}
                >
                  {products
                    ?.slice(index, index + stepProductSlide)
                    ?.map((item: Product, index2: number) => {
                      return (
                        <div key={index2} className="border border-gray">
                          <ProductItem
                            favorites={() => console.log(index2)}
                            title={item?.title}
                            price={item?.price}
                            image={item?.image}
                            id={item?.id}
                            rating={item?.rating}
                          />
                        </div>
                      );
                    })}
                </div>
              </div>
            )
          );
        })}
        {/* <div className="carousel-item active relative float-left w-full">
              <div className="bg-red-300 h-20"></div>
            </div>
            <div className="carousel-item relative float-left w-full">
              <div className="bg-blue-300 h-20"></div>
            </div>
            <div className="carousel-item relative float-left w-full">
              <div className="bg-green-300 h-20"></div>
            </div> */}
      </div>
      <button
        className="carousel-control-prev absolute top-0 bottom-0 left-[calc(-7.5vw_+_1rem)] flex items-center justify-center p-0 text-center border-0 hover:outline-none hover:no-underline focus:outline-none focus:no-underline"
        type="button"
        data-bs-target="#bestSallingProductSlide"
        data-bs-slide="prev"
      >
        <span
          className="carousel-control-prev-icon inline-block bg-no-repeat"
          aria-hidden="true"
        ></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next absolute top-0 bottom-0 right-[calc(-7.5vw_+_1rem)] flex items-center justify-center p-0 text-center border-0 hover:outline-none hover:no-underline focus:outline-none focus:no-underline"
        type="button"
        data-bs-target="#bestSallingProductSlide"
        data-bs-slide="next"
      >
        <span
          className="carousel-control-next-icon inline-block bg-no-repeat"
          aria-hidden="true"
        ></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
};
