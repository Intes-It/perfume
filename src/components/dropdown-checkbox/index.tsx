import * as React from "react";
import { useState } from "react";

type DropdownProps = {
  title: string;
  selections: any;
  onChange: (value: any, id: number) => void;
  products?: any;
  value?: number | string | null;
};
const DropdownCheckbox: React.FC<DropdownProps> = ({
  title,
  selections,
  onChange,
  value,
}) => {
  const [isList, setIsList] = useState(false);

  const handleCheck = (value: any, id: any) => {
    onChange(value.target.checked, id);
  };

  return (
    <div className="font-semibold">
      <div
        onClick={() => setIsList(!isList)}
        className="md:w-60 mobile:text-[14px] mobile:w-44 p-4 border rounded bg-white text-[#603813] text-[14.4px] leading-none flex items-center justify-between cursor-pointer"
      >
        {title}
        <div>
          {isList ? (
            <div>
              <svg
                width={10}
                height={6}
                viewBox="0 0 10 6"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5.00016 0.666664L9.66683 5.33333L0.333496 5.33333L5.00016 0.666664Z"
                  fill="#1F2937"
                />
              </svg>
            </div>
          ) : (
            <div>
              <svg
                width={10}
                height={6}
                viewBox="0 0 10 6"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5.00016 5.33333L0.333496 0.666664H9.66683L5.00016 5.33333Z"
                  fill="#1F2937"
                />
              </svg>
            </div>
          )}
        </div>
      </div>
      {isList && (
        <div className="absolute z-40 w-60 tablet:w-40 mobile:text-[14px] mobile:w-44 mt-2 p-4 space-y-4 bg-white border rounded text-[#603813] text-[16px] ">
          {selections?.map((selection: any, index: number) => (
            <label
              htmlFor={`remember-${index}`}
              key={index}
              className="flex space-x-2 cursor-pointer"
            >
              <input
                type="checkbox"
                id={`remember-${index}`}
                className="w-4 h-4"
                checked={value === selection?.value}
                onChange={(value) => handleCheck(value, selection.value)}
              />
              <p className="">{selection.name}</p>
            </label>
          ))}
        </div>
      )}
    </div>
  );
};

export default DropdownCheckbox;
// import React from 'react';

// import Select from 'react-select';
// import { colourOptions } from "src/utils/fakeData";

// export default () => (
//   <Select
//     defaultValue={[]}
//     isMulti
//     closeMenuOnSelect={false}
//     name="colors"
//     multiValueRemove = {false}
//     options={colourOptions}
//     placeholder= "Catégories"
//     className="basic-multi-select"
//   />
// );
