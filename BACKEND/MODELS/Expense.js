const mongoose = require("mongoose");
const expenseSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    title: {
        type: String,
        required: true,

    },


    amount: {
        type: Number,
        required: true,
        min: 0,
    },


    category: {
        type: String,
        required: true,
        enum: [
            'Food',
            'Rent',
            'Entertainment',
            'Travel',
            'Health',
            'Transport',
            'Shopping',
            'Bills',
            'Education',
            'Other'
        ]
    },


    description: {
        type: String,
        trim: true,
    },

    expense_mode: {
        required: true,
        type: String,
        enum: ["online", "cash", "card", "other"],
    },

    date: {
        type: Date,
        required: true,
        default: Date.now
    },

},
    {
        timestamps: true
    },
);

module.exports = mongoose.model("Expense", expenseSchema);
