import React, { useState } from "react";
import { useExpenseStore } from "../store/useExpenseStore";
import { useAuthStore } from "../store/useAuthStore";

const getMonthYear = (date) =>
  new Date(date).toLocaleString("en-US", {
    month: "long",
    year: "numeric",
  });

const BudgetTracker = () => {
  const { expenses, updateBudget } = useExpenseStore();
  const { authUser } = useAuthStore();

  const [budget, setBudget] = useState("");

  const groupedExpenses = expenses.reduce((groups, expense) => {
    const key = getMonthYear(expense.date);
    if (!groups[key]) groups[key] = [];
    groups[key].push(expense);
    return groups;
  }, {});

  const currentMonth = getMonthYear(new Date());
  const finalExpenses = groupedExpenses[currentMonth] || [];

  const totalExpense = finalExpenses.reduce(
    (total, expense) => total + Number(expense.amount),
    0
  );

  const percentageUsed = Math.min(
    Math.round((totalExpense / authUser.budget) * 100),
    100
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateBudget({ budget });
    setBudget("");
  };

  return (
    <div className="card bg-base-200 p-6 shadow-md space-y-4">
      {/* Header */}
      <div className="flex justify-between items-center">
        <p className="text-lg font-semibold">{currentMonth}</p>
        <span className="badge badge-outline">
          Budget: ₹{Number(authUser.budget).toLocaleString("en-IN")}
        </span>
      </div>

      {/* Total Expense */}
      <p className="text-3xl font-bold text-primary text-center">
        ₹{totalExpense.toLocaleString("en-IN")}
      </p>

      {/* Progress */}
      <div>
        <progress
          className={`progress w-full ${
            percentageUsed >= 100
              ? "progress-error"
              : percentageUsed >= 80
              ? "progress-warning"
              : "progress-success"
          }`}
          value={percentageUsed}
          max="100"
        ></progress>
        <p className="text-sm text-gray-500 mt-1 text-center">
          {percentageUsed}% of budget used
        </p>
      </div>

      {/* Empty State */}
      {finalExpenses.length === 0 && (
        <p className="text-sm text-gray-500 text-center">
          No expenses recorded this month
        </p>
      )}

      {/* Update Budget */}
      <form onSubmit={handleSubmit} className="flex gap-2 mt-2">
        <input
          type="number"
          className="input input-bordered w-full"
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
          placeholder="Set monthly budget"
        />
        <button className="btn btn-primary" type="submit">
          Update
        </button>
      </form>
    </div>
  );
};

export default BudgetTracker;
