import React, { useEffect } from "react";
import { Container } from "@components";

const slideInfo = [
  {
    url: "https://mldn3w3pos1n.i.optimole.com/cb:453S~5a2d9/w:auto/h:auto/q:mauto/id:aea1de3b3657bf3ad37e5d772129bfc3/https://naturefeerique.fr/Slide1.0-scaled.jpg",
    caption:
      "Pour Noël, optez pour un cadeau 100% artisanal et local. \nDécouvrir notre sélection Noël",
    text: "J'ADORE",
    href: "",
  },
  {
    url: "https://mldn3w3pos1n.i.optimole.com/cb:453S~5a2d9/w:auto/h:auto/q:mauto/id:aea1de3b3657bf3ad37e5d772129bfc3/https://naturefeerique.fr/Slide1.0-scaled.jpg",
    text: "",
    caption: "",
    href: "",
  },
  {
    url: "https://mldn3w3pos1n.i.optimole.com/cb:453S~5a2d9/w:auto/h:auto/q:mauto/id:7c31e1c30840e51557124a176e48f406/https://naturefeerique.fr/Box-a-composer1-scaled.jpg",
    text: "OUI",
    caption:
      "Un cadeau personnalisable avec nos \nbox à composer avec 2 ou 3 produits au choix.",
    href: "",
  },
];

const Home: React.FC = () => {
  useEffect(() => {
    // setTheme('light');
  }, []);

  return (
    <Container>
      <div
        id="homeSlide"
        className="carousel slide relative"
        data-bs-ride="carousel"
      >
        <div className="carousel-indicators absolute right-0 bottom-0 left-0 flex justify-center p-0 mb-4">
          {slideInfo?.map((item: any, index: number) => (
            <button
              key={index}
              type="button"
              data-bs-target="#homeSlide"
              data-bs-slide-to={index}
              className={index === 0 ? "active" : ""}
              aria-current={index === 0 ? "true" : "false"}
              aria-label="Slide 1"
            ></button>
          ))}
        </div>
        <div className="carousel-inner relative w-full overflow-hidden ">
          {slideInfo?.map((item: any, index: number) => (
            <div
              key={index}
              className={`carousel-item ${
                index === 0 ? "active" : ""
              } relative float-left w-full`}
            >
              <div className="absolute z-0 top-1/2 left-1/2 -translate-y-2/4 -translate-x-2/4 w-[100%] text-center">
                {item?.caption && (
                  <div>
                    <span className="whitespace-pre-wrap xl:text-3xl text-2xl text-[#fdf6f1] drop-shadow-2xl shadow-2xl shadow-black">
                      {item?.caption}
                    </span>
                  </div>
                )}
                {item?.text && (
                  <button
                    className="rounded-full h-12 bg-white text-lg min-w-[140px]"
                    ref={item?.ref}
                  >
                    {item?.text}
                  </button>
                )}
              </div>
              <img
                src={item?.url}
                className="block w-full object-cover md:h-[40vw] h-[60rem]"
                alt="..."
              />
            </div>
          ))}
        </div>
        <button
          className="carousel-control-prev absolute top-0 bottom-0 flex items-center justify-center p-0 text-center border-0 hover:outline-none hover:no-underline focus:outline-none focus:no-underline left-0"
          type="button"
          data-bs-target="#homeSlide"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon inline-block bg-no-repeat"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next absolute top-0 bottom-0 flex items-center justify-center p-0 text-center border-0 hover:outline-none hover:no-underline focus:outline-none focus:no-underline right-0"
          type="button"
          data-bs-target="#homeSlide"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon inline-block bg-no-repeat"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </Container>
  );
};

export default Home;
