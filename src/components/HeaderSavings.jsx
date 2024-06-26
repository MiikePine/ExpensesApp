import Search from "./Search";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react"; // Import necessary dependencies
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
import { setSelectedYear } from "../store/slices/yearSlice";
import StackedBar from "../components/StackedBar";
import { updateTotalYearIncoming } from "../store/slices/yearSlice";


const getMonthFromDate = (dateString) => {
  const [year, month, day] = dateString?.split("-") || [];
  const d = new Date(year, month - 1, day);
  return d.getYear();
};

const HeaderSavings = ({ pathName, onMonthChange, onYearChange , monthNames}) => {
  const [incomingData, setIncomingData] = useState([]);
  const [expenseData, setExpenseData] = useState([]);
  const [startDate, setSrtartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(null);
  const [showYear, setShowYear] = useState(false);
  const [isMonthVisible, setIsMonthVisible] = useState(true);
  const [UserUID, setUserUID] = useState(null);
  const [fetchedUserUID, setFetchedUserUID] = useState(false);
  const [filteredExpenseData, setFilteredExpenseData] = useState([]);
  const [filteredIncomingData, setFilteredIncomingData] = useState([]);
  const combinedData = [...filteredExpenseData, ...filteredIncomingData];
  const [isDivVisible, setIsDivVisible] = useState(true);
  const [totalYearIncoming, setTotalYearIncoming] = useState([]);
  const [totalYearExpense, setTotalYearExpense] = useState([]);
  const [monthlyIncomingData, setMonthlyIncomingData] = useState([]);
  const [monthlyExpenseData, setMonthlyExpenseData] = useState([]);

  const dispatch = useDispatch();
  const selectedMonth = useSelector((state) => state.month.value);
  const totalIncoming = useSelector((state) => state.suminc.totalIncoming);
  const userData = useSelector((state) => state.user);
  const selectedYear = useSelector((state) => state.year.value);
  const totalExpense = useSelector((state) => state.sumexp.totalExpense);


  const handleYearChange = (newYear) => {
    dispatch(setSelectedYear(newYear));
  };

 
  const handleSelectYear = (year) => {
    setSelectedYear(year);
    setShowYear(false); 
  };

  const toggleDivVisibility = () => {
    setIsDivVisible(!isDivVisible);
  };

  useEffect(() => {
    dispatch(setSelectedYear(2023));
    fetchIncoming(2023);
    fetchExpenses(2023)
  }, [dispatch]);


  useEffect(() => {
    fetchUserDataIncoming();
    fetchUserDataExp();
  }, [selectedYear, userData, fetchedUserUID]);



  // fetch incoming start
  
  useEffect(() => {
    const fetchData = async () => {
      await fetchIncoming(selectedYear);
    };
  
    if (selectedYear && userData) {
      fetchData();
    }
  }, [selectedYear, userData]);





  const fetchUserDataIncoming = async () => {
    const { data, error } = await supabase.auth.getSession();
    console.log("Data from fetchUserDataIncoming:", data);
    if (data.session !== null) {
      const user = data.session.user;
      setUserUID(user.id);
      setFetchedUserUID(true);
      fetchIncoming(selectedYear); // Passe selectedYear aqui
    } else {
      // Handle the case when there's no user session
    }
  };



  useEffect(() => {
    if (userData || fetchedUserUID) {
      fetchIncoming();
      // console.log("LOG 1 - userData user id userData:", userData);
    } else {
      // console.log("error 1-  userData is not available");
    }
  }, [selectedYear, userData, fetchedUserUID]);

  useEffect(() => {
    if (fetchedUserUID) {
      fetchIncoming();
    }
  }, [selectedYear, fetchedUserUID]);




  const fetchIncoming = async (selectedYear) => {
    console.log("Fetching incoming data for year:", selectedYear);

    if (UserUID) {
      const { data, error } = await supabase
        .from("incoming")
        .select("*")
        .eq("user_id", UserUID);
      console.log("Data from fetchIncoming:", data);
      if (error) {
        throw error;
      }


      const filteredDataInc = data
        .filter((incoming) => {
          const incomingDate = new Date(incoming["posts/dateValue"]);
          const incomingYear = incomingDate.getFullYear();
          console.log("Incoming Year:", incomingYear);
          console.log("Selected Year:", selectedYear);
          return incomingYear === selectedYear;
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
          source: "incoming",
        }));

      console.log(
        "Filtered incoming data for year:",
        selectedYear,
        filteredDataInc
      );

      if (filteredDataInc.length > 0) {
        const totalIncoming = filteredDataInc.reduce((sum, item) => {
          console.log("Adding item price:", item.price);
          return sum + item.price;
        }, 0);
        console.log(
          "Total Incoming for Year:",
          selectedYear,
          "is",
          totalIncoming
        );

        dispatch(updateTotalIncoming(totalIncoming));
        setTotalYearIncoming(totalIncoming);
      }
    }
  };

 

  // fetch total incoming END


// fetch total expenses start



useEffect(() => {
  const fetchData = async () => {
    await fetchExpenses(selectedYear);
  };

  if (selectedYear && userData) {
    fetchData();
  }
}, [selectedYear, userData]);


const fetchUserDataExp = async () => {
  const { data, error } = await supabase.auth.getSession();
  console.log("Data from fetchUserDataExp:", data);
  if (data.session !== null) {
    const user = data.session.user;
    setUserUID(user.id);
    setFetchedUserUID(true);
    fetchExpenses(selectedYear); // Passe selectedYear aqui
  } else {
    // Handle the case when there's no user session
  }
};



useEffect(() => {
  if (userData || fetchedUserUID) {
    fetchExpenses();
    // console.log("LOG 1 - userData user id userData:", userData);
  } else {
    // console.log("error 1-  userData is not available");
  }
}, [selectedYear, userData, fetchedUserUID]);

useEffect(() => {
  if (fetchedUserUID) {
    fetchExpenses();
  }
}, [selectedYear, fetchedUserUID]);




  const fetchExpenses = async (selectedYear) => {
    console.log("Fetching expenses data for year:", selectedYear);

    if (UserUID) {
      const { data, error } = await supabase
        .from("expense")
        .select("*")
        .eq("user_id", UserUID);
      console.log("Data from fetchExpenses:", data);
      if (error) {
        throw error;
      }


      const filteredDataExp = data
        .filter((expense) => {
          const expenseDate = new Date(expense["items/dateValue"]);
          const expenseYear = expenseDate.getFullYear();
          console.log("Expense Year:", expenseYear);
          console.log("Selected Year:", selectedYear);
          return expenseYear === selectedYear;
        })
        .map((expense) => ({
          ...expense,
          formattedDate: format(
            new Date(expense["items/dateValue"]),
            "dd-MM-yyyy"
          ),
          price: expense["items/price"],
          payBy: expense["items/payBy"],
          category: expense["items/category"],
          item: expense["items/item"],
          source: "expense",
        }));

      console.log(
        "Filtered expense data for year:",
        selectedYear,
        filteredDataExp
      );

      if (filteredDataExp.length > 0) {
        const totalExpense = filteredDataExp.reduce((sum, item) => {
          console.log("Adding item price:", item.price);
          return sum + item.price;
        }, 0);
        console.log(
          "Total expense for Year:",
          selectedYear,
          "is",
          totalExpense
        );

        dispatch(updateTotalExpense(totalExpense));
        setTotalYearExpense(totalExpense);
      }
    }
  };







  return (
    <div className="mt-4 ">
      <div className="flex justify-between z-100">
        <Year
          className="cursor-pointer"
          onYearChange={handleSelectYear}
          selectedYear={selectedYear} // Pass selectedYear as a prop
        />

        {isDivVisible ? (
          <BsChevronUp
          className="text-white rounded-full bg-teal-700 p-2 flex-col mb-4 z-40 align-top cursor-pointer transform scale-130 hover:scale-110 transition-transform "
          size={32}
            onClick={toggleDivVisibility}

          />
        ) : (
          <BsChevronDown
            className="text-white rounded-full bg-teal-700 p-2 flex-col mb-4 z-40 align-top cursor-pointer transform scale-130 hover:scale-110 transition-transform"
            size={32}
            onClick={toggleDivVisibility}
          />
        )}
      </div>

     
        <div
          className={`flex flex-col w-full sm:flex-row  ${
            isDivVisible ? "" : "transition delay-150 duration-500 ease-in-out hidden"
          }`}
        >
        <div className="flex md:w-1/3 py-2 gap-6 border-neutral-300">
            <div className="w-full">
              <div className="grid bg-white text-zinc-700 w-full h-32 shadow-lg mb-4 rounded-xl">
                <div className="flex justify-between">
                  <p className="text-xs p-4 text-zinc-400">Year Total Income</p>
                  <BiSolidUpArrow
                    className="text-green-400  mr-8 mt-4"
                    size={18}
                  />
                </div>
                <div className="flex justify-between">
                  <div className="flex items-baseline">
                    <p className="text-3xl ml-6 text-zinc-500">
                      {totalYearIncoming.toLocaleString()}
                    </p>
                    <p className="text-sm text-zinc-500  ml-1">CHF</p>
                  </div>
                </div>
              </div>

              <div className="grid bg-white text-zinc-700 w-full h-32 mb-2 shadow-lg rounded-xl">
                <div className="flex justify-between ">
                  <p className="text-xs p-4 text-zinc-400">Yearly Balance</p>
                  <FaWallet className="text-zinc-500  mr-8 mt-4" size={18} />
                </div>

                <div className="flex justify-between">
                  <div className="flex items-baseline">
                    <p className="text-3xl ml-6 text-zinc-500">   { (totalYearIncoming - totalYearExpense).toLocaleString()}</p>
                    <p className="text-xs text-zinc-500  ml-1">CHF</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full">
              <div className="grid bg-white text-zinc-700 w-full h-32 shadow-lg mb-4 rounded-xl">
                <div className="flex justify-between">
                  <p className="text-xs p-4 text-zinc-400">Year Total Expense</p>
                  <BiSolidDownArrow
                    className="text-red-400  mr-8 mt-4"
                    size={18}
                  />
                </div>
                <div className="flex justify-between">
                  <div className="flex items-baseline">
                    <p className="text-3xl ml-6 text-zinc-500">{totalYearExpense.toLocaleString()}</p>
                    <p className="text-xs text-zinc-500  ml-1">CHF</p>
                  </div>
                </div>
              </div>

              <div className="grid bg-white text-zinc-700 w-full h-32 shadow-lg mb-2 rounded-xl">
                <div className="flex justify-between">
                  <p className="text-xs p-4 text-zinc-400">Average</p>
                  <FaWallet className="text-zinc-500  mr-8 mt-4" size={18} />
                </div>
                <div className="flex justify-between">
                  <div className="flex items-baseline">
                    <p className="text-3xl ml-6 text-zinc-500">{(totalYearExpense / 12).toFixed(0).toLocaleString()}</p>
                    <p className="text-xs text-zinc-500  ml-1">CHF/Month</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white !shadow-lg md:w-2/3 md:ml-4 h-58 mb-4 mt-2 !border-none rounded-xl">
          <StackedBar monthlyIncomingData={monthlyIncomingData} monthlyExpenseData={monthlyExpenseData} monthNames={monthNames} selectedYear={selectedYear}/>
      
          </div>
        </div>
      </div>
  );
};

export default HeaderSavings;
