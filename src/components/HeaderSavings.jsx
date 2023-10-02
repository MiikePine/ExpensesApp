import Search from "./Search";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaWallet } from "react-icons/fa";
import { AiOutlineArrowDown } from "react-icons/ai";
import { BiSolidDownArrow, BiSolidUpArrow } from "react-icons/bi";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedMonth } from "../store/slices/monthSlice";
import supabase from "../../supabase/supabase";
import { format } from "date-fns";
import { compareDesc, compareAsc } from "date-fns";
import { updateTotalIncoming } from "../store/slices/sumincSlice";
import { updateTotalExpense } from "../store/slices/sumexpSlice";
import Year from "./Year";
import { BsChevronUp } from "react-icons/bs";
import { BsChevronDown } from "react-icons/bs";

import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import {
  Card,
  Title,
  Table,
  TableHead,
  TableHeaderCell,
  TableBody,
  TableRow,
  TableCell,
} from "@tremor/react";

const getMonthFromDate = (dateString) => {
  const [year, month, day] = dateString?.split("-") || [];
  const d = new Date(year, month - 1, day);
  return d.getMonth();
};

const HeaderSavings = ({ pathName, onMonthChange }) => {
  const [incomingData, setIncomingData] = useState([]);
  const [expenseData, setExpenseData] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(null);
  const [showMonth, setShowMonth] = useState(false);
  const [isMonthVisible, setIsMonthVisible] = useState(true);
  const [UserUID, setUserUID] = useState(null);
  const [fetchedUserUID, setFetchedUserUID] = useState(false);
  const [filteredExpenseData, setFilteredExpenseData] = useState([]);
  const [filteredIncomingData, setFilteredIncomingData] = useState([]);
  const combinedData = [...filteredExpenseData, ...filteredIncomingData];
  const [isDivVisible, setIsDivVisible] = useState(true);
  const [totalYearIncoming, setTotalYearIncoming] = useState(0);
  const [totalYearExpense, setTotalYearExpense] = useState(0);


  const dispatch = useDispatch();
  const selectedMonth = useSelector((state) => state.month.value);
  const totalIncoming = useSelector((state) => state.suminc.totalIncoming);
  const totalExpense = useSelector((state) => state.sumexp.totalExpense);
  const userData = useSelector((state) => state.user);

  const sortedCombinedData = combinedData.slice().sort((a, b) => {
    const dateA = new Date(
      a.dateValue || a["items/dateValue"] || a["posts/dateValue"]
    );
    const dateB = new Date(
      b.dateValue || b["items/dateValue"] || b["posts/dateValue"]
    );
    return compareDesc(dateA, dateB);
  });

  const handleMonthChange = (newMonth) => {
    dispatch(setSelectedMonth(newMonth));
  };

  const handleSelectMonth = (month) => {
    setSelectedMonth(month);
    setShowMonth(false); // Oculta o componente Months quando um mês é selecionado
  };

  const toggleDivVisibility = () => {
    setIsDivVisible(!isDivVisible);
  };

  const handleDateChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  useEffect(() => {
    fetchUserDataIncoming();
  }, [selectedMonth, userData, fetchedUserUID]);

  useEffect(() => {
    if (filteredIncomingData.length > 0) {
      const totalIncoming = filteredIncomingData.reduce(
        (sum, item) => sum + item.price,
        0
      );
      dispatch(updateTotalIncoming(totalIncoming));
    }
  }, [filteredIncomingData, dispatch]);


  // fetch incoming

  useEffect(() => {
    if (filteredIncomingData.length > 0) {
      const totalIncoming = filteredIncomingData.reduce(
        (sum, item) => sum + item.price,
        0
      );
      dispatch(updateTotalIncoming(totalIncoming));
    }
  }, [filteredIncomingData, dispatch]);

  useEffect(() => {
    fetchUserDataIncoming();
  }, [selectedMonth, userData]);

  useEffect(() => {
    if (userData) {
      fetchIncoming();
    }
  }, [selectedMonth, userData]);

  const fetchUserDataIncoming = async () => {
    const { data, error } = await supabase.auth.getSession();
    if (data.session !== null) {
      const user = data.session.user;
      fetchIncoming(user.id);
    }
  };

  const fetchIncoming = async (user_id) => {
    if (user_id) {
      const { data, error } = await supabase
        .from("incoming")
        .select("*")
        .eq("user_id", user_id);

      if (error) {
        throw error;
      }

      // Mapeie os dados para o formato desejado
      const filteredDataInc = data.map((incoming) => ({
        ...incoming,
        formattedDate: format(new Date(incoming["posts/dateValue"]), "dd-MM-yyyy"),
        price: incoming["posts/price"],
        payBy: incoming["posts/payBy"],
        category: incoming["posts/category"],
        item: incoming["posts/item"],
        source: "incoming",
      }));

      // Calcule o total de renda do ano
      const totalYearIncoming = filteredDataInc.reduce((total, incoming) => {
        return total + incoming.price;
      }, 0);

      // Atualize o estado com o total de renda do ano
      setTotalYearIncoming(totalYearIncoming);
    }
  };

// fetch total incoming END 

// fetch total expense start 

useEffect(() => {
    if (filteredExpenseData.length > 0) {
      const totalExpense = filteredExpenseData.reduce(
        (sum, item) => sum + item.price,
        0
      );
      dispatch(updateTotalExpense(totalExpense));
    }
  }, [filteredExpenseData, dispatch]);

  useEffect(() => {
    fetchUserDataExpense();
  }, [selectedMonth, userData]);

  useEffect(() => {
    if (userData) {
      fetchExpense();
    }
  }, [selectedMonth, userData]);

  const fetchUserDataExpense = async () => {
    const { data, error } = await supabase.auth.getSession();
    if (data.session !== null) {
      const user = data.session.user;
      fetchExpense(user.id);
    }
  };

  const fetchExpense = async (user_id) => {
    if (user_id) {
      const { data, error } = await supabase
        .from("expense")
        .select("*")
        .eq("user_id", user_id);

      if (error) {
        throw error;
      }

      // Mapeie os dados para o formato desejado
      const filteredDataInc = data.map((expense) => ({
        ...expense,
        formattedDate: format(new Date(expense["items/dateValue"]), "dd-MM-yyyy"),
        price: expense["items/price"],
        payBy: expense["items/payBy"],
        category: expense["items/category"],
        item: expense["items/item"],
        source: "expense",
      }));

      // Calcule o total de renda do ano
      const totalYearExpense = filteredDataInc.reduce((total, expense) => {
        return total + expense.price;
      }, 0);

      // Atualize o estado com o total de renda do ano
      setTotalYearExpense(totalYearExpense);
    }
  };

//   fetch total expense end

  return (
    <div className="mt-4">

<div className="flex justify-between z-100">
        <Year
          className="cursor-pointer"
          onMonthChange={handleSelectMonth}
          selectedMonth={selectedMonth}
        />

        {isDivVisible ? (
          <BsChevronUp
            className="text-zinc-400 flex-col mb-4 z-40 align-top"
            size={32}
            onClick={toggleDivVisibility}
          />
        ) : (
          <BsChevronDown
            className="text-zinc-400 flex-col mb-4 z-40 align-top"
            size={32}
            onClick={toggleDivVisibility}
          />
        )}
      </div>

      <div
        className={`flex flex-col sm:flex-row ${isDivVisible ? "" : "hidden"}`}
      >
        <div className="flex md:w-full py-2 gap-6 border-neutral-300">
          
            <div className="grid bg-white text-zinc-700 w-full h-32 shadow-lg mb-4">
              <div className="flex justify-between">
                <p className="text-xs p-4 text-zinc-400">Total Year Incoming</p>
                <BiSolidUpArrow
                  className="text-green-400  mr-8 mt-4"
                  size={18}
                />
              </div>
              <div className="flex justify-between">
                <div className="flex items-baseline">
                  <p className="text-3xl ml-6 text-zinc-500">{totalYearIncoming}</p>
                  <p className="text-sm text-zinc-500  ml-1">CHF</p>
                </div>
              </div>
            </div>
       
      
            <div className="grid bg-white text-zinc-700 w-full h-32 shadow-lg mb-4">
              <div className="flex justify-between">
                <p className="text-xs p-4 text-zinc-400">Total Year Expense</p>
                <BiSolidDownArrow
                  className="text-red-400  mr-8 mt-4"
                  size={18}
                />
              </div>
              <div className="flex justify-between">
                <div className="flex items-baseline">
                  <p className="text-3xl ml-6 text-zinc-500">{totalYearExpense}</p>
                  <p className="text-xs text-zinc-500  ml-1">CHF</p>
                </div>
              </div>
            </div>

            <div className="grid bg-white text-zinc-700 w-full h-32 mb-2 shadow-lg">
              <div className="flex justify-between ">
                <p className="text-xs p-4 text-zinc-400">Savings</p>
                <FaWallet className="text-zinc-500  mr-8 mt-4" size={18} />
              </div>

              <div className="flex justify-between">
                <div className="flex items-baseline">
                  <p className="text-3xl ml-6 text-zinc-500">
                    {totalYearIncoming - totalYearExpense}
                  </p>
                  <p className="text-xs text-zinc-500  ml-1">CHF</p>
                </div>
              </div>
            </div>

            <div className="grid bg-white text-zinc-700 w-full h-32 shadow-lg mb-2 ">
              <div className="flex justify-between">
                <p className="text-xs p-4 text-zinc-400">Average Expense</p>
                <FaWallet className="text-zinc-500  mr-8 mt-4" size={18} />
              </div>
              <div className="flex justify-between">
                <div className="flex items-baseline">
                  <p className="text-3xl ml-6 text-zinc-500">
                    {(totalYearExpense / 12).toFixed(1)}
                  </p>
                  <p className="text-xs text-zinc-500  ml-1">CHF/Month</p>
                </div>
              </div>
        
          </div>
        </div>

       
      </div>
    </div>
  );
};

export default HeaderSavings;
export { getMonthFromDate };
