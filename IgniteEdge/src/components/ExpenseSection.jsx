import React, { useEffect, useState } from "react";
import ExpenseCategoriesChart from "../charts/ExpenseCategoriesChart";
import "../styles/genz-modal.css";
import axios from "axios";
import Modal from "react-modal";

const ExpenseModal = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    category: "",
    amount: "",
    date: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await onSubmit({ ...formData, amount: Number(formData.amount) });
      setFormData({ category: "", amount: "", date: "" });
      onClose();
    } catch (err) {
      setError(err?.message || "Failed to add expense");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Expense Modal"
      className="genz-modal"
      overlayClassName="genz-modal-overlay"
    >
      <h2 className="genz-modal-title">Add Expense</h2>
      <label className="genz-label" htmlFor="category">Category</label>
      <input
        id="category"
        name="category"
        type="text"
        className="genz-input"
        placeholder="Category"
        value={formData.category}
        onChange={handleChange}
        required
      />
      <label className="genz-label" htmlFor="amount">Amount</label>
      <input
        id="amount"
        name="amount"
        type="number"
        className="genz-input"
        placeholder="Amount"
        value={formData.amount}
        onChange={handleChange}
        required
        min="0"
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

const ExpenseSection = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await axios.get("http://localhost:1600/api/expenses/categories", { withCredentials: true });
      setData(res.data);
    } catch (err) {
      setError("Failed to load expense data");
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
      "http://localhost:1600/api/expenses",
      formData,
      { withCredentials: true }
    );
    fetchData();
  };

  return (
    <>
      <div className="genz-chart-header" style={{ marginBottom: 0 }}>
        <h2 className="box-header" style={{ margin: 0 }}>Top Expense Categories</h2>
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
          <div>No expense data yet.</div>
        ) : (
          <ExpenseCategoriesChart data={data} />
        )}
      </div>
      <ExpenseModal isOpen={isModalOpen} onClose={handleCloseModal} onSubmit={handleSubmit} />
    </>
  );
};

export default ExpenseSection; 