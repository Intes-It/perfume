import React, { useState } from 'react';
import Facturation from './facturation';

const Adress = () => {
  const [state, setState] = useState({
    facturation: false,
    livraison: false,
  });

  const backFacturation = () => {
    setState((pre) => ({ ...pre, facturation: false }))
  }

  const { facturation, livraison } = state;
  return (
    <div className="">
      {!facturation && !livraison ? (
        <div>
          <div className="text-[#603813]">
            Les adresses suivantes seront utilisées par défaut sur la page de commande.
          </div>
          <div className="flex justify-between mt-5">
            <div className="flex justify-between w-[55vw]  md:w-[30vw] ">
              <div className='text-[#603813] text-[25px]'>Adresse de facturation</div>
              <button
                onClick={() => setState((pre) => ({ ...pre, facturation: true }))}
                className="p-2 rounded-md border border-black">
                Ajouter
              </button>
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
