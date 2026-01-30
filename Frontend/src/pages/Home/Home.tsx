import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import api from "../../services/api";
import AppTopbar from "../../components/AppTopbar/AppTopbar";
import { isLoggedIn } from "../../services/auth";
import "./Home.css";

function Home() {
    const [message, setMessage] = useState<string>("");
    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        api.get<string>("/hello")
            .then((res) => setMessage(res.data))
            .catch(() => setMessage("Backend not reachable"));
    }, []);

    useEffect(() => {
        setLoggedIn(isLoggedIn());
    }, []);

    return (
        <div className="home-page">
            <AppTopbar />
            <main className="home-main">
                <section className="home-hero">
                    <div>
                        <p className="home-kicker">All Purpose CPQ</p>
                        <h1>Build products, pricing, and quotes faster.</h1>
                        <p className="home-subtitle">
                            Manage products, rates, and documents with a single,
                            consistent workflow.
                        </p>
                    </div>
                    <div className="home-card">
                        <div className="home-card-title">System Status</div>
                        <div className="home-status">{message}</div>
                        {loggedIn ? (
                            <NavLink className="home-primary" to="/config/product">
                                Open Config
                            </NavLink>
                        ) : (
                            <div className="home-auth-actions">
                                <NavLink className="home-primary" to="/login">
                                    Login
                                </NavLink>
                                <NavLink className="home-secondary" to="/register">
                                    Sign Up
                                </NavLink>
                            </div>
                        )}
                    </div>
                </section>

                <section className="home-grid">
                    <div className="home-panel">
                        <h3>Config Center</h3>
                        <p>Create products, questions, and rate tables in minutes.</p>
                    </div>
                    <div className="home-panel">
                        <h3>Document Hub</h3>
                        <p>Keep policy forms and guides up to date.</p>
                    </div>
                    <div className="home-panel">
                        <h3>API Ready</h3>
                        <p>Integrate with quoting and underwriting engines.</p>
                    </div>
                </section>
            </main>
        </div>
    );
}

export default Home;
