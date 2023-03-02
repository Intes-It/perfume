import { Container } from '@components/container';
import DropdownCheckbox from '@components/dropdown-checkbox';
import DropdownSelect from '@components/dropdown-select';
import ProductItem from '@components/product-item';
import { Product } from '@types';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { productFilter, productPrice } from '@utils/fakeData';
import { useProducts } from '@hooks/useProduct';
import { addFavoriteItem, removeFavoriteItem } from '@redux/slices/favorite';
import { useDispatch, useSelector } from 'react-redux';
import useCategory, { getProduct } from '@hooks/useFilter';

const ProductGroup = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [state, setState] = useState({
    filterProducts: [] as Product[] | undefined,
    copy: [] as Product[] | undefined,
    categories: '',
    price: '',
    selection: [] as string[],
  });
  const server_link = process.env.NEXT_PUBLIC_API_URL;
  const { products } = useProducts();
  const { categoryList } = useCategory();

  const favoriteProducts = useSelector(
    (state: any) => state.persistedReducer?.favorite?.list
  ) as Product[];
  const { filterProducts, copy, price, categories, selection } = state;

  useEffect(() => {
    const id = categoryList?.find((item: any) => {
      return router.query['product-group']?.includes(item.name.toLowerCase().slice(0, 3));
    });
    if (id) {
      getProduct({ category: id?.id }).then((response: any) => {
        response.data.results.forEach((item: Product) => {
          const existItem = favoriteProducts?.find((itemFavorite) => itemFavorite.id === item.id);
          if (existItem) item.favorite = true;
          else item.favorite = false;
        });
        setState((o) => ({
          ...o,
          filterProducts: response.data.results,
        }));
      });
    }
    const selection = filterProducts?.reduce(
      (a: any[], item: any) => a.concat(item?.name || ''),
      []
    );
    console.log(selection);
  }, [router.query, products, favoriteProducts]);

  // useEffect(() => {
  //   const productGroup = router.query['product-group'];
  //   const category = NavbarItems?.find((item) =>
  //     item?.route?.includes(productGroup as string)
  //   ) as any;
  // const products = totalProducts?.filter((product: Product) => category?.id === product?.category);
  // const copy = totalProducts?.filter((product: Product) => productGroup === product?.group);
  // const selection = products?.reduce((a: any[], item) => a.concat(item?.title || ''), []);
  // console.log(selection);
  //   const filterProducts = products
  //     ?.filter((product: Product) => category?.id === product?.category)
  //     ?.map((product: Product) => ({
  //       ...product,
  //     }));

  //   filterProducts?.forEach((item: Product) => {
  //     const existItem = favoriteProducts?.find((itemFavorite) => itemFavorite.id === item.id);
  //     if (existItem) item.favorite = true;
  //     else item.favorite = false;
  //   });

  //   setState((pre) => ({ ...pre, filterProducts, copy, selection }));
  // }, [router.query, products, favoriteProducts]);

  const handleChange = (value: any) => {
    console.log(value);
  };

  return (
    <Container>
      <div className="flex flex-col items-center space-y-10 mx-5 my-5 ">
        <div className="w-[100%] flex justify-between mobile:flex-wrap-reverse">
          <div className="flex  space-x-5 mobile:justify-between mobile:mt-5 ">
            <DropdownCheckbox
              title="Catégories"
              selections={selection}
              onChange={handleChange}
              products={copy}
            />
            <DropdownCheckbox title="Prix" onChange={handleChange} selections={productPrice} />
          </div>
          <div className="mobile:float-right">
            <DropdownSelect selections={productFilter} onChange={handleChange} />
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
                product={item}
              />
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
};

export default ProductGroup;
