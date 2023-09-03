import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'chart.js/auto';
import { Doughnut } from 'react-chartjs-2';
import {months} from './Months';
import { useSelector } from 'react-redux';

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
  Other: 'rgb(0, 210, 145)', // Green palide
};



function ChartExp({ selectedMonth, expenseData, userData }) {
    // console.log("Props received in ChartExp - selectedMonth:", selectedMonth);
    // console.log("Props received in ChartExp - expenseData:", expenseData);
    
  
  if (expenseData.length === 0) {
    // Handle the case when expenseData is empty (e.g., show a loading message)
    return <div>Loading chart...</div>;
  }
  const [chartData, setChartData] = useState(null);

  console.log("ChartExp props - selectedMonth:", selectedMonth);
  console.log("ChartExp props - expenseData:", expenseData);



  useEffect(() => {
    console.log('Selected Month chart expense:', selectedMonth);
  
  
    const fetchData = async () => {
      try {
        const filteredData = expenseData.filter((item) => {
          const itemMonth = new Date(item["items/dateValue"]).getMonth();
          return itemMonth === months.indexOf(selectedMonth);
        });

        // Agrupar os dados por categoria e calcular a soma dos preços
        const groupedData = filteredData.reduce((result, item) => {
          const category = item["items/category"];
          const price = item["items/price"];
          if (result[category]) {
            result[category] += price;
          } else {
            result[category] = price;
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
            width: 150, // Set the desired width
            height: 150, // Set the desired height
            plugins: {
              tooltip: {
                // ...
              },
            },
          };

          console.log('Filtered Data:', filteredData);
          console.log('Labels:', labels);
          console.log('Values:', values);
          console.log('Background Colors:', backgroundColors);

          setChartData({ data: chartData, options: chartOptions });
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
      console.log("Chart data:", chartData);

      fetchData();
    }, [selectedMonth, expenseData]); // Add selectedMonth to the dependency array
  
    if (!chartData) {
      return null; // Aguardando os dados serem carregados
    }
 
    return (
      <Doughnut
        data={chartData.data}
        options={{
          ...chartData.options,
          plugins: {
            ...chartData.options.plugins,
            legend: {
              position: 'left', // Set 'bottom' for below or 'right' for the side
            },
          },
        }}
      />
    );

  }
  
  export default ChartExp;



