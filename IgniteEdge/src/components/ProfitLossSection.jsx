import React, { useEffect, useState } from "react";
import ChartCard from "./ChartCard.jsx";
import ProfitLossForm from "./ProfitLossForm.jsx";
import ProfitLossChart from "../charts/ProfitLossChart.jsx";
import {
  getProfitLossRecords,
  addProfitLossRecord,
  updateProfitLossRecord,
  deleteProfitLossRecord,
} from "../services/profitLossService.js";

const ProfitLossSection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [profitLossData, setProfitLossData] = useState([]);
  const [editingRecord, setEditingRecord] = useState(null); // holds record for editing

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await getProfitLossRecords();
      setProfitLossData(res.data);
    } catch (err) {
      console.error("Error fetching Profit & Loss data", err);
    }
  };

  const handleAddClick = () => {
    setEditingRecord(null);
    setIsModalOpen(true);
  };

  const handleEditClick = (record) => {
    setEditingRecord(record);
    setIsModalOpen(true);
  };

  const handleDeleteClick = async (id) => {
    if (window.confirm("Are you sure you want to delete this record?")) {
      try {
        await deleteProfitLossRecord(id);
        fetchData();
      } catch (err) {
        console.error("Delete failed", err);
      }
    }
  };

  const handleSubmit = async (data) => {
    try {
      if (editingRecord) {
        await updateProfitLossRecord(editingRecord._id, data);
      } else {
        await addProfitLossRecord(data);
      }
      setIsModalOpen(false);
      fetchData();
    } catch (err) {
      console.error("Failed to save record", err);
    }
  };

  return (
    <div>
      <ChartCard title="Profit & Loss Summary" onClick={handleAddClick} />

      {/* Show chart */}
      <ProfitLossChart records={profitLossData} />

      {/* Pass editingRecord for modal to prefill inputs on edit */}
      <ProfitLossForm
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSubmit}
        initialData={editingRecord}
      />

      {/* List with edit/delete buttons */}
      <div style={{ marginTop: "20px" }}>
        <h3>Records</h3>
        {profitLossData.length === 0 && <p>No records yet.</p>}
        <ul>
          {profitLossData.map(record => (
  <li key={record._id}>
    <strong>{record.period}:</strong> Profit/Loss: {record.profitOrLoss}
    <button onClick={() => handleEditClick(record)}>Edit</button>
    <button onClick={() => handleDeleteClick(record._id)}>Delete</button>
  </li>
))}
        </ul>
      </div>
    </div>
  );
};

export default ProfitLossSection;
