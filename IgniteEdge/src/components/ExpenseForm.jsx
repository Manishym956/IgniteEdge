import React, { useState } from "react";
import axios from "axios";

const ExpenseForm = ({ onSuccess }) => {
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await axios.post(
        "http://localhost:1600/api/expenses",
        { category, amount: Number(amount), date },
        { withCredentials: true }
      );
      setCategory("");
      setAmount("");
      setDate("");
      if (onSuccess) onSuccess();
    } catch (err) {
      setError(err.response?.data?.error || "Failed to add expense");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="expense-form" onSubmit={handleSubmit} style={{ marginBottom: 24 }}>
      <div>
        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={e => setCategory(e.target.value)}
          required
        />
      </div>
      <div>
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={e => setAmount(e.target.value)}
          required
          min="0"
        />
      </div>
      <div>
        <input
          type="date"
          value={date}
          onChange={e => setDate(e.target.value)}
          required
        />
      </div>
      <button type="submit" disabled={loading}>{loading ? "Adding..." : "Add Expense"}</button>
      {error && <div style={{ color: 'red', marginTop: 8 }}>{error}</div>}
    </form>
  );
};

export default ExpenseForm; 