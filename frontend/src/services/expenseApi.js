import axios from 'axios';

const API_URL = "http://localhost:5000/api/expenses";

// GET ALL EXPENSES

export const getExpenses = async () => {
    const token = localStorage.getItem("token");
    const response = await axios.get(API_URL,{
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response.data;
};


// CREATE EXPENSE
export const createExpense = async (data) => {
        const token = localStorage.getItem("token");
        const response = await axios.post(
            API_URL,
            data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    };

    // UPDATE EXPENSE
    export const updateExpense = async (id, expenseData) => {
        const response = await axios.put(`${API_URL}/${id}`,
            expenseData);
        return response.data;
    }

    // DELETE EXPENSE
    export const deleteExpense = async (id) => {
        const response = await axios.delete(`${API_URL}/${id}`);
        return response.data;
    }
