import { Container } from '@components/container';
import React from 'react';

type BlogProps = {
  image?: string;
  title?: string;
  subTitle?: string;
  date?: string;
};

const BlogComponent: React.FC<BlogProps> = ({ image, title, subTitle, date }) => {
  console.log(image);
  console.log(title);
  console.log("here");
  return (
    <Container>
      <div className="flex flex-col tablet:flex-row lg:flex-row tablet:flex-wrap justify-between mx-3 mt-20 text-[12px] text-[#6a5950]">
        <div className="tablet:w-[45vw] lg:w-[30vw] shadow-lg rounded-sm mb-5 relative hover:shadow-2xl ">
          <a href="/blog/blog1">
            <img src={image} alt="" />
          </a>
          <div className="absolute top-3 right-3 h-[26px] w-[90px]  rounded-[50px]  bg-[#818A91] text-center leading-[26px] text-[#ffffff]">
            JOURNAL
          </div>
          <div className="flex flex-col justify-between h-[80px] mx-9 my-5">
            <h3 style={{ fontSize: '21px' }}>
              <a href="/blog/blog1">{title}</a>
            </h3>
            <a className="font-semibold" href="/blog/blog1">
              {subTitle}
            </a>
          </div>
          <div className="flex items-center h-[47px] border-t  text-[#adadad]">
            <span style={{ margin: '0px 12px 0px 36px' }}>{date}</span>
            <li>Aucun commentaire</li>
          </div>
        </div>
        {/* <div className=""></div>
      <div className=""></div> */}
      </div>
    </Container>
  );
};

export default BlogComponent;
