import React, { useEffect, useState } from "react";
import axios from "axios";
import "chart.js/auto";
import { Doughnut } from "react-chartjs-2";
import { months } from "./Months";
import { useSelector } from "react-redux";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

const categoryColors = {
  Car: "rgb(54, 162, 235)", // Blue
  Technology: "rgb(255, 99, 132)", // Red
  Food: "rgb(255, 159, 64)", // Orange
  Transport: "rgb(75, 192, 192)", // Teal
  Bills: "rgb(153, 102, 255)", // Purple
  Accomodation: "rgb(255, 206, 86)", // Yellow
  Health: "rgb(0, 128, 0)", // Green
  "Night Life": "rgb(215, 99, 132)", // Pink
  Sports: "rgb(148, 159, 177)", // Gray
  Other: "rgb(0, 210, 145)", // Green palide
};

function ChartExp({ selectedMonth, expenseData }) {
  // console.log("Props received in ChartExp - selectedMonth:", selectedMonth);
  // console.log("Props received in ChartExp - expenseData:", expenseData);

  if (expenseData.length === 0) {
    return <div>Loading chart...</div>;
  }
  const [chartData, setChartData] = useState(null);
  const isSmallScreen = window.innerWidth <= 768;

  // console.log("ChartExp props - selectedMonth:", selectedMonth);
  // console.log("ChartExp props - expenseData:", expenseData);
  const legendPosition = isSmallScreen ? "bottom" : "right";

  useEffect(() => {
    // console.log('Selected Month chart expense:', selectedMonth);

    const fetchData = async () => {
      try {
        const filteredData = expenseData.filter((item) => {
          const itemMonth = new Date(item["items/dateValue"]).getMonth();

          return itemMonth === months.indexOf(selectedMonth);
        });

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
          width: 100, 
          height: 100, 
          plugins: {
            tooltip: {
              // ...
            },
          },
        };

       

        setChartData({ data: chartData, options: chartOptions });
      } catch (error) {
      }
    };

    fetchData();
  }, [selectedMonth, expenseData, isSmallScreen]); 

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
              position: legendPosition,
            },
          },
        }}
      />
    </div>
  );
}

export default ChartExp;
