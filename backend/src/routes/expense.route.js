import express from "express";
import { protectedRoute } from "../middlewares/auth.middleware.js";
import {
  addExpense,
  deleteExpense,
  getExpenses,
  updateExpense,
} from "../controllers/expense.controllers.js";

const router = express.Router();

router.post("/addExpense", protectedRoute, addExpense);
router.get("/getExpenses", protectedRoute, getExpenses);
router.delete("/deleteExpense/:id", protectedRoute, deleteExpense);
router.patch("/updateExpense/:id", protectedRoute, updateExpense);

export default router;
