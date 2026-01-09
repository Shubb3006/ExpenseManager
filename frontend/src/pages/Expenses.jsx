import React, { useEffect, useState } from "react";
import { useExpenseStore } from "../store/useExpenseStore";
import { Pencil, Trash } from "lucide-react";
import ExpensesSkeleton from "../components/skeletons/ExpensesSkeletons";
import EditExpenseModal from "../components/modals/EditExpenseModal";

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

  if (gettingExpenses) return <ExpensesSkeleton />;

  const filteredExpenses = expenses.filter((expense) => {
    const matchesSearch = search
      ? expense.title.toLowerCase().includes(search.toLowerCase())
      : true;

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
    setDeletingId(expenseId);
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
        <div
          className={`card bg-base-200 p-4 sticky top-14 z-50  text-center gap-4 `}
        >
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
                  type="radio"
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
                      <li
                        key={expense._id}
                        className="flex flex-col md:flex-row justify-between p-4 bg-base-200 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200"
                      >
                        <div className="flex flex-col gap-1 md:gap-2">
                          <div className="flex flex-wrap items-center gap-2">
                            <span
                              className={`badge badge-sm ${
                                expense.category === "Food"
                                  ? "badge-success"
                                  : expense.category === "Travel"
                                  ? "badge-info"
                                  : expense.category === "Shopping"
                                  ? "badge-warning"
                                  : expense.category === "Health & Fitness"
                                  ? "badge-accent"
                                  : expense.category === "Bills"
                                  ? "badge-neutral"
                                  : "badge-outline"
                              }`}
                            >
                              {expense.category}
                            </span>
                            <p className="font-semibold text-lg">
                              {expense.title}
                            </p>
                          </div>
                          {expense.note && (
                            <p className="text-sm text-gray-500 italic">
                              {expense.note}
                            </p>
                          )}
                          <p className="text-sm text-gray-400">
                            {new Date(expense.date).toLocaleDateString()}
                          </p>
                        </div>

                        <div className="mt-2 md:mt-0 flex items-center gap-3">
                          <span className="font-bold text-xl text-primary">
                            ₹{expense?.amount?.toLocaleString("en-IN")}
                          </span>

                          <button
                            className="btn btn-ghost btn-sm"
                            title="Edit Expense"
                            onClick={() => handleEditExpense(expense._id)}
                          >
                            <Pencil size={16} />
                          </button>

                          <button
                            className="btn btn-error btn-sm"
                            title="Delete Expense"
                            disabled={deletingId === expense._id}
                            onClick={() => handleDelete(expense._id)}
                          >
                            {deletingId === expense._id ? (
                              <span className="loading loading-spinner loading-sm"></span>
                            ) : (
                              <Trash size={16} />
                            )}
                          </button>
                        </div>
                      </li>
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
