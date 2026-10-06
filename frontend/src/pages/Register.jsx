import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import { registerUser } from "../services/authApi";
import { useAuth } from "../context/AuthContext";

function Register() {
    const navigate = useNavigate();
    const { login } = useAuth();

    const [FormData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        securityQuestions: "",
        securityAnswers: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData({
            ...FormData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const data = await registerUser(FormData);

            login(data);
            navigate("/");
        } catch (error) {
            alert(
                error.response?.data?.message ||
                "Registration Failed"
            );
        }
    };

    return (
        <>
            <div className="auth-container">
                <div className="auth-card">

                    <h1>Create Account</h1>

                    <form onSubmit={handleSubmit}>

                        <input
                            type="text"
                            name="name"
                            placeholder="Name"
                            value={FormData.name}
                            onChange={handleChange}
                            required
                        />

                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={FormData.email}
                            onChange={handleChange}
                            required
                        />

                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={FormData.password}
                            onChange={handleChange}
                            minLength={6}
                            required
                        />

                        <select
                            name="securityQuestions"
                            value={FormData.securityQuestions}
                            onChange={handleChange}
                            required
                        >
                            <option value="">
                                Select Security Question
                            </option>

                            <option value="Enter your hometown:">
                                What is your hometown?
                            </option>

                            <option value="Enter your pet name:">
                                What is your pet name?
                            </option>

                            <option value="Enter your school name:">
                                What is your school name?
                            </option>

                            <option value="Enter your favourite teacher:">
                                What is your favourite teacher's name?
                            </option>
                        </select>

                        {FormData.securityQuestions && (
                            <input
                                type="text"
                                name="securityAnswers"
                                placeholder="Enter your answer"
                                value={FormData.securityAnswers}
                                onChange={handleChange}
                                required
                            />
                        )}

                        <button type="submit">
                            Register
                        </button>

                    </form>

                    <p>
                        Already have an account?{" "}
                        <Link to="/login">
                            Login
                        </Link>
                    </p>

                </div>
            </div>

            <footer className="landing-footer">
                <strong>Expense Tracker</strong>
                <span>
                    Simple expense management for everyday life.
                </span>
            </footer>
        </>
    );
}

export default Register;



























// import { useNavigate, Link } from "react-router-dom";
// import { useState } from "react";
// import { registerUser } from "../services/authApi";
// import { useAuth } from "../context/AuthContext";

// function Register() {
//     const navigate = useNavigate();
//     const { login } = useAuth();
//     const [FormData, setFormData] = useState({
//         name: "",
//         email: "",
//         password: ""
//     });
//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData({
//             ...FormData,
//             [name]: value
//         });
//     };
//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             const data = await registerUser(FormData);
//             login(data);
//             navigate("/");
//         } catch (error) {
//             alert(error.response?.data?.message || "Registration Failed");

//         }
//     };
//     return (
//         <>
//             <div className="auth-container">
//                 <div className="auth-card">
//                     <h1>Create Account</h1>
//                     <form onSubmit={handleSubmit}>
//                         <input type="text" name="name" placeholder="Name" value={FormData.name} onChange={handleChange} required />
//                         <input type="email" name="email" placeholder="Email" value={FormData.email} onChange={handleChange} required />
//                         <input type="password" name="password" placeholder="Password" value={FormData.password} onChange={handleChange} minLength={6} required />
//                         <button type="submit">
//                             Register
//                         </button>
//                     </form>
//                     <p>Already have an account?{" "}
//                         <Link to='/login'>Login</Link>
//                     </p>
//                 </div>
//             </div>
//             <footer className="landing-footer">
//                 <strong>Expense Tracker</strong>
//                 <span>Simple expense management for everyday life.</span>
//             </footer>
//         </>
//     );
// }
// export default Register;