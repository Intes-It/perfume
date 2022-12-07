import { Container } from "@components/container";
import * as React from "react";
import ReCAPTCHA from 'react-google-recaptcha';

const Blog1 = () => {
  return (
    <div className="flex flex-col justify-between items-center text-[24px] text-[#26222f]">
      <div className="relative">
        <h2 className="absolute top-1/2 left-1/2 -translate-y-2/4 -translate-x-2/4 text-[56px] text-[#fdf6f1] ">Le Comptoir D’Alinea</h2>
        <img
          style={{ width: '100vw', height: '490px' }}
          src={'/images/blog11.webp'}
          alt=""
        />
      </div>
      <div className="text-justify w-[95vw] mt-[100px] xl:w-[1180px] ">
        <h2>
          Nature Féerique a l’opportunité de participer à la nouvelle expérience
          de l’enseigne Alinea, qui a ouvert ses portes à la création et à
          l’artisanat avec son nouveau lieu éphémère d’échanges et de partages :
          le Comptoir d’Alinea.
        </h2>
      </div>
      <div className=" flex justify-between text-justify mt-[100px] w-[95vw] xl:w-[1180px] ">
        <div style={{ width: '48%' }}>
          <h2>
            Ainsi, le Comptoir offre une vitrine d’exception à tous les
            artisans, créateurs et entreprises locales qui partagent les mêmes
            valeurs et convictions qu’Alinea vous permettant de partir à leur
            rencontre et de vous transporter dans leur univers.
          </h2>
          <h2>
            L’occasion idéale pour Nature Féerique, jeune marque naissante, de
            promouvoir le lancement de ses trois premiers cosmétiques naturels
            solides : Déodorant Plume, Démaquillant Cocoon et Soin Précieux.
          </h2>
          <h2>
            Nature Féerique est présente du 15 Septembre au 16 Octobre 2021 au
            magasin Alinea Avignon-Le Pontet, pour exposer, vous faire découvrir
            et tester ses cosmétiques solides.
          </h2>
        </div>
        <img style={{ width: '49%' }} src={'/images/blog12.webp'} alt="" />
      </div>
      <div className="text-justify w-[95vw] mt-[180px] mb-12 xl:w-[967px]">
          <h3 className="my-4 text-[26px]  text-[#26222f]">Laisser un commentaire</h3>
          <p className="my-4 text-[16px]  text-[#603813]">Votre adresse e-mail ne sera pas publiée. Les champs obligatoires
            sont indiqués avec *</p>
          <form
            className="flex flex-col space-y-5 "
          >
              <textarea
              placeholder="Écrivez ici…"
                required
                id="id"
                className="px-4 py-2 h-[300px] border border-gray-300 text-[16px] bg-[#FAFAFA]"
              />
            <div className="flex justify-between py-4 text-[16px]">
              <input
                required
                type="text"
                placeholder="Nom*"
                className="w-[30%] h-15 px-4 py-3 border border-gray-300 bg-[#FAFAFA]"
              />
              <input
                required
                type="email"
                placeholder="E-mail*"
                className="w-[30%] px-4 py-3 border border-gray-300 bg-[#FAFAFA]"
              />
              <input
                type="site"
                placeholder="Site Internet"
                className="w-[30%] px-4 py-3 border border-gray-300 bg-[#FAFAFA]"
              />
            </div>
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="remember" className="w-4 h-4 " />
                <p className="text-[16px] text-[#603813]">
                Enregistrer mon nom, mon e-mail et mon site dans le navigateur pour mon prochain commentaire.
                </p>
            </div>
            <ReCAPTCHA
              sitekey="6Lc2xVYjAAAAAIuk6-oEbePPkK0caIt1JrnPIOOp"
              // onChange={onChange}
            />
            <div>
              <button
                type="submit"
                className="w-[250px] px-4 py-4 text-[14.5px] uppercase font-semibold text-[#262238]  bg-[#ACD051] rounded-md shadow hover:bg-black hover:text-white"
              >
                Publier un commentaire »
              </button>
            </div>
          </form>
        </div>
    </div>
  );
};
export default Blog1;
