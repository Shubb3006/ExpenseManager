import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const MonthlyExpenseChart = ({ expenses }) => {
  // group expenses by month
  const monthlyData = {};

  expenses.forEach((exp) => {
    const date = new Date(exp.date);
    const key = `${date.toLocaleString("default", {
      month: "short",
    })} ${date.getFullYear()}`;

    monthlyData[key] = (monthlyData[key] || 0) + Number(exp.amount);
  });

  const labels = Object.keys(monthlyData);
  const dataValues = Object.values(monthlyData);

  const data = {
    labels,
    datasets: [
      {
        label: "Monthly Expenses (₹)",
        data: dataValues,
        backgroundColor: "#3b82f6", // tailwind primary-ish
        borderRadius: 6,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false, // 🔥 important
    plugins: {
      legend: { display: false },
    },
  };

  return (
    <div className="card bg-base-200 p-4 h-75">
      <h2 className="text-lg font-semibold mb-2 text-center">
        Monthly Expenses
      </h2>
      <div className="h-60">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default MonthlyExpenseChart;
