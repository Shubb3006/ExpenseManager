import React, { useEffect, useState } from "react";
import { useExpenseStore } from "../store/useExpenseStore";
import { LoaderIcon } from "react-hot-toast";

const AddExpense = () => {
  const { addExpense, addingExpense } = useExpenseStore();
  const [formData, setFormData] = useState({
    title: "",
    amount: "",
    note: "hey",
    category: "",
    date: "",
  });

  async function handleSubmit(e) {
    e.preventDefault();
    console.log(formData);
    await addExpense(formData);
    setFormData({ title: "", amount: "", note: "", category: "", date: "" });
  }

  return (
    <div className="min-h-[calc(100vh-60px)] flex items-center justify-center bg-linear-to-br from-base-100 to-base-200 px-4">
      <div className="card w-full max-w-md bg-base-100 shadow-xl border border-base-300">
        <form onSubmit={handleSubmit} className="card-body gap-4">
          <h2 className="text-2xl font-bold text-center text-primary">
            Add Expense
          </h2>

          <input
            type="text"
            placeholder="Title"
            className="input input-bordered w-full"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
          />

          <input
            type="number"
            placeholder="Amount"
            className="input input-bordered w-full"
            value={formData.amount}
            onChange={(e) =>
              setFormData({ ...formData, amount: e.target.value })
            }
          />

          <input
            type="text"
            placeholder="Note"
            className="input input-bordered w-full"
            value={formData.note}
            onChange={(e) => setFormData({ ...formData, note: e.target.value })}
          />

          <select
            className="select select-bordered w-full"
            value={formData.category}
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value })
            }
          >
            <option value="" disabled>
              Select Category
            </option>
            <option value="Food">Food</option>
            <option value="Travel">Travel</option>
            <option value="Health & Fitness">Health & Fitness</option>
            <option value="Shopping">Shopping</option>
            <option value="Bills">Bills</option>
            <option value="Other">Other</option>
          </select>

          <input
            type="date"
            className="input input-bordered w-full"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
          />

          <button
            className="btn btn-primary w-full mt-2"
            disabled={addingExpense}
          >
            {addingExpense ? (
              <LoaderIcon className="animate-spin" />
            ) : (
              "Add Expense"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddExpense;
