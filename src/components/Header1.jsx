import React from "react";
import { BiSolidUser } from "react-icons/bi";
import { useSelector, useDispatch } from "react-redux";
import Months from "./Months";
import { BiHomeAlt } from "react-icons/bi";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { setSelectedMonth } from "../store/slices/monthSlice"; 
import { setSelectedYear } from "../store/slices/yearSlice";// Importe a ação para definir o mês selecionado
import Search from "./Search";
import logo from "../../Images/logo2.png";


const pathName = location.pathname.slice(1);

function Header1({}) {
  const location = useLocation(); // usar useLocation
  const [pathName, setPathName] = useState(location.pathname.slice(1));
  const userEmail = useSelector((state) => state.user?.email);
  const selectedMonth = useSelector((state) => state.month.value); // Obtenha o mês selecionado
  const selectedYear = useSelector((state) => state.year.value); // Obtenha o mês selecionado


  const dispatch = useDispatch(); // Obtenha a função dispatch

  useEffect(() => {
    setPathName(location.pathname.slice(1));
  }, [location]);

  const handleSelectMonth = (newMonth) => {
    dispatch(setSelectedMonth(newMonth)); // Atualize o mês selecionado usando a ação
  };

  const handleSelecYear = (newYear) => {
    dispatch(setSelectedYear(newYear)); // Atualize o mês selecionado usando a ação
  };


  return (
    <div>
      <div className="text-zinc-600 pt-0 md:pt-2 pb-3 w-full px-6 mt-0 md:mt-3">
        <div className="grid md:flex md:justify-between items-center w-full">
        <div className="flex md:hidden justify-end">
            <div className="absolute top-0 left-0 mt-[-30px] ml-[-10px]" >
              <img src={logo} alt="Logo" className="h-36" />
            </div>
            <div className="flex mt-10 justify-end">
              <span className="text-xs mr-2">{userEmail}kk</span>
              <BiSolidUser size={16} />
            </div>
         </div>

          <div className="hidden md:flex gap-2">
            <BiHomeAlt size={16} />
            <span className="text-sm">/</span>
            <h1 className="text-sm">{pathName}</h1>
            <span className="text-sm">/</span>
            <h1 className="text-sm z-50">{selectedYear}</h1>
            <span className="text-sm">/</span>
            <h1 className="text-sm z-50">{selectedMonth}</h1>

          </div>

          <div className="hidden md:flex w-3/4 md:w-1/5 justify-center mt-10 md:mt-0 md:mr-24">
            <Search />
          </div>

          <div className="hidden md:flex gap-2 items-end">
            <span className=" text-sm items-center ">{userEmail}</span>
            <BiSolidUser size={20} />
          </div>
         
          <div className="flex md:hidden gap-2 mt-16 ">
            <BiHomeAlt size={16} />
            <span className="text-sm">/</span>
            <h1 className="text-sm">{pathName}</h1>
            <span className="text-sm">/</span>
            <h1 className="text-sm z-50">{selectedMonth}</h1>
          </div>

        </div>
      </div>
      <div className="border-b border-zinc-300 h-2 mx-6"></div>
    </div>
  );
}

export default Header1;
