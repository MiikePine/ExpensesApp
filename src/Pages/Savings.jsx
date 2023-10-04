import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
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
import { useSelector, useDispatch } from "react-redux";
import { updateTotalIncoming } from "../store/slices/sumincSlice";
import { updateTotalExpense } from "../store/slices/sumexpSlice";
import supabase from "../../supabase/supabase";
import { format } from "date-fns";
import HeaderSavings from "../components/HeaderSavings"; 


const Savings = ({ item, handleOverlayClick }) => {
  const dispatch = useDispatch();
  const [UserUID, setUserUID] = useState(null);
  const [fetchedUserUID, setFetchedUserUID] = useState(false);
  const [monthlyIncomingData, setMonthlyIncomingData] = useState([]);
  const [monthlyExpenseData, setMonthlyExpenseData] = useState([]);
  const [monthlyData, setMonthlyData] = useState([]);

    const selectedMonth = useSelector((state) => state.month.value);

  const totalExpense = useSelector((state) => state.sumexp.totalExpense);
  const totalIncoming = useSelector((state) => state.suminc.totalIncoming);

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];


  // Incoming Start
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
    } else {
      console.log(" error 3 - No user session available. incoming");
    }
  };



  useEffect(() => {
    if (fetchedUserUID) {
      fetchIncoming();
    }
  }, [selectedMonth, fetchedUserUID]);

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

      console.log("Fetched data from Supabase:", data);

      const selectedMonthNumber = monthMapping[selectedMonth];

      const filteredDataInc = data
        .filter((incoming) => {
          const incomingMonth = new Date(incoming["posts/dateValue"]).getMonth() + 1;
          return incomingMonth;
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
        }));

      console.log("Filtered data incoming:", filteredDataInc);

      // Calcular o total para cada mês
      const totalsByMonth = {};
      filteredDataInc.forEach((incoming) => {
        const month = new Date(incoming["posts/dateValue"]).getMonth() + 1;
        if (!totalsByMonth[month]) {
          totalsByMonth[month] = 0;
        }
        totalsByMonth[month] += incoming.price;
      });

      const monthlyData = Array.from({ length: 12 }, (_, index) => {
        const monthNumber = index + 1;
        return {
          month: monthNumber,
          totalIncoming: totalsByMonth[monthNumber] || 0,
        };
      });

      console.log("Monthly data:", monthlyData);

      dispatch(updateTotalIncoming(totalIncoming));
      setMonthlyIncomingData(monthlyData);
    }
  };

  // INCOMING END


  // Expense Start 

  useEffect(() => {
    fetchUserDataExp();
  }, []);

  const fetchUserDataExp = async () => {
    const { data, error } = await supabase.auth.getSession();

    if (data.session !== null) {
      const user = data.session.user;
      setUserUID(user.id);
      setFetchedUserUID(true);
      console.log("LOG 4 - User UID set: incoming", user.id);
    } else {
      console.log(" error 3 - No user session available. incoming");
    }
  };



  useEffect(() => {
    if (fetchedUserUID) {
      fetchExpense();
    }
  }, [selectedMonth, fetchedUserUID]);

  const fetchExpense = async () => {
    if (UserUID) {
      console.log("LOG 5 - Fetching expense for userUID:", UserUID);
      const { data, error } = await supabase
        .from("expense")
        .select("*")
        .eq("user_id", UserUID);

      if (error) {
        console.error("Error fetching expense:", error.message);
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

      console.log("Fetched data from Supabase:", data);

      const selectedMonthNumber = monthMapping[selectedMonth];

      const filteredDataExp = data
        .filter((expense) => {
          const expenseMonth = new Date(expense["items/dateValue"]).getMonth() + 1;
          return expenseMonth;
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
        }));

      console.log("Filtered data expense:", filteredDataExp);

      // Calcular o total para cada mês
      const totalsByMonth = {};
      filteredDataExp.forEach((expense) => {
        const month = new Date(expense["items/dateValue"]).getMonth() + 1;
        if (!totalsByMonth[month]) {
          totalsByMonth[month] = 0;
        }
        totalsByMonth[month] += expense.price;
      });

      const monthlyData = Array.from({ length: 12 }, (_, index) => {
        const monthNumber = index + 1;
        return {
          month: monthNumber,
          totalExpense: totalsByMonth[monthNumber] || 0,
        };
      });

      console.log("Monthly data:", monthlyData);

      dispatch(updateTotalExpense(totalExpense));
  setMonthlyExpenseData(monthlyData);
    }
  };

// Expense End

  return (
    <Layout items={item} showHeader={false} >
<HeaderSavings totalYearIncoming={totalIncoming} totalExpense={totalExpense} />


<div className="bg-white !shadow-lg mt-4 md:mt-4 z-10 ">
<Card className="!bg-white shadow-lg rounded-none border-none ring-0">
  <Title className="bg-white !text-gray-600 flex items-center text-center">
    <span className="flex-grow">Savings</span>
  </Title>
  <div style={{ maxHeight: "calc(100vh - 200px)", overflowY: "auto" }} className="">
            {" "}
    <Table className="mt-10 bg-white text-green-100 w-full">
      <TableHead className="bg-white justify-between w-full sticky top-0 z-10 ">
        <TableRow className="bg-white justify-between sticky">
          <TableHeaderCell>Month</TableHeaderCell>
          <TableHeaderCell>Incoming</TableHeaderCell>
          <TableHeaderCell>Expense</TableHeaderCell>
          <TableHeaderCell>Savings</TableHeaderCell>
        </TableRow>
      </TableHead>

      <TableBody >
        {monthlyIncomingData.map((item, index) => {
          const balance = monthlyExpenseData[index]
            ? item.totalIncoming - monthlyExpenseData[index].totalExpense
            : 0;
          return (
            <TableRow key={index}>
              <TableCell className="border-b border-zinc-300 text-zinc-500 sm:w-1/4 md:w-1/2 lg:w-1/3 xl:w-1/4">
                {monthNames[item.month - 1]}
              </TableCell>
              <TableCell className="border-b border-zinc-300 text-zinc-500 sm:w-1/4 md:w-1/2 lg:w-1/3 xl:w-1/4">
                {item.totalIncoming} CHF
              </TableCell>
              <TableCell className="border-b border-zinc-300 text-zinc-500 sm:w-1/4 md:w-1/2 lg:w-1/3 xl:w-1/4">
                {monthlyExpenseData[index]?.totalExpense || 0} CHF
              </TableCell>
              <TableCell className="border-b border-zinc-300 text-zinc-500 sm:w-1/4 md:w-1/2 lg:w-1/3 xl:w-1/4">
                {balance} CHF
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
      
    </Table>
    </div>
</Card>
</div>
  </Layout>
);
};

export default Savings;
