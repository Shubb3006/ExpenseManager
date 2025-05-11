"use client";
import DeleteSubmit from "./delete-form";
import styles from "./handle-delete.module.css";
import { motion } from "framer-motion";

export default function HandleDelete({ onClose, onDelete }) {
  return (
    <div className={styles["dialog-overlay"]}>
      <motion.div
        initial={{ y: -30 }}
        animate={{ y: 30 }}
        className={styles["dialog-box"]}
      >
        <h2>Delete Expense</h2>
        <p>Are you sure you want to delete this expense?</p>
        <form action={DeleteSubmit}>
          <div className={styles["dialog-actions"]}>
            <DeleteSubmit onAction={onDelete} />
            <motion.button
              whileHover={{ scale: 1.2 }}
              className={`${styles["dialog-btn"]} ${styles.cancel}`}
              onClick={onClose}
              type="button"
            >
              Cancel
            </motion.button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
