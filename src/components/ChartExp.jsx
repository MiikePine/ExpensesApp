import React, { useEffect, useState } from 'react';
import 'chart.js/auto';
import { Doughnut } from 'react-chartjs-2';
import {months} from './Months';
import { useSelector, useDispatch } from 'react-redux'; 
import supabase from '../../supabase/supabase';
import { format } from 'date-fns';
import { UNSAFE_useRouteId } from 'react-router-dom';
import { updateTotalExpense } from "../store/slices/sumexpSlice"


const categoryColors = {
  Car: 'rgb(54, 162, 235)',         // Blue
  Technology: 'rgb(255, 99, 132)',  // Red
  Food: 'rgb(255, 159, 64)',        // Orange
  Transport: 'rgb(75, 192, 192)',   // Teal
  Bills: 'rgb(153, 102, 255)',      // Purple
  Accomodation: 'rgb(255, 206, 86)',// Yellow
  Health: 'rgb(0, 128, 0)',        // Green
  "Night Life": 'rgb(215, 99, 132)',// Pink
  Sports: 'rgb(148, 159, 177)',     // Gray
  Other: 'rgb(0, 210, 145', // Green palid
};

function ChartExp({  }) {
  const [chartData, setChartData] = useState(null);
  const selectedMonth = useSelector(state => state.month.value);
  const userData = useSelector((state) => state.user.id);
  const [UserUID, setUserUID] = useState(null);


  const dispatch = useDispatch();

  function calculateTotalExpense(data) {
    // Calculate the total expense from the 'data' array
    let totalExpense = 0;
    for (const expense of data) {
      totalExpense += expense.price;
    }
    return totalExpense;
  }

    console.log('Selected Month chart incmome:', selectedMonth);
  

    useEffect(() => {

    const fetchData = async () => {
      try {
        console.log('Fetching data for UserUID:', userData);

        const { data, error } = await supabase
        .from('expense')
          .select('*')
          .eq("user_id", userData);
          console.log("UserUID from chart", userData)


          const newTotalExpenseValue = calculateTotalExpense(data);

        if (error) {
          console.error('Error fetching data:', error);
          return;
        }


    
        const filteredData = data
        .filter((expense) => {
          const expenseMonth = new Date(expense.dateValue).getMonth() + 1;
          return expenseMonth === selectedMonth;
        })
        .map((expense) => ({
          ...expense,
          formattedDate: format(new Date(expense.dateValue), "dd-MM-yyyy"),
          // Use direct property names like expense.dateValue, expense.price, etc.
          price: expense.price,
          payBy: expense.payBy,
          category: expense.category,
          item: expense.item,
        }));

        // Agrupar os dados por categoria e calcular a soma dos preços
        const groupedData = filteredData.reduce((result, item) => {
          if (result[item.category]) {
            result[item.category] += item.price;
          } else {
            result[item.category] = item.price;
          }
          return result;
        }, {});

        // Extrair as categorias e os preços agrupados
        const labels = Object.keys(groupedData);
        const values = Object.values(groupedData);

        const backgroundColors = labels.map((label) => categoryColors[label]);


        // Calcular as porcentagens
        const total = values.reduce((sum, value) => sum + value, 0);
        const percentages = values.map((value) => ((value / total) * 100).toFixed(2));

        // Definir o objeto de configuração do gráfico
        const chartData = {
            labels: labels.map((label, index) => `${label} (${percentages[index]}%)`),
            datasets: [
              {
                label: 'CHF',
                data: values,
                backgroundColor: backgroundColors,

              
              borderWidth: 1,
            },
          ],
        };

        // Definir as opções do gráfico
        const chartOptions = {
            responsive: true,
            maintainAspectRatio: false,
            width: 200, // Set the desired width
            height: 100, // Set the desired height
            plugins: {
              tooltip: {
                // ...
              },
            },
          };

          dispatch(updateTotalExpense(newTotalExpenseValue));


          setChartData(chartData); // Set the processed chart data
        } catch (error) {
          console.error('Error fetching data:', error);
        }
    } 

  
    fetchData(); // Call fetchData when the component mounts or when dependencies change
}, [selectedMonth, UserUID, userData]); // Add selectedMonth to the dependency array
  
    if (!chartData) {
      return null; // Aguardando os dados serem carregados
    }
 


    console.log('Rendering chart with data:', chartData)

    return (
      <Doughnut
      
      data={chartData}
      
      options={{
          ...chartData.options,
          plugins: {
            // ...chartData.options.plugins,
            legend: {
              position: 'bottom', // Set 'bottom' for below or 'right' for the side
            },
          },
        }}
        key={Math.random()}
      />
    
    );}
  
  
  export default ChartExp;