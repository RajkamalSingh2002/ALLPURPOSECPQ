import { useEffect, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import api from "../../services/api";
import AppTopbar from "../../components/AppTopbar/AppTopbar";
import AppFooter from "../../components/AppFooter/AppFooter";
import { AUTH_EVENT, isLoggedIn } from "../../services/auth";
import Login from "../Login/Login";
import Register from "../Register/Register";
import "./Home.css";

type HomeProps = {
    forceLoginOpen?: boolean;
    forceRegisterOpen?: boolean;
};

function Home({ forceLoginOpen = false, forceRegisterOpen = false }: HomeProps) {
    const [message, setMessage] = useState<string>("");
    const [loggedIn, setLoggedIn] = useState(false);
    const [loginOpen, setLoginOpen] = useState(forceLoginOpen);
    const [registerOpen, setRegisterOpen] = useState(forceRegisterOpen);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        api.get<string>("/hello")
            .then((res) => setMessage(res.data))
            .catch(() => setMessage("Backend not reachable"));
    }, []);

    useEffect(() => {
        setLoggedIn(isLoggedIn());
    }, [location.pathname, location.search, loginOpen, registerOpen]);

    useEffect(() => {
        const handleAuthChange = () => setLoggedIn(isLoggedIn());
        window.addEventListener(AUTH_EVENT, handleAuthChange);
        return () => window.removeEventListener(AUTH_EVENT, handleAuthChange);
    }, []);

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const shouldOpen = forceLoginOpen || params.get("login") === "1";
        setLoginOpen(shouldOpen);
    }, [forceLoginOpen, location.search]);

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const shouldOpen = forceRegisterOpen || params.get("register") === "1";
        setRegisterOpen(shouldOpen);
    }, [forceRegisterOpen, location.search]);

    const openLogin = () => {
        const params = new URLSearchParams(location.search);
        params.set("login", "1");
        navigate({ pathname: "/", search: `?${params.toString()}` }, { replace: false });
    };

    const closeLogin = () => {
        const params = new URLSearchParams(location.search);
        params.delete("login");
        const nextSearch = params.toString();
        navigate(
            { pathname: "/", search: nextSearch ? `?${nextSearch}` : "" },
            { replace: true }
        );
        setLoginOpen(false);
    };

    const openRegister = () => {
        const params = new URLSearchParams(location.search);
        params.set("register", "1");
        navigate({ pathname: "/", search: `?${params.toString()}` }, { replace: false });
    };

    const closeRegister = () => {
        const params = new URLSearchParams(location.search);
        params.delete("register");
        const nextSearch = params.toString();
        navigate(
            { pathname: "/", search: nextSearch ? `?${nextSearch}` : "" },
            { replace: true }
        );
        setRegisterOpen(false);
    };

    return (
        <div className="home-page">
            <AppTopbar />
            <main className="home-main">
                {loggedIn ? (
                    <section className="home-guest-layout">
                        <div className="home-guest-hero">
                            <div className="home-guest-copy">
                                <p className="home-kicker">All Purpose CPQ</p>
                                <h1 className="home-guest-title">
                                    Client Administration Portal
                                </h1>
                                <p className="home-guest-intro">
                                    allows complete configuration of your products or
                                    services to generate quotes and all accompanying
                                    documentation.
                                </p>
                            </div>
                            <div className="home-guest-card">
                                <div className="home-guest-card-title">Start configuring</div>
                                <p className="home-guest-intro">
                                    Use the configurations menu to start adding or editing
                                    quote details.
                                </p>
                                <div className="home-portal-link">
                                    <span>Launch domain </span>
                                    <a
                                        href="https://acme.allpurposecpq.com"
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        acme.allpurposecpq.com
                                    </a>
                                    <span aria-hidden="true">↗</span>
                                </div>
                            </div>
                        </div>

                        <div className="home-guest-features">
                            <div className="home-panel">
                                <h3>Configure Questions</h3>
                                <p>Set up questions with or without list of answers.</p>
                            </div>
                            <div className="home-panel">
                                <h3>Group Products</h3>
                                <p>Set up question groups as components and products.</p>
                            </div>
                            <div className="home-panel">
                                <h3>Generate Documents</h3>
                                <p>Add content for document generation.</p>
                            </div>
                            <div className="home-panel">
                                <h3>Quote Details</h3>
                                <p>Configure quote details.</p>
                            </div>
                            <div className="home-panel">
                                <h3>Test Safely</h3>
                                <p>
                                    Test quotes on your corporate website with special admin
                                    access before making it public.
                                </p>
                            </div>
                        </div>
                    </section>
                ) : (
                    <section className="home-guest-layout">
                        <div className="home-guest-hero">
                            <div className="home-guest-copy">
                                <p className="home-kicker">All Purpose CPQ</p>
                                <h1 className="home-guest-title">
                                    Client Administration Portal
                                </h1>
                                <p className="home-guest-intro">
                                    allows complete configuration of your products or
                                    services to generate quotes and all accompanying
                                    documentation.
                                </p>
                            </div>
                            <div className="home-guest-card">
                                <div className="home-guest-card-title">Get Started</div>
                                <div className="home-guest-login">
                                    <button className="home-primary" type="button" onClick={openLogin}>
                                        Login
                                    </button>
                                    <span>
                                        and <strong>start configuring</strong>
                                    </span>
                                </div>
                                <div className="home-guest-alt">
                                    ...or log in as "guest" to see (and edit) existing
                                    configurations
                                </div>
                                <div className="home-guest-register">
                                    <span className="home-guest-register-text">Need registration?</span>
                                    <span
                                        className="home-text-link"
                                        role="button"
                                        tabIndex={0}
                                        onClick={openRegister}
                                    >
                                        Register here
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="home-guest-features">
                            <div className="home-panel">
                                <h3>Configure Questions</h3>
                                <p>Set up questions with or without list of answers.</p>
                            </div>
                            <div className="home-panel">
                                <h3>Group Products</h3>
                                <p>Set up question groups as components and products.</p>
                            </div>
                            <div className="home-panel">
                                <h3>Generate Documents</h3>
                                <p>Add content for document generation.</p>
                            </div>
                            <div className="home-panel">
                                <h3>Quote Details</h3>
                                <p>Configure quote details.</p>
                            </div>
                            <div className="home-panel">
                                <h3>Test Safely</h3>
                                <p>
                                    Test quotes on your corporate website with special
                                    admin access before making it public.
                                </p>
                            </div>
                        </div>
                    </section>
                )}
            </main>
            {loginOpen && <Login variant="modal" onClose={closeLogin} />}
            {registerOpen && <Register variant="modal" onClose={closeRegister} />}
            <AppFooter />
        </div>
    );
}

export default Home;
