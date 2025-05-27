import React, { useRef } from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend } from "chart.js";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

const RevenueChart = ({ data }) => {
  const chartRef = useRef();

  const getGradient = (ctx, area) => {
    const gradient = ctx.createLinearGradient(area.left, 0, area.right, 0);
    gradient.addColorStop(0, "#3b82f6");
    gradient.addColorStop(1, "#60a5fa");
    return gradient;
  };

  const chartData = {
    labels: data.map((d) => new Date(d.date).toLocaleDateString()),
    datasets: [
      {
        label: "Revenue",
        data: data.map((d) => d.revenue),
        borderColor: (ctx) => {
          const chart = ctx.chart;
          const { ctx: context, chartArea } = chart;
          if (!chartArea) return "#3b82f6";
          return getGradient(context, chartArea);
        },
        backgroundColor: (ctx) => {
          const chart = ctx.chart;
          const { ctx: context, chartArea } = chart;
          if (!chartArea) return "rgba(59, 130, 246, 0.15)";
          const gradient = context.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
          gradient.addColorStop(0, "rgba(59, 130, 246, 0.18)");
          gradient.addColorStop(1, "rgba(59, 130, 246, 0.03)");
          return gradient;
        },
        borderWidth: 4,
        pointBackgroundColor: "#2563eb",
        pointBorderColor: "#2563eb",
        pointRadius: 6,
        pointHoverRadius: 8,
        tension: 0.45,
        fill: true,
      },
      {
        label: "Expense",
        data: data.map((d) => d.expense),
        borderColor: "#a78bfa",
        backgroundColor: "rgba(167, 139, 250, 0.10)",
        borderWidth: 3,
        pointBackgroundColor: "#7c3aed",
        pointBorderColor: "#7c3aed",
        pointRadius: 6,
        pointHoverRadius: 8,
        tension: 0.4,
        fill: false,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
        labels: {
          color: "#22223b",
          font: { size: 16, family: 'Inter, sans-serif', weight: 600 },
        },
      },
      title: {
        display: false,
      },
      tooltip: {
        backgroundColor: '#1e293b',
        titleColor: '#fff',
        bodyColor: '#fff',
        borderColor: '#3b82f6',
        borderWidth: 1,
      },
    },
    scales: {
      x: {
        grid: {
          color: 'rgba(59, 130, 246, 0.08)',
        },
        ticks: {
          color: '#64748b',
          font: { size: 14 },
        },
      },
      y: {
        grid: {
          color: 'rgba(59, 130, 246, 0.08)',
        },
        ticks: {
          color: '#64748b',
          font: { size: 14 },
        },
        beginAtZero: true,
      },
    },
  };

  return <Line ref={chartRef} data={chartData} options={options} />;
};

export default RevenueChart;
