import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'chart.js/auto';
import { Doughnut } from 'react-chartjs-2';

function ChartInc({ selectedMonth }) {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/posts?month=${selectedMonth}`);
        const data = response.data;

        // Agrupar os dados por categoria e calcular a soma dos preços
        const groupedData = data.reduce((result, item) => {
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
              backgroundColor: [
                'rgb(255, 99, 132)', // Rosa claro
                'rgb(54, 162, 235)', // Azul claro
                'rgb(255, 206, 86)', // Amarelo claro
                'rgb(75, 192, 192)', // Verde azulado claro
                'rgb(153, 102, 255)', // Roxo claro
                'rgb(255, 159, 64)', // Laranja claro
                'rgb(148, 159, 177)', // Cinza claro
              ],
              
              borderColor: [
                'rgba(255, 99, 132, 1)', // Rosa claro
                'rgba(54, 162, 235, 1)', // Azul claro
                'rgba(255, 206, 86, 1)', // Amarelo claro
                'rgba(75, 192, 192, 1)', // Verde azulado claro
                'rgba(153, 102, 255, 1)', // Roxo claro
                'rgba(255, 159, 64, 1)', // Laranja claro
                'rgba(148, 159, 177, 1)', // Cinza claro
              ],
              
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
          console.error('Error fetching data:', error);
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



