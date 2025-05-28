import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

const COLORS = [
  "#3b82f6", "#ef4444", "#10b981", "#f59e42", "#6366f1", "#f472b6", "#facc15", "#a3e635"
];

function getUniqueKPIs(data) {
  return [...new Set(data.map(d => d.kpiName))];
}

const KPITrendsLineChart = ({ data = [] }) => {
  if (!data.length) return <div>No data</div>;
  // Group by KPI
  const kpis = getUniqueKPIs(data);
  // Get all dates (sorted)
  const dates = [...new Set(data.map(d => d.date.slice(0, 10)))].sort();
  // Prepare datasets
  const datasets = kpis.map((kpi, i) => {
    const kpiData = data.filter(d => d.kpiName === kpi);
    // Map date to value
    const dateToValue = Object.fromEntries(kpiData.map(d => [d.date.slice(0, 10), d.value]));
    // Find threshold (use latest if multiple)
    const threshold = kpiData[kpiData.length - 1]?.threshold;
    return {
      label: kpi,
      data: dates.map(date => dateToValue[date] ?? null),
      borderColor: COLORS[i % COLORS.length],
      backgroundColor: COLORS[i % COLORS.length],
      tension: 0.3,
      spanGaps: true,
      pointRadius: 4,
      pointHoverRadius: 6,
      yAxisID: 'y',
      threshold
    };
  });
  // Add threshold lines
  const thresholdLines = datasets
    .filter(ds => ds.threshold !== undefined && ds.threshold !== null)
    .map((ds, i) => ({
      label: ds.label + ' Threshold',
      data: Array(dates.length).fill(ds.threshold),
      borderColor: ds.borderColor,
      borderDash: [6, 6],
      pointRadius: 0,
      borderWidth: 1.5,
      fill: false,
      yAxisID: 'y',
      order: 0
    }));
  const chartData = {
    labels: dates,
    datasets: [...datasets, ...thresholdLines]
  };
  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      tooltip: { enabled: true }
    },
    scales: {
      y: {
        beginAtZero: true
      }
    }
  };
  return (
    <div style={{ height: 350 }}>
      <Line data={chartData} options={options} />
    </div>
  );
};

export default KPITrendsLineChart; 