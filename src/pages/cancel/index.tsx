import { Container } from '@components/container';
import { faCancel } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

const Cancel = () => {
  return (
    <Container>
      <div className="mx-auto p-5  grid ">
        <div className="mx-auto mb-5 w-[70px] h-[70px] flex justify-center items-center rounded-full border border-black bg-[#da0f01]">
          <FontAwesomeIcon color="white" fontSize={'1.5rem'} icon={faCancel} />
        </div>
        <span className="mb-1 text-center text-[22px]   ">Oops something went wrong</span>
        <span className="mb-1 text-center  ">Try it again!</span>
        <button className="p-2  rounded-md border border-black bg-[#da0f01] ">Go back</button>
      </div>
    </Container>
  );
};

export default Cancel;
