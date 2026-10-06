import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { updateProfile } from "../services/authApi";
import Navbar from "../components/Navbar";
import "./Profile.css";

function Profile() {
    const { user, token, login } = useAuth();
    const [formData, setFormData] = useState({
        name: user?.name || "",
        email: user?.email || "",
        profileImage: user?.profileImage || ""
    });
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        setFormData({
            name: user?.name || "",
            email: user?.email || "",
            profileImage: user?.profileImage || ""
        });
    }, [user]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((current) => ({ ...current, [name]: value }));
        setMessage("");
        setError("");
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setSaving(true);
        setMessage("");
        setError("");

        try {
            const data = await updateProfile(token, formData);
            if (data.user) {
                login({ token, user: data.user });
            }
            setMessage(data.message || "Profile updated successfully.");
        } catch (err) {
            setError(err.response?.data?.message || "Unable to update profile.");
        } finally {
            setSaving(false);
        }
    };

    const initials = (formData.name || "U")
        .split(" ")
        .filter(Boolean)
        .slice(0, 2)
        .map((part) => part[0].toUpperCase())
        .join("");

    return (
        <div className="profile-page">
            <Navbar />

            <main className="profile-wrapper">
                <div className="profile-heading">
                    <div>
                        <span>ACCOUNT</span>
                        <h1>Your Profile</h1>
                        <p>Manage the personal information connected to your Expense Tracker account.</p>
                    </div>
                    <Link to="/dashboard" className="profile-back">← Dashboard</Link>
                </div>

                <section className="profile-layout">
                    <aside className="profile-summary">
                        <div className="avatar-area">
                            {formData.profileImage ? (
                                <img src={formData.profileImage} alt="Profile" className="profile-avatar-image" />
                            ) : (
                                <div className="profile-avatar">{initials}</div>
                            )}
                        </div>
                        <h2>{formData.name || "Your Name"}</h2>
                        <p>{formData.email || "your@email.com"}</p>
                        <div className="account-status">
                            <span></span>
                            Account active
                        </div>

                        <div className="summary-divider" />
                        <div className="summary-note">
                            <strong>Expense Tracker</strong>
                            <p>Your profile details are connected to your existing authenticated account.</p>
                        </div>
                    </aside>

                    <section className="profile-form-card">
                        <div className="card-title">
                            <div>
                                <span>PERSONAL INFORMATION</span>
                                <h2>Account details</h2>
                            </div>
                        </div>

                        <form onSubmit={handleSubmit}>
                            <div className="form-grid">
                                <label>
                                    Full name
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        placeholder="Enter your name"
                                        required
                                    />
                                </label>

                                <label>
                                    Email address
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="Enter your email"
                                        required
                                    />
                                </label>
                            </div>

                            <label>
                                Profile image URL
                                <input
                                    type="url"
                                    name="profileImage"
                                    value={formData.profileImage}
                                    onChange={handleChange}
                                    placeholder="https://example.com/profile.jpg"
                                />
                                <small>Optional. Your existing backend stores the image as a URL.</small>
                            </label>

                            {message && <div className="profile-message success">✓ {message}</div>}
                            {error && <div className="profile-message error">{error}</div>}

                            <div className="profile-actions">
                                <Link to="/home" className="cancel-button">Cancel</Link>
                                <button type="submit" disabled={saving}>
                                    {saving ? "Saving..." : "Save Changes"}
                                </button>
                            </div>
                        </form>
                    </section>
                </section>
            </main>

            <footer className="landing-footer">
                <strong>Expense Tracker</strong>
                <span>
                    Simple expense management for everyday life.
                </span>
            </footer>
        </div>
    );
}

export default Profile;
