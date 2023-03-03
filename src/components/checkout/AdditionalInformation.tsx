import React, { useState } from 'react';

const AdditionalInformation = () => {
  const [state, setState] = useState({
    check: false,
  });
  const { check } = state;
  return (
    <div className="bg-[#FBFBFB] ">
      <div className="flex items-center">
        <input
          type="checkbox" 
          onChange={() => setState((o) => ({ ...o, check: !check }))}
          checked={check}
          id="remember"
          className="w-4 h-4 mt-3 mr-2 "
        />
        {/* <label>Expédier à une adresse différente ?</label> */}
        <span className="text-black text-[32px] font-semibold">
          Expédier à une adresse différente ?
        </span>
      </div>
      {/* form */}

      <div>
        <form>
          <div className="grid gap-3">
            {check ? (
              <div>
                <div className="grid grid-cols-2">
                  <div className="flex flex-col mr-6">
                    <label className="font-semibold">
                      Prénom <span className="text-red-500 text-[20px] ">*</span>
                    </label>
                    <input
                      required
                      type="text"
                      id="id"
                      className="px-4 py-3 border border-gray-300 text-black"
                    />
                  </div>
                  <div className="flex flex-col ml-6">
                    <label className="font-semibold">
                      Nom <span className="text-red-500 text-[20px] ">*</span>
                    </label>
                    <input
                      required
                      type="text"
                      id="id"
                      className="px-4 py-3 border border-gray-300 text-black"
                    />
                  </div>
                </div>
                <div className="flex flex-col">
                  <label className="font-semibold">Nom de l’entreprise (facultatif)</label>
                  <input
                    required
                    type="text"
                    id="id"
                    className="px-4 py-3 border border-gray-300 text-black"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="font-semibold">
                    Pays/région <span className="text-red-500 text-[20px] ">*</span>
                  </label>
                  <input
                    required
                    type="text"
                    id="id"
                    className="px-4 py-3 border border-gray-300 text-black"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="font-semibold">
                    Numéro et nom de rue <span className="text-red-500 text-[20px] ">*</span>
                  </label>
                  <input
                    required
                    type="text"
                    id="id"
                    className="px-4 py-3 border border-gray-300 text-black"
                  />
                  <input
                    required
                    type="text"
                    id="id"
                    className="px-4 py-3 mt-3 border border-gray-300 text-black"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="font-semibold">
                    Ville <span className="text-red-500 text-[20px] ">*</span>
                  </label>
                  <input
                    required
                    type="text"
                    id="id"
                    className="px-4 py-3 border border-gray-300 text-black"
                  />
                </div>
              </div>
            ) : (
              <div></div>
            )}
            <div className="flex flex-col">
              <label className="font-semibold">Notes de commande (facultatif)</label>
              <textarea
                placeholder="Commentaires concervant botre commande, ex: consignes de livraison"
                required
                id="id"
                className="px-4 py-2 h-[60px] mt-2 border border-gray-300 text-black bg-white"
              />
            </div>
          </div> 
        </form>
      </div>
    </div>
  );
};

export default AdditionalInformation;
