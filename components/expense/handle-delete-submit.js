"use client";
import { useFormStatus } from "react-dom";
import styles from "./edit-form.module.css";

export default function HandleDeleteSubmit({onClick}) {
  const { pending } = useFormStatus();
  return (
    <button disabled={pending} className={styles.confirm} onClick={onClick}>
      {pending ? "Deleting..." : "Yes,Delete"}
    </button>
  );
}
