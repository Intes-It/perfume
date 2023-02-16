import { Container } from "@components/container";
import DropdownCheckbox from "@components/dropdown-checkbox";
import DropdownSelect from "@components/dropdown-select";
import ProductItem from "@components/product-item";
import { Product } from "@types";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {
  productFilter, 
  productPrice,
  totalProducts,
} from "@utils/fakeData";

const ProductGroup = () => {
  const router = useRouter();
  const [state, setState] = useState({
    products: [] as Product[] | undefined,
  });

  const { products } = state;
  console.log(router.query);
  useEffect(() => {
    const productGroup = router.query["product-group"];
    const productSubgroup = router.query["product-subgroup"];
    const products = totalProducts?.filter(
      (product: Product) =>
        productGroup === product?.group && productSubgroup === product?.subGroup
    );
    setState((pre) => ({ ...pre, products }));
  }, [router.query]);

  const handleChange = (value: any) => {
    console.log(value);
  };

  return (
    <Container>
      <div className="flex flex-col items-center space-y-10 mx-5 my-5 ">
        {/* <p className="text-[17px] text-[#383E42] text-center">
          Des cosmétiques naturels solides fabriqués artisanalement en Provence
          avec des ingrédients majoritairement locaux.
        </p> */}
        <div className="w-[100%] flex justify-between mobile:flex-wrap-reverse">
          <div className="flex  space-x-5 mobile:justify-between mobile:mt-5 ">
            <DropdownCheckbox
              title="Catégories"
              selections={products?.reduce(
                (a: string[], item) => a.concat(item?.title || ""),
                []
              )}
              onChange={handleChange}

            />
              
            <DropdownCheckbox title="Prix" selections={productPrice} onChange={handleChange} />
          </div>
          <div className="mobile:float-right">
            {" "}
            <DropdownSelect
              selections={productFilter}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="grid grid-cols-4 grid-flow-row gap-10 tablet:grid-cols-3 mobile:grid-cols-2">
          {products?.map((item: Product, index: number) => (
            <div key={index}>
              <ProductItem
                favorites={() => console.log(index)}
                title={item?.title}
                price={item?.price}
                image={item?.image}
                id={item?.id}
                score={item?.score}
              />
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
};

export default ProductGroup;
