import React, { useRef, useEffect, useState } from "react";

const COLORS = [
  "#3b82f6", "#10b981", "#f59e42", "#6366f1", "#ef4444", "#f472b6", "#facc15", "#a3e635"
];

function daysBetween(a, b) {
  return Math.round((b - a) / (1000 * 60 * 60 * 24));
}

const ProjectTimeGanttChart = ({ data = [] }) => {
  const containerRef = useRef(null);
  const [containerWidth, setContainerWidth] = useState(900);

  useEffect(() => {
    function handleResize() {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
      }
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!data.length) return <div>No data</div>;
  // Sort by startDate
  const sorted = [...data].sort((a, b) => new Date(a.startDate) - new Date(b.startDate));
  const minDate = new Date(Math.min(...sorted.map(d => new Date(d.startDate))));
  const maxDate = new Date(Math.max(...sorted.map(d => new Date(d.endDate))));
  const totalDays = daysBetween(minDate, maxDate) + 1;
  const rowHeight = 36;
  const chartHeight = rowHeight * sorted.length + 40;
  const leftPad = 140;
  const chartWidth = Math.max(containerWidth - leftPad, 300);

  return (
    <div ref={containerRef} style={{ width: "100%" }}>
      <svg
        width="100%"
        height={chartHeight}
        viewBox={`0 0 ${leftPad + chartWidth} ${chartHeight}`}
        preserveAspectRatio="xMinYMin meet"
      >
        {/* Y labels */}
        {sorted.map((d, i) => (
          <text
            key={d._id || d.projectName + i}
            x={10}
            y={rowHeight * i + rowHeight / 2 + 5}
            fontSize={14}
            fill="#333"
          >
            {d.projectName}
          </text>
        ))}
        {/* X axis (dates) */}
        {[0, Math.floor(totalDays / 2), totalDays - 1].map((offset, i) => {
          const date = new Date(minDate.getTime() + offset * 24 * 60 * 60 * 1000);
          return (
            <text
              key={i}
              x={leftPad + (offset / totalDays) * chartWidth}
              y={20}
              fontSize={12}
              fill="#888"
              textAnchor="middle"
            >
              {date.toISOString().slice(0, 10)}
            </text>
          );
        })}
        {/* Bars */}
        {sorted.map((d, i) => {
          const start = daysBetween(minDate, new Date(d.startDate));
          const end = daysBetween(minDate, new Date(d.endDate));
          const x = leftPad + (start / totalDays) * chartWidth;
          const width = ((end - start + 1) / totalDays) * chartWidth;
          const color = COLORS[i % COLORS.length];
          return (
            <g key={d._id || d.projectName + i}>
              <rect
                x={x}
                y={rowHeight * i + rowHeight / 2 - 10}
                width={width}
                height={20}
                fill={color}
                rx={6}
                style={{ cursor: 'pointer' }}
              >
                <title>
                  {d.projectName}\nDept: {d.department}\n{d.startDate.slice(0, 10)} to {d.endDate.slice(0, 10)}\nHours: {d.hoursAllocated}
                </title>
              </rect>
            </g>
          );
        })}
      </svg>
    </div>
  );
};

export default ProjectTimeGanttChart; 