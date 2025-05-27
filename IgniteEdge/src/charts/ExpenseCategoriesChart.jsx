import React from "react";
import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const COLORS = [
  "#3b82f6", "#ef4444", "#f59e42", "#10b981", "#6366f1", "#f472b6", "#facc15", "#a3e635"
];

const ExpenseCategoriesChart = ({ data = [] }) => {
  const chartData = {
    labels: data.map(item => item._id),
    datasets: [
      {
        data: data.map(item => item.total),
        backgroundColor: COLORS,
        borderWidth: 1,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        position: "bottom",
      },
    },
    cutout: "70%",
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <div style={{ height: 300 }}>
      <Doughnut data={chartData} options={options} />
    </div>
  );
};

export default ExpenseCategoriesChart; 