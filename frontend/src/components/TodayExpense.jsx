import React, { useState } from "react";
import { useExpenseStore } from "../store/useExpenseStore";
import { CATEGORY_BADGES } from "../constants";
import ExpenseList from "./ExpenseList";
import EditExpenseModal from "./modals/EditExpenseModal";

const getMonthYear = (date) =>
  new Date(date).toLocaleString("en-US", {
    month: "long",
    year: "numeric",
  });

const TodayExpense = () => {
  const { expenses, deleteExpense } = useExpenseStore();
  const [deletingId, setDeletingId] = useState(null);
  const [editingId, setEditingId] = useState(null);

  const groupedExpenses = expenses.reduce((groups, expense) => {
    const key = getMonthYear(expense.date);
    if (!groups[key]) groups[key] = [];
    groups[key].push(expense);
    return groups;
  }, {});

  const currentMonth = getMonthYear(new Date());
  const finalExpenses = groupedExpenses[currentMonth] || [];
  const todayExpense =
    finalExpenses.filter(
      (expense) =>
        new Date(expense.date).toLocaleDateString() ===
        new Date().toLocaleDateString()
    ) || [];

  async function handleDelete(expenseId) {
    await deleteExpense(expenseId);
    setDeletingId(null);
  }

  async function handleEditExpense(expenseId) {
    setEditingId(expenseId);
  }

  return (
    <div className="bg-base-200 p-5 rounded-lg shadow-md space-y-4">
      <h3 className="text-xl font-bold text-primary border-b pb-2 mb-3">
        Today's Expenses
      </h3>

      {currentMonth && (
        <p className="text-sm text-gray-500 mb-2">Month: {currentMonth}</p>
      )}

      {todayExpense.map((expense) => (
        <ExpenseList
          key={expense._id}
          expense={expense}
          deletingId={deletingId}
          setDeletingId={setDeletingId}
          handleDelete={handleDelete}
          handleEditExpense={handleEditExpense}
        />
      ))}
      {todayExpense.length === 0 && (
        <p className="text-gray-500 text-sm italic text-center">
          No expenses recorded today
        </p>
      )}

      {editingId && (
        <EditExpenseModal expenseId={editingId} setEditingId={setEditingId} />
      )}
    </div>
  );
};

export default TodayExpense;
