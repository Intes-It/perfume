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
import useCategory, { getProduct, getSubCategory } from '@hooks/useFilter';

const ProductGroup = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [state, setState] = useState({
    filterProducts: [] as Product[] | undefined,
    copy: [] as Product[] | undefined,
    selection: [] as string[],
    id: undefined,
    valueSort: '',
    valuePrice: '',
    valueSubCategory: '',
  });
  const { products } = useProducts();
  const { categoryList } = useCategory();

  const favoriteProducts = useSelector(
    (state: any) => state.persistedReducer?.favorite?.list
  ) as Product[];
  const { filterProducts, copy, selection, id, valueSort, valuePrice, valueSubCategory } = state;

  const sortByPrice = (value: any) => {
    if (value === valuePrice) {
      const param =
        valueSubCategory === ''
          ? { category: (id as any)?.id, sort: valueSort }
          : { category: (id as any)?.id, sort: valueSort, subcategory: valueSubCategory };
      getProduct(param).then((response: any) => {
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
      const valuePrice = '';
      setState((o) => ({
        ...o,
        valuePrice,
      }));
    } else {
      const param =
        valueSubCategory === ''
          ? { category: (id as any)?.id, sort: valueSort, price_range: value }
          : {
              category: (id as any)?.id,
              sort: valueSort,
              subcategory: valueSubCategory,
              price_range: value,
            };
      getProduct(param).then((response: any) => {
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
      const valuePrice = value;
      setState((o) => ({
        ...o,
        valuePrice,
      }));
    }
  };

  const sort = (value: any) => {
    const param =
      valuePrice === '' && valueSubCategory === ''
        ? { category: (id as any)?.id, sort: value }
        : {
            category: (id as any)?.id,
            sort: value,
            price_range: valuePrice,
            subcategory: valueSubCategory,
          };
    getProduct(param).then((response: any) => {
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
    setState((o) => ({
      ...o,
      valueSort: value,
    }));
  };

  const sortBySubCategory = (value: any) => {
    console.log(value);
    if (value === valueSubCategory) {
      const param =
        valuePrice === ''
          ? { sort: valueSort, category: (id as any)?.id,}
          : {
              sort: valueSort,
              category: (id as any)?.id,
              price_range: valuePrice,
            };
      getProduct(param).then((response: any) => {
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
      const valueSubCategory = '';
      setState((o) => ({
        ...o,
        valueSubCategory,
      }));
    } else {
      const param =
        valuePrice === ''
          ? { subcategory: value, category: (id as any)?.id, sort: valueSort }
          : {
              subcategory: value,
              category: (id as any)?.id,
              sort: valueSort,
              price_range: valuePrice,
            };
      console.log(param);
      getProduct(param).then((response: any) => {
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
      setState((o) => ({
        ...o,
        valueSubCategory: value,
      }));
    }
  };

  useEffect(() => {
    const id = categoryList?.find((item: any) => {
      return router.query['product-group']?.includes(item.slug.toLowerCase().slice(0, 3));
    });
    console.log(categoryList);
    if (id) {
      getSubCategory(id?.id).then((response: any) => {
        const selection = response.reduce(
          (a: any[], item: any) => a.concat({ name: item.name, value: item.id } || ''),
          []
        );
        console.log(selection);
        setState((o) => ({
          ...o,
          selection,
        }));
      });
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
    console.log(selection);
    setState((o) => ({
      ...o,
      id,
    }));
  }, [router.query, products, favoriteProducts]);

  return (
    <Container>
      <div className="flex flex-col items-center space-y-10 mx-5 my-5 ">
        <div className="w-[100%] flex justify-between mobile:flex-wrap-reverse">
          <div className="flex  space-x-5 mobile:justify-between mobile:mt-5 ">
            <DropdownCheckbox
              title="Catégories"
              selections={selection}
              onChange={sortBySubCategory}
               
            />
            <DropdownCheckbox title="Prix" onChange={sortByPrice} selections={productPrice} />
          </div>
          <div className="mobile:float-right">
            <DropdownSelect selections={productFilter} onChange={sort} />
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
