import Toast from "@components/toast";
import { Routes } from "@definitions/constants";
import { useAllCategory } from "@hooks/useCategory";
import { showToast } from "@redux/slices/toast/toastSlice";
import { useAppDispatch } from "@redux/store";
import { default as Link } from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useSelector } from "react-redux";

function Navbar() {
  const { data } = useAllCategory();

  const router = useRouter();
  const category = router.query;
  const category_id = category["product-group"];

  const toast = useSelector((state: any) => state?.persistedReducer.toast);
  const exCategories = data && [
    Routes.home,
    Routes.about,
    ...data,
    Routes.contact,
  ];
  const dispatch = useAppDispatch();

  useEffect(() => {
    const timer = setTimeout(() => {
      toast.show && dispatch(showToast({ message: "", error: false }));
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, [toast, dispatch]);

  return (
    <div className="sticky top-0 z-40 hidden p-1 bg-white md:block">
      {toast.show && <Toast />}

      <nav className="z-10 w-full ">
        <div className="w-full">
          <div className="flex items-center w-full">
            <div className="items-center justify-between block w-full">
              <div className="mx-auto">
                <nav>
                  <ul className="flex justify-center mb-2 text-[2px] text-gray-700 tracking-wider">
                    {exCategories?.map((item: any, pIndex: number) => (
                      <li
                        key={pIndex}
                        className="p-5 py-3 text-base font-light transition border-b-2 border-transparent group px-7 hover:border-black hover:duration-75 hover:ease-in-out"
                        style={{
                          borderBottom:
                            category_id && +category_id === +item?.id
                              ? "2px solid #000"
                              : "none",
                        }}
                      >
                        <div>
                          {/* categories */}
                          {item?.id && (
                            <Link
                              href={`/product-categories/${item?.id}`}
                              key={item?.name}
                              passHref
                            >
                              <a className={"text-sm"}>
                                {item?.name?.toUpperCase()}
                              </a>
                            </Link>
                          )}
                          {item?.route && (
                            <Link href={item?.route} key={item?.title} passHref>
                              <a className={"text-sm"}>
                                {item?.title?.toUpperCase()}
                              </a>
                            </Link>
                          )}
                          {/* subcategories */}
                          <div className="grid grid-flow-col w-full left-0 mt-[0.85rem] overflow-hidden bg-[#603813] absolute invisible  group-hover:animate-bottomToTop group-hover:visible">
                            {item?.subcategories?.map(
                              (subCategory: any, sub_index: number) => (
                                <div
                                  key={sub_index}
                                  className="m-3 text-white font-[600] tracking-wide mx-auto"
                                >
                                  <div className="transition duration-500 border-b-2 border-transparent hover:border-white">
                                    <Link
                                      href={`/product-categories/${item?.id}/${subCategory?.id}`}
                                    >
                                      {subCategory?.name?.toUpperCase()}
                                    </Link>
                                  </div>
                                  <div className="text-base tracking-wide font-extralight">
                                    {subCategory?.sub_subcategories?.map(
                                      (
                                        subsubCategory: any,
                                        sub_sub_index: number
                                      ) => (
                                        <div
                                          key={sub_sub_index}
                                          className="my-1 transition duration-500 border-b-2 border-transparent hover:border-white"
                                        >
                                          <Link
                                            href={`/product-categories/${item?.id}/${subCategory?.id}/${subsubCategory?.id}`}
                                          >
                                            {subsubCategory?.name}
                                          </Link>
                                          <br />
                                        </div>
                                      )
                                    )}
                                  </div>
                                </div>
                              )
                            )}
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
