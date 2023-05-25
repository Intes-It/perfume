import NextLink from "next/link";
import * as React from "react";
import { Fragment, useState } from "react";
import { faX, faBagShopping } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";

import { ExProduct, Product } from "@types";
import { addProduct } from "@redux/actions"; 
import { Carousel, Navbar } from "flowbite-react";

const Test: React.FC = () => {
  const dispatch = useDispatch();
  console.log('keke')
  const product: ExProduct = 
  {
    quantity: 1,
    product: {
      id: '2',
      name: 'kks'
    }
  }
  return (
    <Fragment>
      <div className="h-56 sm:h-64 xl:h-80 2xl:h-96">
  <Carousel>
    <img
      src="https://flowbite.com/docs/images/carousel/carousel-1.svg"
      alt="..."
    />
    <img
      src="https://flowbite.com/docs/images/carousel/carousel-2.svg"
      alt="..."
    />
    <img
      src="https://flowbite.com/docs/images/carousel/carousel-3.svg"
      alt="..."
    />
    <img
      src="https://flowbite.com/docs/images/carousel/carousel-4.svg"
      alt="..."
    />
    <img
      src="https://flowbite.com/docs/images/carousel/carousel-5.svg"
      alt="..."
    />
  </Carousel>
</div>
    </Fragment>
  );
};

export default Test;
