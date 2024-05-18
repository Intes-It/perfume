import { Container } from "@components/container";
import DropdownCheckbox from "@components/dropdown-checkbox";
import DropdownSelect from "@components/dropdown-select";
import ProductItem from "@components/product-item";
import { addFavoriteItem, removeFavoriteItem } from "@redux/slices/favorite";
import { Product } from "@types";
import { api } from "@utils/apiRoute";
import { productFilter, productPrice } from "@utils/fakeData";
import { GET } from "@utils/fetch";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useDispatch, useSelector } from "react-redux";

const ProductSubSubGroup = () => {
  const dispatch = useDispatch();

  const [selectedRangePrice, setSelectedRangePrice] = useState<string | null>(
    null
  );
  const [selectedSort, setSelectedSort] = useState<number | null>(null);

  const router = useRouter();

  const category = router.query;

  const category_id = category["product-group"];
  const sub_category_id = category["product-subgroup"];
  const sub_sub_category_id = category["product-subsubgroup"];

  const getProductCategory = async () => {
    if (!sub_category_id) return;

    const queryParams = {
      category_id: category_id,
      subcategory_ids: sub_category_id,
      sub_subcategory_ids: sub_sub_category_id,
      ...(selectedRangePrice && { range: selectedRangePrice }),
      ...(selectedSort && { order_by: selectedSort }),
    };
    const queryString = new URLSearchParams(queryParams as any).toString();

    return (await GET(api.products + `?${queryString}`)).data;
  };

  const {
    data: products,
    refetch,
    isLoading,
  } = useQuery("get-category-product", getProductCategory);

  const favoriteProducts = useSelector(
    (state: any) => state.persistedReducer?.favorite?.list
  ) as Product[];

  const handlePriceRangeChange = (value: any, id: any) => {
    if (value !== selectedRangePrice && value) {
      setSelectedRangePrice(id);
    } else {
      setSelectedRangePrice(null);
    }
  };
  const handleSortChange = (value: any) => {
    if (value !== selectedSort) setSelectedSort(value);
  };

  useEffect(() => {
    if (sub_category_id) refetch();
  }, [sub_category_id, selectedSort, selectedRangePrice]);

  return (
    <Container>
      <div className="flex flex-col items-center mx-5 my-5 space-y-10 ">
        {/* <p className="text-[17px] text-[#383E42] text-center">
          Des cosmétiques naturels solides fabriqués artisanalement en Provence
          avec des ingrédients majoritairement locaux.
        </p> */}
        <div className="w-[100%] flex justify-between mobile:flex-wrap-reverse">
          <div className="flex space-x-5 mobile:justify-between mobile:mt-5 ">
            {/* <DropdownCheckbox
              title="Catégories"
              selections={filterProducts?.reduce(
                (a: string[], item) => a.concat(item?.title || ""),
                []
              )}
              onChange={handleChange}
            /> */}

            <DropdownCheckbox
              title="Prix"
              selections={productPrice}
              value={selectedRangePrice}
              onChange={handlePriceRangeChange}
            />
          </div>
          <div className="justify-end md:flex">
            <DropdownSelect
              selections={productFilter}
              onChange={handleSortChange}
            />
          </div>
        </div>
        <div className="grid grid-flow-row grid-cols-2 gap-10 md:grid-cols-4 tablet:grid-cols-3">
          {products?.results?.map((item: Product, index: number) => (
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

export default ProductSubSubGroup;
