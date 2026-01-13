import React from "react";
import { Link } from "react-router-dom";
import { useExpenseStore } from "../store/useExpenseStore";
import { useEffect } from "react";
import { useAuthStore } from "../store/useAuthStore";
import HomeSkeleton from "../components/skeletons/HomeSkeletons";
import MonthlyExpenseChart from "../components/charts/MonthlyExpenseChart";
import CategoryExpensePie from "../components/charts/CategoryExpenseChart";
import BudgetTracker from "../components/BudgetTracker";

const Home = () => {
  const { getExpenses, expenses, gettingExpenses } = useExpenseStore();
  const { authUser } = useAuthStore();

  useEffect(() => {
    if (!authUser) return;
    getExpenses();
  }, []);

  if (gettingExpenses) return <HomeSkeleton />;

  const totalExpense = expenses.reduce(
    (sum, exp) => sum + Number(exp.amount),
    0
  );
  const numberOfMonths = new Set(
    expenses.map(
      (e) => new Date(e.date).getMonth() + "-" + new Date(e.date).getFullYear()
    )
  ).size;
  const averageExpense = numberOfMonths
    ? Math.round(totalExpense / numberOfMonths)
    : 0;

  return (
    <div className="max-w-2xl mx-auto space-y-6 pt-7">
      <h1 className="text-3xl font-bold text-center">
        Welcome! {authUser?.name?.toUpperCase()}
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="card bg-base-200 p-4 text-center">
          <p className="text-lg font-semibold">Total Expenses</p>
          <p className="text-2xl font-bold text-primary">
            ₹{totalExpense.toLocaleString("en-IN")}
          </p>
        </div>
        <div className="card bg-base-200 p-4 text-center">
          <p className="text-lg font-semibold">Average Expense</p>
          <p className="text-2xl font-bold text-primary">
            ₹{averageExpense.toLocaleString("en-IN")}
          </p>
        </div>
      </div>

      <div className="flex gap-4 justify-center mt-4">
        <Link to="/addexpense" className="btn btn-primary">
          Add Expense
        </Link>
        <Link to="/expenses" className="btn btn-secondary">
          View Expenses
        </Link>
      </div>

      {expenses.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <MonthlyExpenseChart expenses={expenses} />
          <CategoryExpensePie expenses={expenses} />
        </div>
      )}

      <BudgetTracker />
    </div>
  );
};

export default Home;
