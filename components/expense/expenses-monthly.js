import styles from "./expense-monthly.module.css"
import { getExpensesByMonth } from "@/lib/expenses";
import Link from "next/link";
export default function AllMonths(){
    const monthlyExpenses = getExpensesByMonth();
    return(
        <div className={styles.monthlyExpenses}>
        {monthlyExpenses.length > 0 ? (
          monthlyExpenses.map((monthData, index) => (
            <Link href={`/allexpenses/${monthData.month}`} key={index} className={styles.monthCard}>
              <h3>{monthData.month}</h3>
              <p>Total: Rs {monthData.total}</p>
            </Link>
          ))
        ) : (
          <p>No monthly expenses found.</p>
        )}
      </div>
    );
}