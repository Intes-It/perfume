import { Container } from "@components/container";
import * as React from "react";

const About = () => {
  const TextNature = [
    "Il y a 3 ans, je préparais le départ pour une semaine de vacances avec mon mari et mes 2 filles. A nous 4, j’ai rempli 4 valises avec chacun ses vêtements puis 4 trousses de toilette avec des produits d’Hygiène & soin volumineux, parfois similaires alors qu’une trousse nomade regroupant des produits communs pour toute la famille serait plus raisonnable et responsable !",
    "C’est en organisant les bagages que j’ai pris conscience que nous utilisions beaucoup de produits superflus contenus dans des bouteilles plastiques encombrantes et polluantes…",
    "Tout se passe dans nos salles de bain… on y trouve des produits cosmétiques en tout genre contenus dans des bouteilles plastiques à usage unique que l’on jette encore et encore. Chaque produit à sa fonction et sa cible, ce qui multiplie considérablement nos déchets quotidiens.",
    "C’est pour cela qu’en novembre 2019, Nature Féerique a imaginé une gamme de cosmétiques naturels solides adaptés à toute la famille, respectueux de la santé et de l’environnement.",
    "Deux ans après, de la recherche des meilleurs ingrédients, majoritairement locaux, au développement des formules, en passant par des tests et ajustements pour trouver la texture idéale, Nature Féerique est fière de vous dévoiler ces 3 premiers produits cosmétiques :",
    "- Déodorant Plume, un soin déodorant naturel solide",
    "- Démaquillant Cocoon, une huile solide 2 en 1 : nettoyante et démaquillante",
    "- Soin Précieux, une crème solide multi-usages",
    "Pour promouvoir son lancement, la marque a eu le privilège d’exposer et faire tester ses cosmétiques solides au Comptoir d’Alinéa, ce nouveau lieu éphémère d’échanges et de partages de l’enseigne Alinéa.",
    "Dans sa démarche, Nature Féerique s’engage à accompagner les familles vers une routine beauté minimaliste et une consommation cosmétique plus responsable.",
  ];
  const TextCreatrice = [
    "Née à Beaune (Côte d’Or), j’ai grandi au milieu des plus beaux vignobles de Bourgogne. C’est vers l’âge de 7 ans que j’ai commencé à me passionner pour les produits de beauté à travers une collection de miniatures de parfum. D’une imagination débordante, j’ai expérimenté mes premiers mélanges avec du gros sel, des craies de couleur et quelques gouttes de parfum dans un bocal en verre pour créer des sels de bain ; auxquels je pouvais rajouter du savon liquide. De caractère déterminée, c’est à la fin du collège, que je me suis orientée vers la chimie.",
    "Durant mes années Lycéennes, j’ai rencontré l’homme extraordinaire, avec qui je partage ma vie aujourd’hui. Ensemble, nous sommes partis dans le Sud (Toulouse et Montpellier) pour réaliser nos études universitaires.",
    "Ma formation ciblée en chimie, cosmétique et esthétique m’a ainsi permis d’acquérir une double compétence : formulation cosmétique et technique esthétique. J’ai donc une parfaite maîtrise quant à la création de produits cosmétiques en adéquation avec leur utilisation et les besoins des différents types de peau.",
    "Au cours de ma Licence professionnelle Parfums, Arômes et Cosmétiques, j’ai pris énormément de plaisir à réaliser un projet tutoré présenté au Concours national U’Cosmetics pour lequel j’ai obtenu fièrement le 1er prix du « concept cosmétique Innovant ». C’est l’accomplissement de ce projet qui m’a donné l’envie de développer une gamme de produits cosmétiques.",
    "Diplômés dans nos domaines respectifs, nos premiers contrats nous ont mené en Drôme Provençale, où nous résidons aujourd’hui avec nos deux adorables filles.",
    "Etant comblée familialement, et ayant pu acquérir d’un point de vue professionnel un savoir-faire maîtrisé (7 années riches d’une expérience au sein d’un laboratoire de recherche et développement à créer des formules cosmétiques pour les plus grandes marques), j’ai décidé de réaliser ce rêve de jeune diplômée qui me tenait à cœur : créer ma propre marque de cosmétiques 100% naturels, à la fois efficaces et sains pour la santé dans le respect de l’environnement !",
    "A travers ces quelques lignes, je tiens tout d’abord à vous raconter ma petite histoire, et par la même occasion vous exprimer ma reconnaissance pour votre soutien depuis la création de la marque « Nature Féerique ». Merci infiniment pour votre confiance et votre fidélité.",
  ];
  return (
    <Container>
      <div className="flex flex-col justify-between items-center text-[20.8px] text-[#383E42] mobile:text-[16px] ">
        <div className=" flex flex-col lg:flex-row justify-between text-justify bg-[#F9F4EE] lg:mt-[100px] mt-[50px] w-[100vw] ">
          <div className="lg:w-[48%] lg:h-[32%] animate-wiggle">
            <img
              src={"/images/about-nature.webp"}
              alt=""
            />
          </div>
          <div className="lg:w-[48%] mobile:mx-5 mx-10">
            <div className="text-center text-[44.8px] mobile:text-[25.6px] font-bold text-[#383E42]">
              <h2>A propos de </h2>
              <h2> Nature Féerique</h2>
            </div>
            <div>
              {TextNature?.map((nature, index) => (
                <h2 key={index}>{nature}</h2>
              ))}
            </div>
          </div>
        </div>
        <div className=" flex justify-between flex-col-reverse lg:flex-row text-justify bg-[#F7F7F7] lg:mt-[100px] mt-[50px] w-[100vw] ">
          <div className="lg:w-[48%] mobile:mx-5 mx-10">
            <div className="text-center text-[44.8px] mobile:text-[25.6px] font-bold text-[#383E42]">
              <h2>Rencontre</h2>
              <h2> Avec la créatrice</h2>
            </div>
            <div>
              {TextCreatrice?.map((creatrice, index) => (
                <h2 key={index}>{creatrice}</h2>
              ))}
              <div className="flex justify-center my-10 mobile:my-5">
                <h3>EMILIE</h3>
                <img className="" src={"/images/about-mini-logo.webp"} alt="" />
              </div>
            </div>
          </div>
          <img
            className="lg:w-[48%] h-[40%]"
            src={"/images/about-creatrice.webp"}
            alt=""
          />
        </div>
      </div>
    </Container>
  );
};

export default About;
