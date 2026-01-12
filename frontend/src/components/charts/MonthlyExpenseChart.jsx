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

    const monthKey = `${date.getFullYear()}-${date.getMonth()}`; // sortable
    const label = date.toLocaleString("default", {
      month: "short",
      year: "numeric",
    });

    if (!monthlyData[monthKey]) {
      monthlyData[monthKey] = { label, total: 0 };
    }

    monthlyData[monthKey].total += Number(exp.amount);
  });

  const sortedKeys = Object.keys(monthlyData).sort(
    (a, b) => new Date(b) - new Date(a)
  );

  const labels = sortedKeys.map((key) => monthlyData[key].label);
  const dataValues = sortedKeys.map((key) => monthlyData[key].total);

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
