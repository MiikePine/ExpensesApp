
import { NavLink } from "react-router-dom";
import { AiFillSetting } from "react-icons/ai";
import { MdLogout } from "react-icons/Md";
import { RiBillLine } from "react-icons/Ri";
import { TbUsers } from "react-icons/Tb";
import React, { useState, useRef, useEffect } from "react";

    const MenuMobileR = (props) => {
        const [isOpen, setIsOpen,] = useState(true);  


        useEffect(() => {
            if (isOpen) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = 'auto';
            }

            return () => {
                document.body.style.overflow = 'auto';
            };
        }, [isOpen]);
    

        return (  
<div >   
{isOpen && (
        <div
         className={`fixed top-0 bottom-0 left-0 right-0 z-5 bg-black opacity-70 ${isOpen ? "no-scroll" : ""}`}></div>        
      )}
    
        <section className={`${isOpen ? 'fixed top-0 bottom-0 right-0' : 'relative'} "md:hidden bg-neutral-100 flex-col py-4 w-3/5 px-4 pb-10 z-10`} >
            <div  className= "mt-[100px] flex flex-col h-full justify-between text-xl mb-68" >
                <div className="block md:hidden  mt-5">
                <div className="mb-4">
                <NavLink
                    to="/Members"
                    className={({ isActive, isPending }) =>
                    isPending
                        ? ""
                        : isActive
                        ? "p-5 flex bg-red text-white md:max-w-sm  items-center shadow-md shadow-neutral-400 h-5 rounded-xl"
                        : "p-5 flex bg-white text-black md:max-w-sm items-center h-5 rounded-xl"
                    }
                >
                    <TbUsers size={20} className="mr-4"/>
                    Members
                </NavLink>
                </div>

                    <div>
                    <NavLink  
                    to="/Bill"
                    className={({ isActive, isPending }) =>
                    isPending
                        ? ""
                        : isActive
                        ? "p-5 max-w-sm flex bg-red text-white items-center shadow-md shadow-neutral-400 h-5 rounded-xl"
                        : "p-5 max-w-sm flex bg-white text-black  items-center h-5 rounded-xl"
                    }>
                    
                    <RiBillLine size={20} className="mr-4" />
                    Bill
                </NavLink>
                </div>
                </div>

        {/* Menu inferieur */}
                <div className= "block md:hidden mb-20">
                        <div className="mb-4">
                        <NavLink  
                            to="/Settings"
                            className={({ isActive, isPending }) =>
                            isPending
                                ? ""
                                : isActive
                                ? "p-5 max-w-sm flex bg-red text-white items-center shadow-md shadow-neutral-400 h-5 rounded-xl"
                                : "p-5 max-w-sm flex bg-white text-black  items-center h-5 rounded-xl"
                            }>
                            <AiFillSetting size={20} className="mr-4"/>
                            Settings
                            
                        </NavLink>
                        </div>

                        <NavLink  
                            to="/Logout"
                            className={({ isActive, isPending }) =>
                            isPending
                                ? ""
                                : isActive
                                ? "p-5 max-w-sm flex bg-red text-white items-center shadow-md shadow-neutral-400 h-5 rounded-xl"
                                : "p-5 max-w-sm flex bg-white text-black  items-center h-5 rounded-xl"
                            }>
                                
                            <MdLogout size={20} className="mr-4"/> Logout
                        </NavLink>
                        </div>
                </div>
            </section>   
    </div>
  
        )
}

export default MenuMobileR;