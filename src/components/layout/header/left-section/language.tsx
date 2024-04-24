import React from "react";

import setLanguage from "next-translate/setLanguage";
const languageDropDown = [
  { label: "English", value: "en" },
  { label: "Viet Nam", value: "vn" },
];
const Language = () => {

  return (
    <select name="language" id="lang" className="border-none focus:border-none" onChange={(v)=>setLanguage(v.target.value)}>
      <option hidden>Language</option>
      {languageDropDown.map((item, index) => (
        <option key={index} value={item.value}>
          {item.label}
        </option>
      ))}
    </select>
  );
};

export default Language;
