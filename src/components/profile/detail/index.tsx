import React from 'react';

const Detail = () => {
  return (
    <div>
      <form>
        <div className="grid gap-3">
          <div className="grid grid-cols-2">
            <div className="flex flex-col mr-6">
              <label className="font-semibold">
                Prénom <span className="text-red-500 text-[20px] ">*</span>
              </label>
              <input type="text" id="first_name" className={`px-4 py-3 border  text-black`} />
            </div>
            <div className="flex flex-col ml-6">
              <label className="font-semibold">
                Nom <span className="text-red-500 text-[20px] ">*</span>
              </label>
              <input type="text" id="last_name" className={`px-4 py-3 border  text-black`} />
            </div>
          </div>
          <div className="flex flex-col">
            <label className="font-semibold">
              Nom affiché <span className="text-red-500 text-[20px] ">*</span>
            </label>
            <input
              type="text"
              id="company_name"
              className="px-4 py-3 border border-gray-300 text-black"
            />
          </div>
          <div className="flex flex-col">
            <label className="font-semibold">
              E-mail <span className="text-red-500 text-[20px] ">*</span>
            </label>
            <input type="text" id="email" className="px-4 py-3 border border-gray-300 text-black" />
          </div>
          <div className="flex flex-col">
            <label className="font-semibold">
              Mot de passe actuel (laisser vide pour le conserver)
            </label>
            <input
              type="text"
              id="password"
              className="px-4 py-3 border border-gray-300 text-black"
            />
          </div>
          <div className="flex flex-col">
            <label className="font-semibold">
              Nouveau mot de passe (laisser vide pour conserver l’actuel)
            </label>
            <input
              type="text"
              id="new_password"
              className="px-4 py-3 border border-gray-300 text-black"
            />
          </div>
          <div className="flex flex-col">
            <label className="font-semibold">Confirmer le nouveau mot de passe</label>
            <input
              type="text"
              id="confirm_password"
              className="px-4 py-3 border border-gray-300 text-black"
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default Detail;
