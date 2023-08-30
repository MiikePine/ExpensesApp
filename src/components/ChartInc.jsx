import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'chart.js/auto';
import { Doughnut } from 'react-chartjs-2';
import IncomingDB from '../../database/incoming.json'
import {months} from './Months';

const categoryColors = {
  Tips: 'rgb(54, 162, 235)',   // blue
  Salary: 'rgb(255, 99, 132)', // red
  Rent: 'rgb(255, 159, 64)', // orange
}

function ChartInc({ selectedMonth }) {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    // console.log('Selected Month chart incmome:', selectedMonth);
  
  
    const fetchData = async () => {
      try {
        const data = IncomingDB.posts;

        const filteredData = data.filter(item => {
          const itemMonth = new Date(item.dateValue).getMonth();
          return itemMonth === months.indexOf(selectedMonth);
        });
  


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

          setChartData({ data: chartData, options: chartOptions });
        } catch (error) {
          // console.error('Error fetching data:', error);
        }
      };
  
      fetchData();
    }, [selectedMonth]); // Add selectedMonth to the dependency array
  
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
              position: 'bottom', // Set 'bottom' for below or 'right' for the side
            },
          },
        }}
        key={Math.random()}
      />
    );
  }
  
  export default ChartInc;



