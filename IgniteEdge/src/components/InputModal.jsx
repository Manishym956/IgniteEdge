import React, { useState } from "react";
import Modal from "react-modal";
import "../styles/genz-modal.css";

const InputModal = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    date: "",
    revenue: "",
    expense: "",
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = () => {
    onSubmit(formData);
    setFormData({ date: "", revenue: "", expense: "" });
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Input Modal"
      className="genz-modal"
      overlayClassName="genz-modal-overlay"
    >
      <h2 className="genz-modal-title">Enter Finance Data</h2>
      <label className="genz-label" htmlFor="date">Date</label>
      <input
        id="date"
        name="date"
        type="date"
        onChange={handleChange}
        value={formData.date}
        className="genz-input"
      />
      <label className="genz-label" htmlFor="revenue">Revenue</label>
      <input
        id="revenue"
        name="revenue"
        placeholder="Revenue"
        onChange={handleChange}
        value={formData.revenue}
        className="genz-input"
        type="number"
      />
      <label className="genz-label" htmlFor="expense">Expense</label>
      <input
        id="expense"
        name="expense"
        placeholder="Expense"
        onChange={handleChange}
        value={formData.expense}
        className="genz-input"
        type="number"
      />
      <div style={{ display: 'flex', gap: '10px', marginTop: '16px' }}>
        <button className="genz-submit-btn" onClick={handleSubmit}>Submit</button>
        <button className="genz-cancel-btn" onClick={onClose} type="button">Cancel</button>
      </div>
    </Modal>
  );
};

export default InputModal;
