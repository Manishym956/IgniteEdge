import React, { useState } from "react";
import Modal from "react-modal";
import "../styles/genz-modal.css";

const AXES = ["Efficiency", "Quality", "Teamwork", "Innovation", "Attendance"];

const DepartmentPerformanceModal = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    department: "",
    date: "",
    scores: AXES.reduce((acc, axis) => ({ ...acc, [axis]: "" }), {})
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (AXES.includes(name)) {
      setFormData({ ...formData, scores: { ...formData.scores, [name]: value } });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const scores = {};
      for (const axis of AXES) {
        scores[axis] = Number(formData.scores[axis]);
      }
      await onSubmit({
        department: formData.department,
        date: formData.date,
        scores
      });
      setFormData({ department: "", date: "", scores: AXES.reduce((acc, axis) => ({ ...acc, [axis]: "" }), {}) });
      onClose();
    } catch (err) {
      setError(err?.message || "Failed to add performance entry");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Department Performance Modal"
      className="genz-modal"
      overlayClassName="genz-modal-overlay"
    >
      <h2 className="genz-modal-title">Add Department Performance</h2>
      <label className="genz-label" htmlFor="department">Department</label>
      <input
        id="department"
        name="department"
        type="text"
        className="genz-input"
        placeholder="Department"
        value={formData.department}
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
      {AXES.map(axis => (
        <React.Fragment key={axis}>
          <label className="genz-label" htmlFor={axis}>{axis}</label>
          <input
            id={axis}
            name={axis}
            type="number"
            className="genz-input"
            placeholder={axis}
            value={formData.scores[axis]}
            onChange={handleChange}
            min="0"
            max="10"
            step="1"
            required
          />
        </React.Fragment>
      ))}
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

export default DepartmentPerformanceModal; 