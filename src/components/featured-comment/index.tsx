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
      className="relative"
      data-te-carousel-init
      data-te-carousel-slide
    >
      <div
        className="absolute right-0 bottom-0 left-0 z-[2] mx-[15%] mb-4 flex list-none justify-center p-0"
        data-te-carousel-indicators
      >
        <button
          type="button"
          data-te-target="#featuredCommentsSlide"
          data-te-slide-to="0"
          data-te-carousel-active
          className="mx-[3px] box-content h-[3px] w-[30px] flex-initial cursor-pointer border-0 border-y-[10px] border-solid border-transparent bg-white bg-clip-padding p-0 -indent-[999px] opacity-50 transition-opacity duration-[600ms] ease-[cubic-bezier(0.25,0.1,0.25,1.0)] motion-reduce:transition-none"
          aria-current="true"
          aria-label="Slide 1"
        ></button>
        <button
          type="button"
          data-te-target="#featuredCommentsSlide"
          data-te-slide-to="1"
          className="mx-[3px] box-content h-[3px] w-[30px] flex-initial cursor-pointer border-0 border-y-[10px] border-solid border-transparent bg-white bg-clip-padding p-0 -indent-[999px] opacity-50 transition-opacity duration-[600ms] ease-[cubic-bezier(0.25,0.1,0.25,1.0)] motion-reduce:transition-none"
          aria-label="Slide 2"
        ></button>
        <button
          type="button"
          data-te-target="#featuredCommentsSlide"
          data-te-slide-to="2"
          className="mx-[3px] box-content h-[3px] w-[30px] flex-initial cursor-pointer border-0 border-y-[10px] border-solid border-transparent bg-white bg-clip-padding p-0 -indent-[999px] opacity-50 transition-opacity duration-[600ms] ease-[cubic-bezier(0.25,0.1,0.25,1.0)] motion-reduce:transition-none"
          aria-label="Slide 3"
        ></button>
      </div>
      <div className="relative w-full overflow-hidden after:clear-both after:block after:content-['']">
        {comments?.map((comment: MemberComment, index: number) => {
          const active = index === 0 ? true : undefined;
          const hidden = index !== 0;
          return (
            <div
              key={index}
              className={`relative ${
                hidden && "hidden"
              } float-left -mr-[100%] w-full transition-transform duration-[600ms] ease-in-out motion-reduce:transition-none`}
              data-te-carousel-item
              data-te-carousel-active={active}
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
      </div>
      <button
        className="absolute top-0 bottom-0 left-0 z-[1] flex w-[15%] items-center justify-center border-0 bg-none p-0 text-center text-gray-500 opacity-50 transition-opacity duration-150 ease-[cubic-bezier(0.25,0.1,0.25,1.0)] hover:text-gray-600 hover:no-underline hover:opacity-90 hover:outline-none focus:text-gray-400 focus:no-underline focus:opacity-90 focus:outline-none motion-reduce:transition-none"
        type="button"
        data-te-target="#featuredCommentsSlide"
        data-te-slide="prev"
      >
        <span className="inline-block h-8 w-8">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5L8.25 12l7.5-7.5"
            />
          </svg>
        </span>
        <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
          Previous
        </span>
      </button>
      <button
        className="absolute top-0 bottom-0 right-0 z-[1] flex w-[15%] items-center justify-center border-0 bg-none p-0 text-center text-gray-500 opacity-50 transition-opacity duration-150 ease-[cubic-bezier(0.25,0.1,0.25,1.0)] hover:text-gray-600 hover:no-underline hover:opacity-90 hover:outline-none focus:text-gray-400 focus:no-underline focus:opacity-90 focus:outline-none motion-reduce:transition-none"
        type="button"
        data-te-target="#featuredCommentsSlide"
        data-te-slide="next"
      >
        <span className="inline-block h-8 w-8">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.25 4.5l7.5 7.5-7.5 7.5"
            />
          </svg>
        </span>
        <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
          Next
        </span>
      </button>
    </div>
 
  );
};
