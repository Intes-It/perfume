import * as React from "react";

type DropdownProps = {
  selections: any;
  onChange:(value : any)=>void;
};
const DropdownSelect: React.FC<DropdownProps> = ({ selections ,onChange}) => {

  const handleChange = () => {
    const e = (document.getElementById("s") as HTMLInputElement).value
    onChange(e);
  }
  return (
    <select id="s" className="md:w-44 w-30 p-4 border rounded bg-white text-[#603813] text-[14.4px] mobile:text-[12.6px] mobile:w-28 cursor-pointer"
      onChange={handleChange}  >
      {selections?.map((selection: any, index: number) => (
        <option  key={index} value={selection.value}>
          {selection.name}
        </option>
      ))}
    </select>
  );
};

export default DropdownSelect;
