import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Navbar.css";

function Navbar() {
    const { user, logout } = useAuth();
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/");
    };

    const getInitial = () => {
        if (!user?.name) return "U";
        return user.name.charAt(0).toUpperCase();
    };

    const handleSearch = (e) => {
        const value = e.target.value;
        setSearchTerm(value);

        if (user) {
            // After login: search user's expenses
            navigate(`/dashboard?search=${encodeURIComponent(value)}`);
        } else {
            // Before login: search landing page content
            const searchValue = value.toLowerCase().trim();

            if (searchValue) {
                const elements = document.querySelectorAll(
                    ".landing-page h1, .landing-page h2, .landing-page h3, .landing-page p, .landing-page span, .landing-page a"
                );

                elements.forEach((element) => {
                    element.style.display = "";

                    if (
                        !element.textContent
                            .toLowerCase()
                            .includes(searchValue)
                    ) {
                        element.style.display = "none";
                    }
                });
            } else {
                const elements = document.querySelectorAll(
                    ".landing-page h1, .landing-page h2, .landing-page h3, .landing-page p, .landing-page span, .landing-page a"
                );

                elements.forEach((element) => {
                    element.style.display = "";
                });
            }
        }
    };

    return (
        <nav className="navbar">
            <Link to="/" className="navbar-brand">
                Expense Tracker
            </Link>

            <div className="navbar-right">

                {/* SEARCH */}
                <div className="navbar-search">
                    <input
                        type="text"
                        placeholder={
                            user
                                ? "Search expenses..."
                                : "Search..."
                        }
                        value={searchTerm}
                        onChange={handleSearch}
                    />
                </div>

                {user ? (
                    <>

                        {/* DASHBOARD */}
                        <Link
                            to="/dashboard"
                            className="nav-action"
                        >
                            Dashboard
                        </Link>

                        {/* ADD EXPENSE */}
                        <Link
                            to="/dashboard"
                            className="nav-action add-nav"
                        >
                            + Add Expense
                        </Link>

                        {/* USER NAME */}
                        <span className="welcome-text">
                            Hi, {user.name}
                        </span>

                        {/* PROFILE */}
                        <button
                            className="profile-icon"
                            onClick={() => navigate("/profile")}
                            title="View Profile"
                        >
                            {getInitial()}
                        </button>

                        {/* LOGOUT */}
                        <button
                            className="logout-btn"
                            onClick={handleLogout}
                        >
                            Logout
                        </button>
                    </>
                ) : (
                    <>
                        {/* LOGIN */}
                        <Link to="/login" className="login-link">
                            Login
                        </Link>

                        {/* REGISTER */}
                        <Link to="/register" className="register-link">
                            Register
                        </Link>
                    </>
                )}
            </div>
        </nav>
    );
}

export default Navbar;