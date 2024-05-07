import { Container } from "@components/container";
import Map from "@components/googleMap";
import * as React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClock,
  faEnvelope,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import useLocale from "@hooks/useLocale";
import { useDispatch, useSelector } from "react-redux";
import { showToast } from "@redux/slices/toast/toastSlice";

const Contact = () => {
  const text = useLocale();
  const dispatch = useDispatch();
  const handleSubmit = (e: any) => {
    e.preventDefault();
    e.target.reset();
    dispatch(showToast("Your contact sent!"));
  };
  return (
    <Container>
      <div className="flex flex-col items-center my-[40px] space-y-10 ">
        <div className="grid grid-cols-1 md:grid-cols-3 xl:w-[1200px] w-[80vw] mobile:space-y-5  justify-between divide-x mobile:divide-none border-t-2 border-gray-500">
          <div className="flex mt-[40px] ">
            <FontAwesomeIcon
              className="bg-[#EFF7CF] px-2.5 py-2 rounded-[50%] text-gray-700"
              icon={faLocationDot}
            />
            <div className="mx-5">
              <h5 className="text-[20px] mobile:text-[16px] text-[#383E42] pt-1 pb-3">
                {text.contactScreen.naFeerique}
              </h5>
              <p className="text-[16px] text-[#603813] mobile:text-[14px]">
                61 Montée Des Amandiers, 26110 Saint-Maurice Sur Eygues, France
              </p>
            </div>
          </div>
          {/* <div className="flex mt-[40px] ">
            <FontAwesomeIcon
              className="ml-4 mobile:ml-0 bg-[#EFF7CF] px-2 py-2 rounded-[50%] text-gray-700 "
              icon={faPhoneFlip}
            />
            <div className="mx-5 ">
              <h5 className="text-[20px] text-[#383E42] pt-1 pb-3 mobile:text-[16px]">
                Téléphone
              </h5>
              <p className="text-[16px] text-[#603813] mobile:text-[14px]">07 81 55 41 55</p>
            </div>
          </div> */}
          <div className="flex mt-[40px]">
            <FontAwesomeIcon
              className="ml-4 mobile:ml-0 bg-[#EFF7CF] px-2 py-2 rounded-[50%] text-gray-700 "
              icon={faEnvelope}
            />
            <div className="mx-5">
              <h5 className="text-[20px] text-[#383E42] pt-1 pb-3 mobile:text-[16px]">
                {text.contactScreen.email}
              </h5>
              <p className="text-[16px] text-[#603813] mobile:text-[14px]">
                contact@naturefeerique.fr
              </p>
            </div>
          </div>
        </div>
        <div className="xl:w-[1200px] w-[90vw] h-[400px]">
          <Map
            googleMapURL={`https://maps.googleapis.com/maps/api/js?key&callback=initMap`}
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={
              <div style={{ height: `400px`, margin: `auto` }} />
            }
            mapElement={<div style={{ height: `100%` }} />}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:w-[1200px] w-[80vw] my-[40px]  mobile:divide-x-0 mobile:divide-y mobile:space-y-8 ">
          <div className="">
            <h3 className="text-[32px] text-[#603813] mobile:text-[24px] font-bold">
              {text.contactScreen.resEnContact}
            </h3>
            <h5 className="py-2 text-[20px] mobile:text-[16px] text-[#383E42]">
              Service Client
            </h5>
            <ul className="flex flex-col space-y-2 text-[16px] text-[#383E42] mobile:text-[14px]">
              <li>
                <FontAwesomeIcon
                  className="mr-4 text-sm text-gray-700"
                  icon={faEnvelope}
                />
                contact@naturefeerique.fr
              </li>
              {/* <li>
                <FontAwesomeIcon
                  className="mr-4 text-sm text-gray-700"
                  icon={faPhoneFlip}
                />
                07 81 55 41 55
              </li> */}
              <li>
                <FontAwesomeIcon
                  className="mr-4 text-sm text-gray-700"
                  icon={faClock}
                />
                <span>Lun- Ven:</span>
                <p className="ml-7">09:00 - 18:00</p>
              </li>
            </ul>
          </div>
          <div className="text-[16px] text-[#603813]">
            <h5 className="mb-8 font-semibold text-[20px] mobile:text-[16px] mobile:ml-0 mobile:my-5">
              {text.contactScreen.vousADQues}
            </h5>

            <form
              action="#"
              onSubmit={(e) => handleSubmit(e)}
              className="flex flex-col space-y-5 mobile:ml-0 font-semibold mobile:mt-4 "
            >
              <div className="flex flex-col space-y-1">
                <label>
                  {text.contactScreen.nom}{" "}
                  <span className="text-red-500 text-[20px] ">*</span>
                </label>
                <input
                  required
                  type="nom"
                  id="nom"
                  className="px-4 py-3 border border-gray-300 text-black bg-[#FAFAFA] focus:outline-none focus:border-[#1C64F2] focus:rounded focus:border-2 "
                />
              </div>
              <div className="flex flex-col space-y-1">
                <label>
                  {text.accountScreen.email}{" "}
                  <span className="text-red-500 text-[20px] ">*</span>
                </label>
                <input
                  required
                  type="mail"
                  id="mail"
                  className="px-4 py-3 border border-gray-300 text-black bg-[#FAFAFA] focus:outline-none focus:border-[#1C64F2] focus:rounded focus:border-2 "
                />
              </div>
              <div className="flex flex-col space-y-1">
                <label>
                  {text.contactScreen.message}{" "}
                  <span className="text-red-500 text-[20px] ">*</span>
                </label>
                <textarea
                  placeholder={text.contactScreen.ecriveIci}
                  required
                  id="id"
                  className="px-4 py-2 h-[150px] border border-gray-300 text-black bg-[#FAFAFA] focus:rounded outline-none"
                />
              </div>
              <div>
                <button
                  type="submit"
                  className="w-[120px] px-4 py-3 text-[13px] text-[#26222F] font-semibold uppercase border border-black  rounded-md hover:bg-black hover:text-white"
                >
                  {text.contactScreen.envoyer}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Contact;
