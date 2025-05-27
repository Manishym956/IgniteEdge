import React, { useEffect, useState } from "react";
import GeoDistributionModal from "./GeoDistributionModal";
import GeoChoroplethMap from "../charts/GeoChoroplethMap";
import axios from "axios";
import "../styles/genz-modal.css";

const GeoDistributionSection = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await axios.get("http://localhost:1600/api/geo-distribution", { withCredentials: true });
      setData(res.data);
    } catch (err) {
      setError("Failed to load geo distribution data");
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
      "http://localhost:1600/api/geo-distribution",
      formData,
      { withCredentials: true }
    );
    fetchData();
  };

  return (
    <>
      <div className="genz-chart-header" style={{ marginBottom: 0 }}>
        <h2 className="box-header" style={{ margin: 0 }}>Geographic Distribution Map</h2>
        <button className="genz-submit-btn" style={{ marginLeft: 'auto' }} onClick={handleAddClick}>
          + Add Entry
        </button>
      </div>
      <div className="genz-chart-card">
        {loading ? (
          <div>Loading map...</div>
        ) : error ? (
          <div style={{ color: 'red' }}>{error}</div>
        ) : data.length === 0 ? (
          <div>No geo distribution data yet.</div>
        ) : (
          <GeoChoroplethMap data={data} />
        )}
      </div>
      <GeoDistributionModal isOpen={isModalOpen} onClose={handleCloseModal} onSubmit={handleSubmit} />
    </>
  );
};

export default GeoDistributionSection; 