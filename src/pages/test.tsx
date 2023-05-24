import NextLink from "next/link";
import * as React from "react";
import { Fragment, useState } from "react";
import { faX, faBagShopping } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";

import { ExProduct, Product } from "@types";
import { addProduct } from "@redux/actions"; 

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
      
    </Fragment>
  );
};

export default Test;
