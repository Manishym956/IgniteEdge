import React, { useState } from "react";
import Modal from "react-modal";
import "../styles/genz-modal.css";

// Minimal country list for demo; for full list, use a package or a larger array
const COUNTRIES = [
  { code: "USA", name: "United States" },
  { code: "IND", name: "India" },
  { code: "CHN", name: "China" },
  { code: "GBR", name: "United Kingdom" },
  { code: "CAN", name: "Canada" },
  { code: "AUS", name: "Australia" },
  { code: "DEU", name: "Germany" },
  { code: "FRA", name: "France" },
  { code: "BRA", name: "Brazil" },
  { code: "RUS", name: "Russia" },
  // ...add more as needed
];

const GeoDistributionModal = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    region: "",
    value: "",
    date: ""
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
        value: Number(formData.value)
      });
      setFormData({ region: "", value: "", date: "" });
      onClose();
    } catch (err) {
      setError(err?.message || "Failed to add geo distribution");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Geo Distribution Modal"
      className="genz-modal"
      overlayClassName="genz-modal-overlay"
    >
      <h2 className="genz-modal-title">Add Geographic Distribution</h2>
      <label className="genz-label" htmlFor="region">Country</label>
      <select
        id="region"
        name="region"
        className="genz-input"
        value={formData.region}
        onChange={handleChange}
        required
      >
        <option value="">Select a country</option>
        {COUNTRIES.map(c => (
          <option key={c.code} value={c.code}>{c.name} ({c.code})</option>
        ))}
      </select>
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
      <label className="genz-label" htmlFor="date">Date (optional)</label>
      <input
        id="date"
        name="date"
        type="date"
        className="genz-input"
        value={formData.date}
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

export default GeoDistributionModal; 