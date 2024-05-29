import { Container } from "@components/container";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as React from "react";
import { useState } from "react";

const InitTextList = [
  {
    question: "Where are your solid cosmetics designed and manufactured?",
    answer: [
      "Our formulas were conceived and developed by the Creator in her Research & Development laboratory. Our solid cosmetics are then handcrafted in a workshop located in Drôme Provençale.",
    ],
  },
  {
    highlight: "“the origin”",
    question: "Where do your ingredients come from?",
    answer: [
      "We primarily work with local suppliers. We have selected our ingredients based on an important criterion.",
      "That is why most of our ingredients are of French origin or made in France.",
    ],
  },
  {
    question: "What are the most used ingredients in your cosmetics?",
    answer: [
      "Our cosmetics have a 100% natural, healthy, and minimalist composition. We have set a limit of 10 ingredients maximum per formula to have flexibility in our textures. Through our solid cosmetics, we wanted to combine innovation, sensory experience, and originality. With fewer than 6-8 ingredients, the perfect texture (application, absorption, finish) is impossible!",
      "So, we have selected versatile, functional ingredients with a pleasant feel and remarkable properties.",
      "Our main ingredients are plum oil, olive oil, plum butter, olive butter, castor wax, and olive wax.",
    ],
  },
  {
    question: "Are your products Vegan and cruelty-free?",
    answer: [
      "Yes, all our cosmetics are Vegan and do not contain any animal-derived ingredients. All our ingredients are natural, either plant-based or mineral-based.",
      "In respect for animals and in accordance with European regulations, none of our products or ingredients are tested on animals.",
    ],
  },
  {
    question:
      "Are your products suitable for babies, children, and pregnant women?",
    answer: [
      "Our products were developed for universal and unisex use; they do not contain fragrance or essential oils and thus fit the daily needs of the whole family.",
      "However, as the cosmetics regulation for baby products is specific, we have not undertaken the necessary steps to claim usage for children under 3 years old, so we cannot guarantee that our products are suitable for babies.",
      "Our Precious Care, Care Pearls, Cocoon Makeup Remover, and Makeup Remover Pearls are perfectly suitable for children from 3 years old, pregnant, and breastfeeding women.",
      "Our Feather Deodorant is suitable for children from 12 years old, pregnant, and breastfeeding women.",
    ],
  },
  {
    question: "Are your products suitable for oily and acne-prone skin?",
    answer: [
      "We have carefully selected our ingredients to ensure our products are healthy and universal. The vegetable oils (Plum, Olive) and vegetable butters (Plum, Shea, and Olive) used in our products are non-comedogenic or very low comedogenic, so they are perfectly suitable for oily and acne-prone skin.",
    ],
  },
  {
    question: "What are the delivery times?",
    answer: [
      "Your orders are prepared and shipped within a maximum of 3 to 4 days.",
      "Our deliveries are handled by La Poste and the delivery time is about 48 to 72 hours. You have the option to track your package using the tracking number sent by email when your order is confirmed.",
    ],
  },
  {
    highlight: "the legal withdrawal period is 14 days",
    question: "What should I do if there is a problem with the order?",
    answer: [
      "Your satisfaction is our priority, so we offer you the possibility to return your order in case of any problem (error, damaged product, dissatisfaction, etc.). Please note that the return of your package must be made within 10 days of receipt and the return shipping costs will be at your expense.",
    ],
  },
];

const FAQ = () => {
  const [state, setState] = useState({
    textList: InitTextList,
  });

  const { textList } = state;

  const handleClickItem = (item: any) => {
    textList.map((row: any) => {
      if (row !== item) row.isExpansion = false;
    });
    item.isExpansion = !item.isExpansion;

    setState((pre) => ({ ...pre }));
  };

  return (
    <Container>
      <div className=" mt-16 container max-w-4xl px-6 py-10 mx-auto text-justify text-[16px] mobile:text-[14px] text-[#603813] leading-8">
        {textList?.map((item: any) => (
          <details
            open={item?.isExpansion}
            onClick={(e) => {
              e.preventDefault();
              handleClickItem(item);
            }}
            className="-mt-px border w-full hover:cursor-pointer"
            key={item?.question}
          >
            <summary className="p-5 mobile:p-2 flex items-center  font-semibold  hover:text-soft-red anim">
              {item?.isExpansion ? (
                <FontAwesomeIcon
                  className="px-2.5 py-2 rounded-[50%]"
                  icon={faMinus}
                />
              ) : (
                <FontAwesomeIcon
                  className="px-2.5 py-2 rounded-[50%]"
                  icon={faPlus}
                />
              )}

              {item?.question}
            </summary>
            <div className="border-t p-4 ">
              {item?.highlight && (
                <p>
                  {" "}
                  {item?.answer[0]} <strong>{item?.highlight}</strong>
                  {item?.answer[1]}{" "}
                </p>
              )}
              {!item?.highlight &&
                item?.answer?.map((answer: any, index: any) => (
                  <p key={index}> {answer}</p>
                ))}
            </div>
          </details>
        ))}
      </div>
    </Container>
  );
};

export default FAQ;
