import React, { useState, useEffect } from 'react';

export default function ProfitLossForm({ isOpen, onClose, onSave, initialData }) {
  const [period, setPeriod] = useState('');
  const [profitOrLoss, setProfitOrLoss] = useState('');

  useEffect(() => {
    if (initialData) {
      setPeriod(initialData.period);
      setProfitOrLoss(initialData.profitOrLoss);
    } else {
      setPeriod('');
      setProfitOrLoss('');
    }
  }, [initialData]);

  const handleSubmit = e => {
    e.preventDefault();
    if (!period || profitOrLoss === '') {
      alert('Please fill in all fields');
      return;
    }
    onSave({ period, profitOrLoss: Number(profitOrLoss) });
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>{initialData ? 'Edit' : 'Add'} Profit & Loss Record</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Period (e.g., 2025-Q1 or 2025-01)"
            value={period}
            onChange={e => setPeriod(e.target.value)}
          />
          <input
            type="number"
            placeholder="Profit or Loss (number)"
            value={profitOrLoss}
            onChange={e => setProfitOrLoss(e.target.value)}
          />
          <button type="submit">{initialData ? 'Update' : 'Add'}</button>
          <button type="button" onClick={onClose} style={{ marginLeft: '10px' }}>
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
}
