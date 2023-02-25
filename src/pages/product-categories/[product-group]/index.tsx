import { Container } from "@components/container";
import DropdownCheckbox from "@components/dropdown-checkbox";
import DropdownSelect from "@components/dropdown-select";
import ProductItem from "@components/product-item";
import { Product } from "@types";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { productFilter, totalProducts } from "@utils/fakeData";
import { useProducts } from "@hooks/useProduct";
import { formatCurrency } from "@utils/formatNumber";
import { addFavoriteItem, removeFavoriteItem } from "@redux/slices/favorite";
import { useDispatch, useSelector } from "react-redux";

const ProductGroup = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [state, setState] = useState({
    filterProducts: [] as Product[] | undefined,
    copy: [] as Product[] | undefined,
    categories: "",
    price: "",
    selection: [] as string[],
  });
  const server_link = process.env.NEXT_PUBLIC_API_URL;
  const { products } = useProducts();

  const favoriteProducts = useSelector(
    (state: any) => state.persistedReducer?.favorite?.list
  ) as Product[];
  const { filterProducts, copy, price, categories, selection } = state;

  useEffect(() => {
    const productGroup = router.query["product-group"];
    // const products = totalProducts?.filter((product: Product) => productGroup === product?.group);
    // const copy = totalProducts?.filter((product: Product) => productGroup === product?.group);
    // const selection = products?.reduce((a: any[], item) => a.concat(item?.title || ''), []);
    // console.log(selection);
    const filterProducts = products?.map((product: Product) => ({
      ...product,
    }));

    filterProducts?.forEach((item: Product) => {
      const existItem = favoriteProducts?.find(
        (itemFavorite) => itemFavorite.id === item.id
      );
      if (existItem) item.favorite = true;
      else item.favorite = false;
    });

    setState((pre) => ({ ...pre, filterProducts, copy, selection }));
  }, [router.query, products, favoriteProducts]);

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
          {filterProducts?.map((item: Product, index: number) => (
            <div key={index}>
              <ProductItem
                onFavoriteChanged={(state) => {
                  if (state) dispatch(removeFavoriteItem(item));
                  else dispatch(addFavoriteItem(item));
                }}
                favorite={item?.favorite}
                showFavorite={true}
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
