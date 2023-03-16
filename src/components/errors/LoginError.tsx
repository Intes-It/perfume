import React from "react";

const LoginError = () => {
  return (
    <div className="w-full mx-2 my-2 bg-[#f7f6f7] h-15 py-4" style={{borderTop:'3px solid #b81c23'}}>
      <div className="flex">
         <b className="text-white bg-red-800 rounded-full w-5 h-5 block text-center text-base mr-4">
          !
        </b>
        <p><b>Eurrer </b>: Identifiant obligatoire.</p>
      </div>
    </div>
  );
};

export default LoginError;
