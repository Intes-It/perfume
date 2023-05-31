import React, { useMemo } from "react";
import ProductItem from "@components/product-item";
import { MemberComment } from "@types";
import { Carousel } from "flowbite-react";

type FeaturedCommentsProps = {
  comments: MemberComment[];
};

export const FeaturedComments: React.FC<FeaturedCommentsProps> = ({
  comments,
}) => {
  return (
    <div className="relative w-full overflow-hidden after:clear-both after:block after:content-['']">
      <Carousel indicators={false}>
        {comments?.map((comment: MemberComment, index: number) => {
          return (
            <div
              key={index}
              className={`relative float-left -mr-[100%] w-full transition-transform duration-[600ms] ease-in-out motion-reduce:transition-none`}
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
      </Carousel>
    </div>
  );
};
