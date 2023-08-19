import Search from "./Search";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { FaWallet } from 'react-icons/fa';
import { AiOutlineArrowDown } from 'react-icons/ai';
import { BiSolidDownArrow, BiSolidUpArrow } from 'react-icons/bi';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Months from "./Months";
import { IoIosArrowDown } from 'react-icons/io';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedMonth } from '../store/slices/monthSlice';

const getMonthFromDate = (dateString) => {
  const [year, month, day] = dateString.split("-");
  const d = new Date(year, month - 1, day);
  return d.getMonth();
};

const Header = ({ pathName, onMonthChange }) => {
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);
  const [incomingData, setIncomingData] = useState([]);
  const [expenseData, setExpenseData] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(null);
  const [showMonth, setShowMonth] = useState(false);
  const [isMonthVisible, setIsMonthVisible] = useState(true);
  
  const dispatch = useDispatch();
  const selectedMonth = useSelector((state) => state.month.value);
  
  const handleMonthChange = (newMonth) => {
    dispatch(setSelectedMonth(newMonth));
  };
  
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
  }, [expenseData, selectedMonth]);
  
  const calculateTotalExpense = () => {
    const monthMapping = {
      'January': 0,
      'February': 1,
      'March': 2,
      'April': 3,
      'May': 4,
      'June': 5,
      'July': 6,
      'August': 7,
      'September': 8,
      'October': 9,
      'November': 10,
      'December': 11,
    };
    
    const expenseOfMonth = expenseData.filter(
      (item) => getMonthFromDate(item.dateValue) === monthMapping[selectedMonth]
    );
    
    const sum = expenseOfMonth.reduce((total, item) => {
      console.log('Item month:', getMonthFromDate(item.dateValue));
      console.log('Selected month:', monthMapping[selectedMonth]);
      console.log("Price:", item.price); // Log the price values
      return total + item.price;
    }, 0);
    
    console.log("Intermediate Sum:", sum); // Log the intermediate sum
    setTotalExpense(sum);
  };
  


  // incoming start 
useEffect(() => {
    fetchIncomingData();
  }, []);


  const fetchIncomingData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/posts");
      console.log("Incoming Data:", response.data); // Log the fetched data
      console.log(response.data.map(item => item.dateValue));

      setIncomingData(response.data);
    } catch (error) {
      console.error("erro de ligacao incoming:", error);
    }
  };


  useEffect(() => {
    calculateTotalIncome();
  }, [incomingData, selectedMonth]);

  const calculateTotalIncome = () => {
    const monthMapping = { 
      'January': 0,
      'February': 1,
      'March': 2,
      'April': 3,
      'May': 4,
      'June': 5,
      'July': 6,
      'August': 7,
      'September': 8,
      'October': 9,
      'November': 10,
      'December': 11,
    }
   

    const incomeOfMonth = incomingData.filter(item => getMonthFromDate(item.dateValue) === monthMapping[selectedMonth]);
  
    const sum = incomeOfMonth.reduce((total, item) => {
      console.log('Item month:', getMonthFromDate(item.dateValue));
      console.log('Selected month:', monthMapping[selectedMonth]);
      console.log("Price:", item.price); // Log the price values
      return total + item.price;
    }, 0);
    console.log("Intermediate Sum:", sum); // Log the intermediate sum
    setTotalIncome(sum);
  };

  useEffect(() => {
    calculateTotalIncome();
  }, [incomingData, selectedMonth]);
  // incoming ends

 

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
 
      

      {/* <div className="mt-10 mb-4 h-1 justify-end flex w-500">
        <Months className="cursor-pointer" onMonthChange={handleSelectMonth} selectedMonth={selectedMonth} />
      </div> */}

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
