import React, { useEffect, useState } from "react";
import { useExpenseStore } from "../store/useExpenseStore";
import ExpensesSkeleton from "../components/skeletons/ExpensesSkeletons";
import EditExpenseModal from "../components/modals/EditExpenseModal";
import ExpenseList from "../components/ExpenseList";

const Expenses = () => {
  const [deletingId, setDeletingId] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [search, setSearch] = useState("");

  const [searchCategory, setCategory] = useState("");

  const { getExpenses, expenses, gettingExpenses, deleteExpense } =
    useExpenseStore();

  useEffect(() => {
    getExpenses();
  }, []);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") setDeletingId(null);
    };
    window.addEventListener("keydown", handleKey);
    return () => removeEventListener("keydown", handleKey);
  }, []);

  if (gettingExpenses) return <ExpensesSkeleton />;

  const filteredExpenses = expenses.filter((expense) => {
    const searchtext = search.trim().toLowerCase();
    const titleText = expense?.title?.trim().toLowerCase();
    const matchesSearch = searchtext ? titleText.includes(searchtext) : true;

    const matchesCategory = searchCategory
      ? expense.category === searchCategory
      : true;

    return matchesSearch && matchesCategory;
  });

  // 1️⃣ Sort all expenses by latest date first
  const sortedExpenses = [...filteredExpenses].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  // 2️⃣ Group sorted expenses by month-year
  const groupedExpenses = sortedExpenses.reduce((groups, expense) => {
    const date = new Date(expense.date);
    const monthYear = date.toLocaleString("default", {
      month: "long",
      year: "numeric",
    });

    if (!groups[monthYear]) groups[monthYear] = [];
    groups[monthYear].push(expense);

    return groups;
  }, {});

  // 3️⃣ Helpers
  const getMonthlyTotal = (expenses) =>
    expenses.reduce((sum, exp) => sum + Number(exp.amount), 0);

  const totalExpense = filteredExpenses.reduce(
    (sum, exp) => sum + Number(exp.amount),
    0
  );
  const numberOfMonths = Object.keys(groupedExpenses).length;
  const averageExpense =
    numberOfMonths > 0 ? Math.round(totalExpense / numberOfMonths) : 0;

  // 4️⃣ Handlers
  async function handleDelete(expenseId) {
    await deleteExpense(expenseId);
    setDeletingId(null);
  }

  async function handleEditExpense(expenseId) {
    setEditingId(expenseId);
  }

  return (
    <div className="max-w-2xl mx-auto space-y-3">
      {/* OVERALL TOTAL */}
      <div>
        <div className={`card bg-base-200 p-4 text-center gap-4 `}>
          <div className="flex flex-row  items-center justify-between">
            <div>
              <p className="text-lg font-semibold">Total Expenses</p>
              <p className="text-2xl font-bold text-primary">
                ₹{totalExpense.toLocaleString("en-IN")}
              </p>
            </div>
            <div>
              <p className="text-lg font-semibold">Average Expense</p>
              <p className="text-2xl font-bold text-primary">
                ₹{averageExpense.toLocaleString("en-IN")}
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Search Expense"
              className="input input-bordered w-full"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <select
              className="select select-bordered w-full"
              value={searchCategory}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">Select Category</option>
              <option value="Food">Food</option>
              <option value="Travel">Travel</option>
              <option value="Health & Fitness">Health & Fitness</option>
              <option value="Shopping">Shopping</option>
              <option value="Bills">Bills</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>

        {filteredExpenses.length === 0 && (
          <p className="text-center text-gray-500 mt-4 ">No expenses found</p>
        )}

        {/* 5️⃣ Render grouped expenses */}
        {Object.entries(groupedExpenses).map(
          ([monthYear, monthExpenses], index) => {
            const monthlyTotal = getMonthlyTotal(monthExpenses);

            return (
              <div
                key={`month-${monthYear}-${index}`}
                className="collapse collapse-arrow bg-base-100 border border-base-300"
              >
                <input
                  type="checkbox"
                  name="expense-accordion"
                  defaultChecked={index === 0}
                />
              
                {/* Month Header */}
                <div className="collapse-title flex justify-between items-center text-lg font-semibold">
                  <span>{monthYear}</span>
                  <span className="badge badge-primary badge-lg">
                    Total: ₹{monthlyTotal.toLocaleString("en-IN")}
                  </span>
                </div>
                {/* Expense List */}
                <div className="collapse-content">
                  <ul className="space-y-3">
                    {monthExpenses.map((expense) => (
                      <ExpenseList
                        expense={expense}
                        deletingId={deletingId}
                        setDeletingId={setDeletingId}
                        handleDelete={handleDelete}
                        handleEditExpense={handleEditExpense}
                      />
                    ))}
                  </ul>
                </div>
              </div>
            );
          }
        )}
      </div>

      {/* Edit Modal */}
      {editingId && (
        <EditExpenseModal expenseId={editingId} setEditingId={setEditingId} />
      )}
    </div>
  );
};

export default Expenses;
