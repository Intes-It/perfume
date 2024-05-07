import { updateFullCart } from "@redux/slices/cart";
import { setList } from "@redux/slices/favorite";
import { instance } from "@utils/_axios";
import { deleteCookie } from "cookies-next";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Container } from "..";
import Adress from "./adress";
import Delivery from "./delivery";
import Detail from "./detail";
import Order from "./order";
import Payment from "./payment";
import UserProfile from "./user-profile";

const Tabs = [
  {
    id: "profile-tab",
    header: "Tableau de bord",
    href: "#profile-tab",
  },
  {
    id: "orders-tab",
    header: "Commandes",
    href: "#orders-tab",
  },
  {
    id: "delivery-tab",
    header: "Téléchargements",
    href: "#delivery-tab",
  },
  {
    id: "adress-tab",
    header: "Adresses",
    href: "#adress-tab",
  },
  {
    id: "payment-tab",
    header: "Moyens de paiment",
    href: "#payment-tab",
  },
  {
    id: "detail-tab",
    header: "Détails du compte",
    href: "#detail-tab",
  },
  {
    id: "logout-tab",
    header: "Déconnexion",
    href: "#logout-tab",
  },
];

const Profile = () => {
  const [tabs, setTabs] = useState(0);
  const dispatch = useDispatch();
  const logOut = async () => {
    await instance.post("/api/user/logout").then(() => {
      dispatch(updateFullCart([]));
      dispatch(setList([]));
      deleteCookie("csrftoken");
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
                    item?.header === "Déconnexion"
                      ? () => logOut()
                      : () => setTabs(index)
                  }
                  className={`my-[1px] min-w-[100px] block border-x-0 font-semibold hover:isolate rounded-md border-t-0 border-b-2 border-transparent px-7 pt-4 pb-3.5 text-sm  uppercase leading-tight text-neutral-500  hover:border-transparent  hover:bg-neutral-100   ${
                    index === tabs ? "bg-[#603813] text-white" : ""
                  }`}
                >
                  <span>{item?.header}</span>
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
            {tabs === 2 && (
              <div
                className="transition-opacity duration-150 ease-linear "
                id="delivery-tab"
                role="tabpanel"
              >
                <Delivery />
              </div>
            )}
            {tabs === 3 && (
              <div
                className="transition-opacity duration-150 ease-linear "
                id="adress-tab"
                role="tabpanel"
              >
                <Adress />
              </div>
            )}
            {tabs === 4 && (
              <div
                className="transition-opacity duration-150 ease-linear "
                id="payment-tab"
                role="tabpanel"
              >
                <Payment />
              </div>
            )}
            {tabs === 5 && (
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
