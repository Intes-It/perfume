import { Container } from "@components/container";
import * as React from "react";
import { useEffect, useState } from "react";
import DropdownCheckbox from "@components/dropdown-checkbox";
import ProductItem from "@components/product-item";
import { productItem, productPrice, productFilter } from "src/utils/fakeData";
import DropdownSelect from "@components/dropdown-select";

const Consmetics = () => {
  const defaultData: any = productItem;
  const [data, setData] = useState(defaultData);
  useEffect(() => {
    console.log(1);
  }, [data]);
  const handleChange = (value: any) => {
    switch (value) {
      case (value = "Alphabétique (A à Z)"):
        setData(
          defaultData.sort(function (a: any, b: any) {
            if (a?.title?.toLowerCase() < b?.title?.toLowerCase()) {
              return -1;
            }
            if (a?.title?.toLowerCase() > b?.title?.toLowerCase()) {
              return 1;
            }
            return 0;
          })
        );
        console?.log(data);
        //filter data here
        break;
      case (value = "Alphabétique (Z à A)"):
        setData(
          defaultData?.sort(function (a: any, b: any) {
            if (a?.title?.toLowerCase() > b?.title?.toLowerCase()) {
              return -1;
            }
            if (a?.title?.toLowerCase() < b?.title?.toLowerCase()) {
              return 1;
            }
            return 0;
          })
        );
        console?.log(data);
        break;
      case (value = "Prix Croissant"):
        setData(
          defaultData?.sort(function (a: any, b: any) {
            return parseInt(a?.price) - parseInt(b?.price);
          })
        );
        console?.log(data);

        break;
      case (value = "Prix Décroissant"):
        setData(
          defaultData?.sort(function (a: any, b: any) {
            return parseInt(b?.price) - parseInt(a?.price);
          })
        );
        console?.log(data);
        break;

      case (value = "Notes Moyennes"):
        setData(
          defaultData?.sort(function (a: any, b: any) {
            return parseInt(b?.score) - parseInt(a?.score);
          })
        );
        console?.log(data);
        break;

      case (value = "Nombres D'avis"):
        setData(
          defaultData?.sort(function (a: any, b: any) {
            return parseInt(b?.vote) - parseInt(a?.vote);
          })
        );
        console?.log(data);
        break;

      default:
        setData(productItem);
        console?.log(data);
        break;
    }
  };
  return (
    <Container>
      <div className="flex flex-col items-center space-y-10 mx-5 my-5 ">
        <p className="text-[17px] text-[#383E42] text-center">
          Des cosmétiques naturels solides fabriqués artisanalement en Provence
          avec des ingrédients majoritairement locaux.
        </p>
        <div className="w-[100%] flex justify-between mobile:flex-wrap-reverse">
          <div className="flex  space-x-5 mobile:justify-between mobile:mt-5 ">
            <DropdownCheckbox
              title="Catégories"
              selections={productItem?.reduce(
                (a: string[], item) => a.concat(item.title || ""),
                []
              )}
            />
            <DropdownCheckbox title="Prix" selections={productPrice} />
          </div>
          {/* <App/> */}
          <div className="mobile:float-right">
            {" "}
            <DropdownSelect
              selections={productFilter}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="grid grid-cols-4 grid-flow-row gap-10 tablet:grid-cols-3 mobile:grid-cols-2">
          {data?.map((item: any, index: number) => (
            <div key={index}>
              <ProductItem
                favorites={() => console.log(index)}
                title={item.title}
                price={item.price}
                image={item.image}
                id={item?.id}
              />
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
};

export default Consmetics;
