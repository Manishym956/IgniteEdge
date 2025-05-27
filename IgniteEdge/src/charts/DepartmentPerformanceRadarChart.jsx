import React from "react";
import { Radar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

const AXES = ["Efficiency", "Quality", "Teamwork", "Innovation", "Attendance"];

const COLORS = [
  "rgba(59, 130, 246, 0.5)",
  "rgba(16, 185, 129, 0.5)",
  "rgba(245, 158, 66, 0.5)",
  "rgba(99, 102, 241, 0.5)",
  "rgba(239, 68, 68, 0.5)"
];

const DepartmentPerformanceRadarChart = ({ data = [] }) => {
  // Get latest entry per department
  const latestByDept = {};
  data.forEach(entry => {
    if (!latestByDept[entry.department] || new Date(entry.date) > new Date(latestByDept[entry.department].date)) {
      latestByDept[entry.department] = entry;
    }
  });
  const departments = Object.keys(latestByDept);
  const chartData = {
    labels: AXES,
    datasets: departments.map((dept, i) => ({
      label: dept,
      data: AXES.map(axis => latestByDept[dept].scores[axis] || 0),
      backgroundColor: COLORS[i % COLORS.length],
      borderColor: COLORS[i % COLORS.length].replace('0.5', '1'),
      borderWidth: 2,
      pointBackgroundColor: COLORS[i % COLORS.length].replace('0.5', '1'),
    }))
  };
  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
    },
    scales: {
      r: {
        min: 0,
        max: 10,
        ticks: { stepSize: 2 },
        pointLabels: { font: { size: 14 } }
      }
    }
  };
  return (
    <div style={{ height: 350 }}>
      <Radar data={chartData} options={options} />
    </div>
  );
};

export default DepartmentPerformanceRadarChart; 