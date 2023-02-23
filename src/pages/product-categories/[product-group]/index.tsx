import { Container } from "@components/container";
import DropdownCheckbox from "@components/dropdown-checkbox";
import DropdownSelect from "@components/dropdown-select";
import ProductItem from "@components/product-item";
import { Product } from "@types";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { productFilter,  totalProducts } from "@utils/fakeData";
import {useProducts} from "@hooks/useProduct";
import { formatCurrency } from "@utils/formatNumber";

const ProductGroup = () => {
  const router = useRouter();
  const [state, setState] = useState({
    products: [] as Product[] | undefined,
    copy: [] as Product[] | undefined,
    categories: '',
    price: '',
    selection: [] as string[],
  });
  const server_link = 'http://34.163.185.96';
  const { products } = useProducts();

  // const { products, copy, price, categories, selection } = state;

  useEffect(() => {
    const productGroup = router.query['product-group'];
    const products = totalProducts?.filter((product: Product) => productGroup === product?.group);
    const copy = totalProducts?.filter((product: Product) => productGroup === product?.group);
    const selection = products?.reduce((a: any[], item) => a.concat(item?.title || ''), []);
    console.log(selection);
    setState((pre) => ({ ...pre, products, copy, selection }));
  }, [router.query]);

  const handleChange = (value: any) => {
    console.log(value);
  };

  return (
    <Container>
      <div className="flex flex-col items-center space-y-10 mx-5 my-5 ">
        <div className="w-[100%] flex justify-between mobile:flex-wrap-reverse">
          <div className="flex  space-x-5 mobile:justify-between mobile:mt-5 ">
            {/* <DropdownCheckbox
            title="Catégories"
            selections={selection}
              onChange={sortByCategory}
              products={copy}

            /> */}
          </div>
          <div className="mobile:float-right">
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
                favorites={() => console.log(item.id)}
                title={item?.name}
                price={formatCurrency(String(item.price))}
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
