import { useEffect, useState, type FormEvent } from "react";
import "../Login/Login.css";
import logoAllCpq from "../../assets/logo_allCPQ.png";

function Register() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [domain, setDomain] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        document.title = "allCPQ | Register";
        return () => {
            document.title = "allCPQ";
        };
    }, []);

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!username || !password || !email || !domain) {
            setError("All fields are required");
            return;
        }

        setError("");
        console.log("Register data:", { username, password, email, domain });
    };

    return (
        <div className="auth-page">
            <div className="auth-shell auth-shell-split">
                <section className="auth-left">
                    <div className="auth-logo">
                        <img src={logoAllCpq} alt="AllCPQ logo" />
                    </div>
                    <h1 className="auth-title">Create Your ApAdmin Account</h1>
                    <div className="auth-accent-line" />
                </section>

                <form className="auth-card" onSubmit={handleSubmit}>
                    <div className="auth-card-title">Admin User Account</div>

                    <div className="auth-grid auth-grid-two">
                        <label htmlFor="reg-username">Username:</label>
                        <input
                            id="reg-username"
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />

                        <label htmlFor="reg-password">Password:</label>
                        <input
                            id="reg-password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />

                        <label htmlFor="reg-email">Email:</label>
                        <input
                            id="reg-email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />

                        <label htmlFor="reg-domain">Company Name:</label>
                        <input
                            id="reg-domain"
                            type="text"
                            value={domain}
                            onChange={(e) => setDomain(e.target.value)}
                            placeholder="Enter your company name"
                        />
                    </div>

                    {error && <p className="auth-error">{error}</p>}
                    <button className="auth-button" type="submit">Create Account</button>
                </form>
            </div>
        </div>
    );
}

export default Register;
