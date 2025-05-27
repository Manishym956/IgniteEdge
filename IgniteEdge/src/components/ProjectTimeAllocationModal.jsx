import React, { useState } from "react";
import Modal from "react-modal";
import "../styles/genz-modal.css";

const ProjectTimeAllocationModal = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    projectName: "",
    department: "",
    startDate: "",
    endDate: "",
    hoursAllocated: ""
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
      if (new Date(formData.endDate) < new Date(formData.startDate)) {
        setError("End date must be after start date");
        setLoading(false);
        return;
      }
      await onSubmit({
        ...formData,
        hoursAllocated: Number(formData.hoursAllocated)
      });
      setFormData({ projectName: "", department: "", startDate: "", endDate: "", hoursAllocated: "" });
      onClose();
    } catch (err) {
      setError(err?.message || "Failed to add project time allocation");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Project Time Allocation Modal"
      className="genz-modal"
      overlayClassName="genz-modal-overlay"
    >
      <h2 className="genz-modal-title">Add Project Time Allocation</h2>
      <label className="genz-label" htmlFor="projectName">Project Name</label>
      <input
        id="projectName"
        name="projectName"
        type="text"
        className="genz-input"
        placeholder="Project Name"
        value={formData.projectName}
        onChange={handleChange}
        required
      />
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
      <label className="genz-label" htmlFor="startDate">Start Date</label>
      <input
        id="startDate"
        name="startDate"
        type="date"
        className="genz-input"
        value={formData.startDate}
        onChange={handleChange}
        required
      />
      <label className="genz-label" htmlFor="endDate">End Date</label>
      <input
        id="endDate"
        name="endDate"
        type="date"
        className="genz-input"
        value={formData.endDate}
        onChange={handleChange}
        required
      />
      <label className="genz-label" htmlFor="hoursAllocated">Hours Allocated</label>
      <input
        id="hoursAllocated"
        name="hoursAllocated"
        type="number"
        className="genz-input"
        placeholder="Hours Allocated"
        value={formData.hoursAllocated}
        onChange={handleChange}
        min="0"
        required
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

export default ProjectTimeAllocationModal; 