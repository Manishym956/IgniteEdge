import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function ProfitLossChart({ records = []}) {
  const labels = records.map(r => r.period);
  const data = records.map(r => r.profitOrLoss);

  const chartData = {
    labels,
    datasets: [
      {
        label: 'Profit / Loss',
        data,
        backgroundColor: data.map(value => (value >= 0 ? 'rgba(54, 162, 235, 0.7)' : 'rgba(255, 99, 132, 0.7)')),
        borderColor: data.map(value => (value >= 0 ? 'rgba(54, 162, 235, 1)' : 'rgba(255, 99, 132, 1)')),
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: 'Profit & Loss Summary' },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: { display: true, text: 'Amount' },
      },
      x: {
        title: { display: true, text: 'Period' },
      },
    },
  };

  return <Bar data={chartData} options={options} />;
}
