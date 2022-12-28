import React, { useEffect, useState } from "react"; 
import { Container } from "@components";

import { homeSlideInfo, productItem } from "src/utils/fakeData"; 
import { BestSales } from "@components/best-sales";

const Home: React.FC = () => { 
  const [state] = useState({
    homeSlideData: homeSlideInfo,
    bestSellingProducts: productItem,
  });

  const { homeSlideData, bestSellingProducts } = state;

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
          {homeSlideData?.map((item: any, index: number) => (
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
          {homeSlideData?.map((item: any, index: number) => (
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
                    className="rounded-full h-12 bg-white text-lg min-w-[140px] border-white border hover:bg-transparent hover:text-white"
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

      <div className="my-16 md:min-h-[15vw] min-h-[12rem] w-full grid content-center bg-[#cec2b9]">
        <span className="text-center md:text-[36px] text-[24px] m-2 text-white font-bold">
          CHOISISSEZ DES PRODUITS NATURELS QUI FAVORISENT VOTRE BIEN-ÊTRE ET
          VOUS FONT VOUS SENTIR BIEN
        </span>
      </div>

      {/* best sales */}
      <div>
        <div className="w-full grid">
          <span className="text-center text-[32px] font-semibold tracking-wide text-[#383e42]">
            NOS MEILLEURES VENTES
          </span>
        </div>

        <BestSales products={bestSellingProducts} />
      </div>
    </Container>
  );
};

export default Home;
