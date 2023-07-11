
import React from "react";
import { BiHomeAlt } from "react-icons/Bi";
import { AiFillSetting } from "react-icons/Ai";
import  { useEffect, useState } from "react";
import { BiSolidUser, BiSolidBell } from "react-icons/Bi";
import Search from "./Search";
import { useLocation } from "react-router-dom"

const pathName = location.pathname.slice(1);


function Header1 () {
    const location = useLocation(); // usar useLocation
  const [pathName, setPathName] = useState(location.pathname.slice(1));

  useEffect(() => {
    setPathName(location.pathname.slice(1));
  }, [location]);

    return (
        <div className=" text-zinc-500 pt-2 w-full px-4 mt-4 ">

            <div className="flex justify-between items-center w-full">
                    <div className="flex gap-2">
                        <BiHomeAlt  size={20} className=""/>/
                        <h1>{pathName}</h1> 
                    </div>
                    <div className="">
                            <Search/>
                        </div>

                    <div className="flex items-center gap-6">
                    {/* <div>
                            <Search/>
                        </div> */}
                        <div>
                            <AiFillSetting size={22}/>
                        </div>
                        <div>
                            <BiSolidUser size={22}/>
                        </div>

                        <div>
                            <BiSolidBell size={22}/>
                        </div>

                        
                    </div>
            </div>
            {/* <div className="border-b border-2 border-green-700 mt-8 mr-10"></div> */}

        </div>
    )
}

export default Header1