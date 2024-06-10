import { Product } from "@types";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import { twMerge } from "tailwind-merge";

type SearchProps = {
  isLoading: boolean;
  product: Product[] | null;
  setIsOpen: (value: boolean) => void;
};
const SearchModal: React.FC<SearchProps> = ({
  isLoading,
  product,
  setIsOpen,
}) => {
  const router = useRouter();

  const handleRoute = (url: string) => {
    setIsOpen(false);
    router.push(url);
  };

  return (
    <div
      className={twMerge(
        "bg-white shadow min-h-[200px] max-w-[240px] max-h-80 overflow-auto thin-scroll",
        product && product?.length > 0 && "min-h-0 h-fit"
      )}
    >
      {isLoading ? (
        <div className="min-h-[150px]">
          <div className="absolute -translate-x-1/2 translate-y-1/2 top-[40%] left-1/2">
            <div
              className="inline-block text-[#1C64F2] h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
              role="status"
            />
          </div>
        </div>
      ) : product && product?.length > 0 ? (
        <div className="flex flex-col">
          {product?.map((item) => (
            <div
              className="flex items-center gap-2 px-3 py-1 transition-all duration-300 ease-in-out cursor-pointer hover:bg-gray-200"
              key={item.id}
              onClick={() => handleRoute(`/product/${item.id}`)}
            >
              <div className="h-10 min-w-10">
                <Image
                  className="object-cover h-10 rounded-md min-w-10"
                  width={40}
                  height={40}
                  src={item.thumbnail?.url || ""}
                />
              </div>
              <div className="text-xs truncate">{item.name}</div>
            </div>
          ))}
        </div>
      ) : (
        <div className="absolute -translate-x-1/2 translate-y-1/2 top-1/2 left-1/2">
          No items found
        </div>
      )}
    </div>
  );
};

export default SearchModal;
