import React, { useMemo } from "react";
import ProductItem from "@components/product-item";
import { MemberComment } from "@types";

type FeaturedCommentsProps = {
  comments: MemberComment[];
};

export const FeaturedComments: React.FC<FeaturedCommentsProps> = ({
  comments,
}) => {
  return (
    <div
      id="featuredCommentsSlide"
      className="carousel carousel-dark slide relative overflow-hidden my-3"
      data-bs-ride="carousel"
    >
      <div className="carousel-inner relative w-full overflow-hidden mx-auto">
        {comments?.map((comment: MemberComment, index: number) => {
          return (
            <div
              key={index}
              className={`carousel-item ${
                index === 0 ? "active" : ""
              } relative float-left w-full`}
            >
              <div className="text-center mobile:mx-[10vw] mx-[6vw]">
                <div>
                    <span className="text-[#603113] text-[20px] mobile:text-[14px] italic">
                    {comment?.text}
                    </span>
                </div>
                <div className="mt-6">
                    <span className="text-[#603113] text-[20px] mobile:text-[14px]">
                    {comment?.member}
                    </span>
                </div> 
              </div> 
            </div>
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
        className="carousel-control-prev absolute top-0 bottom-0 left-0 flex items-center justify-center p-0 text-center border-0 hover:outline-none hover:no-underline focus:outline-none focus:no-underline"
        type="button"
        data-bs-target="#featuredCommentsSlide"
        data-bs-slide="prev"
      >
        <span
          className="carousel-control-prev-icon inline-block bg-no-repeat"
          aria-hidden="true"
        ></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next absolute top-0 bottom-0 right-0 flex items-center justify-center p-0 text-center border-0 hover:outline-none hover:no-underline focus:outline-none focus:no-underline"
        type="button"
        data-bs-target="#featuredCommentsSlide"
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
