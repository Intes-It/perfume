import { faWindowMaximize } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

const Order = () => {
  return (
    <div>
      <div className="border-t-[3px] border-[#603813] bg-[#F7F6F7] p-5">
        <FontAwesomeIcon className="mr-3" fontSize={'1.2rem'} icon={faWindowMaximize} />
        <span>Aucune commande n’a encore été passée.</span>
      </div>
    </div>
  );
};

export default Order;
