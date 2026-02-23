import { useEffect, useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import "../Login/Login.css";
import AppFooter from "../../components/AppFooter/AppFooter";
import logoAllCpq from "../../assets/logo_allCPQ.png";
import * as authService from "../../services/authService";

type RegisterProps = {
    variant?: "page" | "modal";
    onClose?: () => void;
};

interface RegisterFormError {
    username?: string;
    password?: string;
    email?: string;
    domain?: string;
    general?: string;
}

function Register({ variant = "page", onClose }: RegisterProps) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [email, setEmail] = useState("");
    const [domain, setDomain] = useState("");
    const [errors, setErrors] = useState<RegisterFormError>({});
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        document.title = "allCPQ | Register";
        return () => {
            document.title = "allCPQ";
        };
    }, []);

    /**
     * Validate email format
     */
    const isValidEmail = (email: string): boolean => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    /**
     * Validate password strength
     */
    const validatePassword = (pwd: string): string | null => {
        if (!pwd) {
            return "Password is required";
        }
        if (pwd.length < 6) {
            return "Password must be at least 6 characters";
        }
        if (!/[A-Z]/.test(pwd)) {
            return "Password must contain at least one uppercase letter";
        }
        if (!/[0-9]/.test(pwd)) {
            return "Password must contain at least one number";
        }
        return null;
    };

    /**
     * Validate form inputs
     */
    const validateForm = (): boolean => {
        const newErrors: RegisterFormError = {};

        // Username validation
        if (!username.trim()) {
            newErrors.username = "Username is required";
        } else if (username.length < 3) {
            newErrors.username = "Username must be at least 3 characters";
        } else if (username.length > 20) {
            newErrors.username = "Username must be less than 20 characters";
        }

        // Password validation
        const passwordError = validatePassword(password);
        if (passwordError) {
            newErrors.password = passwordError;
        }

        // Confirm password validation
        if (!confirmPassword) {
            newErrors.password = "Please confirm your password";
        } else if (password !== confirmPassword) {
            newErrors.password = "Passwords do not match";
        }

        // Email validation
        if (!email.trim()) {
            newErrors.email = "Email is required";
        } else if (!isValidEmail(email)) {
            newErrors.email = "Please enter a valid email address";
        }

        // Domain validation
        if (!domain.trim()) {
            newErrors.domain = "Company domain name is required";
        } else if (domain.length < 2) {
            newErrors.domain = "Company domain name must be at least 2 characters";
        } else if (domain.length > 50) {
            newErrors.domain = "Company domain name must be less than 50 characters";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    /**
     * Handle form submission
     */
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Validate form
        if (!validateForm()) {
            return;
        }

        setLoading(true);
        setErrors({});
        setSuccessMessage("");

        try {
            // Call the backend register API
            const response = await authService.register(
                username,
                password,
                email,
                domain
            );

            console.log("Registration successful:", response);

            // Show success message
            setSuccessMessage("Account created successfully! Redirecting to login...");

            // Reset form
            setUsername("");
            setPassword("");
            setConfirmPassword("");
            setEmail("");
            setDomain("");

            // Close modal if in modal variant
            if (variant === "modal" && onClose) {
                onClose();
            }

            // Redirect to login page after 2 seconds
            setTimeout(() => {
                navigate("/login", {
                    state: {
                        message: "Registration successful! Please login with your credentials.",
                        email: email,
                    },
                });
            }, 2000);
        } catch (err: any) {
            console.error("Registration error:", err);

            // Handle different error scenarios
            const errorMessage = err.message || "Registration failed. Please try again.";

            // Check if error is field-specific
            if (err.code === "DUPLICATE_EMAIL") {
                setErrors({
                    email: "Email is already registered. Please use a different email.",
                });
            } else if (err.code === "DUPLICATE_USERNAME") {
                setErrors({
                    username: "Username is already taken. Please choose a different username.",
                });
            } else {
                setErrors({
                    general: errorMessage,
                });
            }
        } finally {
            setLoading(false);
        }
    };

    const content = (
        <div className="auth-shell auth-shell-split">
            <section className="auth-left">
                <div className="auth-logo">
                    <img src={logoAllCpq} alt="AllCPQ logo" />
                </div>
                <h1 className="auth-title">Create Your ApAdmin Account</h1>
                <div className="auth-accent-line" />
            </section>

            <form className="auth-card" onSubmit={handleSubmit}>
                <div className="auth-card-title">Admin User Account Registration</div>

                {/* Success Message */}
                {successMessage && (
                    <div className="auth-success" style={{ color: "#28a745", marginBottom: "15px" }}>
                        <strong>✓ {successMessage}</strong>
                    </div>
                )}

                {/* General Error Message */}
                {errors.general && (
                    <p className="auth-error" style={{ marginBottom: "15px" }}>
                        <strong>Error:</strong> {errors.general}
                    </p>
                )}

                <div className="auth-grid auth-grid-two">
                    {/* Username Field */}
                    <label htmlFor="reg-username">Username:</label>
                    <div>
                        <input
                            id="reg-username"
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            disabled={loading}
                            className={errors.username ? "input-error" : ""}
                            placeholder="Choose a username (3-20 characters)"
                        />
                        {errors.username && (
                            <p className="field-error" style={{ color: "#dc3545", fontSize: "12px", marginTop: "5px" }}>
                                {errors.username}
                            </p>
                        )}
                    </div>

                    {/* Email Field */}
                    <label htmlFor="reg-email">Email:</label>
                    <div>
                        <input
                            id="reg-email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            disabled={loading}
                            className={errors.email ? "input-error" : ""}
                            placeholder="Enter your email"
                        />
                        {errors.email && (
                            <p className="field-error" style={{ color: "#dc3545", fontSize: "12px", marginTop: "5px" }}>
                                {errors.email}
                            </p>
                        )}
                    </div>

                    {/* Password Field */}
                    <label htmlFor="reg-password">Password:</label>
                    <div>
                        <input
                            id="reg-password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            disabled={loading}
                            className={errors.password ? "input-error" : ""}
                            placeholder="Min 6 chars, 1 uppercase, 1 number"
                        />
                        {errors.password && (
                            <p className="field-error" style={{ color: "#dc3545", fontSize: "12px", marginTop: "5px" }}>
                                {errors.password}
                            </p>
                        )}
                    </div>

                    {/* Confirm Password Field */}
                    <label htmlFor="reg-confirm-password">Confirm Password:</label>
                    <div>
                        <input
                            id="reg-confirm-password"
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            disabled={loading}
                            className={errors.password ? "input-error" : ""}
                            placeholder="Confirm your password"
                        />
                    </div>

                    {/* Domain Field */}
                    <label htmlFor="reg-domain">Company Domain Name:</label>
                    <div>
                        <input
                            id="reg-domain"
                            type="text"
                            value={domain}
                            onChange={(e) => setDomain(e.target.value)}
                            disabled={loading}
                            className={errors.domain ? "input-error" : ""}
                            placeholder="Enter your company name"
                        />
                        {errors.domain && (
                            <p className="field-error" style={{ color: "#dc3545", fontSize: "12px", marginTop: "5px" }}>
                                {errors.domain}
                            </p>
                        )}
                    </div>
                </div>

                {/* Create Account Button */}
                <button className="auth-button" type="submit" disabled={loading}>
                    {loading ? "Creating Account..." : "Create Account"}
                </button>

                {/* Login Link */}
                <div className="auth-footer" style={{ textAlign: "center", marginTop: "20px" }}>
                    <p>
                        Already have an account?{" "}
                        <a href="/login" className="auth-link" style={{ color: "#007bff", textDecoration: "none" }}>
                            Login here
                        </a>
                    </p>
                </div>
            </form>
        </div>
    );

    if (variant === "modal") {
        return (
            <div
                className="auth-modal-overlay"
                role="dialog"
                aria-modal="true"
                onClick={onClose}
            >
                <div className="auth-modal" onClick={(e) => e.stopPropagation()}>
                    <button
                        className="auth-modal-close"
                        type="button"
                        onClick={onClose}
                        aria-label="Close register"
                    >
                        ✕
                    </button>
                    {content}
                </div>
            </div>
        );
    }

    return (
        <div className="auth-page">
            {content}
            <AppFooter />
        </div>
    );
}

export default Register;
