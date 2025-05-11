"use client";
import { useState } from "react";
import HandleDelete from "../expense/handle-delete";
import HandleEdit from "../expense/handle-edit";
import styles from "./home.module.css";
import { DeleteExpense, ShareUpdatedExpense } from "@/lib/action";
import { motion } from "framer-motion";

export default function HomeLayout({ expenses: initialExpenses, monthYear }) {
  const [expenses, setExpenses] = useState(initialExpenses);
  const [selectedExpenseForDelete, setSelectedExpenseForDelete] =
    useState(null);
  const [selectedExpenseForEdit, setSelectedExpenseForEdit] = useState(null);
  const [totalExpenses, setTotalExpenses] = useState(
    calculateTotalExpenses(initialExpenses)
  );

  function calculateTotalExpenses(expensesArray) {
    return expensesArray.reduce((total, expense) => total + expense.amount, 0);
  }

  // Handle opening the edit dialog
  function handleClickEdit(expense) {
    setSelectedExpenseForEdit(expense);
  }

  // Handle closing the edit dialog
  function closeEditDialog() {
    setSelectedExpenseForEdit(null);
  }

  // Handle opening the delete dialog
  function handleClickDelete(id) {
    setSelectedExpenseForDelete(id);
  }

  // Handle closing the delete dialog
  function closeDeleteDialog() {
    setSelectedExpenseForDelete(null);
  }

  // Handle deleting an expense
  async function handleDelete(id) {
    try {
      await DeleteExpense(id);
      const updatedExpenses = expenses.filter((expense) => expense.id !== id);
      setExpenses(updatedExpenses);
      setTotalExpenses(calculateTotalExpenses(updatedExpenses));
      closeDeleteDialog();
    } catch (error) {
      console.error("Error deleting expense:", error);
    }
  }

  // Handle editing an expense
  async function handleEdit(updatedExpense) {
    console.log("Edited");
    try {
      const result = await ShareUpdatedExpense(updatedExpense);

      if (result?.type === "success") {
        const updatedExpenses = expenses.map((expense) =>
          expense.id === updatedExpense.id ? updatedExpense : expense
        );

        setExpenses(updatedExpenses);
        setTotalExpenses(calculateTotalExpenses(updatedExpenses));
        closeEditDialog();
      }
    } catch (error) {
      console.error("Error updating expense:", error);
    }
  }

  // Group expenses by date
  const expensesByDate = expenses.reduce((acc, expense) => {
    const date = expense.created_at;
    if (!acc[date]) {
      acc[date] = { expenses: [], total: 0 };
    }
    acc[date].expenses.push(expense);
    acc[date].total += expense.amount;
    return acc;
  }, {});

  return (
    <main className={styles.main}>
      <h2 className={styles.heading}>{monthYear} Expenses</h2>
      <p className={styles.totalExpense}>
        <span>Total Expenses:</span> <span>Rs {totalExpenses}</span>
      </p>

      <div className={styles.expensesContainer}>
        {Object.keys(expensesByDate).length > 0 ? (
          Object.keys(expensesByDate).map((date) => (
            <div className={styles.dateCard} key={date}>
              <h3 className={styles.dateTitle}>{date}</h3>
              <ul className={styles.listing}>
                {expensesByDate[date].expenses.map((expense) => (
                  <li key={expense.id} className={styles.listitem}>
                    {expense.expense} - Rs {expense.amount}
                    <div className={styles.btns}>
                      <button
                        className={styles.deleteButton}
                        onClick={() => handleClickEdit(expense)}
                      >
                        Edit
                      </button>
                      <button
                        className={styles.deleteButton}
                        onClick={() => handleClickDelete(expense.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
              <div className={styles.dailyTotal}>
                <strong>Total Rs. {expensesByDate[date].total}</strong>
              </div>
            </div>
          ))
        ) : (
          <p>No expenses recorded for this month.</p>
        )}
      </div>

      {selectedExpenseForDelete && (
        <HandleDelete
          onClose={closeDeleteDialog}
          onDelete={() => handleDelete(selectedExpenseForDelete)}
        />
      )}

      {selectedExpenseForEdit && (
        <HandleEdit
          expense={selectedExpenseForEdit}
          onClose={closeEditDialog}
          onEdit={handleEdit}
        />
      )}
    </main>
  );
}
