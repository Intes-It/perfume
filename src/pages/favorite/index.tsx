import ProductItem from "@components/product-item";
import useLocale from "@hooks/useLocale";
import { Product } from "@types";
import { useSelector } from "react-redux";

type itemType = { product: Product };

const Favorite = () => {
  const text = useLocale();
  const favoriteProducts = useSelector(
    (state: any) => state?.favorite?.list
  ) as Product[];

  // const favoriteList = favoriteProducts?.map((item: Product) => {
  //   item.favorite = true;
  // });

  // favoriteProducts?.forEach((item: Product) => {
  //   item.favorite = true;
  // });

  return (
    <div>
      <div className="flex flex-col items-center mx-5 my-5 space-y-10 ">
        <div className="w-[100%] flex justify-between mobile:flex-wrap-reverse">
          <div className="flex space-x-5 mobile:justify-between mobile:mt-5 ">
            {/* <DropdownCheckbox
            title="Catégories"
            selections={selection}
              onChange={sortByCategory}
              products={copy}

            /> */}
          </div>
          {/*<div className="mobile:float-right">*/}
          {/*  <DropdownSelect selections={productFilter} onChange={handleChange} />*/}
          {/*</div>*/}
        </div>
        {favoriteProducts.length > 0 ? (
          <div className="grid grid-flow-row grid-cols-4 gap-10 tablet:grid-cols-3 mobile:grid-cols-2">
            {favoriteProducts?.map((item: any, index: number) => (
              <div key={index}>
                <ProductItem showFavorite={true} product={item} />
              </div>
            ))}
          </div>
        ) : (
          <span className="text-[20px] text-[#603813]">
            {text.favoriteScreen.noProduct}
          </span>
        )}
      </div>
    </div>
  );
};

export default Favorite;
