import React from "react";
import { BiSolidUser } from "react-icons/bi";
import { useSelector, useDispatch } from "react-redux";
import Months from "./Months";
import { BiHomeAlt } from "react-icons/bi";
import { useLocation } from "react-router-dom"
import  { useEffect, useState } from "react";
import { setSelectedMonth } from "../store/slices/monthSlice"; // Importe a ação para definir o mês selecionado
import Search from "./Search";



const pathName = location.pathname.slice(1);


function Header1 ({ }) {
    const location = useLocation(); // usar useLocation
  const [pathName, setPathName] = useState(location.pathname.slice(1));
  const userEmail = useSelector((state) => state.user?.email);
  const selectedMonth = useSelector((state) => state.month.value); // Obtenha o mês selecionado

  const dispatch = useDispatch(); // Obtenha a função dispatch


  useEffect(() => {
    setPathName(location.pathname.slice(1));
  }, [location]);

  const handleSelectMonth = (newMonth) => {
    dispatch(setSelectedMonth(newMonth)); // Atualize o mês selecionado usando a ação
  };

  return (
    <div>
    <div className="text-zinc-600 pt-2 pb-3 w-full px-6 mt-3">
      <div className="flex justify-between items-center w-full">

                    <div className="flex gap-2">
                        <BiHomeAlt  size={16}/>
                        <span className="text-sm">/</span>                        
                        <h1 className="text-sm">{pathName}</h1>
                        <span className="text-sm">/</span>                         
                        <h1 className="text-sm">{selectedMonth}</h1>
                    </div>


                    <div className="hidden sm:block">
    <Search />
</div>


        <div className="flex gap-2">
          <span className="flex text-sm items-center">{userEmail}</span>
          <BiSolidUser size={20} />
        </div>



      </div>

    </div>
          <div className="border-b border-zinc-300 h-2 mx-6" ></div>
</div>
  );
}

export default Header1;
