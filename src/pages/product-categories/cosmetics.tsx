import { Container } from "@components/container";
import * as React from "react";
import { useState } from "react";
import DropdownCheckbox from "@components/dropdown-checkbox";
import ProductItem from "@components/product-item";
import { productItem } from "src/utils/fakeData";
const Consmetics = () => {
  return (
    <Container>
      <div className="flex flex-col items-center space-y-10 mx-2 my-5 ">
        <p className="text-[17px] text-[#383E42]">
          Des cosmétiques naturels solides fabriqués artisanalement en Provence
          avec des ingrédients majoritairement locaux.
        </p>
        <div className="w-[100%] flex justify-between">
          <div className="flex  space-x-5">
            <DropdownCheckbox />
            <DropdownCheckbox />
          </div>
          <DropdownCheckbox />
        </div>
        <div className="grid grid-cols-4 grid-flow-row gap-12">
          {productItem?.map((item:any, index:number) => 
          
          <div key={index}>
<ProductItem
          favorites={()=>console.log('Favorites')}
          title={item.title}
          price={item.price}
          image={item.image}
          />

          </div>
          )}
        </div>
      </div>
    </Container>
  );
};

export default Consmetics;
