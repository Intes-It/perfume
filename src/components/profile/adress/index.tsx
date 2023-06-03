import useUser from '@hooks/useUser';
import { api } from '@utils/apiRoute';
import { GET } from '@utils/fetch';
import React, { useMemo, useState } from 'react';
import Facturation from './facturation';

const Adress = () => {
  const [state, setState] = useState({
    facturation: false,
    livraison: false,
    // user: [],
  });

  async function getProfile() {
    const res = await GET(api.getProfile);
   
    return res.data;
  }

  const backFacturation = () => {
    setState((pre) => ({ ...pre, facturation: false }));
    getProfile();
  };



  const { user } = useUser();



  const { facturation, livraison,  } = state;
  return (
    <div className="">
      {!facturation && !livraison ? (
        <div>
          <div className="text-[#603813]">
            Les adresses suivantes seront utilisées par défaut sur la page de commande.
          </div>
          <div className="mt-5">
            <div className="flex justify-between w-[55vw]  md:w-[30vw] ">
              <div className="text-[#603813] text-[25px]">Adresse de facturation</div>
              <button
                onClick={() => setState((pre) => ({ ...pre, facturation: true }))}
                className="p-2 rounded-md border border-black">
                {!user?.zip_code && !user?.first_name ? "Ajouter" : "Modifier" }
              </button>
            </div>
            <div className="mt-3 grid text-[#603813]">
              <span>
                {user?.first_name} {user?.last_name}
              </span>
              <span>{user?.company_name}</span>
              <span>{user?.district}</span>
              <span>{user?.wards}</span>
              <span>{user?.province}</span>
              <span>{user?.zip_code}</span>
              <span>{user?.country}</span>
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
