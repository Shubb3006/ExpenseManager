"use server";
import {
  deleteExpense,
  getExpensesByMonthName,
  saveExpense,
  updateExpense,
} from "./expenses";

import { expensesTotal } from "@/lib/expenses";

function isInvalidtext(text) {
  // Expense name must be alphabets only and at least 3 characters long
  const namePattern = /^[A-Za-z\s]{3,}$/;
  return !text || !namePattern.test(text.trim());
}

function isInvalidAmount(amount) {
  // Amount must be a positive integer
  const amountPattern = /^\d+$/;
  return !amount || !amountPattern.test(amount.toString().trim());
}

export async function SharExpense(prevState, FormData) {
  await new Promise((res) => setTimeout(res, 1000));
  const expense = {
    expense: FormData.get("expenseName"),
    amount: FormData.get("expenseAmount"),
    created_at: FormData.get("expenseDate"),
  };
  if (isInvalidtext(expense.expense) || isInvalidAmount(expense.amount)) {
    return {
      message: "Enter Valid data",
      type: "error",
    };
  }
  try {
    saveExpense(expense);
    return {
      message: "Expense Saved Successfully",
      type: "success",
    };
  } catch (error) {
    return { message: "Expense cannot be saved", type: "error" };
  }
}

// export async function ShareUpdatedExpense(prevState, FormData) {
//   const id = FormData.get("id");
//   const expenseName = FormData.get("expenseName");
//   const amount = FormData.get("expenseAmount");

//   if (!id || !expenseName || !amount) {
//     console.error("Missing required fields");
//     return {
//       message: "All fields are required.",
//       type: "error",
//     };
//   }

//   try {
//     const result = await updateExpense(id, expenseName, parseFloat(amount));
//     if (result.success) {
//       return{
//         message: "Expense Updated",
//         type: "success",
//       }
//     } else {
//       return {
//         message: "Failed to update expense",
//         type: "error",
//       };
//     }
//   } catch (error) {
//     console.error("Error updating expense:", error);
//     return {
//       message: "Error occurred while updating expense",
//       type: "error",
//     };
//   }
// }

export async function ShareUpdatedExpense({ id, expense, amount, created_at }) {
  await new Promise((res) => setTimeout(res, 2000));
  if (isInvalidtext(expense) || isInvalidAmount(amount)) {
    return {
      message: "Enter Valid data",
      type: "error",
    };
  }
  if (!id || !expense || !amount) {
    console.error("Missing required fields");
    return {
      message: "All fields are required.",
      type: "error",
    };
  }

  try {
    const result = await updateExpense(id, expense, amount, created_at);
    if (result.success) {
      return {
        message: "Expense updated successfully.",
        type: "success",
      };
    } else {
      return {
        message: "Failed to update expense.",
        type: "error",
      };
    }
  } catch (error) {
    console.error("Error updating expense:", error);
    return {
      message: "Error occurred while updating expense.",
      type: "error",
    };
  }
}

export async function GetTotalExpense() {
  await new Promise((res) => setTimeout(res, 2000));

  const totalexpene = expensesTotal();
  return totalexpene;
}

export async function getExpenseMonth(month) {

  const data = getExpensesByMonthName(month);
  return data;
}

export async function DeleteExpense(id) {
  await new Promise((res) => setTimeout(res, 2000));
  return deleteExpense(id);
}

export async function Editexpense(id) {
  return updateExpense(id);
}
