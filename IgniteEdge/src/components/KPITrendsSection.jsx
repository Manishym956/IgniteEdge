import React, { useEffect, useState } from "react";
import KPITrendModal from "./KPITrendModal";
import KPITrendsLineChart from "../charts/KPITrendsLineChart";
import axios from "axios";
import "../styles/genz-modal.css";

const KPITrendsSection = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await axios.get("http://localhost:1600/api/kpi-trends", { withCredentials: true });
      setData(res.data);
    } catch (err) {
      setError("Failed to load KPI trends data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAddClick = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);
  const handleSubmit = async (formData) => {
    await axios.post(
      "http://localhost:1600/api/kpi-trends",
      formData,
      { withCredentials: true }
    );
    fetchData();
  };

  return (
    <>
      <div className="genz-chart-header" style={{ marginBottom: 0 }}>
        <h2 className="box-header" style={{ margin: 0 }}>KPI Trends</h2>
        <button className="genz-submit-btn" style={{ marginLeft: 'auto' }} onClick={handleAddClick}>
          + Add Entry
        </button>
      </div>
      <div className="genz-chart-card">
        {loading ? (
          <div>Loading chart...</div>
        ) : error ? (
          <div style={{ color: 'red' }}>{error}</div>
        ) : data.length === 0 ? (
          <div>No KPI trends data yet.</div>
        ) : (
          <KPITrendsLineChart data={data} />
        )}
      </div>
      <KPITrendModal isOpen={isModalOpen} onClose={handleCloseModal} onSubmit={handleSubmit} />
    </>
  );
};

export default KPITrendsSection; 