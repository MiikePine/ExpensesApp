import { Bar } from 'react-chartjs-2';
import React, { useEffect, useState } from "react";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';

  import { useSelector, useDispatch } from "react-redux";
  import { updateTotalIncoming } from "../store/slices/sumincSlice";
  import { updateTotalExpense } from "../store/slices/sumexpSlice";
  import supabase from "../../supabase/supabase";
  import { format } from "date-fns";
  import HeaderSavings from "../components/HeaderSavings"; 


  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );


  const StackedBar = () => {
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
        // console.log("LOG 4 - User UID set: incoming", user.id);
      } else {
        // console.log(" error 3 - No user session available. incoming");
      }
    };
  
  
  
    useEffect(() => {
      if (fetchedUserUID) {
        fetchIncoming();
      }
    }, [selectedMonth, fetchedUserUID]);
  
    const fetchIncoming = async () => {
      if (UserUID) {
        // console.log("LOG 5 - Fetching incoming for userUID:", UserUID);
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
  
        // console.log("Fetched data from Supabase:", data);
  
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
  
        // console.log("Filtered data incoming:", filteredDataInc);
  
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
  
        // console.log("Monthly data:", monthlyData);
  
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
        // console.log("LOG 4 - User UID set: incoming", user.id);
      } else {
        // console.log(" error 3 - No user session available. incoming");
      }
    };
  
  
  
    useEffect(() => {
      if (fetchedUserUID) {
        fetchExpense();
      }
    }, [selectedMonth, fetchedUserUID]);
  
    const fetchExpense = async () => {
      if (UserUID) {
        // console.log("LOG 5 - Fetching expense for userUID:", UserUID);
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
  
        // console.log("Fetched data from Supabase:", data);
  
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
  
        // console.log("Filtered data expense:", filteredDataExp);
  
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
  
        // console.log("Monthly data:", monthlyData);
  
        dispatch(updateTotalExpense(totalExpense));
    setMonthlyExpenseData(monthlyData);
      }
    };
    const labels = [
'January', 
'February', 
'March', 
'April', 
'May', 
'June', 
'July', 
'August', 
'September',
'Octover',
'November',
'December'
];




const options = {
    plugins: {
      title: {
        display: true,
        text: 'Yearly Balance',
      },
    },
    responsive: true,
    maintainAspectRatio: false,
    aspectRatio: 0.8,
    scales: {
        xAxes: [{
            stacked: true,
            barThickness: 8,  // number (pixels) or 'flex'
            maxBarThickness: 8 // number (pixels)
        }],

     
      y: {
        stacked: false,
        suggestedMin: 0,
        suggestedMax: 10000,
        grid: {
          display: true,
        },
        title: {
          display: true,
          text: 'CHF',
        },
        ticks: {
          beginAtZero: true,
        },
      },
    },
  };

     
     
           
      const data = {
        labels,
        datasets: [
            {
                label: 'Monthly Income',
                data: monthlyIncomingData && monthlyIncomingData.length > 0 ? monthlyIncomingData.map(item => item.totalIncoming) : [],
    
                backgroundColor: 'rgb(53, 162, 235)',
              },
        
          {
            label: 'Monthly Expense',
            data: monthlyExpenseData.map(item => item.totalExpense), // Valores fictícios para o eixo Y de despesas mensais
            backgroundColor: 'rgb(75, 192, 192)',
          },
          {
            
            label: 'Poupancas',
      data: labels.map((_, index) => {
        const income = monthlyIncomingData[index] ? monthlyIncomingData[index].totalIncoming : 0;
        const expense = monthlyExpenseData[index] ? monthlyExpenseData[index].totalExpense : 0;
        return income - expense;
      }),
      backgroundColor: 'rgb(255, 99, 132)',
    },
  ],
};
      console.log("monthlyIncomingData:", monthlyIncomingData);

 




  return (
    <div className='w-full h-64'>
    {monthlyIncomingData.length > 0 && monthlyExpenseData.length > 0 ? (
      <Bar data={data} options={options} />
    ) : (
      <p>Loading data...</p>
    )}
  </div>
);

}

export default StackedBar;














