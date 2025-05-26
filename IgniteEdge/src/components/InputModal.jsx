import React, { useState } from "react";
import Modal from "react-modal";

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
    <Modal isOpen={isOpen} onRequestClose={onClose} contentLabel="Input Modal">
      <h2>Enter Finance Data</h2>
      <input name="date" type="date" onChange={handleChange} value={formData.date} />
      <input name="revenue" placeholder="Revenue" onChange={handleChange} value={formData.revenue} />
      <input name="expense" placeholder="Expense" onChange={handleChange} value={formData.expense} />
      <button onClick={handleSubmit}>Submit</button>
    </Modal>
  );
};

export default InputModal;
