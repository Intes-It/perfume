import useClickOutside from "@hooks/useClickoutside";
import { Product } from "@types";
import { api } from "@utils/apiRoute";
import { GET } from "@utils/fetch";
import { debounce } from "lodash-es";
import {
  DetailedHTMLProps,
  Fragment,
  HTMLAttributes,
  useRef,
  useState,
} from "react";
import SearchModal from "./search-modal";

const SearchPopover = (
  props: DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>
) => {
  const [isLoading, setIsLoading] = useState(false);
  const [product, setProduct] = useState<Product[] | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const searchRef = useRef(null);

  useClickOutside(searchRef, () => setIsOpen(false));

  const onInputChange = debounce(function (value: string) {
    setIsOpen(true);
    if (value === "") {
      setProduct(null);
      setIsOpen(false);
      return;
    }
    handleSearch(value);
  }, 500);

  const handleSearch = async (value: string) => {
    if (value === "") {
      return;
    }
    setIsOpen(true);
    setIsLoading(true);

    try {
      const res = await GET(api.products + "/?search=" + value);

      if (res.status === 200) {
        setProduct(res.data?.results);
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log("error :>> ", error);
    }
  };

  return (
    <Fragment>
      <div {...props}>
        <div className="relative" ref={searchRef}>
          <div className="relative">
            <input
              type="text"
              className="border-[#D9D9D9] focus:ring-0 focus:border-black text-[#374151] rounded font-medium pr-8 h-9 pl-3 w-60 placeholder:text-xs text-xs"
              placeholder="Search"
              onChange={(e) => onInputChange(e.target.value)}
              onFocus={() => {
                if (product && product?.length > 0) {
                  setIsOpen(true);
                }
              }}
            />
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              className="absolute -translate-y-1/2 cursor-pointer right-3 top-1/2"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M7.66667 1.83398C4.44501 1.83398 1.83334 4.44566 1.83334 7.66732C1.83334 10.889 4.44501 13.5007 7.66667 13.5007C10.8883 13.5007 13.5 10.889 13.5 7.66732C13.5 4.44566 10.8883 1.83398 7.66667 1.83398ZM0.833336 7.66732C0.833336 3.89337 3.89272 0.833984 7.66667 0.833984C11.4406 0.833984 14.5 3.89337 14.5 7.66732C14.5 9.37433 13.8741 10.9351 12.8392 12.1328L15.0202 14.3138C15.2155 14.509 15.2155 14.8256 15.0202 15.0209C14.825 15.2161 14.5084 15.2161 14.3131 15.0209L12.1321 12.8399C10.9345 13.8747 9.37368 14.5007 7.66667 14.5007C3.89272 14.5007 0.833336 11.4413 0.833336 7.66732Z"
                fill="#374151"
              />
            </svg>
          </div>

          {isOpen && (
            <SearchModal
              isLoading={isLoading}
              product={product}
              setIsOpen={setIsOpen}
            />
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default SearchPopover;
