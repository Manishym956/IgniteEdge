import React, { useEffect, useState } from "react";
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
    <div>
      <ChartCard title="Revenue vs. Expense" onClick={() => setIsModalOpen(true)} />
      <RevenueChart data={financeData} />
      <InputModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSubmit={handleCreate} />
    </div>
  );
};

export default RevenueSection;
