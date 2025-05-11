"use client";
import { useFormStatus } from "react-dom";
import styles from "./delete-form.module.css";
import { motion } from "framer-motion";

export default function DeleteSubmit({ onAction }) {
  const { pending } = useFormStatus();
  return (
    <motion.button
      onClick={onAction}
      className={`${styles["dialog-btn"]} ${styles.confirm}`}
      whileHover={{ scale: 1.2 }}
      type="submit"
      disabled={pending}
    >
      {pending ? "Deleting..." : "Yes,Delete"}
    </motion.button>
  );
}
