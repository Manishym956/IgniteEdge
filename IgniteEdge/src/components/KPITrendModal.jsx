import React, { useState } from "react";
import Modal from "react-modal";
import "../styles/genz-modal.css";

const KPITrendModal = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    kpiName: "",
    value: "",
    date: "",
    threshold: ""
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await onSubmit({
        ...formData,
        value: Number(formData.value),
        threshold: formData.threshold ? Number(formData.threshold) : undefined
      });
      setFormData({ kpiName: "", value: "", date: "", threshold: "" });
      onClose();
    } catch (err) {
      setError(err?.message || "Failed to add KPI trend");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="KPI Trend Modal"
      className="genz-modal"
      overlayClassName="genz-modal-overlay"
    >
      <h2 className="genz-modal-title">Add KPI Trend</h2>
      <label className="genz-label" htmlFor="kpiName">KPI Name</label>
      <input
        id="kpiName"
        name="kpiName"
        type="text"
        className="genz-input"
        placeholder="KPI Name"
        value={formData.kpiName}
        onChange={handleChange}
        required
      />
      <label className="genz-label" htmlFor="date">Date</label>
      <input
        id="date"
        name="date"
        type="date"
        className="genz-input"
        value={formData.date}
        onChange={handleChange}
        required
      />
      <label className="genz-label" htmlFor="value">Value</label>
      <input
        id="value"
        name="value"
        type="number"
        className="genz-input"
        placeholder="Value"
        value={formData.value}
        onChange={handleChange}
        required
      />
      <label className="genz-label" htmlFor="threshold">Threshold (optional)</label>
      <input
        id="threshold"
        name="threshold"
        type="number"
        className="genz-input"
        placeholder="Threshold"
        value={formData.threshold}
        onChange={handleChange}
      />
      {error && <div style={{ color: 'red', marginTop: 8 }}>{error}</div>}
      <div style={{ display: 'flex', gap: '10px', marginTop: '16px' }}>
        <button className="genz-submit-btn" onClick={handleSubmit} disabled={loading} type="submit">
          {loading ? "Adding..." : "Submit"}
        </button>
        <button className="genz-cancel-btn" onClick={onClose} type="button">Cancel</button>
      </div>
    </Modal>
  );
};

Modal.setAppElement('#root');

export default KPITrendModal; 