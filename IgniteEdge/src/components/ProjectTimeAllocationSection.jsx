import React, { useEffect, useState } from "react";
import ProjectTimeAllocationModal from "./ProjectTimeAllocationModal";
import ProjectTimeGanttChart from "../charts/ProjectTimeGanttChart";
import axios from "axios";
import "../styles/genz-modal.css";

const ProjectTimeAllocationSection = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await axios.get("https://igniteedge-1.onrender.com/api/project-time-allocation", { withCredentials: true });
      setData(res.data);
    } catch (err) {
      setError("Failed to load project time allocation data");
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
      "https://igniteedge-1.onrender.com/api/project-time-allocation",
      formData,
      { withCredentials: true }
    );
    fetchData();
  };

  return (
    <>
      <div className="genz-chart-header" style={{ marginBottom: 0 }}>
        <h2 className="box-header" style={{ margin: 0 }}>Project Time Allocation</h2>
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
          <div>No project time allocation data yet.</div>
        ) : (
          <ProjectTimeGanttChart data={data} />
        )}
      </div>
      <ProjectTimeAllocationModal isOpen={isModalOpen} onClose={handleCloseModal} onSubmit={handleSubmit} />
    </>
  );
};

export default ProjectTimeAllocationSection; 