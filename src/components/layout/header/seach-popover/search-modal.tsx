import { Dialog, Transition } from "@headlessui/react";
import useLocale from "@hooks/useLocale";
import { useRouter } from "next/router";
import React, { useState } from "react";

type SearchProps = {
  isVisible: boolean;
  onClose: () => void;
};
const SearchModal: React.FC<SearchProps> = ({ isVisible, onClose }) => {
  const router = useRouter();
  const text = useLocale();

  const pathName = router.query;
  const search = pathName?.search;

  const [value, setValue] = useState(search || "");

  const cancelButtonRef = React.useRef(null);

  const handleKeyDown = (event: any) => {
    if (event.key === "Enter") {
      onClose();
      router.push({
        pathname: "/menu",
        query: {
          search: value,
        },
      });
    }
  };
  return (
    <Transition.Root show={isVisible} as={React.Fragment}>
      <Dialog
        className="relative"
        style={{
          zIndex: 9999,
        }}
        initialFocus={cancelButtonRef}
        onClose={onClose}
      >
        <Transition.Child
          as={React.Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 transition-opacity bg-gray-800 bg-opacity-75" />
        </Transition.Child>

        <Transition.Child
          as={React.Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          enterTo="opacity-100 translate-y-0 sm:scale-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100 translate-y-0 sm:scale-100"
          leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
        >
          <Dialog.Panel className="fixed transition-all transform -translate-x-1/2 -translate-y-1/2 rounded-md shadow-xl top-1/2 left-1/2 h-fit image-container ">
            <input
              onChange={(e) => setValue(e.target.value)}
              onKeyDown={handleKeyDown}
              type="search"
              value={value}
              className="px-4 py-4 w-[60vw] bg-black  bg-opacity-0 focus:outline-none text-white lg:text-[50px] text-center border-b-2 sm:text-[30px]"
              placeholder={text.homePageScreen.Search}
            />
          </Dialog.Panel>
        </Transition.Child>
      </Dialog>
    </Transition.Root>
  );
};

export default SearchModal;
