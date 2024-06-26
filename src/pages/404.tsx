import { Container } from "@components/container";
import * as React from "react";

const ErrorPage = () => {
  return (
    <Container>
      <div className="flex flex-col items-center justify-between text-center h-[220px] mt-[100px]">
        <div className="text-[#6A5950] text-[30px]">
          This page does not appear to exist.
        </div>
        <div className="text-[#603813] text-[24px] lg:w-[900px] font-semibold">
          It seems the link pointing here is broken. What if you tried rather to
          search?
        </div>
        <div className="relative">
          <input
            type="text"
            className="form input px-4 py-4 w-[370px] border border-gray-300 bg-[#FAFAFA] focus:outline-none"
            placeholder="Rechercher..."
          />
          <button type="submit" className="absolute right-0 top-0 ">
            <svg
              className="text-gray-600 h-4 w-4 m-5 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              version="1.1"
              id="Capa_1"
              x="0px"
              y="0px"
              viewBox="0 0 56.966 56.966"
              width="512px"
              height="512px"
            >
              <path d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z" />
            </svg>
          </button>
        </div>
      </div>
    </Container>
  );
};

export default ErrorPage;
