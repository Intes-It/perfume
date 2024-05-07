import useUser from "@hooks/useUser";
import { api } from "@utils/apiRoute";
import { GET } from "@utils/fetch";
import React, { useEffect, useState } from "react";
import Facturation from "./facturation";
import useLocale from "@hooks/useLocale";

const Adress = () => {
  const [state, setState] = useState({
    facturation: false,
    livraison: false,
  });

  async function getProfile() {
    const res = await GET(api.getProfile);
    setProfile(res?.data);
  }
  const backFacturation = () => {
    setState((pre) => ({ ...pre, facturation: false }));
    getProfile();
  };

  const { user } = useUser();

  const [profile, setProfile] = useState(user);
  useEffect(() => {
    setProfile(user);
  }, [user]);
  const { facturation, livraison } = state;
  const text = useLocale();
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
                {!profile?.zip_code && !profile?.first_name
                  ? "Create"
                  : "Modify"}
              </button>
            </div>
            <div className="mt-3 grid text-[#603813]">
              {!profile?.zip_code && !profile?.first_name ? (
                <div>You have not yet defined this type of address.</div>
              ) : (
                <div>
                  <span>
                    {profile?.first_name} {profile?.last_name}
                  </span>
                  <span>{profile?.company_name}</span>
                  <span>{profile?.country}</span>
                  <span>
                    {" "}
                    {profile?.wards} {profile?.district}
                  </span>
                  <span>{profile?.province}</span>
                  <span>{profile?.zip_code}</span>
                  <span>{profile?.phone}</span>
                  <span>{profile?.email}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : facturation ? (
        <Facturation onBack={backFacturation}></Facturation>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default Adress;
