import { Container } from '@components/container';
import { faCancel, faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { api } from '@utils/apiRoute';
import { GET } from '@utils/fetch';
import { useEffect } from 'react';

const Success: React.FC = () => {
  useEffect(() => {
    GET(api.successOrder).then((res) => {
      console.log(res);
    });
  }, []);
  return (
    <Container>
      <div className="mx-auto p-5  grid ">
        <div className="mx-auto mb-5 w-[70px] h-[70px] flex justify-center items-center rounded-full border border-black bg-[#1f9163]">
          <FontAwesomeIcon color="white" fontSize={'1.5rem'} icon={faCheck} />
        </div>
        <span className="mb-1 text-center text-[22px]   ">Payment Done!</span>
        <span className="mb-1 text-center  ">
          Thank you for completing your secure online payment
        </span>
        <span className="mb-1 text-center ">Have a great day!</span>
        <button className="p-2  rounded-md border border-black bg-[#1f9163]">Go back</button>
      </div>
    </Container>
  );
};

export default Success;
