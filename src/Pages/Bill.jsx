import React from "react";
import Layout from "../components/Layout";
import Button from "../components/Button";
import { useSelector, useDispatch } from 'react-redux'
import Logout from "./Logout";
import { FaWallet } from 'react-icons/Fa';
import { PiArrowDown, PiArrowUp, } from 'react-icons/Pi';
import  Chart  from "../components/Chart";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';





const Bill = () => {

  const users = useSelector((state) => state.user.value)
  const dispatch = useDispatch()
  const pathName = location.pathname.slice(1);


  return (
      <Layout users={users}>


<div>
<div className="flex  justify-between w-full py-2  border-neutral-300 rounded-xl ">
     

     {/* <div className="grid bg-white text-zinc-700 w-1/4 h-36 shadow-red-600 shadow-sm  rounded-lg">
        <div className="flex justify-between">
          <p className="text-sm p-4 text-zinc-400">Média Diària</p>
          <PiArrowDown className="text-red-400  mr-8 mt-4" size={32}  />
        </div>
        <div className="flex justify-between">

        <div className="flex">
          <p className="text-4xl ml-6 text-zinc-500">132</p>
          <p className="text-xs ml-1">CHF</p>
        </div>
          </div>
      </div>

      <div className="grid bg-white text-zinc-700 w-1/4 h-36 shadow-green-600 shadow-sm rounded-lg">
        <div className="flex justify-between">
          <p className="text-sm p-4 text-zinc-400">Média Mensal</p>
          <PiArrowUp className="text-green-400  mr-8 mt-4" size={32}  />
        </div>
        <div className="flex justify-between">

        <div className="flex">
          <p className="text-4xl ml-6 text-zinc-500">2323</p>
          <p className="text-xs ml-1">CHF</p>
        </div>
          </div>
      </div>

      <div className="grid bg-white text-zinc-700 w-1/4 h-36 shadow-blue-300 shadow-md rounded-lg">
        <div className="flex justify-between">
          <p className="text-sm p-4 text-zinc-400">Mes anterior</p>
          <FaWallet className="text-zinc-500  mr-8 mt-4" size={32}  />
        </div>
        <div className="flex justify-between">

        <div className="flex">
          <p className="text-4xl ml-6 text-zinc-500">+232</p>
          <p className="text-xs ml-1">CHF</p>
        </div>
          </div>
      </div> */}

    </div>

    <div className="w-full h-72 grid">
      <p>Incoming</p>
        <Chart/>
    </div>
</div>

      </Layout>  

  );
};
  
export default Bill;




