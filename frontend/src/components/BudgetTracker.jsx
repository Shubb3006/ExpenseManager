import React from "react";
import { useExpenseStore } from "../store/useExpenseStore";

const getMonthYear = (date) =>
  new Date(date).toLocaleString("en-US", {
    month: "long",
    year: "numeric",
  });

const BudgetTracker = () => {
  const { expenses } = useExpenseStore();

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

  return (
    <div className="card bg-base-200 p-4 text-center">
      <p className="text-lg font-semibold">{currentMonth}</p>
      <p className="text-2xl font-bold text-primary">
        ₹{totalExpense.toLocaleString("en-IN")}
      </p>

      {finalExpenses.length === 0 && (
        <p className="text-sm text-gray-500 mt-2">
          No expenses recorded this month
        </p>
      )}
    </div>
  );
};

export default BudgetTracker;
