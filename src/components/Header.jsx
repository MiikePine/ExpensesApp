import Search from "./Search";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaWallet } from 'react-icons/fa';
import { AiOutlineArrowDown } from 'react-icons/ai';
import { BiSolidDownArrow, BiSolidUpArrow } from 'react-icons/bi';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedMonth } from '../store/slices/monthSlice';
import supabase from "../../supabase/supabase";
import sumincSlice from "../store/slices/sumincSlice";
import { updateTotalIncome } from '../store/slices/sumincSlice';
import { updateTotalExpense } from '../store/slices/sumexpSlice';





const getMonthFromDate = (dateString, ) => {
  console.log("dateString:", dateString);
  const [year, month, day] = dateString?.split("-") || [];
  const d = new Date(year, month - 1, day);
  return d.getMonth();
};

const Header = ({ pathName, onMonthChange, UserUID }) => {
  // const [totalIncome, setTotalIncome] = useState(0);
  // const [totalExpense, setTotalExpense] = useState(0);
  const [incomingData, setIncomingData] = useState([]);
  const [expenseData, setExpenseData] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(null);
  const [showMonth, setShowMonth] = useState(false);
  const [isMonthVisible, setIsMonthVisible] = useState(true);

  
  const dispatch = useDispatch();
  const selectedMonth = useSelector((state) => state.month.value);
  const totalIncome = useSelector(state => state.suminc.totalIncome); 
  const totalExpense = useSelector(state => state.sumexp.totalExpense); 

  const userData = useSelector((state) => state.user.id);


  const handleMonthChange = (newMonth) => {
    dispatch(setSelectedMonth(newMonth));
  };



  const handleSelectMonth = (month) => {
    setSelectedMonth(month);
    setShowMonth(false); // Oculta o componente Months quando um mês é selecionado
  };

  const handleDateChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  }


  return (

    
   
    <div className="grid">
          <div className="border-b border-zinc-300 mt-1"></div>
 

    <div className="flex justify-between w-full pt-4 py-2 gap-6 border-neutral-300 rounded-xl mt-4 ">

      <div className="grid bg-white text-zinc-700 w-1/4 h-32 shadow-lg ">
        <div className="flex justify-between">
          <p className="text-sm p-4 text-zinc-400">Incoming</p>
          <BiSolidUpArrow className="text-green-400  mr-8 mt-4" size={32}  />
        </div>
        <div className="flex justify-between">

        <div className="flex items-baseline">
          <p className="text-4xl ml-6 text-zinc-500">{totalIncome}</p>
          <p className="text-sm text-zinc-500  ml-1">CHF</p>
        </div>
          </div>
      </div>

      <div className="grid bg-white text-zinc-700 w-1/4 h-32  shadow-lg ">
        <div className="flex justify-between">
          <p className="text-sm p-4 text-zinc-400">Expense</p>
          <BiSolidDownArrow className="text-red-400  mr-8 mt-4" size={32}  />
        </div>
        <div className="flex justify-between">

        <div className="flex items-baseline">
          <p className="text-4xl ml-6 text-zinc-500">{totalExpense}</p>
          <p className="text-sm text-zinc-500  ml-1">CHF</p>
        </div>
          </div>
      </div>

      <div className="grid bg-white text-zinc-700 w-1/4 h-32 shadow-lg ">
        <div className="flex justify-between ">
          <p className="text-sm p-4 text-zinc-400">Balance</p>
          <FaWallet className="text-zinc-500  mr-8 mt-4" size={26}  />
        </div>


        <div className="flex justify-between" >
          <div className="flex items-baseline">
            <p className="text-4xl ml-6 text-zinc-500">{totalIncome - totalExpense}</p>
            <p className="text-sm text-zinc-500  ml-1">CHF</p>
          </div>
        </div>
      </div>

      <div className="grid bg-white text-zinc-700 w-1/4 h-32 shadow-lg ">
        <div className="flex justify-between">
          <p className="text-sm p-4 text-zinc-400">Average Expense</p>
          <FaWallet className="text-zinc-500  mr-8 mt-4" size={26}  />
        </div>
        <div className="flex justify-between">

        <div className="flex items-baseline">
          <p className="text-4xl ml-6 text-zinc-500">{(totalExpense / 31).toFixed(1)}</p>
          <p className="text-sm text-zinc-500  ml-1">CHF/day</p>
        </div>
          </div>
      </div>
    

    </div>
    </div>

  );
};

export default Header;
export { getMonthFromDate };
