import React, { useState, useEffect } from 'react';
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
import img2 from './Images/img2.jpg';
import SignupPage from './Authentication/Signup';
import authService from './services/authService'; // Assuming authService is imported
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const scrollToClass = (className) => {
  const element = document.querySelector(`.${className}`);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
};

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await authService.isAuthenticated();
        setIsAuthenticated(response.success);
        if (response.success) {
          setUser(JSON.parse(localStorage.getItem('user')));
        }
      } catch (error) {
        console.error('Auth check failed:', error);
      }
    };
    checkAuth();
  }, []);

  return (
    <div>
      <header className="header">
        <h1>IgniteEdge</h1>
        <nav>
          <ul>
            <li><a href="#" onClick={() => scrollToClass('graph')} style={{ color: 'black' }}>About Us</a></li>
            <li><a href="#" onClick={() => scrollToClass('pricing')} style={{ color: 'black' }}>Pricing</a></li>
            <li><a href="#" onClick={() => scrollToClass('features-container')} style={{ color: 'black' }}>Features</a></li>
            <div className="auth-section">
              {isAuthenticated ? (
                <div className="profile-icon">
                  <img 
                    src={user?.profileImage || '/default-avatar.png'} 
                    alt="Profile" 
                    onClick={() => navigate('/profile')}
                  />
                </div>
              ) : (
                <button onClick={() => navigate('/Authentication/Signup')}>Sign Up</button>
              )}
            </div>
          </ul>
        </nav>
      </header>

      <div className="banner">
        <h2>EMPOWER YOUR INVESTMENT STRATEGY WITH IGNITEEDGE</h2>
        <p>Unlock ultimate business analytics dashboard</p>
        <button className="trial-button" onClick={() => navigate('/Authentication/Signup')}>Start Free Trial</button>
      </div>

      <section className="graph">
        <div className="graph-text">
          <h3>Monitor key metrics for your business</h3>
          <p>
            Harness the power of Key Performance Indicators (KPIs) to stay on top of your business performance. 
            Visualize revenue, profit margins, employee expenses, and more in real-time. 
            Gain insights from clear, actionable data to make informed decisions and drive strategic growth. 
            Our dashboard gives you a comprehensive overview—all in one place. 
            Customize your data views with filters and tags tailored to your workflow. 
            Stay ahead of the curve with automated trend analysis and alerts for key changes.
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
            <p style={{ color: 'white' }}>
              From deep dive research reports to powerful quantitative analysis tools,<br></br> 
              IgniteEdge provides everything you need to make well-informed investment decisions.
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
      <section className="testimonials">
        <div className="title">
          <h3>What They Say</h3>
          <p>Their opinion about the provided good values with the experience they've gone through.</p>
        </div>
        <div className="testimonial-container">
          <div className="testimonial">
            <h4>Sophia Carter</h4>
            <p>on Mar 12, 2024</p>
            <p>⭐⭐⭐⭐⭐</p>
            <p>Amazing Experience! I couldn’t be happier!</p>
          </div>
          <div className="testimonial">
            <h4>Sophia Carter</h4>
            <p>on Mar 12, 2024</p>
            <p>⭐⭐⭐⭐⭐</p>
            <p>Amazing Experience! I couldn’t be happier!</p>
          </div>
          <div className="testimonial">
            <h4>Sophia Carter</h4>
            <p>on Mar 12, 2024</p>
            <p>⭐⭐⭐⭐⭐</p>
            <p>Amazing Experience! I couldn’t be happier!</p>
          </div>
          <div className="testimonial">
            <h4>Sophia Carter</h4>
            <p>on Mar 12, 2024</p>
            <p>⭐⭐⭐⭐⭐</p>
            <p>Amazing Experience! I couldn’t be happier!</p>
          </div>
          <div className="testimonial">
            <h4>Sophia Carter</h4>
            <p>on Mar 12, 2024</p>
            <p>⭐⭐⭐⭐⭐</p>
            <p>Amazing Experience! I couldn’t be happier!</p>
          </div>
        </div>
      </section>

      <section className="call-to-action">
        <div className='text-content'>
          <h2>Let's Start Investing Your <br></br>
            Assets With InsightEdge</h2>
          <p>
            Join our growing community and take control of your financial journey. 
            Start investing smarter with real-time insights and powerful analytics from IgniteEdge.
          </p>
          <button onClick={() => navigate('/Authentication/Signup')}>Become a Member</button>
        </div>
        <div className='cta-image'>
          <img src={img2} alt="Illustration" />
        </div>
      </section>

      <footer className="site-footer">
        <div className="footer-container">
          <div className="footer-brand">
            <h3>InsightEdge</h3>
            <p>
              At InsightEdge, we provide reliable insights across a company’s fundamentals and investor resources.
            </p>
            <div className="footer-socials">
              <a href="#"><i className="fab fa-linkedin-in"></i></a>
              <a href="#"><i className="fab fa-instagram"></i></a>
              <a href="#"><i className="fab fa-facebook-f"></i></a>
            </div>
          </div>

          <div className="footer-links">
            <div>
              <h4>Resources</h4>
              <ul>
                <li><a href="#">About Us</a></li>
                <li><a href="#">SiteMap</a></li>
                <li><a href="#">Contact Us</a></li>
              </ul>
            </div>
            <div>
              <h4>Company</h4>
              <ul>
                <li><a href="#">Terms of Use</a></li>
                <li><a href="#">Privacy Policy</a></li>
                <li><a href="#">Plans & Pricing</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>Copyright © 2025 InsightEdge. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

const BarChart = () => {
  const data = {
  maintainAspectRatio: false,
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
