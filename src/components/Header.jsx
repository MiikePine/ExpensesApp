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
  // console.log("dateString:", dateString);
  const [year, month, day] = dateString?.split("-") || [];
  const d = new Date(year, month - 1, day);
  return d.getMonth();
};

const Header = ({ pathName, onMonthChange }) => {
  // const [totalIncome, setTotalIncome] = useState(0);
  // const [totalExpense, setTotalExpense] = useState(0);
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



  const dispatch = useDispatch();
  const selectedMonth = useSelector((state) => state.month.value);
  const totalIncoming = useSelector((state) => state.suminc.totalIncoming);
  const totalExpense = useSelector((state) => state.sumexp.totalExpense);
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
  };


  useEffect(() => {
    fetchUserDataInc();
    fetchUserDataExp
  }, []);


  // FETCH start

  const fetchUserDataExp = async () => {
    const { data, error } = await supabase.auth.getSession();
    // console.log("Data from fetchUserDataExp:", data);
    if (data.session !== null) {
      const user = data.session.user;
      setUserUID(user.id);
      setFetchedUserUID(true);
      // console.log("LOG 4 - User UID set: expense", user.id);
      fetchExpense();
    } else {
      // console.log(" error 3 - No user session available. expense");
    }
  };

  useEffect(() => {
    if (userData || fetchedUserUID) {
      fetchExpense();
      // console.log("LOG 1 - userData user id userData:", userData);
    } else {
      // console.log("error 1-  userData is not available");
    }
  }, [selectedMonth, userData, fetchedUserUID]);

  useEffect(() => {
    if (fetchedUserUID) {
      fetchExpense();
    }
  }, [selectedMonth, fetchedUserUID]);

  const fetchExpense = async () => {
    if (UserUID) {
      const { data, error } = await supabase
        .from("expense")
        .select("*")
        .eq("user_id", UserUID);
        // console.log("Data from fetchExpense:", data);
      if (error) {
        throw error;
      }
  
      const monthMapping = {
        January: "January",
        February: "February",
        March: "March",
        April: "April",
        May: "May",
        June: "June",
        July: "July",
        August: "August",
        September: "September",
        October: "October",
        November: "November",
        December: "December",
      };
  
      const selectedMonthNumber = monthMapping[selectedMonth];
  
      const filteredDataExp = data
        .filter((expense) => {
          const expenseMonth =
            new Date(expense["items/dateValue"]).getMonth() - 1; // Subtracting 1 to match month numbers (0-11)
          return expenseMonth === selectedMonthNumber;
        })
        .map((expense) => ({
          ...expense,
          formattedDate: format(
            new Date(expense["items/dateValue"]),
            "dd-MM-yyyy"
          ),
          price: expense["items/price"],
          payBy: expense["items/pay_by"],
          category: expense["items/category"],
          item: expense["items/item"],
        }))
        .sort((a, b) =>
          compareDesc(
            new Date(a.formattedDate),
            new Date(b.formattedDate)
          )
        );
  
      setFilteredExpenseData(filteredDataExp);
    }
  };
  // console.log("selectedMonth:", selectedMonth);


  // Fetch end



  const fetchUserDataInc = async () => {
    const { data, error } = await supabase.auth.getSession();
    console.log("Data from fetchUserDataInc:", data);
    if (data.session !== null) {
      const user = data.session.user;
      setUserUID(user.id);
      setFetchedUserUID(true);
      // console.log("LOG 4 - User UID set: expense", user.id);
      fetchIncoming();
    } else {
      // console.log(" error 3 - No user session available. expense");
    }
  };

  useEffect(() => {
    if (userData || fetchedUserUID) {
      fetchIncoming();
      // console.log("LOG 1 - userData user id userData:", userData);
    } else {
      // console.log("error 1-  userData is not available");
    }
  }, [selectedMonth, userData, fetchedUserUID]);

  useEffect(() => {
    if (fetchedUserUID) {
      fetchIncoming();
    }
  }, [selectedMonth, fetchedUserUID]);
  const fetchIncoming = async () => {
    if (UserUID) {
      const { data, error } = await supabase
        .from("incoming")
        .select("*")
        .eq("user_id", UserUID);
        // console.log("Data from fetchIncoming:", data);
      if (error) {
        throw error;
      }
  
      const monthMapping = {
        January: 1,
        February: 2,
        March: 3,
        April: 4,
        May: 5,
        June: 6,
        July: 7,
        August: 8,
        September: 9,
        October: 10,
        November: 11,
        December: 12,
      };
  
      const selectedMonthNumber = monthMapping[selectedMonth];
  
      const filteredDataInc = data
        .filter((incoming) => {
          const incomingMonth =
            new Date(incoming["posts/dateValue"]).getMonth() + 1; 
        
        
        
            return incomingMonth === selectedMonthNumber;
        })
        .map((incoming) => ({
          ...incoming,
          formattedDate: format(
            new Date(incoming["posts/dateValue"]),
            "dd-MM-yyyy"
          ),
          price: incoming["posts/price"],
          payBy: incoming["posts/payBy"],
          category: incoming["posts/category"],
          item: incoming["posts/item"],
        }))
        .sort((a, b) =>
          compareDesc(
            new Date(b.formattedDate),
            new Date(a.formattedDate)
          )
        );
  
      setFilteredIncomingData(filteredDataInc);
      // console.log("Length of combinedData 1 :", combinedData.length);

    }
  };
  // console.log("Length of combinedData 2 :", combinedData.length);


  useEffect(() => {
    fetchUserDataInc();
  }, []);
  // Fetch incoming end 
  // console.log("Length of filteredExpenseData:", filteredExpenseData.length);
  // console.log("Length of filteredIncomingData:", filteredIncomingData.length);

  // console.log("Length of combinedData:", combinedData.length);

  return (
    <div className="flex">
      <div className="border-b border-zinc-300 mt-1"></div>
      
      <div className="flex w-1/3 pt-4 py-2 gap-6 border-neutral-300 rounded-xl mt-4">
        <div className="w-full ">
        <div className="grid bg-white text-zinc-700 w-full h-32 shadow-lg mb-4 opacity-100">
            <div className="flex justify-between">
              <p className="text-xs p-4 text-zinc-400">Incoming</p>
              <BiSolidUpArrow className="text-green-400  mr-8 mt-4" size={18} />
            </div>
            <div className="flex justify-between">
              <div className="flex items-baseline">
                <p className="text-3xl ml-6 text-zinc-500">{totalIncoming}</p>
                <p className="text-sm text-zinc-500  ml-1">CHF</p>
              </div>
            </div>
          </div>


          <div className="grid bg-white text-zinc-700 w-full h-32 mb-2 shadow-lg ">
            <div className="flex justify-between ">
              <p className="text-xs p-4 text-zinc-400">Balance</p>
              <FaWallet className="text-zinc-500  mr-8 mt-4" size={18} />
            </div>

            <div className="flex justify-between">
              <div className="flex items-baseline">
                <p className="text-3xl ml-6 text-zinc-500">
                  {totalIncoming - totalExpense}
                </p>
                <p className="text-xs text-zinc-500  ml-1">CHF</p>
              </div>
            </div>
          </div>

        </div>

        <div className="w-full">
        <div className="grid bg-white text-zinc-700 w-full h-32 shadow-lg mb-4">
            <div className="flex justify-between">
              <p className="text-xs p-4 text-zinc-400">Expense</p>
              <BiSolidDownArrow className="text-red-400  mr-8 mt-4" size={18} />
            </div>
            <div className="flex justify-between">
              <div className="flex items-baseline">
                <p className="text-3xl ml-6 text-zinc-500">{totalExpense}</p>
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
                  {(totalExpense / 31).toFixed(1)}
                </p>
                <p className="text-xs text-zinc-500  ml-1">CHF/day</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white !shadow-lg mt-8 w-2/3 h-32 ml-4">
        <Card className="!bg-white shadow-lg rounded-none border-none ring-0">
          <Title className="bg-white !text-gray-600 flex items-center">
            <span className="text-center flex-grow text-sm">Last Transactions</span>
          </Title>

          <Table className=" bg-white text-green-100 flex justify-around">
            <TableHead className="bg-white  justify-between">
              <TableRow className="bg-white justify-between text-xs">
                {/* <TableHeaderCell>ID</TableHeaderCell> */}
                <TableHeaderCell>Item</TableHeaderCell>
                <TableHeaderCell>Category</TableHeaderCell>
                <TableHeaderCell>Price (CHF)</TableHeaderCell>
                <TableHeaderCell>Date</TableHeaderCell>
                <TableHeaderCell>Pay By</TableHeaderCell>

              </TableRow>
            </TableHead>
            <TableBody>
  {combinedData.slice(0, 5).map((item, index) => (
    <TableRow className="text-xs" key={item.id}>
      {/* Renderize os campos da tabela aqui */}
      <TableCell className="py-1 my-0.5">{item.item}</TableCell>
      <TableCell className="py-2 my-1">{item.category}</TableCell>
      <TableCell className="py-1 my-1">
        {item.price} <span className="text-xs">CHF</span>
      </TableCell>
      <TableCell className="py-1 my-1">
        {item.formattedDate}
      </TableCell>
      <TableCell className="py-1 my-1">
        {item.payBy}
      </TableCell>
      <TableCell className="py-1 my-1">
        {item.payBy === "Expenses" ? (
          <AiOutlineMinus className="text-red-400" style={{ fontSize: '22px' }} />
        ) : (
          <AiOutlinePlus className="text-green-600" style={{ fontSize: '22px' }} />
        )}
      </TableCell>
    </TableRow>
  ))}
</TableBody>
          </Table>
        </Card>
      </div>
    </div>
  );
};

export default Header;
export { getMonthFromDate };
