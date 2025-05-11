"use client";
import { useFormStatus } from "react-dom";
import styles from "./edit-form.module.css";
import { motion } from "framer-motion";

export default function EditSubmit() {
  const { pending } = useFormStatus();
  return (
    <motion.button
      whileHover={{ scale: 1.2 }}
      type="submit"
      disabled={pending}
      className={styles.confirm}
    >
      {pending ? "Saving..." : "Save"}
    </motion.button>
  );
}
