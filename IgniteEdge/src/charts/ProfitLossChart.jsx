import React, { useRef } from 'react';
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
  const chartRef = useRef();
  const labels = records.map(r => {
    // If r.period is a date string, format it nicely
    if (/^\d{4}-\d{2}-\d{2}$/.test(r.period)) {
      return new Date(r.period).toLocaleDateString();
    }
    return r.period;
  });
  const data = records.map(r => r.profitOrLoss);

  // Gradient helpers
  const getBlueGradient = (ctx, area) => {
    const gradient = ctx.createLinearGradient(area.left, 0, area.right, 0);
    gradient.addColorStop(0, '#3b82f6');
    gradient.addColorStop(1, '#60a5fa');
    return gradient;
  };
  const getRedGradient = (ctx, area) => {
    const gradient = ctx.createLinearGradient(area.left, 0, area.right, 0);
    gradient.addColorStop(0, '#f87171');
    gradient.addColorStop(1, '#ef4444');
    return gradient;
  };

  const chartData = {
    labels,
    datasets: [
      {
        label: 'Profit',
        data: data.map(v => v >= 0 ? v : 0),
        backgroundColor: (ctx) => {
          const chart = ctx.chart;
          const { ctx: context, chartArea } = chart;
          if (!chartArea) return '#3b82f6';
          return getBlueGradient(context, chartArea);
        },
        borderRadius: 8,
        barPercentage: 0.6,
        categoryPercentage: 0.6,
      },
      {
        label: 'Loss',
        data: data.map(v => v < 0 ? Math.abs(v) : 0),
        backgroundColor: (ctx) => {
          const chart = ctx.chart;
          const { ctx: context, chartArea } = chart;
          if (!chartArea) return '#ef4444';
          return getRedGradient(context, chartArea);
        },
        borderRadius: 8,
        barPercentage: 0.6,
        categoryPercentage: 0.6,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: '#22223b',
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
        callbacks: {
          label: function(context) {
            const label = context.dataset.label || '';
            const value = context.parsed.y;
            return `${label}: ${label === 'Loss' ? '-' : ''}${value}`;
          }
        }
      },
    },
    scales: {
      x: {
        stacked: true,
        grid: {
          color: 'rgba(59, 130, 246, 0.08)',
        },
        ticks: {
          color: '#64748b',
          font: { size: 14 },
        },
      },
      y: {
        stacked: true,
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

  return <Bar ref={chartRef} data={chartData} options={options} />;
}
