import useLocale from "@hooks/useLocale";
import useUser from "@hooks/useUser";
import { useState } from "react";
import Facturation from "./facturation";

const Adress = () => {
  const { user, refresh } = useUser();
  const text = useLocale();

  const [state, setState] = useState({
    facturation: false,
    livraison: false,
  });
  const { facturation, livraison } = state;

  const backFacturation = () => {
    refresh();
    window.scrollTo({ top: 0, behavior: "smooth" });
    setState((pre) => ({ ...pre, facturation: false }));
  };

  return (
    <div className="">
      {!facturation && !livraison ? (
        <div>
          <div className="text-[#603813] ">{text.accountScreen.lAdresses}</div>
          <div className="mt-5">
            <div className="flex justify-between w-[55vw]  md:w-[30vw] ">
              <div className="text-[#603813] text-[25px] font-bold">
                {text.accountScreen.aDFactur}{" "}
              </div>
              <button
                onClick={() =>
                  setState((pre) => ({ ...pre, facturation: true }))
                }
                className="p-2 rounded-md border border-black hover:bg-[#603813] hover:text-white"
              >
                {!user?.postal_code && !user?.first_name ? "Create" : "Modify"}
              </button>
            </div>
            <div className="mt-3 grid text-[#603813]">
              {!user?.postal_code && !user?.first_name ? (
                <div>You have not yet defined this type of address.</div>
              ) : (
                <div className="flex flex-col">
                  <span>
                    {user?.first_name} {user?.last_name}
                  </span>
                  <span>{user?.company}</span>
                  <span>{user?.country}</span>
                  <span>
                    {" "}
                    {user?.street} {user?.address}
                  </span>
                  <span>{user?.postal_code}</span>
                  <span>{user?.phone_number}</span>
                  <span>{user?.email}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : facturation ? (
        <Facturation onBack={backFacturation} user={user} />
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default Adress;
