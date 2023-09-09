import React, { useEffect, useState } from "react";
import supabase from "../../supabase/supabase";

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

function DataFetcher({ userId, selectedMonth, children }) {
  const [filteredExpenseData, setFilteredExpenseData] = useState([]);
  const [filteredIncomingData, setFilteredIncomingData] = useState([]);

  async function fetchData() {
    if (userId && selectedMonth) {
      console.log("Fetching data for user ID:", userId);
      console.log("Selected month:", selectedMonth);
      const { data: expenseData, error: expenseError } = await supabase
        .from("expense")
        .select("*")
        .eq("user_id", userId);

      // ...

      // Example for fetching incoming data
      const { data: incomingData, error: incomingError } = await supabase
        .from("incoming")
        .select("*")
        .eq("user_id", userId);

      // ...

      const selectedMonthNumber = monthMapping[selectedMonth];

      const filteredData = incomingData
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
          payBy: incoming["posts/pay_by"],
          category: incoming["posts/category"],
          item: incoming["posts/item"],
          // id: id['items/id'],
        }));

      console.log("Filtered data:", filteredData);
      setFilteredIncomingData(filteredData);
    }
  }

  // Call the fetchData function when userId or selectedMonth changes
  useEffect(() => {
    fetchData();
  }, [userId, selectedMonth]);

  return <>{children(filteredExpenseData, filteredIncomingData)}</>;
}

export default DataFetcher;
