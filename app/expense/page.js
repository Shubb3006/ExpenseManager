"use client";
import { SharExpense } from "@/lib/action";
import { useEffect } from "react";
import classes from "./page.module.css";
import ExpenseSubmit from "@/components/expense/expense-form";
import { useActionState } from "react";
import { motion, useAnimate } from "framer-motion";
export default function AddExpense() {
  const [state, formAction] = useActionState(SharExpense, {
    message: null,
    type: null,
  });

  // const [scope, animate] = useAnimate();
  // useEffect(() => {
  //   if (state?.type === "error" && scope.current) {
  //     const inputs = scope.current.querySelectorAll("input");
  //     animate(
  //       inputs,
  //       { x: [-10, 0, 10, 0] },
  //       { type: "tween", duration: 0.5 }
  //     );
  //     state.type = null;
  //   }
  // }, [state?.type, animate, scope]);

  return (
    // <form className={classes["expense-form"]} action={formAction} ref={scope}>
    <form className={classes["expense-form"]} action={formAction} >
      <div className={classes["form-group"]}>
        <label htmlFor="expenseName">Expense Name:</label>
        <input type="text" id="expenseName" name="expenseName" />
      </div>
      <div className={classes["form-group"]}>
        <label htmlFor="expenseAmount">Amount:</label>
        <input type="number" id="expenseAmount" name="expenseAmount" />
      </div>
      <div className={classes["form-group"]}>
        <label htmlFor="expenseDate">Date:</label>
        <input type="date" id="expenseDate" name="expenseDate" />
      </div>
      <p className={classes.actions}>
        <ExpenseSubmit />
      </p>
      {state?.type === "error" && (
        <p className={classes.formErrorMessage}>{state.message}</p>
      )}

      {state?.type === "success" && (
        <p className={classes.formSuccessMessage}>{state.message}</p>
      )}
    </form>
  );
}
