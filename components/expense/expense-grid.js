import classes from './expense-grid.module.css'; // Import the CSS module

export default function ExpenseGrid({ expenses }) {
  return (
    <main className={classes.grid}>
      {expenses.map((expense) => (
        <div key={expense.id} className={classes.card}>
          <p className={classes.expenseName}>{expense.expense}</p>
          <p className={classes.amount}>{expense.amount}</p>
          <p >{expense.created_at}</p>

        </div>
      ))}
    </main>
  );
}
