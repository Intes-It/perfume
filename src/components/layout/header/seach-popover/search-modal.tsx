import React, { ReactEventHandler } from "react";
type SearchProps={
  isVisible:boolean,
  onClose:()=>void
}
const SearchModal:React.FC<SearchProps> = ({isVisible, onClose}) => {
  if (!isVisible) return null;
  const handleClose = (e:any) => {
    if(e.target.id === 'wrapper') onClose();
  }
  return (
    <div id='wrapper' onClick={handleClose} className="animate-crescendo fixed z-50 inset-0 bg-black bg-opacity-75 flex justify-center items-center m-0">
      <button onClick={() => onClose()} className="fixed top-[50%] right-[50px] text-white text-xl place-self-end  mobile:right-[15px]">X</button>
      <input
            type="text"
            className="form input px-4 py-4 w-[60vw] bg-black bg-opacity-0 focus:outline-none text-white text-[50px] text-center border-b-2 mobile:text-[30px]"
            placeholder="Recherche..."
            />
    </div>
  );
};

export default SearchModal;
