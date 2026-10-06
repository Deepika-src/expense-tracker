import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./ResetPassword.css";

const API_URL = "http://localhost:5000/api/auth";

function ResetPassword() {
    const navigate = useNavigate();

    const [step, setStep] = useState(1);

    const [formData, setFormData] = useState({
        email: "",
        securityAnswers: "",
        newPassword: "",
        confirmNewPassword: ""
    });

    const [securityQuestion, setSecurityQuestion] = useState("");

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value
        });
    };


    // STEP 1
    const getQuestion = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);

            const response = await axios.post(
                `${API_URL}/forgot-password/question`,
                {
                    email: formData.email
                }
            );

            setSecurityQuestion(
                response.data.securityQuestions
            );

            setStep(2);

        } catch (error) {
            alert(
                error.response?.data?.message ||
                "Unable to find account"
            );
        } finally {
            setLoading(false);
        }
    };


    // STEP 2
    const verifyAnswer = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);

            await axios.post(
                `${API_URL}/forgot-password/verify`,
                {
                    email: formData.email,
                    securityAnswers:
                        formData.securityAnswers
                }
            );

            setStep(3);

        } catch (error) {
            alert(
                error.response?.data?.message ||
                "Incorrect security answer"
            );
        } finally {
            setLoading(false);
        }
    };


    // STEP 3
    const resetPassword = async (e) => {
        e.preventDefault();

        if (
            formData.newPassword !==
            formData.confirmNewPassword
        ) {
            alert("Passwords do not match");
            return;
        }

        if (formData.newPassword.length < 6) {
            alert(
                "Password must be at least 6 characters"
            );
            return;
        }

        try {
            setLoading(true);

            await axios.post(
                `${API_URL}/reset-password`,
                {
                    email: formData.email,
                    securityAnswers:
                        formData.securityAnswers,
                    newPassword:
                        formData.newPassword,
                    confirmNewPassword:
                        formData.confirmNewPassword
                }
            );

            alert(
                "Password reset successfully. Please login."
            );

            navigate("/login");

        } catch (error) {
            alert(
                error.response?.data?.message ||
                "Failed to reset password"
            );
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="reset-page">

            <div className="reset-card">

                <div className="reset-header">

                    <h1>Reset Password</h1>

                    <p>
                        Recover your Expense Tracker account
                    </p>

                </div>


                {/* STEP INDICATOR */}

                <div className="reset-steps">

                    <div className={step >= 1 ? "active" : ""}>
                        <span>1</span>
                        <small>Email</small>
                    </div>

                    <div className={step >= 2 ? "active" : ""}>
                        <span>2</span>
                        <small>Verify</small>
                    </div>

                    <div className={step >= 3 ? "active" : ""}>
                        <span>3</span>
                        <small>Password</small>
                    </div>

                </div>


                {/* STEP 1 */}

                {step === 1 && (
                    <form onSubmit={getQuestion}>

                        <h2>Find Your Account</h2>

                        <p className="step-text">
                            Enter your registered email address.
                        </p>

                        <input
                            type="email"
                            name="email"
                            placeholder="Enter your email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />

                        <button
                            type="submit"
                            disabled={loading}
                        >
                            {loading
                                ? "Finding..."
                                : "Get Security Question"}
                        </button>

                    </form>
                )}


                {/* STEP 2 */}

                {step === 2 && (
                    <form onSubmit={verifyAnswer}>

                        <h2>Security Question</h2>

                        <div className="security-question">
                            {securityQuestion}
                        </div>

                        <input
                            type="text"
                            name="securityAnswers"
                            placeholder="Enter your answer"
                            value={formData.securityAnswers}
                            onChange={handleChange}
                            required
                        />

                        <button
                            type="submit"
                            disabled={loading}
                        >
                            {loading
                                ? "Verifying..."
                                : "Verify Answer"}
                        </button>

                        <button
                            type="button"
                            className="back-btn"
                            onClick={() => setStep(1)}
                        >
                            Back
                        </button>

                    </form>
                )}


                {/* STEP 3 */}

                {step === 3 && (
                    <form onSubmit={resetPassword}>

                        <h2>Create New Password</h2>

                        <p className="step-text">
                            Your security answer has been verified.
                        </p>

                        <input
                            type="password"
                            name="newPassword"
                            placeholder="New Password"
                            value={formData.newPassword}
                            onChange={handleChange}
                            minLength={6}
                            required
                        />

                        <input
                            type="password"
                            name="confirmNewPassword"
                            placeholder="Confirm Password"
                            value={formData.confirmNewPassword}
                            onChange={handleChange}
                            minLength={6}
                            required
                        />

                        <button
                            type="submit"
                            disabled={loading}
                        >
                            {loading
                                ? "Resetting..."
                                : "Reset Password"}
                        </button>

                    </form>
                )}


                <div className="reset-footer">

                    <Link to="/login">
                        Back to Login
                    </Link>

                </div>

            </div>

        </div>
    );
}

export default ResetPassword;