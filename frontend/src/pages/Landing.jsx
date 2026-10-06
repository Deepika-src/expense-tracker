import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import "./Landing.css";

function Landing() {
    const { user, token } = useAuth();

    return (
        <div className="landing-page">
            <Navbar />

            <main>
                <section className="landing-hero">
                    <div className="hero-content">
                        <span className="hero-badge">SMART • SIMPLE • SECURE</span>
                        <h1>
                            Take control of your
                            <span> expenses.</span>
                        </h1>
                        <p>
                            Expense Tracker helps you record your daily spending,
                            understand where your money goes, and keep your finances
                            organized in one simple place.
                        </p>

                        <div className="hero-actions">
                            <Link className="primary-cta" to={token ? "/dashboard" : "/register"}>
                                {token ? "Go to Dashboard" : "Get Started"}
                            </Link>
                            <Link className="secondary-cta" to={token ? "/profile" : "/login"}>
                                {token ? "View Profile" : "Login"}
                            </Link>
                        </div>

                        {user && (
                            <p className="welcome-text">
                                Welcome back, <strong>{user.name}</strong> 👋
                            </p>
                        )}
                    </div>

                    <div className="hero-visual" aria-hidden="true">
                        <div className="dashboard-card">
                            <div className="dashboard-top">
                                <div>
                                    <span>Total spending</span>
                                    <strong>₹ 24,850</strong>
                                </div>
                                <div className="trend">↗ 12.5%</div>
                            </div>
                            <div className="chart-bars">
                                <i style={{ height: "42%" }}></i>
                                <i style={{ height: "66%" }}></i>
                                <i style={{ height: "51%" }}></i>
                                <i style={{ height: "82%" }}></i>
                                <i style={{ height: "62%" }}></i>
                                <i style={{ height: "94%" }}></i>
                                <i style={{ height: "74%" }}></i>
                            </div>
                            <div className="chart-labels">
                                <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span>
                                <span>Fri</span><span>Sat</span><span>Sun</span>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="features-section">
                    <div className="section-heading">
                        <span>Everything you need</span>
                        <h2>Manage your expenses with ease.</h2>
                        <p>Keep your spending records organized without making money management complicated.</p>
                    </div>

                    <div className="feature-grid">
                        <article className="feature-card">
                            <div className="feature-icon">₹</div>
                            <h3>Track Expenses</h3>
                            <p>Add and manage expenses from your dashboard whenever you spend.</p>
                        </article>

                        <article className="feature-card">
                            <div className="feature-icon">⌁</div>
                            <h3>Stay Organized</h3>
                            <p>Keep your financial activity in one clean and easy-to-understand interface.</p>
                        </article>

                        <article className="feature-card">
                            <div className="feature-icon">✓</div>
                            <h3>Secure Account</h3>
                            <p>Your account is protected through the authentication system already connected to your app.</p>
                        </article>
                    </div>
                </section>

                <section className="landing-bottom-cta">
                    <div>
                        <span>Ready when you are</span>
                        <h2>Start keeping your expenses organized.</h2>
                    </div>
                    <Link to={token ? "/dashboard" : "/register"} className="primary-cta">
                        {token ? "Open Dashboard" : "Create Account"}
                    </Link>
                </section>
            </main>

            <footer className="landing-footer">
                <strong>Expense Tracker</strong>
                <span>Simple expense management for everyday life.</span>
            </footer>
        </div>
    );
}

export default Landing;
