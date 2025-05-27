import React, { useState, useEffect } from 'react';
import "../styles/genz-modal.css";

export default function ProfitLossForm({ isOpen, onClose, onSave, initialData }) {
  const [period, setPeriod] = useState('');
  const [type, setType] = useState('Profit');
  const [amount, setAmount] = useState('');

  useEffect(() => {
    if (initialData) {
      setPeriod(initialData.period);
      if (initialData.profitOrLoss >= 0) {
        setType('Profit');
        setAmount(initialData.profitOrLoss);
      } else {
        setType('Loss');
        setAmount(Math.abs(initialData.profitOrLoss));
      }
    } else {
      setPeriod('');
      setType('Profit');
      setAmount('');
    }
  }, [initialData]);

  const handleSubmit = e => {
    e.preventDefault();
    if (!period || amount === '') {
      alert('Please fill in all fields');
      return;
    }
    const value = type === 'Profit' ? Number(amount) : -Number(amount);
    onSave({ period, profitOrLoss: value });
  };

  if (!isOpen) return null;

  return (
    <div className="genz-modal-overlay">
      <div className="genz-modal">
        <h2 className="genz-modal-title">{initialData ? 'Edit' : 'Add'} Profit & Loss Record</h2>
        <form onSubmit={handleSubmit}>
          <label className="genz-label" htmlFor="period">Date</label>
          <input
            id="period"
            type="date"
            value={period}
            onChange={e => setPeriod(e.target.value)}
            className="genz-input"
          />
          <label className="genz-label" htmlFor="type">Type</label>
          <select
            id="type"
            value={type}
            onChange={e => setType(e.target.value)}
            className="genz-input"
            style={{marginBottom: '1.1rem'}}
          >
            <option value="Profit">Profit</option>
            <option value="Loss">Loss</option>
          </select>
          <label className="genz-label" htmlFor="amount">Amount</label>
          <input
            id="amount"
            type="number"
            placeholder="Amount"
            value={amount}
            onChange={e => setAmount(e.target.value)}
            className="genz-input"
          />
          <div style={{ display: 'flex', gap: '10px', marginTop: '16px' }}>
            <button type="submit" className="genz-submit-btn">{initialData ? 'Update' : 'Add'}</button>
            <button type="button" onClick={onClose} className="genz-cancel-btn">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
