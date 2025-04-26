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
import SignupPage from './Authentication/Signup';
import './App.css';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const App = () => {
  return (
    <div>
      <header className="header">
        <h1>InsightEdge</h1>
        <nav>
          <ul>
            <li>About Us</li>
            <li>Pricing</li>
            <li>Features</li>
            <li onClick={() => {
              window.location.href = '/Authentication/Signup';
            }}>Sign Up</li>
          </ul>
        </nav>
      </header>

      <div className="banner">
        <h2>EMPOWER YOUR INVESTMENT STRATEGY WITH INSIGHTEDGE</h2>
        <p>Unlock ultimate business analytics dashboard</p>
        <button className="trial-button">Start Free Trial</button>
      </div>

      <section className="graph">
      <div className="graph-text">
        <h3>Monitor key metrics for your business</h3>
        <p>
          Harness the power of key Performance Indicators. 
          Track your growth and insights effectively.
        </p>
        </div>
        <div className="bar-chart">
        <BarChart />
       </div>
      </section>
    </div>
  );
};

const BarChart = () => {
  const data = {
    labels: ['Figma', 'Sketch', 'XD'],
    datasets: [
      {
        label: '2020',
        data: [60, 70, 50],
        backgroundColor: '#4B86F2',
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return <Bar data={data} options={options} />;
};

export default App;
