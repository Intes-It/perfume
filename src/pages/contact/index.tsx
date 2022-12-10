import { Container } from "@components/container";
import Map from "@components/googleMap";
import * as React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClock,
  faEnvelope,
  faLocationDot,
  faPhoneFlip,
} from "@fortawesome/free-solid-svg-icons";
const Contact = () => {
  return (
    <Container>
      <div className="flex flex-col items-center my-[40px] space-y-10 ">
        <div className="flex  xl:w-[1200px] w-[80vw] mobile:flex-col mobile:space-y-5  justify-between divide-x mobile:divide-none border-t-2 border-gray-500">
          <div className="flex mt-[40px] ">
            <FontAwesomeIcon
              className="bg-[#EFF7CF] px-2.5 py-2 rounded-[50%] text-gray-700"
              icon={faLocationDot}
            />
            <div className="mx-5">
              <h5 className="text-[20px] mobile:text-[16px] text-[#383E42] pt-1 pb-3">
                Nature Féerique
              </h5>
              <p className="text-[16px] text-[#603813] mobile:text-[14px]">
                61 Montée Des Amandiers, 26110 Saint-Maurice Sur Eygues, France
              </p>
            </div>
          </div>
          <div className="flex mt-[40px] ">
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
          </div>
          <div className="flex mt-[40px]">
            <FontAwesomeIcon
              className="ml-4 mobile:ml-0 bg-[#EFF7CF] px-2 py-2 rounded-[50%] text-gray-700 "
              icon={faEnvelope}
            />
            <div className="mx-5">
              <h5 className="text-[20px] text-[#383E42] pt-1 pb-3 mobile:text-[16px]">E-mail</h5>
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
            containerElement={<div style={{ height: `400px`, margin: `auto` }} />}
            mapElement={<div style={{ height: `100%` }} />}
          />
        </div>
        <div className="flex xl:w-[1200px] w-[80vw] mobile:flex-col my-[40px] justify-between divide-x mobile:divide-x-0 mobile:divide-y mobile:space-y-8 ">
          <div className="w-[35%] mobile:w-[80vw]">
            <h3 className="text-[32px] text-[#603813] mobile:text-[24px]">Rester En Contact</h3>
            <h5 className="py-2 text-[20px] mobile:text-[16px] text-[#383E42]">Service Client</h5>
            <ul className="flex flex-col space-y-2 text-[16px] text-[#383E42] mobile:text-[14px]">
              <li>
                <FontAwesomeIcon
                  className="mr-4 text-sm text-gray-700"
                  icon={faEnvelope}
                />
                contact@naturefeerique.fr
              </li>
              <li>
                <FontAwesomeIcon
                  className="mr-4 text-sm text-gray-700"
                  icon={faPhoneFlip}
                />
                07 81 55 41 55
              </li>
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
          <div className="w-[60%] mobile:w-[80vw] text-[16px] text-[#603813]">
            <h5 className="ml-16 mb-8 font-semibold text-[20px] mobile:text-[16px] mobile:ml-0 mobile:my-5" >Vous Avez Des Questions?</h5>
            <p className="ml-16 mobile:ml-0">
              <strong>Deprecated:</strong> La fonction _register_controls est <strong>obsolète</strong> depuis la
              version 3.1.0 ! Utilisez
              Elementor\Controls_Stack::register_controls() à la place. in
              <strong>/home/naturefexe/www/wp-includes/functions.php</strong> on line <strong>5383</strong>
            </p>
            <form
            action="#"
            className="flex flex-col space-y-5 ml-16 mobile:ml-0 font-semibold mobile:mt-4 "
          >
            <div className="flex flex-col space-y-1">
              <label>
                Nom{" "}
                <span className="text-red-500 text-[20px] ">*</span>
              </label>
              <input
                required
                type="nom"
                id="nom"
                className="px-4 py-3 border border-gray-300 text-black bg-[#FAFAFA]"
              />
            </div>
            <div className="flex flex-col space-y-1">
                <label>
                  E-mail{" "}
                  <span className="text-red-500 text-[20px] ">*</span>
                </label>
              <input
                required
                type="mail"
                id="mail"
                className="px-4 py-3 border border-gray-300 text-black bg-[#FAFAFA]"
              />
            </div>
            <div className="flex flex-col space-y-1" >
              <label>
                    Message{" "}
                    <span className="text-red-500 text-[20px] ">*</span>
                  </label>
              <textarea
                placeholder="Écrivez ici…"
                  required
                  id="id"
                  className="px-4 py-2 h-[150px] border border-gray-300 text-black bg-[#FAFAFA]"
                />
            </div>
            <div>
              <button
                type="submit"
                className="w-[120px] px-4 py-3 text-[13px] text-[#26222F] font-semibold uppercase border border-black  rounded-md hover:bg-black hover:text-white"
              >
                Envoyer
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
