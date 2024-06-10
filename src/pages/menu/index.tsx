import { Container } from "@components/container";
import DropdownCheckbox from "@components/dropdown-checkbox";
import DropdownSelect from "@components/dropdown-select";
import ProductItem from "@components/product-item";
import useLocale from "@hooks/useLocale";
import { Product } from "@types";
import { api } from "@utils/apiRoute";
import { productFilter, productPrice } from "@utils/fakeData";
import { GET } from "@utils/fetch";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";

const Menu = () => {
  const [selectedRangePrice, setSelectedRangePrice] = useState<string | null>(
    null
  );
  const [selectedSort, setSelectedSort] = useState<number | null>(null);

  const router = useRouter();
  const pathName = router.query;
  const search = pathName?.search;

  const handleGetProduct = async () => {
    try {
      const queryParams = {
        page_size: 1000,
        ...(search && { search: search }),
        ...(selectedRangePrice && { price_range: selectedRangePrice }),
        ...(selectedSort && { order_by: selectedSort }),
      };
      const queryString = new URLSearchParams(queryParams as any).toString();
      const res = await GET(api.products + `/?${queryString}`);

      return res.data;
    } catch (error) {
      console.log("error :>> ", error);
    }
  };

  const {
    data: products,
    refetch,
    isLoading,
  } = useQuery("get-category-product", handleGetProduct);

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
    refetch();
  }, [search, selectedSort, selectedRangePrice]);

  const text = useLocale();
  return (
    <Container>
      <div className="flex flex-col items-center mx-5 my-5 space-y-10 ">
        {/* <p className="text-[17px] text-[#383E42] text-center">
          Des cosmétiques naturels solides fabriqués artisanalement en Provence
          avec des ingrédients majoritairement locaux.
        </p> */}
        <div className="w-[100%] grid md:grid-cols-2 grid-cols-1 gap-2">
          <div className="flex space-x-5 mobile:justify-between mobile:mt-5 ">
            <DropdownCheckbox
              title={text.productScreen.price}
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
              <div className=" text-[20px] mt-10 col-span-2 md:col-span-4 tablet:col-span-3">
                No Product
              </div>
            )
          )}
        </div>
      </div>
    </Container>
  );
};

export default Menu;
