import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const CategoryExpensePie = ({ expenses }) => {
  const categoryMap = {};

  expenses.forEach((exp) => {
    const category = exp.category || "Other";
    categoryMap[category] = (categoryMap[category] || 0) + Number(exp.amount);
  });

  const data = {
    labels: Object.keys(categoryMap),
    datasets: [
      {
        data: Object.values(categoryMap),
        backgroundColor: [
          "#3b82f6", // blue
          "#22c55e", // green
          "#f97316", // orange
          "#ef4444", // red
          "#a855f7", // purple
          "#eab308", // yellow
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false, // 🔥 important
    plugins: {
      legend: {
        position: "bottom",
      },
    },
  };

  return (
    <div className="card bg-base-200 p-4 h-75">
      <h2 className="text-lg font-semibold text-center mb-2">
        Expenses by Category
      </h2>
      <div className="h-60 flex justify-center">
        <Pie data={data} options={options} />
      </div>
    </div>
  );
};

export default CategoryExpensePie;
