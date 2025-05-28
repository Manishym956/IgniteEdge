import React, { useEffect, useState } from "react";
import "../styles/genz-modal.css";
import ChartCard from "./ChartCard.jsx";
import InputModal from "./InputModal.jsx";
import RevenueChart from "../charts/RevenueChart.jsx";
import { getFinanceData, createFinanceEntry } from "../services/financeService.js";

const RevenueSection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [financeData, setFinanceData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const res = await getFinanceData();
    setFinanceData(res.data);
  };

  const handleCreate = async (data) => {
    await createFinanceEntry(data);
    fetchData();
  };

  return (
    <>
      <div className="genz-chart-header" style={{ marginBottom: 0 }}>
        <h2 className="box-header" style={{ margin: 0 }}>Revenue</h2>
        <button className="genz-submit-btn" style={{marginLeft: 'auto'}} onClick={() => setIsModalOpen(true)}>+ Add Entry</button>
      </div>
      <div className="genz-chart-card">
        <RevenueChart data={financeData} />
        <InputModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSubmit={handleCreate} />
      </div>
    </>
  );
};

export default RevenueSection;
