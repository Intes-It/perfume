import * as React from "react";
import { useMemo } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as solidFaStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as regularFaStar } from "@fortawesome/free-regular-svg-icons";

export type RatingProps = {
  score: number;
};

const Rating: React.FC<RatingProps> = ({ score }) => {
  const ratingStar = useMemo(() => {
    const array = [0, 0, 0, 0, 0];
    if (!score) return array;
    return array.map((item, index) => (index < score ? 1 : 0));
  }, [score]);
  
  return (
    <div>
      {ratingStar?.map((star, index) =>
        star === 1 ? (
          <FontAwesomeIcon
            key={index}
            className="text-yellow-400"
            icon={solidFaStar}
          />
        ) : (
          <FontAwesomeIcon
            key={index}
            className="text-[#22222222]"
            icon={regularFaStar}
          />
        )
      )}
    </div>
  );
};

export default Rating;
