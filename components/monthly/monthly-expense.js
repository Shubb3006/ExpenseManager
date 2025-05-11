"use client";
import styles from "./monthly-expense.module.css";
import Link from "next/link";
import HandleDelete from "../expense/handle-delete";
import { useState } from "react";
import { DeleteExpense } from "@/lib/action";
import { ShareUpdatedExpense } from "@/lib/action";
import HandleEdit from "../expense/handle-edit";
export default function Monthlyexpense({ slug, expenses: initialExpenses }) {
  const [selectedExpenseId, setSelectedExpenseId] = useState(null);
  const [expenses, setExpenses] = useState(initialExpenses);

  const [selectedExpenseForEdit, setSelectedExpenseForEdit] = useState(null);
  const [totalExpenses, setTotalExpenses] = useState(
    calculateTotalExpenses(initialExpenses)
  );
  function calculateTotalExpenses(expensesArray) {
    return expensesArray.reduce((total, expense) => total + expense.amount, 0);
  }

  const expensesByDate = expenses.reduce((acc, expense) => {
    const date = expense.created_at;
    if (!acc[date]) {
      acc[date] = { expenses: [], total: 0 };
    }
    acc[date].expenses.push(expense);
    acc[date].total += expense.amount;
    return acc;
  }, {});
  function handleClickEdit(expense) {
    setSelectedExpenseForEdit(expense);
  }

  // Handle closing the edit dialog
  function closeEditDialog() {
    setSelectedExpenseForEdit(null);
  }
  function handleClick(id) {
    setSelectedExpenseId(id);
  }
  function closeDialog() {
    setSelectedExpenseId(null);
  }
  async function handleDelete(id) {
    try {
      await DeleteExpense(id);
      const updatedExpenses = expenses.filter((expense) => expense.id !== id);
      setExpenses(updatedExpenses);
      setSelectedExpenseId(null);
    } catch (error) {
      console.error("Error deleting expense:", error);
    }
  }
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
      } else {
        alert(result?.message);
      }
    } catch (error) {
      console.error("Error updating expense:", error);
    }
  }

  return (
    <main className={styles.main}>
      <h1>Expenses for {slug.replace("%", " ")}</h1>
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
                        onClick={() => handleClick(expense.id)}
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
      {selectedExpenseId && (
        <HandleDelete
          id={selectedExpenseId}
          onClose={closeDialog}
          onDelete={() => handleDelete(selectedExpenseId)}
        />
      )}
      {selectedExpenseForEdit && (
        <HandleEdit
          expense={selectedExpenseForEdit}
          onClose={closeEditDialog}
          onEdit={handleEdit}
        />
      )}

      <Link href="../allexpenses" className={styles.backLink}>
        Back
      </Link>
    </main>
  );
}
