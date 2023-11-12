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
import AddExp from "../components/AddExp";
import { format } from "date-fns";
import { compareAsc } from "date-fns";
import supabase from "../../supabase/supabase";
import { useDispatch } from "react-redux";
import { updateTotalExpense } from "../store/slices/sumexpSlice";
import { updateTotalIncoming } from "../store/slices/sumincSlice";
import { MdExpandMore } from "react-icons/md";
import { RiFileAddLine } from "react-icons/ri";
import clsx from "clsx";
import { isRejected } from "@reduxjs/toolkit";


const Expenses = ({ item, handleOverlayClick }) => {
  const [showRegister, setShowRegister] = useState(false);
  const [initialRender, setInitialRender] = useState(true);
  const [UserUID, setUserUID] = useState(null);
  const [fetchedUserUID, setFetchedUserUID] = useState(false);
  const [filteredExpenseData, setFilteredExpenseData] = useState([]);
  const [filteredIncomingData, setFilteredIncomingData] = useState([]);
  const [isSortingByItem, setIsSortingByItem] = useState(false);
  const [isDivVisible, setIsDivVisible] = useState(false);


  const totalExpense = useSelector((state) => state.sumexp.totalExpense);
  const totalIncoming = useSelector((state) => state.suminc.totalIncoming);

  const selectedMonth = useSelector((state) => state.month.value);
  const userData = useSelector((state) => state.user);

  const sortedExpenseData = filteredExpenseData.slice().sort((a, b) => {
    const dateA = new Date(a["items/dateValue"]);
    const dateB = new Date(b["items/dateValue"]);
    return compareAsc(dateA, dateB);
  });

  const dispatch = useDispatch();

  const handleAddExpense = () => {
    setShowRegister(true);
  };

  const toggleSortByItem = () => {
    setIsSortingByItem(!isSortingByItem);
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
          payBy: incoming["posts/pay_by"],
          category: incoming["posts/category"],
          item: incoming["posts/item"],
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


    const handleSortByItem = () => {
      toggleSortByItem();
    
      const sortedData = [...filteredExpenseData];
    
      if (isSortingByItem) {
        sortedData.sort((a, b) => a.item.localeCompare(b.item));
      } else {
        // Se não estiver ordenando por item, ordene por data novamente
        sortedData.sort((a, b) => {
          const dateA = new Date(a["items/dateValue"]);
          const dateB = new Date(b["items/dateValue"]);
          return compareAsc(dateA, dateB);
        });
      }
    
      setFilteredExpenseData(sortedData);
    };
  



  return (
    <Layout 
      items={item} 
      showHeader={true} 
      showHeaderSavings={false} 
      showRegister={showRegister}   
      isDivVisible={isDivVisible}
    >
      {showRegister && (
        <div
          className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 backdrop-blur-sm"
          onClick={handleOverlayClick}
        >
          <AddExp
            item={item}
            handleOverlayClick={handleOverlayClick}
            onClose={handleCloseRegister}
            handleAddExpense={handleAddExpense}
            onRegisterSuccess={handleRegisterSuccess}
          />
        </div>
      )}




      <div className="bg-white !shadow-lg mt-4 md:mt-4 z-10">
        <Card className="!bg-white shadow-lg rounded-none border-none ring-0" >
          <Title className="bg-white !text-gray-600 flex items-center mb-6">
            <span className="text-center flex-grow">Expenses List</span>
            <button
              className="py-2 px-4 flex items-center text-sm text-bg-white border text-teal-700 font-bold hover:text-teal-700 hover:bg-white hover:border border-teal-700 ml-auto"
              onClick={handleAddExpense}
            >
               <RiFileAddLine size={22}></RiFileAddLine>
            </button>
          </Title>
         
         
        <Table className="max-h-[calc(130vh-880px)] overflow-y-auto">


            <TableHead className="bg-white text-xs md:text-sm justify-between w-full sticky top-0 z-10">
                <TableRow className="bg-white justify-between sticky">
                  <TableHeaderCell>Item</TableHeaderCell>
                  <TableHeaderCell>Category</TableHeaderCell>
                  <TableHeaderCell>Price (CHF)</TableHeaderCell>
                  <TableHeaderCell>Date</TableHeaderCell>
                  <TableHeaderCell>Pay By</TableHeaderCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {sortedExpenseData.map((item, index) => (
                  <TableRow  key={index}>
                    <TableCell className="border-b border-zinc-300 text-zinc-500 sm:w-1/4 md:w-1/2 lg:w-1/3 xl:w-1/4 text-xs sm:text-sm">
                      {item.item}
                    </TableCell>{" "}
                    <TableCell className="border-b border-zinc-300 text-zinc-500 sm:w-1/4 md:w-1/2 lg:w-1/3 xl:w-1/4 text-xs sm:text-sm">
                      {item.category}
                    </TableCell>
                    <TableCell className="border-b border-zinc-300 text-zinc-500 sm:w-1/4 md:w-1/2 lg:w-1/3 xl:w-1/4 text-xs sm:text-sm">
                      {item.price} <span className="text-xs">CHF</span>
                    </TableCell>
                    <TableCell className="border-b border-zinc-300 text-zinc-500 sm:w-1/4 md:w-1/2 lg:w-1/3 xl:w-1/4 text-xs sm:text-sm">
                      {item.formattedDate}
                    </TableCell>
                    <TableCell className="border-b border-zinc-300 text-zinc-500 sm:w-1/4 md:w-1/2 lg:w-1/3 xl:w-1/4 text-xs sm:text-sm">
                      {item.payBy}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
         
        </Card>
      </div>
    </Layout>
  );
};

export default Expenses;
