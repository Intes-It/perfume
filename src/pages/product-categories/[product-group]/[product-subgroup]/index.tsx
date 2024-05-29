import DropdownCheckbox from "@components/dropdown-checkbox";
import DropdownSelect from "@components/dropdown-select";
import ProductItem from "@components/product-item";
import { useAllCategory } from "@hooks/useCategory";
import { Product } from "@types";
import { api } from "@utils/apiRoute";
import { productFilter, productPrice } from "@utils/fakeData";
import { GET } from "@utils/fetch";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";

const ProductSubGroup = () => {
  const { data } = useAllCategory();

  const [selectedSecondSubCate, setSelectedSubCate] = useState<number | null>(
    null
  );
  const [selectedRangePrice, setSelectedRangePrice] = useState<string | null>(
    null
  );
  const [selectedSort, setSelectedSort] = useState<number | null>(null);

  const router = useRouter();
  const category = router.query;
  const category_id = category["product-group"];
  const sub_category_id = category["product-subgroup"];

  const subCategories = useMemo(() => {
    if (data?.length > 0) {
      const category = data.find(
        (item: { id: number; sub_subcategories: any }) =>
          category_id && item?.id === +category_id
      );
      return category?.subcategories || [];
    }
    return [];
  }, [data, category_id]) as any;

  const secondSubCategories = useMemo(() => {
    if (data?.length > 0) {
      const category = subCategories.find(
        (item: { id: number; sub_subcategories: any }) =>
          sub_category_id && item?.id === +sub_category_id
      );
      return category?.sub_subcategories || [];
    }
    return [];
  }, [subCategories]) as any;

  const getProductCategory = async () => {
    if (!sub_category_id) return;

    const queryParams = {
      category_ids: category_id,
      page_size: 1000,
      subcategory_ids: sub_category_id,
      ...(selectedSecondSubCate && {
        sub_subcategory_ids: selectedSecondSubCate,
      }),
      ...(selectedRangePrice && { price_range: selectedRangePrice }),
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
    (state: any) => state?.favorite?.list
  ) as Product[];

  const handleSortByCategoryChange = (value: any, id: number) => {
    if (id !== selectedSecondSubCate && value) {
      setSelectedSubCate(id);
    } else {
      setSelectedSubCate(null);
    }
  };
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
  }, [
    sub_category_id,
    selectedSecondSubCate,
    selectedSort,
    selectedRangePrice,
  ]);

  return (
    <div>
      <div className="flex flex-col items-center mx-5 my-5 space-y-10 ">
        {/* <p className="text-[17px] text-[#383E42] text-center">
          Des cosmétiques naturels solides fabriqués artisanalement en Provence
          avec des ingrédients majoritairement locaux.
        </p> */}
        <div className="w-[100%] grid md:grid-cols-2 grid-cols-1 gap-2">
          <div className="flex space-x-5 mobile:justify-between mobile:mt-5 ">
            <DropdownCheckbox
              title="Catégories"
              selections={secondSubCategories?.map((item: any) => ({
                name: item?.name || "",
                value: item?.id || "",
              }))}
              value={selectedSecondSubCate}
              onChange={handleSortByCategoryChange}
            />

            <DropdownCheckbox
              title="Prix"
              selections={productPrice}
              value={selectedRangePrice}
              onChange={handlePriceRangeChange}
            />
          </div>
          <div className="justify-end md:flex">
            {" "}
            <DropdownSelect
              selections={productFilter}
              onChange={handleSortChange}
            />
          </div>
        </div>
        <div className="grid grid-flow-row grid-cols-2 gap-10 md:grid-cols-4 tablet:grid-cols-3">
          {isLoading ? (
            <div></div>
          ) : products?.results?.length > 0 ? (
            products?.results?.map((item: Product, index: number) => (
              <div key={index}>
                <ProductItem showFavorite={true} product={item} />
              </div>
            ))
          ) : (
            products?.results?.length === 0 && (
              <div className="ml-20 text-[20px]">Aucun Produit trouvé</div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductSubGroup;
