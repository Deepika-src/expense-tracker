import { useEffect, useMemo, useState } from "react";
import ExpenseForm from "../components/ExpenseForm";
import { getExpenses } from "../services/expenseApi";
import "./Home.css";

function Home() {
    const [expenses, setExpenses] = useState([]);
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("All");
    const [showForm, setShowForm] = useState(false);
    const [loading, setLoading] = useState(true);

    const loadExpenses = async () => {
        try {
            setLoading(true);
            const data = await getExpenses();
            setExpenses(data);
        } catch (error) {
            console.error("Failed to load expenses:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadExpenses();
    }, []);

    const totalExpense = expenses.reduce(
        (total, expense) => total + Number(expense.amount || 0),
        0
    );

    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();

    const monthlyExpense = expenses
        .filter((expense) => {
            const expenseDate = new Date(expense.date);

            return (
                expenseDate.getMonth() === currentMonth &&
                expenseDate.getFullYear() === currentYear
            );
        })
        .reduce(
            (total, expense) => total + Number(expense.amount || 0),
            0
        );

    const categories = [
        "Food",
        "Rent",
        "Entertainment",
        "Travel",
        "Health",
        "Transport",
        "Shopping",
        "Bills",
        "Education",
        "Other",
    ];

    const filteredExpenses = useMemo(() => {
        return expenses.filter((expense) => {
            const matchesSearch =
                expense.title
                    ?.toLowerCase()
                    .includes(search.toLowerCase()) ||
                expense.description
                    ?.toLowerCase()
                    .includes(search.toLowerCase());

            const matchesCategory =
                category === "All" || expense.category === category;

            return matchesSearch && matchesCategory;
        });
    }, [expenses, search, category]);

    return (
        <>
            <div className="dashboard-page">
                <div className="dashboard-container">

                    {/* Header */}
                    <div className="dashboard-header">
                        <div>
                            <p className="dashboard-label">PERSONAL FINANCE</p>
                            <h1>Expense Dashboard</h1>
                            <p className="dashboard-subtitle">
                                Track and manage your expenses in one place.
                            </p>
                        </div>

                        <button
                            className="add-expense-btn"
                            onClick={() => setShowForm(!showForm)}
                        >
                            {showForm ? "Close Form" : "+ Add Expense"}
                        </button>
                    </div>

                    {/* Add Expense Form */}
                    {showForm && (
                        <div className="add-expense-section">
                            <ExpenseForm
                                onExpenseAdded={() => {
                                    loadExpenses();
                                    setShowForm(false);
                                }}
                            />
                        </div>
                    )}

                    {/* Summary Cards */}
                    <div className="summary-grid">

                        <div className="summary-card">
                            <div className="summary-icon">₹</div>
                            <div>
                                <p>Total Expenses</p>
                                <h2>
                                    ₹ {totalExpense.toLocaleString("en-IN")}
                                </h2>
                            </div>
                        </div>

                        <div className="summary-card">
                            <div className="summary-icon">📅</div>
                            <div>
                                <p>This Month</p>
                                <h2>
                                    ₹ {monthlyExpense.toLocaleString("en-IN")}
                                </h2>
                            </div>
                        </div>

                        <div className="summary-card">
                            <div className="summary-icon">📊</div>
                            <div>
                                <p>Total Records</p>
                                <h2>{expenses.length}</h2>
                            </div>
                        </div>

                    </div>

                    {/* History */}
                    <section className="history-section">

                        <div className="history-header">
                            <div>
                                <h2>Expense History</h2>
                                <p>
                                    View all your recorded expenses.
                                </p>
                            </div>
                        </div>

                        {/* Filters */}
                        <div className="expense-filters">

                            <input
                                type="text"
                                placeholder="Search expenses..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />

                            <select
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                            >
                                <option value="All">All Categories</option>

                                {categories.map((item) => (
                                    <option key={item} value={item}>
                                        {item}
                                    </option>
                                ))}
                            </select>

                        </div>

                        {/* Expense List */}
                        {loading ? (
                            <div className="empty-state">
                                <h3>Loading expenses...</h3>
                            </div>
                        ) : filteredExpenses.length === 0 ? (
                            <div className="empty-state">
                                <div className="empty-icon">₹</div>
                                <h3>No expenses found</h3>
                                <p>
                                    Add your first expense to start tracking
                                    your spending.
                                </p>

                                <button
                                    onClick={() => setShowForm(true)}
                                    className="empty-add-btn"
                                >
                                    + Add Expense
                                </button>
                            </div>
                        ) : (
                            <div className="expense-history">

                                {/* Desktop Header */}
                                <div className="expense-table-header">
                                    <span>Date</span>
                                    <span>Expense</span>
                                    <span>Category</span>
                                    <span>Payment</span>
                                    <span>Amount</span>
                                </div>

                                {filteredExpenses.map((expense) => (
                                    <div
                                        className="expense-row"
                                        key={expense._id}
                                    >

                                        <div className="expense-date">
                                            {new Date(
                                                expense.date
                                            ).toLocaleDateString("en-IN", {
                                                day: "2-digit",
                                                month: "short",
                                                year: "numeric",
                                            })}
                                        </div>

                                        <div className="expense-info">
                                            <strong>{expense.title}</strong>

                                            {expense.description && (
                                                <small>
                                                    {expense.description}
                                                </small>
                                            )}
                                        </div>

                                        <div>
                                            <span className="category-badge">
                                                {expense.category}
                                            </span>
                                        </div>

                                        <div className="payment-mode">
                                            {expense.expense_mode}
                                        </div>

                                        <div className="expense-amount">
                                            ₹{" "}
                                            {Number(
                                                expense.amount
                                            ).toLocaleString("en-IN")}
                                        </div>

                                    </div>
                                ))}

                            </div>
                        )}

                    </section>

                </div>
            </div>
            <footer className="landing-footer">
                <strong>Expense Tracker</strong>
                <span>Simple expense management for everyday life.</span>
            </footer>
        </>
    );
}

export default Home;













































// import { useEffect, useState } from "react";
// import ExpenseForm from "../components/ExpenseForm";
// import { getExpenses, deleteExpense } from "../services/expenseApi";

// function Home() {

//     const [expenses, setExpenses] = useState([]);;
//     const loadExpenses = async () => {
//         try {
//             const data = await getExpenses();
//             setExpenses(data);

//         } catch (error) {
//             console.log(error);
//         }
//     };


//     useEffect(() => {
//         loadExpenses();
//     }, []);

//     // const handleDelete = async (id) => {
//     //     const confirmDelete = window.confirm(
//     //         "Are you sure you want to delete this expense?");
//     //     if (!confirmDelete) {
//     //         return;
//     //     }
//     //     try {
//     //         await deleteExpense(id);
//     //         loadExpenses();

//     //     }
//     //     catch (error) {
//     //         console.error(error);
//     //         alert("Failed to delete expense");
//     //     }
//     // };



//     const totalExpense = expenses.reduce(
//         (total, expense) => total + Number(expense.amount), 0
//     );


//     return (
//         <div className="container">
//             <h1>Expense Tracker</h1>
//             <div className="summary">
//                 <h2>Total Expense: ₹ {totalExpense}</h2>
//             </div>
//             <ExpenseForm onExpenseAdded={loadExpenses} />
//         </div>
//     )
// }

// export default Home;























