import React, { useEffect, useState } from "react";
import axios from "axios";
import "chart.js/auto";
import { months } from "./Months";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

const categoryColors = {
  Tips: "rgb(54, 162, 235)", // blue
  Salary: "rgb(255, 99, 132)", // red
  Rent: "rgb(255, 159, 64)", // orange
};

function ChartInc({ selectedMonth, incomingData, userData }) {
  if (incomingData.length === 0) {
    return <div>Loading chart...</div>;
  }
  const [chartData, setChartData] = useState(null);
  const isSmallScreen = window.innerWidth <= 768;
  const legendPosition = isSmallScreen ? "bottom" : "right";


  // console.log("ChartInc props - selectedMonth:", selectedMonth);
  // console.log("ChartInc props - incomingData:", incomingData);

  useEffect(() => {
    // console.log('Selected Month chart incmome:', selectedMonth);

    const fetchData = async () => {
      try {
        const filteredData = incomingData.filter((item) => {
          const itemMonth = new Date(item["posts/dateValue"]).getMonth();
          return itemMonth === months.indexOf(selectedMonth);
        });

        const groupedData = filteredData.reduce((result, item) => {
          const category = item["posts/category"];
          const price = item["posts/price"];
          if (result[category]) {
            result[category] += price;
          } else {
            result[category] = price;
          }
          return result;
        }, {});

        const labels = Object.keys(groupedData);
        const values = Object.values(groupedData);

        const backgroundColors = labels.map((label) => categoryColors[label]);

        const total = values.reduce((sum, value) => sum + value, 0);
        const percentages = values.map((value) =>
          ((value / total) * 100).toFixed(2)
        );

        const chartData = {
          labels: labels.map(
            (label, index) => `${label} (${percentages[index]}%)`
          ),
          datasets: [
            {
              label: "CHF",
              data: values,
              backgroundColor: backgroundColors,

              borderWidth: 1,
            },
          ],
        };

        // Chart options
        const chartOptions = {
          responsive: true,
          maintainAspectRatio: false,
          width: 100, // Set the desired width
          height: 40, // Set the desired height
          plugins: {
            tooltip: {
              // ...
            },
          },
        };

        // console.log('Filtered Data:', filteredData);
        // console.log('Labels:', labels);
        // console.log('Values:', values);
        // console.log('Background Colors:', backgroundColors);

        setChartData({ data: chartData, options: chartOptions });
      } catch (error) {
        // console.error('Error fetching data:', error);
      }
    };
    // console.log("Chart data:", chartData);

    fetchData();
  }, [selectedMonth, incomingData, isSmallScreen]); 

  if (!chartData) {
    return null;
  }

  return (
    <div
      style={{
        display: "left",
        justifyContent: "",
        alignItems: "",
        height: "34vh",
      }}
      className="mb-4 mt-6 pb-4"
    >
      <Doughnut
        data={chartData.data}
        options={{
          ...chartData.options,
          plugins: {
            ...chartData.options.plugins,
            legend: {
              position: legendPosition,            },
          },
        }}
      />
    </div>
  );
}

export default ChartInc;




  // useEffect(() => {
  //   fetchUserDataExp();
  // }, []);

  // const fetchUserDataExp = async () => {
  //   const { data, error } = await supabase.auth.getSession();

  //   if (data.session !== null) {
  //     const user = data.session.user;
  //     setUserUID(user.id);
  //     setFetchedUserUID(true);
  //     console.log("LOG 4 - User UID set: expense", user.id);
  //     fetchExpense();
  //   } else {
  //     console.log(" error 3 - No user session available. expense");
  //   }
  // };

  // useEffect(() => {
  //   if (userData || fetchedUserUID) {
  //     fetchExpense();
  //     console.log("LOG 1 - userData user id userData:", userData);
  //   } else {
  //     console.log("error 1-  userData is not available");
  //   }
  // }, [selectedMonth, userData, fetchedUserUID]);

  // useEffect(() => {
  //   if (fetchedUserUID) {
  //     fetchExpense();
  //   }
  // }, [selectedMonth, fetchedUserUID]);

  // useEffect(() => {
  //   if (filteredExpenseData.length > 0) {
  //     const totalExpense = filteredExpenseData.reduce(
  //       (sum, item) => sum + item.price,
  //       0
  //     );
  //     dispatch(updateTotalExpense(totalExpense));
  //     console.log("totalExpense:", totalExpense);
  //   }
  // }, [filteredExpenseData, dispatch]);

  // const fetchExpense = async () => {
  //   if (UserUID) {
  //     console.log("LOG 5 - Fetching expenses for userUID:", UserUID);
  //     const { data, error } = await supabase
  //       .from("expense")
  //       .select("*")
  //       .eq("user_id", UserUID);

  //     if (error) {
  //       console.error("Error fetching expenses:", error.message);
  //       throw error;
  //     }

  //     const monthMapping = {
  //       January: 1,
  //       February: 2,
  //       March: 3,
  //       April: 4,
  //       May: 5,
  //       June: 6,
  //       July: 7,
  //       August: 8,
  //       September: 9,
  //       October: 10,
  //       November: 11,
  //       December: 12,
  //     };

  //     const selectedMonthNumber = monthMapping[selectedMonth];

  //     const filteredDataExp = data
  //       .filter((expense) => {
  //         const expenseMonth =
  //           new Date(expense["items/dateValue"]).getMonth() + 1;
  //         return expenseMonth === selectedMonthNumber;
  //       })
  //       .map((expense) => ({
  //         ...expense,
  //         formattedDate: format(
  //           new Date(expense["items/dateValue"]),
  //           "dd-MM-yyyy"
  //         ),
  //         price: expense["items/price"],
  //         payBy: expense["items/pay_by"],
  //         category: expense["items/category"],
  //         item: expense["items/item"],
  //         // id: id['items/id'],
  //       }));

  //     console.log("Filtered data expense:", filteredDataExp);
  //     setFilteredExpenseData(filteredDataExp);
  //   }
  // };
