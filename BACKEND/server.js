const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

const connectDB = require("./CONFIG/db");

dotenv.config();

connectDB();

const app = express();

// middleware
app.use(cors())
app.use(express.json());

// Test API
app.get("/", (req, res)=>{
    res.json({
        message: "Expense Tracker API is running"
    });
});



// Register routes
app.use("/api/auth", require("./ROUTES/authRoutes"));


// Expense Routes
app.use("/api/expenses/", require("./ROUTES/expenseRoutes"));


// start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, ()=>{
    console.log(`Server running on https://localhost:${PORT}`);
});

