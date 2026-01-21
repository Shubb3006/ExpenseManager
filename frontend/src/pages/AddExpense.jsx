import React, { useEffect, useState } from "react";
import { useExpenseStore } from "../store/useExpenseStore";
import { LoaderIcon, Check } from "lucide-react";
import toast from "react-hot-toast";

const AddExpense = () => {
  const { addExpense, addingExpense, deleteExpense } = useExpenseStore();
  const [formData, setFormData] = useState({
    title: "",
    amount: "",
    note: "",
    category: "",
    date: new Date().toISOString().split("T")[0],
  });

  async function handleSubmit(e) {
    e.preventDefault();
    const addedExpense = await addExpense(formData);
    if (addedExpense) {
      setFormData({
        title: "",
        amount: "",
        note: "",
        category: "",
        date: new Date().toISOString().split("T")[0],
      });

      // toast((t) => (
      //   <span>
      //     Expense Saved
      //     <button
      //       onClick={() => {
      //         toast.dismiss(t.id);
      //         deleteExpense(addedExpense._id);
      //       }}
      //     >
      //       Undo
      //     </button>
      //   </span>
      // ));

      // toast(
      //   (t) => (
      //     <div
      //       className={`flex items-center justify-between gap-4

      //     ${t.visible ? "animate-enter" : "animate-leave"}`}
      //     >
      //       <div className="flex gap-4">
      //         <Check />
      //         <div>
      //           <p className="font-medium text-lg">Expense added</p>
      //           <p className="text-lg text-gray-500">
      //             {addedExpense.title} • ₹{addedExpense.amount}
      //           </p>
      //         </div>

      //         <button
      //           className="btn btn-sm btn-error rounded-lg"
      //           onClick={() => {
      //             deleteExpense(addedExpense._id);
      //             toast.dismiss(t.id);
      //           }}
      //         >
      //           Undo
      //         </button>
      //       </div>
      //     </div>
      //   ),
      //   { duration: 3000 }
      // );
      toast(
        (t) => (
          <div
            className={`flex items-center bg-base-100 gap-4 p-2 w-full max-w-sm
            ${t.visible ? "animate-enter" : "animate-leave"}`}
          >
            {/* Icon */}
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-success/20 text-success">
              <Check className="h-5 w-5" />
            </div>

            {/* Content */}
            <div className="flex-1">
              <p className="font-semibold text-base text-base-content">
                Expense added
              </p>
              <p className="text-sm text-base-content/60">
                {addedExpense.title} • ₹{addedExpense.amount}
              </p>
            </div>

            {/* Action */}
            <button
              className="text-sm btn btn-error btn-sm "
              onClick={() => {
                deleteExpense(addedExpense._id);
                toast.dismiss(t.id);
              }}
            >
              Undo
            </button>
          </div>
        ),
        { duration: 3000 }
      );
    }
  }

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      date: new Date().toISOString().split("T")[0],
    }));
  }, []);

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
            placeholder="Enter"
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
