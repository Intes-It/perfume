import { Container } from "@components/container";
import * as React from "react";

const Blog = () => {
  return (
    <Container>
      <div className="flex justify-between mx-3 mt-20 text-[12px] text-[#6a5950]">
        <div className="w-3/10 shadow-lg rounded-sm relative hover:shadow-2xl ">
          <a href="/blog/blog1">
            <img
              style={{
                width: '30vw',
                height: '30vw',
                borderRadius: '3px 3px 0 0',
              }}
              src={'/images/blog.webp'}
              alt=""
            />
          </a>
          <div className="absolute top-3 right-3 h-[26px] w-[90px]  rounded-[50px]  bg-[#818A91] text-center leading-[26px] text-[#ffffff]">JOURNAL</div>
          <div className="flex flex-col justify-between h-[80px] mx-9 my-5" >
            <h3 style={{ fontSize: '21px' }}>
              <a href="/blog/blog1">Le Comptoir D’Alinea</a>
            </h3>
            <a className="font-semibold" href="/blog/blog1">
              LIRE LA SUITE »
            </a>
          </div>
          <div className="flex items-center h-[47px] border-t  text-[#adadad]">
            <span style={{ margin:'0px 12px 0px 36px' }}>septembre 15, 2021</span>
            <li>Aucun commentaire</li>
          </div>
        </div>
        <div className=""></div>
        <div className=""></div>
      </div>
    </Container>
  );
};

export default Blog;
