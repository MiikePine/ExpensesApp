import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'chart.js/auto';
import { Doughnut } from 'react-chartjs-2';
import {months} from './Months';

const categoryColors = {
  Tips: 'rgb(54, 162, 235)',   // blue
  Salary: 'rgb(255, 99, 132)', // red
  Rent: 'rgb(255, 159, 64)', // orange
}

function ChartInc({ selectedMonth, incomingData, userData }) {


if (incomingData.length === 0) {
    // Handle the case when incomingData is empty (e.g., show a loading message)
    return <div>Loading chart...</div>;
  }
  const [chartData, setChartData] = useState(null);

  console.log("ChartInc props - selectedMonth:", selectedMonth);
  console.log("ChartInc props - incomingData:", incomingData);


useEffect(() => {
    console.log('Selected Month chart incmome:', selectedMonth);
  
  
    const fetchData = async () => {
      try {
        const filteredData = incomingData.filter((item) => {
          const itemMonth = new Date(item["posts/dateValue"]).getMonth();
          return itemMonth === months.indexOf(selectedMonth);
        });

        // Agrupar os dados por categoria e calcular a soma dos preços
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
            maintainAspectRatio: true,
            width: 200, // Set the desired width
            height: 100, // Set the desired height
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
    }, [selectedMonth, incomingData]); // Add selectedMonth to the dependency array
  
    if (!chartData) {
      return null; // Aguardando os dados serem carregados
    }
 
    return (
      <div style={{ display: '', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
        <Doughnut
          data={chartData.data}
          options={{
            ...chartData.options,
            plugins: {
              ...chartData.options.plugins,
              legend: {
                position: 'right', // Set 'bottom' for below or 'right' for the side
              },
            },
          }}
        />
      </div>
    );
  

  }
  
  export default ChartInc;





