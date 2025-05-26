import React from "react";

const ChartCard = ({ title, onClick }) => (
  <div className="card" onClick={onClick}>
    <h3>{title}</h3>
  </div>
);

export default ChartCard;
