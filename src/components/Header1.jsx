
import React from "react";
import { BiHomeAlt } from "react-icons/Bi";
import { AiFillSetting } from "react-icons/Ai";
import  { useEffect, useState } from "react";
import { BiSolidUser, BiSolidBell } from "react-icons/Bi";
import Search from "./Search";
import { useLocation } from "react-router-dom"
import Months from "./Months";

const pathName = location.pathname.slice(1);


function Header1 ({handleSelectMonth, selectedMonth}) {
    const location = useLocation(); // usar useLocation
  const [pathName, setPathName] = useState(location.pathname.slice(1));

  useEffect(() => {
    setPathName(location.pathname.slice(1));
  }, [location]);

    return (
        <div className=" text-zinc-600 pt-2 pb-6 w-full px-4 mt-4 ">

            <div className="flex justify-between items-center w-full">

                    <div className="flex gap-2">
                        <BiHomeAlt  size={20}/>/
                        <h1>{pathName}</h1> 
                    </div>


                    <div className="">
                            <Search/>
                        </div>

                   
              
                      <div className=" h-1 items-center justify-end flex w-500">
                        <Months className="cursor-pointer" onMonthChange={handleSelectMonth} selectedMonth={selectedMonth} />
                      </div>

                   
            </div>

        </div>
    )
}

export default Header1