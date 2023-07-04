import React, { useState } from "react";
import Register from "./Register"
import Button from "./Button";


const Filter = ({ onFilterActif, onSortByDate, onRegisterSuccess }) => {
  const [active, setActive] = useState(false);
  const [activeDate, setActiveDate] = useState(false);
  const [showRegister, setShowRegister] = useState(false);


  const openMenuM = () => {
    setShowRegister(!showRegister);
}


  const handleSortByDateClick = () => {
    const newActiveDate = !activeDate;
    setActiveDate(newActiveDate);
    onSortByDate(newActiveDate);
  };

  const handleFilterClick = () => {
    const newActive = !active;
    setActive(newActive);
    onFilterActif(newActive);
  };

  const buttonStyle = {
    backgroundColor: active ? "red" : "white",
    color: active ? "white" : "black",
  };

  const dateButtonStyle = {
    backgroundColor: activeDate ? "red" : "white",
    color: activeDate ? "white" : "black",
  };


  return (
    <div className="flex-1 flex-col mt-2 mb-4 md:mb-8 md:flex-row md:mt-0 md:pt-4 z-50 ">
      <div className="flex relative flex-col gap-4 md:flex-row">
              <div className="md:flex ">
                  <button
                        className="px-28 py-2 md:px-7 md:py-1 md:ml-2 md:mr-4 mb-4 md:mb-0 shadow-md shadow-neutral-400 bg-neutral-100 border hover:bg-black border-[#FF0101] flex items-center text-black rounded-lg"
                        onClick={handleFilterClick}
                        style={buttonStyle}
                      >
                        Actif
                  </button>

                  <button
                        className="px-28 py-2 md:px-7 md:py-1 md:ml-2 shadow-md shadow-neutral-400 hover:border  bg-neutral-100 border border-[#FF0101] flex items-center text-black rounded-lg"
                        onClick={handleSortByDateClick}
                        style={dateButtonStyle}
                      >
                        Date
                  </button>
              </div>
        

              
              </div>
        <div className="border-t-2 border-neutral-300 mt-4 md:border-t-0"></div>
     
{showRegister && <Register onRegisterSuccess={onRegisterSuccess} />}
    </div>
  );
};

export default Filter;