import * as React from 'react';
import { useState, useEffect } from 'react';

type DropdownProps = {
  title: string;
  selections: any;
  onChange: (value: any) => void;
  products?: any;
};
const DropdownCheckbox: React.FC<DropdownProps> = ({ title, selections, onChange }) => {
  const [isList, setIsList] = useState(false);
  const [state, setState] = useState({
    newArr: [],
  });
  const { newArr } = state;

  useEffect(() => {
    console.log('selections:%o',selections);
    setState((o) => ({
      ...o,
      newArr: selections?.map((r: any, index: number) => {
        return {
          name: r.name,
          value: r.value,
          id: index,
          checked: false,
        };
      }),
    }));
  }, [selections?.length]);

  const handleCheck = (value: any, id: number) => {
    newArr?.map((r: any) => {
      if (r.id === id) {
        r.checked = !r.checked;
      } else {
        r.checked = false;
      }
    });
    onChange(value.target.value);
    // console.log(newArr);
  };

  return (
    <div className="font-semibold">
      <div
        onClick={() => setIsList(!isList)}
        className="w-60 tablet:w-40 mobile:text-[14px] mobile:w-44 p-4 border rounded bg-white text-[#603813] text-[14.4px] leading-none flex items-center justify-between cursor-pointer">
        {title}
        <div>
          {isList ? (
            <div>
              <svg
                width={10}
                height={6}
                viewBox="0 0 10 6"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
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
                xmlns="http://www.w3.org/2000/svg">
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
          {newArr?.map((selection: any, index: number) => (
            <div key={index} className="flex space-x-2 cursor-pointer">
              <input
                type="checkbox"
                id="remember"
                className="w-4 h-4"
                checked={selection.checked}
                value={selection.value}
                onClick={(value) => handleCheck(value, selection.id)}
              />
              <p className="">{selection.name}</p>
            </div>
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
