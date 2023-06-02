import React, { useEffect } from "react";
import { Container } from "@components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { clearCart } from "@redux/slices/cart";

const StripeSuccess = () => {
  const router = useRouter();
 /*  const dispatch=useDispatch()
  useEffect(()=>{
    dispatch(clearCart)
  },[]) */
  return (
    <Container>
      <div className="mx-auto p-5  grid ">
        <div className="mx-auto mb-5 w-[70px] h-[70px] flex justify-center items-center rounded-full border border-black bg-[#1f9163]">
          <FontAwesomeIcon color="white" fontSize={"1.5rem"} icon={faCheck} />
        </div>
        <span className="mb-1 text-center text-[22px]   ">Payment Done!</span>
        <span className="mb-1 text-center  ">
          Thank you for completing your secure online payment
        </span>
        <span className="mb-1 text-center ">Have a great day!</span>
        <button
          className="p-2  rounded-md border border-black bg-[#1f9163]"
          onClick={()=>router.push('/')}
        >
          Go back
        </button>
      </div>
    </Container>
  );
};

export default StripeSuccess;
