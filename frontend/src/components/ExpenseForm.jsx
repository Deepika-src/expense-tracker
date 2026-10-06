import { useState } from "react";
import { createExpense } from "../services/expenseApi";

function ExpenseForm({ onExpenseAdded }) {
    const [formData, setFormData] = useState({
        title: "",
        amount: "",
        category: "",
        description: "",
        expense_mode: "",
        date: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData, [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createExpense({ ...formData, amount: Number(formData.amount) });
            setFormData({
                title: "",
                amount: "",
                category: "",
                description: "",
                expense_mode: "",
                date: ""
            });
            onExpenseAdded();
        }
        catch (error) {
            console.error(error);
            alert("Failed to add Expense");
        }
    }

    return (
        <div className="expense-form">
            <h2>Add Expense</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" name="title" placeholder="Expense Title" value={formData.title} onChange={handleChange} required />
                <input type="number" name="amount" placeholder="Amount" value={formData.amount} onChange={handleChange} required />

                <select name="category" value={formData.category} onChange={handleChange}>
                    <option value="">--Select Category--</option>
                    <option value="Food">Food</option>
                    <option value="Transport">Transport</option>
                    <option value="Bills">Bills</option>
                    <option value="Rent">Rent</option>
                    <option value="Health">Health</option>
                    <option value="Entertainment">Entertainment</option>
                    <option value="Education">Education</option>
                    <option value="Shopping">Shopping</option>
                    <option value="Others">Others</option>
                </select>


                <select name="expense_mode" value={formData.expense_mode} onChange={handleChange}>
                    <option>--Select Payment Mode--</option>
                    <option value="cash">cash</option>
                    <option value="online">online</option>
                    <option value="card">card</option>
                    <option value="others">others</option>
                </select>

                <input type="date" name="date" value={formData.date} onChange={handleChange} />
                <textarea name="description" id="Description" placeholder="Add brief description . . ." value={formData.description} onChange={handleChange} />
                <button type="submit">Add Expense</button>
            </form >

        </div>


    )
};

export default ExpenseForm;


