import { Container } from '@components/container';
import DropdownSelect from '@components/dropdown-select';
import ProductItem from '@components/product-item';
import useFavorite from '@hooks/useFavoriteProduct';
import { useProducts } from '@hooks/useProduct';
import { addFavoriteItem, removeFavoriteItem } from '@redux/slices/favorite';
import { Product } from '@types';
import { productFilter } from '@utils/fakeData';
import { formatCurrency } from '@utils/formatNumber';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const Favorite = () => {
  const dispatch = useDispatch();
  const favoriteProducts = useSelector(
    (state: any) => state.persistedReducer?.favorite?.list
  ) as Product[];

  // const favoriteList = favoriteProducts?.map((item: Product) => {
  //   item.favorite = true;
  // });

  // favoriteProducts?.forEach((item: Product) => {
  //   item.favorite = true;
  // });
  console.log(favoriteProducts);

  const handleChange = (value: any) => {
    console.log(value);
  };
  return (
    <div>
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
            <DropdownSelect selections={productFilter} onChange={handleChange} />
          </div>
        </div>
        {favoriteProducts.length > 0 ? (
          <div className="grid grid-cols-4 grid-flow-row gap-10 tablet:grid-cols-3 mobile:grid-cols-2">
            {favoriteProducts?.map((item: Product, index: number) => (
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
        ) : (
          <span className="text-[20px] text-[#603813]">Aucun Produits Ajoutés Aux Favoris</span>
        )}
      </div>
    </div>
  );
};

export default Favorite;
