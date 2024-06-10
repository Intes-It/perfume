import { updateFullCart } from "@redux/slices/cart";
import { setList } from "@redux/slices/favorite";
import { instance } from "@utils/_axios";
import { api } from "@utils/apiRoute";
import { deleteCookie, getCookie } from "cookies-next";
import { useRouter } from "next/router";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { twMerge } from "tailwind-merge";
import { Container } from "..";
import Adress from "./adress";
import Detail from "./detail";
import Order from "./order";
import UserProfile from "./user-profile";

const Tabs = [
  {
    id: "profile-tab",
    header: "Dashboard",
    href: "#profile-tab",
  },
  {
    id: "orders-tab",
    header: "My order",
    href: "#orders-tab",
  },
  // {
  //   id: "delivery-tab",
  //   header: "Téléchargements",
  //   href: "#delivery-tab",
  // },
  {
    id: "adress-tab",
    header: "Address",
    href: "#adress-tab",
  },
  // {
  //   id: "payment-tab",
  //   header: "Moyens de paiment",
  //   href: "#payment-tab",
  // },
  {
    id: "detail-tab",
    header: "Account details",
    href: "#detail-tab",
  },
  {
    id: "logout-tab",
    header: "Sign out",
    href: "#logout-tab",
  },
];

const Profile = () => {
  const router = useRouter();

  const page = router.query?.page ? +router.query?.page : 0;

  const [tabs, setTabs] = useState(page);
  const dispatch = useDispatch();
  const logOut = async () => {
    await instance
      .post(api.logout, { refresh: getCookie("refresh_token") })
      .then(() => {
        dispatch(updateFullCart([]));
        dispatch(setList([]));
        deleteCookie("access_token");
        deleteCookie("refresh_token");
        window.location.reload();
      })
      .catch(() => {
        dispatch(updateFullCart([]));
        dispatch(setList([]));
        deleteCookie("access_token");
        deleteCookie("refresh_token");
        window.location.reload();
      });
  };
  return (
    <Container>
      <div className="m-5 ">
        <div className="items-start md:flex ">
          <ul
            className="flex flex-col flex-wrap col-span-2 pl-0 mr-4 list-none "
            role="tablist"
          >
            {Tabs?.map((item: any, index: number) => (
              <li key={index} className="flex-grow text-start">
                <button
                  onClick={
                    item?.header === "Sign out"
                      ? () => logOut()
                      : () => setTabs(index)
                  }
                  className={twMerge(
                    "my-[1px] min-w-[100px] block w-full border-x-0 font-semibold text-left whitespace-nowrap hover:isolate  border-t-0 border-b-2 border-transparent px-7 pt-4 pb-3.5 text-sm   leading-tight text-neutral-500  hover:border-transparent  hover:bg-neutral-100 ",
                    index === tabs ? "bg-[#603813]  hover:bg-[#603813]" : ""
                  )}
                >
                  <span
                    className=" text-[18px] font-semibold"
                    style={{
                      color: tabs === index ? "#fff" : "#603813",
                    }}
                  >
                    {item?.header}
                  </span>
                </button>
              </li>
            ))}
          </ul>
          <div className="w-full col-span-5 my-2 mb-10 ">
            {tabs === 0 && (
              <div
                className="transition-opacity duration-150 ease-linear "
                id="profile-tab"
                role="tabpanel"
              >
                <UserProfile setTabs={setTabs} />
              </div>
            )}
            {tabs === 1 && (
              <div
                className="transition-opacity duration-150 ease-linear "
                id="orders-tab"
                role="tabpanel"
              >
                <Order />
              </div>
            )}
            {/* {tabs === 2 && (
              <div
                className="transition-opacity duration-150 ease-linear "
                id="delivery-tab"
                role="tabpanel"
              >
                <Delivery />
              </div>
            )} */}
            {tabs === 2 && (
              <div
                className="transition-opacity duration-150 ease-linear "
                id="adress-tab"
                role="tabpanel"
              >
                <Adress />
              </div>
            )}
            {/* {tabs === 4 && (
              <div
                className="transition-opacity duration-150 ease-linear "
                id="payment-tab"
                role="tabpanel"
              >
                <Payment />
              </div>
            )} */}
            {tabs === 3 && (
              <div
                className=" transition-opacity duration-150 ease-linear data-[te-tab-active]:block"
                id="detail-tab"
                role="tabpanel"
              >
                <Detail />
              </div>
            )}
            <div
              className="hidden opacity-0 transition-opacity duration-150 ease-linear data-[te-tab-active]:block"
              id="logout-tab"
              role="tabpanel"
            ></div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Profile;
