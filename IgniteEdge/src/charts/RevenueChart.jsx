import React from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement } from "chart.js";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

const RevenueChart = ({ data }) => {
  const chartData = {
    labels: data.map((d) => new Date(d.date).toLocaleDateString()),
    datasets: [
      {
        label: "Revenue",
        data: data.map((d) => d.revenue),
        borderColor: "#4CAF50",
        fill: false,
      },
      {
        label: "Expense",
        data: data.map((d) => d.expense),
        borderColor: "#F44336",
        fill: false,
      },
    ],
  };

  return <Line data={chartData} />;
};

export default RevenueChart;
