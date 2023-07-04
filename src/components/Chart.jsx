

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'chart.js/auto';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

function Chart(item) {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/posts');
        const data = response.data;
        console.log(response.data)

        // Extrair as informações necessárias para o gráfico
        const labels = data.map((item) => item.category);
        const values = data.map((item) => item.price);
        console.log(item.category)
        console.log(item.price);

        // Definir o objeto de configuração do gráfico
        const chartData = {
          labels: labels,
          datasets: [
            {
              label: '# of Votes',
              data: values,
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                // Adicione mais cores se necessário
              ],
              borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                // Adicione mais cores se necessário
              ],
              borderWidth: 1,
            },
          ],
        };

        setChartData(chartData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);


  

  if (!chartData) {
    return null; // Aguardando os dados serem carregados
  }

  return <Doughnut data={chartData} key={Math.random()}   options={{
    responsive: true,
    maintainAspectRatio: false,
    width: 200, // Defina a largura desejada
    height: 100, // Defina a altura desejada;
}} />

}

export default Chart;