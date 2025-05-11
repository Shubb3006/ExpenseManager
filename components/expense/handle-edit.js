"use client";
import { useState } from "react";
import styles from "./handle-edit.module.css";
import EditSubmit from "./edit-form";
import { motion } from "framer-motion";

export default function HandleEdit({ expense, onClose, onEdit }) {
  const [expenseName, setExpenseName] = useState(expense.expense);
  const [amount, setAmount] = useState(expense.amount);

  function handleSubmit(e) {
    e.preventDefault();
    onEdit({
      id: expense.id,
      expense: expenseName,
      amount: parseFloat(amount),
      created_at: expense.created_at,
    });
  }

  return (
    <div className={styles["dialog-overlay"]}>
      <motion.div
        initial={{ y: -30 }}
        animate={{ y: 30 }}
        exit={{ y: -30 }}
        className={styles["dialog-box"]}
      >
        <h2>Edit Expense</h2>
        <form onSubmit={handleSubmit} className={styles["expense-form"]}>
          <div className={styles["form-group"]}>
            <label htmlFor="expenseName">Expense Name:</label>
            <input
              type="text"
              id="expenseName"
              value={expenseName}
              onChange={(e) => setExpenseName(e.target.value)}
              required
            />
          </div>

          <div className={styles["form-group"]}>
            <label htmlFor="amount">Amount:</label>
            <input
              type="number"
              id="amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
          </div>

          <div className={styles["dialog-btn"]}>
            <EditSubmit />
            <motion.button
              whileHover={{ scale: 1.2 }}
              type="button"
              className={styles.cancel}
              onClick={onClose}
            >
              Cancel
            </motion.button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
