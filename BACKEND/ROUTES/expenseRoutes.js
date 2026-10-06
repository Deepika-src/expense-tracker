const express = require("express");

const {
    createExpense,
    getExpenses,
    getExpenseById,
    updateExpense,
    deleteExpense
} = require("../CONTROLLERS/expenseControllers")

const protect = require("../middleware/authMiddleware")

const router = express.Router();

// every expense route requires login
router.use(protect);

// post - create expense
router.post("/", createExpense);

// get all expenses
router.get("/", getExpenses);

// get byId expense
router.get("/:id", getExpenseById);

// put - update expense
router.put("/:id", updateExpense);

// delete - delete expense
router.delete("/:id", deleteExpense);


module.exports= router;