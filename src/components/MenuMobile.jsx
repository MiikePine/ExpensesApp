import React from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { useState } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import MenuMobileR from "./MenuMobileR";
import { TfiClose } from "react-icons/tfi";

function MenuMobile() {
  const [showMenu, setShowMenu] = useState(false);
  const location = useLocation();
  const pathName = location.pathname.slice(1);

  return (
    <div className="w-full justify-between flex flex-row md:hidden">
      <div className="md:hidden ml-4 w-32 mb-6 mt-12">
        {/* <div className="w-24">
          <img src="../images/BNI.webp"></img>
        </div> */}
      </div>

      {/* <div className="flex-1">
        <h1 className="mt-12 text-sm">{pathName}</h1>
      </div> */}

      <div className="z-10">
        {/* <button onClick={() => setShowMenu(!showMenu)}>
          {!showMenu ? (
            <AiOutlineMenu size={10} className="mt-12 mr-4 text-red" />
          ) : (
            <TfiClose
              onClick={() => setShowMenu(!showMenu)}
              className="fixed top-[55px] right-[30px] z-20 text-red"
              size={18}
            />
          )}
        </button> */}
        <MenuMobileR />
      </div>
    </div>
  );
}

export default MenuMobile;
