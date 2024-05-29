import { Container } from "@components/container";
import Link from "next/link";
import React from "react";

type BlogProps = {
  image?: string;
  title?: string;
  subTitle?: string;
  date?: string;
};

const BlogComponent: React.FC<BlogProps> = ({
  image,
  title,
  subTitle,
  date,
}) => {
  return (
    <Container>
      <Link href="/blog/blog1">
        <div className="flex flex-col tablet:flex-row lg:flex-row tablet:flex-wrap justify-between mx-3 mt-20 text-[12px] text-[#6a5950]">
          <div className="tablet:w-[45vw] lg:w-[30vw] shadow-lg rounded-sm mb-5 relative hover:shadow-2xl cursor-pointer">
            <img src={image} alt="" />

            <div className="absolute top-3 right-3 h-[26px] w-[90px]  rounded-[50px]  bg-[#818A91] text-center leading-[26px] text-[#ffffff]">
              Newspaper
            </div>
            <div className="flex flex-col justify-between h-[80px] mx-9 my-5 ">
              <p className="lg:text-[21px]">
                <a>{title}</a>
              </p>
              <p className="font-semibold">{subTitle}</p>
            </div>
            <div className="flex items-center h-[45px] border-t  text-[#adadad]">
              <span style={{ margin: "0px 12px 0px 36px" }}>{date}</span>
              <li>No comments</li>
            </div>
          </div>
        </div>
      </Link>
    </Container>
  );
};

export default BlogComponent;
