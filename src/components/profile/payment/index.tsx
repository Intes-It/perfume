import { faWindowMaximize } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';

const Payment = () => {
  const [showCard, setShowCard] = useState(false);
  return (
    <div>
      {!showCard ? (
        <>
          {' '}
          <div className="border-t-[3px] border-[#603813] bg-[#F7F6F7] p-5">
            <FontAwesomeIcon icon={faWindowMaximize} className="mr-3" fontSize={'1.2rem'} />
            <span>Aucun moyen sauvegardé trouvé.</span>
          </div>
          <button onClick={() => setShowCard(true)} className="mt-2 border p-3 border-black ">
            AJOUTER UN MOYEN DE PAIEMENT
          </button>{' '}
        </>
      ) : (
        <div>
          <form>
            <div className="grid gap-3 bg-[#efefef] ">
              <div className="flex flex-col mt-6 mr-6 ml-6">
                <label className="font-semibold">
                  Numéro de carte <span className="text-red-500 text-[20px] ">*</span>
                </label>
                <input
                  placeholder="1234 1234 1234 1234"
                  required
                  type="text"
                  id="id"
                  className="h-[35px] mt-2 px-4 py-3 border border-gray-300 text-black"
                />
              </div>
              <div className="grid grid-cols-2 mt-10 mb-10">
                <div className="flex flex-col mr-6 ml-6">
                  <label className="font-semibold">
                    Date d’expiration <span className="text-red-500 text-[20px] ">*</span>
                  </label>
                  <input
                    required
                    type="text"
                    id="id"
                    className="h-[35px] mt-2 px-4 py-3 border border-gray-300 text-black"
                  />
                </div>
                <div className="flex flex-col ml-6 mr-6">
                  <label className="font-semibold">
                    Cryptogramme visuel <span className="text-red-500 text-[20px] ">*</span>
                  </label>
                  <input
                    required
                    type="text"
                    id="id"
                    className=" h-[35px] mt-2 px-4 py-3 border border-gray-300 text-black"
                  />
                </div>
              </div>
            </div>
          </form>
          <button onClick={() => setShowCard(false)} className='float-right mt-3 p-3 text-white bg-[#603813]'> AJOUTER UN MOYEN DE PAIEMENT</button>
        </div>
      )}
    </div>
  );
};

export default Payment;
