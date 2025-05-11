
import { getExpenses } from "@/lib/expenses";
import styles from "./page.module.css";
import { Suspense } from "react";
import { GetTotalExpense } from "@/lib/action";
import AllMonths from "@/components/expense/expenses-monthly";

async function ExpensesLoading() {
  // const expenses = await getExpenses();
  // const monthlyExpenses = getExpensesByMonth();
  const totalExpenses = GetTotalExpense();

  return (
    <>
      <div className={styles.totalExpenses}>Total Expenses: {totalExpenses}</div>
      <AllMonths />
    </>
  );
}

export default async function AllExpenses() {
  return (
    <div className={styles.mainContainer}>
      <h1 className={styles.title}>All Expenses</h1>
      <p className={styles.description}>Here is a list of all My expenses</p>
      <Suspense fallback={<p className={styles.loading}>Fetching Expenses...</p>}>
        <ExpensesLoading />
      </Suspense>
    </div>
  );
}
