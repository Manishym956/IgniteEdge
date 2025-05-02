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
import { useNavigate, Link } from 'react-router-dom';
import './App.css';
import SignupPage from './Authentication/Signup';
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const App = () => {
  const navigate = useNavigate();
  return (
    <div>
      <header className="header">
        <h1>InsightEdge</h1>
        <nav>
          <ul>
            <li>About Us</li>
            <li>Pricing</li>
            <li>Features</li>
            <div className="signup">
            <button onClick={() => navigate('/Authentication/Signup')}>Sign Up</button>
            </div>
          </ul>
        </nav>
      </header>

      <div className="banner">
        <h2>EMPOWER YOUR INVESTMENT STRATEGY WITH INSIGHTEDGE</h2>
        <p>Unlock ultimate business analytics dashboard</p>
        <button className="trial-button" onClick={() => navigate('/Authentication/Signup')}>Start Free Trial</button>
      </div>

      <section className="graph">
      <div className="graph-text">
        <h3>Monitor key metrics for your business</h3>
        <p>
          Harness the power of key Performance Indicators. 
          Track your growth and insights effectively.ljed;oicqnwiubyinxgxnjshc
          sjsnfkndixxh
          efdicamcugbnloifl nhvifuvk
          ceinxdjxgiuimnhcducngori
          ecinjcgriliudrvmjrivyndnrhgrcu
          qrtaueirtothovurttuhntthnuhntu
          ucryec9t7rycygcroiyyuigmrhcowhcgmi
          ncirurgchbhclweurghulchrmuomvhrteuynruturlecgimytchlwcmiylimyulhmiyuh
          orvymlwemorytvhlnryu ulnviuyt
          orgy orry lund chutiya
          ceinowhgoqyrehgcolm.\ueipmotla
        </p>
        </div>
        <div className="bar-chart">
        <BarChart />
       </div>
      </section>
      <section className="pricing">
        <div className="title"><h2>Plans & Pricing</h2></div>
        <div className="pricing-container">
          <div className="pricing-box">
            <div className='pricing-title'><h3>Basic</h3></div>
            <div className='pricing-detail'><p>Free</p>
            <ul>
              <li>✔ Access select public datasets</li>
              <li>✔ No payment required</li>
              <li>✔ Limited features</li>
              <li>✔ No credit card required</li>
            </ul>
            </div>
            <button className="buy-now">Get Started Free</button>
          </div>
          <div className="pricing-box">
          <div className='pricing-title'><h3>Monthly</h3></div>
          <div className='pricing-detail'><p>$49/month</p>
            <ul>
              <li>✔ Full access to all premium datasets</li>
              <li>✔ Download & export data</li>
              <li>✔ Access to all financial KPIs</li>
              <li>✔ Custom dashboards</li>
            </ul>
            </div>
            <button className="buy-now">Buy Now</button>
          </div>
          <div className="pricing-box">
          <div className='pricing-title'><h3>Yearly</h3></div>
          <div className='pricing-detail'><p>$499/year</p>
            <ul>
              <li>✔ Full access to all premium datasets</li>
              <li>✔ Download & export data</li>
              <li>✔ Access to all financial KPIs</li>
              <li>✔ Custom dashboards</li>
            </ul>
            </div>
            <button className="buy-now">Buy Now</button>
          </div>
        </div>

        <div className='title'><h3>What You Get with IgniteEdge</h3></div>
        <div className='features-container'>
          <div className='description'>
        <p>
          From deep dive research reports to powerful quantitative analysis tools,<br></br> 
          Business Quant provides everything you need to make well-informed investment decisions.
        </p>
        </div>
        <div className="benefits">
          <div className="benefit">
            <div className='feature-title'><h4>Deep Dives Research Reports</h4></div>
            <p>In-depth research on high-quality companies with long-term growth potential.</p>
          </div>
          <div className="benefit">
          <div className='feature-title'><h4>Quantitative Analysis Tools</h4></div>
            <p>Quickly identify winning investments using statistical models.</p>
          </div>
          <div className="benefit">
          <div className='feature-title'><h4>Priority Support</h4></div>
            <p>Get fast, personalized support from our team of investing experts.</p>
          </div>
          <div className="benefit">
          <div className='feature-title'><h4>Investment Guides</h4></div>
            <p>Comprehensive guides to various investing strategies, available to all users.</p>
          </div>
          <div className="benefit">
          <div className='feature-title'><h4>Investor Community Access</h4></div>
            <p>Join our platform community and gain valuable insights from other members.</p>
          </div>
          <div className="benefit">
          <div className='feature-title'><h4>Multiple User Access</h4></div>
            <p>Share your account with up to three team members.</p>
          </div>
          </div>
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
