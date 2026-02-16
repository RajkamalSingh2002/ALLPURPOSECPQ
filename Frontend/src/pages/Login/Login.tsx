import { useEffect, useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import AppFooter from "../../components/AppFooter/AppFooter";
import logoAllCpq from "../../assets/logo_allCPQ.png";
import * as authService from "../../services/authService";

type LoginProps = {
    variant?: "page" | "modal";
    onClose?: () => void;
};

interface LoginFormError {
    username?: string;
    password?: string;
    general?: string;
}

function Login({ variant = "page", onClose }: LoginProps) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState<LoginFormError>({});
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        document.title = "allCPQ | Login";
        return () => {
            document.title = "allCPQ";
        };
    }, []);

    /**
     * Validate form inputs
     */
    const validateForm = (): boolean => {
        const newErrors: LoginFormError = {};

        if (!username.trim()) {
            newErrors.username = "Username is required";
        }
        if (!password) {
            newErrors.password = "Password is required";
        }
        if (password && password.length < 6) {
            newErrors.password = "Password must be at least 6 characters";
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

        setIsLoading(true);
        setErrors({});

        try {
            // Call backend login endpoint
            const response = await authService.login(username, password);

            console.log("Login successful:", response);

            // Close modal if in modal variant
            if (variant === "modal" && onClose) {
                onClose();
            }

            // Navigate to home page
            navigate("/");
        } catch (error: any) {
            console.error("Login failed:", error);

            // Handle different error scenarios
            const errorMessage = error.message || "Login failed. Please try again.";

            setErrors({
                general: errorMessage,
            });
        } finally {
            setIsLoading(false);
        }
    };

    const content = (
        <div className="auth-shell auth-shell-split">
            <section className="auth-left">
                <div className="auth-logo">
                    <img src={logoAllCpq} alt="AllCPQ logo" />
                </div>
                <h1 className="auth-title">Login to Your ApAdmin Account</h1>
                <div className="auth-accent-line" />
            </section>

            <form className="auth-card" onSubmit={handleSubmit}>
                <div className="auth-card-title">Admin User Account</div>

                {/* General Error Message */}
                {errors.general && (
                    <div className="auth-error auth-error-general">
                        <strong>Error:</strong> {errors.general}
                    </div>
                )}

                <div className="auth-grid auth-grid-two">
                    {/* Username Field */}
                    <label htmlFor="login-username">Username:</label>
                    <div>
                        <input
                            id="login-username"
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            disabled={isLoading}
                            className={errors.username ? "input-error" : ""}
                            placeholder="Enter your username"
                        />
                        {errors.username && (
                            <p className="field-error">{errors.username}</p>
                        )}
                    </div>

                    {/* Password Field */}
                    <label htmlFor="login-password">Password:</label>
                    <div>
                        <input
                            id="login-password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            disabled={isLoading}
                            className={errors.password ? "input-error" : ""}
                            placeholder="Enter your password"
                        />
                        {errors.password && (
                            <p className="field-error">{errors.password}</p>
                        )}
                    </div>
                </div>

                {/* Login Button */}
                <button
                    className="auth-button"
                    type="submit"
                    disabled={isLoading}
                >
                    {isLoading ? "Logging in..." : "Login"}
                </button>

                {/* Register Link */}
                <div className="auth-footer">
                    <p>
                        Don't have an account?{" "}
                        <a href="/register" className="auth-link">
                            Register here
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
                        aria-label="Close login"
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

export default Login;
