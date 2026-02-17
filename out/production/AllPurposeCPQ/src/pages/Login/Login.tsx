import { useEffect, useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import AppFooter from "../../components/AppFooter/AppFooter";
import logoAllCpq from "../../assets/logo_allCPQ.png";
import { setLoggedIn } from "../../services/auth";

type LoginProps = {
    variant?: "page" | "modal";
    onClose?: () => void;
};

function Login({ variant = "page", onClose }: LoginProps) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        document.title = "allCPQ | Login";
        return () => {
            document.title = "allCPQ";
        };
    }, []);

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!email || !password) {
            setError("Email and password are required");
            return;
        }

        if (email !== "admin@allcpq.com" || password !== "admin123") {
            setError("Invalid credentials");
            return;
        }

        setError("");
        console.log("Login data:", { email, password });
        setLoggedIn(true);
        if (variant === "modal" && onClose) {
            onClose();
        }
        navigate("/");

        // Later:
        // call API → /auth/login
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

                <div className="auth-grid auth-grid-two">
                    <label htmlFor="login-username">Username:</label>
                    <input
                        id="login-username"
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <label htmlFor="login-password">Password:</label>
                    <input
                        id="login-password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                {error && <p className="auth-error">{error}</p>}
                <button className="auth-button" type="submit">Login</button>
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
