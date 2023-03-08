import { faWindowMaximize } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

const Delivery = () => {
  return (
    <div>
      <div className="border-t-[3px] border-[#603813] bg-[#F7F6F7] p-5">
        <FontAwesomeIcon icon={faWindowMaximize} className="mr-3" fontSize={'1.2rem'} />
        <span>Aucun téléchargement actuellement disponible.</span>
      </div>
    </div>
  );
};

export default Delivery;
