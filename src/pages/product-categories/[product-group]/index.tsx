import { Container } from "@components/container";
import DropdownCheckbox from "@components/dropdown-checkbox";
import DropdownSelect from "@components/dropdown-select";
import ProductItem from "@components/product-item";
import { Product } from "@types";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { productFilter, productPrice, totalProducts } from "@utils/fakeData";
import useProduct from "@hooks/useProduct";

const ProductGroup = () => {
  const router = useRouter();
  const [state, setState] = useState({
    products: [] as Product[] | undefined,
    copy: [] as Product[] | undefined,
    categories: "",
    price: "",
    selection: [] as string[],
  });
  const server_link = process.env.NEXT_PUBLIC_API_URL;
  const { product } = useProduct();
 

  const { products, copy, price, categories, selection } = state;

  useEffect(() => {
    const productGroup = router.query["product-group"];
    const products = totalProducts?.filter(
      (product: Product) => productGroup === product?.group
    );
    const copy = totalProducts?.filter(
      (product: Product) => productGroup === product?.group
    );
    const selection = products?.reduce(
      (a: any[], item) => a.concat(item?.title || ""),
      []
    );
    console.log(selection);
    setState((pre) => ({ ...pre, products, copy, selection }));
  }, [router.query]);

  const handleChange = (value: any) => {
    console.log(value);
  };

  const getPrice = (value: any) => {
    if (value === price) {
      const copy = products?.filter((row) => {
        return row?.title?.toLowerCase().includes(categories.toLowerCase());
      });
      const price = "";
      setState((pre) => ({ ...pre, copy, categories, price }));
    } else {
      const copy = products?.filter((o: any) => {
        if (value === "0€ — 10€") {
          return (
            parseInt(o.price) <= 10 &&
            o?.title?.toLowerCase().includes(categories.toLowerCase())
          );
        } else if (value === "11€ — 20€") {
          return (
            parseInt(o.price) <= 20 &&
            parseInt(o.price) >= 11 &&
            o?.title?.toLowerCase().includes(categories.toLowerCase())
          );
        } else if (value === "21€ — 50€") {
          return (
            parseInt(o.price) <= 50 &&
            parseInt(o.price) >= 21 &&
            o?.title?.toLowerCase().includes(categories.toLowerCase())
          );
        }
      });
      const price = value;
      setState((pre) => ({ ...pre, copy, categories, price }));
    }
  };
  const sortByCategory = (value: any) => {
    console.log(value);
    if (value === categories) {
      if (!price) {
        const copy = products?.filter((o: any) => {
          if (value === "0€ — 10€") {
            return parseInt(o.price) <= 10;
          } else if (value === "11€ — 20€") {
            return parseInt(o.price) <= 20 && parseInt(o.price) >= 11;
          } else if (value === "21€ — 50€") {
            return parseInt(o.price) <= 50 && parseInt(o.price) >= 21;
          }
        });
        const categories = "";
        setState((pre) => ({ ...pre, copy, categories }));
      } else {
        const categories = "";
        const copy = products;
        setState((pre) => ({ ...pre, copy, categories }));
      }
    } else {
      const copy = products?.filter((row: any) => {
        if (price) {
          if (price === "0€ — 10€") {
            return row?.title
              ?.toLowerCase()
              .includes(value.toLowerCase() && parseInt(row.price) <= 10);
          } else if (price === "11€ — 20€") {
            return (
              parseInt(row.price) <= 20 &&
              parseInt(row.price) >= 11 &&
              row?.title?.toLowerCase().includes(value.toLowerCase())
            );
          } else if (price === "21€ — 50€") {
            return (
              parseInt(row.price) <= 50 &&
              parseInt(row.price) >= 21 &&
              row?.title?.toLowerCase().includes(value.toLowerCase())
            );
          }
        } else {
          return row?.title?.toLowerCase().includes(value.toLowerCase());
        }
      });
      const categories = value;
      setState((pre) => ({ ...pre, copy, categories }));
    }
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
              // selections={product?.reduce(
              //   (a: string[], item: any) => a.concat(item?.name || ""),
              //   []
              // )}
              // selections={products?.reduce((a: any[], item) => a.concat(item?.title || ''), [])}
              selections={selection}
              onChange={sortByCategory}
              products={copy}
            />
            <DropdownCheckbox
              title="Prix"
              onChange={getPrice}
              selections={productPrice}
            />
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
          {product?.map((item: Product, index: number) => (
            <div key={index}>
              <ProductItem
                favorites={() => console.log(index)}
                title={item?.name}
                price={`${item?.price},00`}
                image={`${server_link}${item?.image}`}
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
