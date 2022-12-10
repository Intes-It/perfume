import { Container } from "@components/container";
import * as React from "react";

const TextList = [
  {
    question: "Où sont conçus et fabriqués vos cosmétiques solides ?",
    answer: [
      "Nos formules ont été imaginées et développées par la Créatrice, dans son laboratoire de Recherche & Développement. Nos cosmétiques solides sont ensuite fabriqués artisanalement, dans un atelier situé en Drôme Provençale",
    ],
  },
  {
    highlight: "“l’origine”",
    question: "D’où viennent vos ingrédients ?",
    answer: [
      "Nous travaillons majoritairement avec des fournisseurs locaux. Nous avons d’ailleurs sélectionné nos ingrédients suivant un critère important",
      ". C’est pourquoi la plupart de nos ingrédients sont d’origine France ou fabriqués en France.",
    ],
  },
  {
    question:
      "Quels sont les ingrédients les plus utilisés dans vos cosmétiques ?",
    answer: [
      "Nos cosmétiques ont une composition 100% naturelle, saine et minimaliste. Nous nous sommes fixé une limite de 10 ingrédients maximum par formule, afin d’avoir de la flexibilité sur nos textures. A travers nos cosmétiques solides nous souhaitions combiner l’innovation, la sensorialité et l’originalité et avec moins de 6-8 ingrédients la texture parfaite (application, pénétration, fini) est impossible !",
      "Nous avons donc sélectionné des ingrédients polyvalents, fonctionnels au toucher agréable avec des propriétés remarquables.",
      "Nos principaux ingrédients sont l’huile de prune, huile d’olive, beurre de prune, beurre d’olive, cire de ricin, cire d’olive.",
    ],
  },
  {
    question: "Vos produits sont-ils Vegan et non testés sur les animaux ?",
    answer: [
      "Oui, tous nos cosmétiques sont Vegan et ne contiennent aucun ingrédient d’origine animale. Tous nos ingrédients sont naturels, d’origine végétale ou minérale.",
      "Dans le respect des animaux et conformément à la Réglementation européenne, aucun de nos produits et ingrédients n’est testé sur les animaux.",
    ],
  },
  {
    question:
      "Vos produits sont-ils adaptés aux bébés, aux enfants, femmes enceintes ?",
    answer: [
      "Nos produits ont été développés pour une utilisation universelle et unisexe, ils ne contiennent pas de parfum ni d’huile essentielle et s’adaptent donc au quotidien de toute la famille.",
      "Cependant, la Réglementation cosmétiques des produits bébés étant particulière, nous n’avons pas réalisé les démarches nécessaires pour prétendre une utilisation sur les enfants de moins de 3 ans, nous ne pouvons donc pas vous garantir si nos produits sont adaptés pour les bébés.",
      "Nos Soin Précieux, Perles de Soin, Démaquillant Cocoon et Perles Démaquillantes conviennent parfaitement aux enfants à partir de 3 ans, aux femmes enceintes et allaitantes.",
      "Notre Déodorant Plume est adapté aux enfants à partir de 12 ans, aux femmes enceintes et allaitantes.",
    ],
  },

  {
    question: "Vos produits sont-ils adaptés aux peaux grasses et acnéiques ?",
    answer: [
      "Nous avons soigneusement sélectionné nos ingrédients pour que nos produits soient sains et universels. Les huiles végétales (Prune, Olive) et beurres végétaux (Prune, Karité et Olive) utilisés dans nos produits sont non comédogènes ou très peu comédogènes donc ils conviennent tout à fait aux peaux grasses et acnéiques.",
    ],
  },
  {
    question: "Quels sont les délais de livraison ?",
    answer: [
      "Vos commandes sont préparées et expédiées dans un délai maximum de 3 à 4 jours.",
      "Nos livraisons sont assurées par La Poste et le délai est d’environ 48 à 72h. Vous avez la possibilité de suivre l’acheminement de votre colis grâce au numéro de suivi envoyé par e-mail lors de la confirmation de votre commande",
    ],
  },
  {
    highlight:"le délai de rétractation légal est de 14 jours",
    question: "Que faire en cas de problème avec la commande ?",
    answer: [
      "Votre satisfaction étant notre priorité, nous vous offrons la possibilité de nous retourner votre commande en cas de problème avec celle-ci (erreur, produit abîmé, insatisfaction…). Attention, le retour de votre colis doit être effectué dans les 10 jours suivant sa réception et les frais de renvois seront à votre charge.",
    ],
  },
];

const FAQ = () => {
  return (
    <Container>
      <div  className=" mt-16 container max-w-4xl px-6 py-10 mx-auto text-justify text-[16px] mobile:text-[14px] text-[#603813] leading-8">
        {TextList?.map((text) => (
          <details
            className="-mt-px border w-full hover:cursor-pointer"
            key={text.question}
          >
            <summary className="p-5 mobile:p-2 flex items-center  font-semibold  hover:text-soft-red ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="open w-6 h-6 mr-1 "
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path 
                  strokeWidth="2.5"
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
              {text?.question}
            </summary>
            <div className="border-t p-4 ">
              {text?.highlight && (
                <p>
                  {" "}
                  {text?.answer[0]} <strong>{text.highlight}</strong>
                  {text?.answer[1]}{" "}
                </p>
              )}
              {!text?.highlight &&
                text?.answer?.map((answer, index) => <p key={index}> {answer}</p>)}
            </div>
          </details>
        ))}
      </div>
      
    </Container>
  );
};

export default FAQ;
