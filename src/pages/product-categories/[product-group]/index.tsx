import { Container } from '@components/container';
import DropdownCheckbox from '@components/dropdown-checkbox';
import DropdownSelect from '@components/dropdown-select';
import ProductItem from '@components/product-item';
import { Product } from '@types';
import { useRouter } from 'next/router';
import { useEffect, useMemo, useState } from 'react';
import { productFilter, productPrice } from '@utils/fakeData';
import { useDispatch, useSelector } from 'react-redux';
import { addFavoriteItem, removeFavoriteItem } from '@redux/slices/favorite';
import { useProducts } from '@hooks/useProduct';
import { useAllCategory } from '@hooks/useCategory';

const ProductGroup = () => {
  const dispatch = useDispatch();
  const { categories, subCategories } = useAllCategory();
  const router = useRouter();
  const { products, fetchFilterProducts } = useProducts();
  const [state, setState] = useState({
    filterProducts: [] as Product[] | undefined,
    copy: [] as Product[] | undefined,
    categories: '',
    price: '',
    selection: [] as string[],
    sort: null,
    priceRange: null,
    categoriesSort: null,
  });
  const { filterProducts, sort, priceRange, categoriesSort } = state;

  const favoriteProducts = useSelector(
    (state: any) => state.persistedReducer?.favorite?.list
  ) as Product[];

  const selectedCategory = useMemo(() => {
    return categories?.find((item: any) => item?.slug === router.query['product-group']);
  }, [categories, router.query]);

  const subCategoriesFilter = useMemo(() => {
    return subCategories?.filter((item: any) => item?.category === selectedCategory?.id);
  }, [subCategories, selectedCategory]);

  // console.log('subsubCategoriesFilter:%o', subsubCategoriesFilter)
  const fetchProducts = async () => {
    const categoryId = selectedCategory?.id;
    if (categoryId) {
      await fetchFilterProducts({
        ...((!categoriesSort && { category: categoryId as any }) as any),
        // category: categoryId as any,
        ...((sort && { sort: sort as any }) as any),
        ...((priceRange && { price_range: priceRange as any }) as any),
        ...((categoriesSort && {
          subcategory: categoriesSort as any,
        }) as any),
      });
    }
  };

  useEffect(() => {
    const filterProducts = products?.map((product: Product) => ({
      ...product,
    }));
    filterProducts?.forEach((item: Product) => {
      const existItem = favoriteProducts?.find((itemFavorite) => itemFavorite.id === item.id);
      if (existItem) item.favorite = true;
      else item.favorite = false;
    });
    setState((pre) => ({ ...pre, filterProducts }));
  }, [router.query, products, favoriteProducts]);

  useEffect(() => {
    fetchProducts();
  }, [selectedCategory, sort, priceRange, categoriesSort]);

  const handleSortByCategoryChange = (value: any) => {
    if (value === categoriesSort) setState((pre) => ({ ...pre, categoriesSort: null }));
    else setState((pre) => ({ ...pre, categoriesSort: value }));
  };
  const handleSortChange = (value: any) => {
    if (value === sort) setState((pre) => ({ ...pre, sort: null }));
    else setState((pre) => ({ ...pre, sort: value }));
  };
  const handlePriceRangeChange = (value: any) => {
    if (value === priceRange) setState((pre) => ({ ...pre, priceRange: null }));
    else setState((pre) => ({ ...pre, priceRange: value }));
  };

  return (
    <Container>
      <div className="flex flex-col items-center space-y-10 mx-5 my-5 ">
        {/* <p className="text-[17px] text-[#383E42] text-center">
          Des cosmétiques naturels solides fabriqués artisanalement en Provence
          avec des ingrédients majoritairement locaux.
        </p> */}
        <div className="w-[100%] grid md:grid-cols-2 grid-cols-1 gap-2">
          <div className="flex  space-x-5 mobile:justify-between mobile:mt-5 ">
            <DropdownCheckbox
              title="Catégories"
              selections={subCategoriesFilter?.map((item: any) => ({
                name: item?.name || '',
                value: item?.id || '',
              }))}
              onChange={handleSortByCategoryChange}
            />

            <DropdownCheckbox
              title="Prix"
              selections={productPrice}
              onChange={handlePriceRangeChange}
            />
          </div>
          <div className="md:flex justify-end">
            <DropdownSelect selections={productFilter} onChange={handleSortChange} />
          </div>
        </div>
        <div className="grid md:grid-cols-4 grid-flow-row gap-10 tablet:grid-cols-3 grid-cols-2">
          {products?.length > 0 ? (
            filterProducts?.map((item: Product, index: number) => (
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
            ))
          ) : (
            <div className="ml-20 text-[20px]">Aucun Produit trouvé</div>
          )}
        </div>
      </div>
    </Container>
  );
};

export default ProductGroup;
