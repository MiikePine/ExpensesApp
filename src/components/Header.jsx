


import Search from "./Search";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { PiArrowDown, PiArrowUp, } from 'react-icons/Pi';
import axios from "axios";
import { FaWallet } from 'react-icons/Fa';






  const Header = (pathName ) => {
    const [totalIncome, setTotalIncome] = useState(0);
    const [totalExpense, setTotalExpense] = useState(0)

    const [incomingData, setIncomingData] = useState([]);
    const [ExpenseData, setExpenseData] = useState([]);




    // expense start 
   
  useEffect(() => {
    fetchExpenseData();
  }, []);


  const fetchExpenseData = async () => {
    try {
      const response = await axios.get("http://localhost:3000/posts");
      console.log("Expense Data:", response.data); // Log the fetched data

      setExpenseData(response.data);
    } catch (error) {
      console.error("erro de ligacao Expense:", error);
    }
  };


  useEffect(() => {
    calculateTotalExpense();
  }, [ExpenseData]);


  const calculateTotalExpense = () => {
    console.log("ExpenseData length:", ExpenseData.length); // Log the length of ExpenseData array
    const sum = ExpenseData.reduce((total, user) => {
      console.log("Price:", user.price); // Log the price values
      return total + user.price;
    }, 0);
    console.log("Intermediate Sum:", sum); // Log the intermediate sum
    setTotalExpense(sum);
  };
  console.log("Total Expense:", totalExpense); // Log the totalIncome value

    useEffect(() => {
      console.log(totalExpense);
    }, [totalExpense]);


  // expense ends




  // incoming start 

  useEffect(() => {
    fetchIncomingData();
  }, []);


  const fetchIncomingData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/posts");
      console.log("Incoming Data:", response.data); // Log the fetched data

      setIncomingData(response.data);
    } catch (error) {
      console.error("erro de ligacao incoming:", error);
    }
  };


  useEffect(() => {
    calculateTotalIncome();
  }, [incomingData]);


  const calculateTotalIncome = () => {
    const sum = incomingData.reduce((total, item) => {
      console.log("Price:", item.price); // Log the price values
      return total + item.price;
    }, 0);
    console.log("Intermediate Sum:", sum); // Log the intermediate sum
    setTotalIncome(sum);
  };
  console.log("Total Income:", totalIncome); // Log the totalIncome value

    useEffect(() => {
      console.log(totalIncome);
    }, [totalIncome]);
  // incoming ends




  return (
   
    <div className="grid">

          <div className="mt-6 text-2xl text-zinc-600 ">
            <h1>July</h1>
            <div className="border-b border-zinc-300 mt-2"></div>
          </div>
    <div className="flex  justify-between w-full py-6  border-neutral-300 rounded-xl mt-4 ">
  

     <div className="grid bg-white text-zinc-700 w-1/5 h-32  shadow-lg  rounded-lg">
        <div className="flex justify-between">
          <p className="text-sm p-4 text-zinc-400">Gasto</p>
          <PiArrowDown className="text-red-400  mr-8 mt-4" size={32}  />
        </div>
        <div className="flex justify-between">

        <div className="flex">
          <p className="text-4xl ml-6 text-zinc-500">{totalExpense}</p>
          <p className="text-xs ml-1">CHF</p>
        </div>
          </div>
      </div>

      <div className="grid bg-white text-zinc-700 w-1/5 h-32 shadow-lg rounded-lg">
        <div className="flex justify-between">
          <p className="text-sm p-4 text-zinc-400">Ganho</p>
          <PiArrowUp className="text-green-400  mr-8 mt-4" size={32}  />
        </div>
        <div className="flex justify-between">

        <div className="flex">
          <p className="text-4xl ml-6 text-zinc-500">{totalIncome}</p>
          <p className="text-xs ml-1">CHF</p>
        </div>
          </div>
      </div>

      <div className="grid bg-white text-zinc-700 w-1/5 h-32 shadow-lg rounded-lg">
        <div className="flex justify-between">
          <p className="text-sm p-4 text-zinc-400">Saldo</p>
          <FaWallet className="text-zinc-500  mr-8 mt-4" size={32}  />
        </div>
        <div className="flex justify-between">

        <div className="flex">
          <p className="text-4xl ml-6 text-zinc-500">{totalIncome - totalExpense}</p>
          <p className="text-xs ml-1">CHF</p>
        </div>
          </div>
      </div>

      <div className="grid bg-white text-zinc-700 w-1/5 h-32 shadow-lg rounded-lg">
        <div className="flex justify-between">
          <p className="text-sm p-4 text-zinc-400">Saldo</p>
          <FaWallet className="text-zinc-500  mr-8 mt-4" size={32}  />
        </div>
        <div className="flex justify-between">

        <div className="flex">
          <p className="text-4xl ml-6 text-zinc-500">{totalIncome - totalExpense}</p>
          <p className="text-xs ml-1">CHF</p>
        </div>
          </div>
      </div>


    </div>
    </div>
  );
};

export default Header;

