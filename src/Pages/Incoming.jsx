import React, { useEffect, useState } from "react";
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
import Layout from "../components/Layout";
import { useSelector } from "react-redux";
import AddInc from "../components/AddInc";
import { format } from "date-fns";
import { compareAsc } from "date-fns";
import supabase from "../../supabase/supabase";
import { useDispatch } from "react-redux";
import { updateTotalExpense } from "../store/slices/sumexpSlice";
import { updateTotalIncoming } from "../store/slices/sumincSlice";
import { setSelectedYear } from "../store/slices/yearSlice";


const Incoming = ({ item, handleOverlayClick }) => {
  const [showRegister, setShowRegister] = useState(false);
  const [initialRender, setInitialRender] = useState(true);
  const [UserUID, setUserUID] = useState(null);
  const [fetchedUserUID, setFetchedUserUID] = useState(false);
  const [filteredExpenseData, setFilteredExpenseData] = useState([]);
  const [filteredIncomingData, setFilteredIncomingData] = useState([]);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [isDivVisible, setIsDivVisible] = useState(true);


  const totalExpense = useSelector((state) => state.sumexp.totalExpense);
  const totalIncoming = useSelector((state) => state.suminc.totalIncoming);

  const selectedYear = useSelector((state) => state.year.value);
  const selectedMonth = useSelector((state) => state.month.value);
  const userData = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const sortedIncomingData = filteredIncomingData.slice().sort((a, b) => {
    const dateA = new Date(a["posts/dateValue"]);
    const dateB = new Date(b["posts/dateValue"]);

    return compareAsc(dateA, dateB);
  });



  const handleAddIncome = () => {
    setShowRegister(true);
  };

  const handleRegisterSuccess = (data) => {};

  const handleCloseRegister = () => {
    setShowRegister(false);
  };

  // Fetch Exp Start
  useEffect(() => {
    fetchUserDataExp();
  }, []);

  const fetchUserDataExp = async () => {
    const { data, error } = await supabase.auth.getSession();

    if (data.session !== null) {
      const user = data.session.user;
      setUserUID(user.id);
      setFetchedUserUID(true);
      console.log("LOG 4 - User UID set: expense", user.id);
      fetchExpense();
    } else {
      console.log(" error 3 - No user session available. expense");
    }
  };

  useEffect(() => {
    if (userData || fetchedUserUID) {
      fetchExpense();
      console.log("LOG 1 - userData user id userData:", userData);
    } else {
      console.log("error 1-  userData is not available");
    }
  }, [selectedMonth, userData, fetchedUserUID]);

  useEffect(() => {
    if (fetchedUserUID) {
      fetchExpense();
    }
  }, [selectedMonth, fetchedUserUID]);

  useEffect(() => {
    if (filteredExpenseData.length > 0) {
      const totalExpense = filteredExpenseData.reduce(
        (sum, item) => sum + item.price,
        0
      );
      dispatch(updateTotalExpense(totalExpense));
      console.log("totalExpense:", totalExpense);
    }
  }, [filteredExpenseData, dispatch]);

  const fetchExpense = async () => {
    if (UserUID) {
      console.log("LOG 5 - Fetching expenses for userUID:", UserUID);
      const { data, error } = await supabase
        .from("expense")
        .select("*")
        .eq("user_id", UserUID);

      if (error) {
        console.error("Error fetching expenses:", error.message);
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

      const filteredDataExp = data
        .filter((expense) => {
          const expenseMonth =
            new Date(expense["items/dateValue"]).getMonth() + 1;
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
          // id: id['items/id'],
        }));

      console.log("Filtered data expense:", filteredDataExp);
      setFilteredExpenseData(filteredDataExp);
    }
  };

  // fetch exp END

  // fetch inc start

  useEffect(() => {
    fetchUserDataInc();
  }, []);

  const fetchUserDataInc = async () => {
    const { data, error } = await supabase.auth.getSession();

    if (data.session !== null) {
      const user = data.session.user;
      setUserUID(user.id);
      setFetchedUserUID(true);
      console.log("LOG 4 - User UID set: incoming", user.id);
      fetchIncoming();
    } else {
      console.log(" error 3 - No user session available. incoming");
    }
  };

  useEffect(() => {
    if (userData || fetchedUserUID) {
      fetchIncoming();
      console.log("LOG 1 - userData user id userData:", userData);
    } else {
      console.log("error 1-  userData is not available");
    }
  }, [selectedMonth, userData, fetchedUserUID]);

  useEffect(() => {
    if (fetchedUserUID) {
      fetchIncoming();
    }
  }, [selectedMonth, fetchedUserUID]);

  useEffect(() => {
    if (filteredIncomingData.length > 0) {
      const totalIncoming = filteredIncomingData.reduce(
        (sum, item) => sum + item.price,
        0
      );
      dispatch(updateTotalIncoming(totalIncoming));
      console.log("totalIncoming:", totalIncoming);
    }
    console.log("filteredData:", filteredIncomingData);
  }, [filteredIncomingData, dispatch]);

  const fetchIncoming = async () => {
    if (UserUID) {
      console.log("LOG 5 - Fetching incoming for userUID:", UserUID);
      const { data, error } = await supabase
        .from("incoming")
        .select("*")
        .eq("user_id", UserUID);

      if (error) {
        console.error("Error fetching incoming:", error.message);
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
          console.log("Selected Month Number: incoming ", selectedMonthNumber);
          console.log("Incoming Month: incoming ", incomingMonth); // This is where the error occurs
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
          // id: id['items/id'],
        }));

      console.log("Filtered data incoming:", filteredDataInc);

      const totalIncoming = filteredIncomingData.reduce(
        (sum, item) => sum + item.price,
        0
      );

      dispatch(updateTotalIncoming(totalIncoming));

      setFilteredIncomingData(filteredDataInc); // Update the state with the filtered data
    }
  };

  // fetchIncoming end

  const handleSelectYear = async (newYear) => {
    dispatch(setSelectedYear(newYear));
    // Resto do seu código
  };

  useEffect(() => {
    fetchIncoming();
  }, [selectedYear]);


  console.log('isHeaderVisible:', isHeaderVisible);

  return (
    <Layout items={item} showHeader={true}>
      {showRegister && (
        <div
          className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 overlay backdrop-blur-sm"
          onClick={handleOverlayClick}
        >
          <AddInc
            item={item}
            handleOverlayClick={handleOverlayClick}
            onRegisterSuccess={handleRegisterSuccess}
            onClose={handleCloseRegister}
            handleAddIncoming={handleAddIncome}
          />
        </div>
      )}

      <div className="bg-white !shadow-lg mt-4 md:mt-4 ">
      <div
  className={`${
    isHeaderVisible ? "max-h-[10vh-100px]" : "max-h-[30vh-300px]"
  } overflow-y-auto`}
>

        <Card className="!bg-white shadow-lg rounded-none border-none ring-0">
          <Title className="bg-white !text-gray-600 flex items-center">
            <span className="text-center flex-grow">Incoming List</span>
            <button
              className="py-2 px-8 flex items-center text-sm bg-teal-700 text-bg-white text-white font-bold hover:text-teal-700 hover:bg-white hover:border border-teal-700 ml-auto"
              onClick={handleAddIncome}
            >
              Add +
            </button>
          </Title>
       

<Table
  className="mt-10 bg-white text-green-100 flex justify-around mx-0 md:mx-10 mb-1"
>          <TableHead className="bg-white justify-between w-full sticky top-0 z-10">
              <TableRow className="bg-white justify-between">
                {/* <TableHeaderCell>ID</TableHeaderCell> */}
                <TableHeaderCell>Item</TableHeaderCell>
                <TableHeaderCell>Category</TableHeaderCell>
                <TableHeaderCell>Price (CHF)</TableHeaderCell>
                <TableHeaderCell>Date</TableHeaderCell>
                <TableHeaderCell>Pay By</TableHeaderCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedIncomingData.map((item, index) => (
                <TableRow key={index}>
                  <TableCell className="border-b border-zinc-300 text-zinc-500 sm:w-1/4 md:w-1/2 lg:w-1/3 xl:w-1/4">{item.item}</TableCell>
                  <TableCell className="border-b border-zinc-300 text-zinc-500 sm:w-1/4 md:w-1/2 lg:w-1/3 xl:w-1/4"> {item.category}</TableCell>
                  <TableCell className="border-b border-zinc-300 text-zinc-500 sm:w-1/4 md:w-1/2 lg:w-1/3 xl:w-1/4">
                    {item.price} <span className="text-xs">CHF</span>
                  </TableCell>
                  <TableCell className="border-b border-zinc-300 text-zinc-500 sm:w-1/4 md:w-1/2 lg:w-1/3 xl:w-1/4">{item.formattedDate}</TableCell>
                  <TableCell className="border-b border-zinc-300 text-zinc-500 sm:w-1/4 md:w-1/2 lg:w-1/3 xl:w-1/4">{item.payBy}</TableCell>
                  {/* <TableCell>{item.id}</TableCell> */}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
        </div>

        </div>
    </Layout>
  );
};

export default Incoming;
