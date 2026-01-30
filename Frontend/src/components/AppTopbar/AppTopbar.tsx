import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import logoAllCpq from "../../assets/logo_allCPQ.png";
import "../../pages/Config/Config.css";
import { isLoggedIn, setLoggedIn } from "../../services/auth";

function AppTopbar() {
    const location = useLocation();
    const isConfig = location.pathname.startsWith("/config");
    const [loggedIn, setLoggedInState] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const navigate = useNavigate();
    const navClass = ({ isActive }: { isActive: boolean }) =>
        `config-nav-link${isActive ? " config-nav-active" : ""}`;

    useEffect(() => {
        setLoggedInState(isLoggedIn());
        setMenuOpen(false);
    }, [location.pathname]);

    const handleSignOut = () => {
        setLoggedIn(false);
        setLoggedInState(false);
        setMenuOpen(false);
        navigate("/");
    };

    return (
        <header className="config-topbar">
            <div className="config-brand">
                <img src={logoAllCpq} alt="AllCPQ logo" />
            </div>
            <nav className="config-nav">
                <NavLink className={navClass} to="/">
                    Home
                </NavLink>
                {loggedIn && (
                    <NavLink
                        className={`config-nav-link${isConfig ? " config-nav-active" : ""}`}
                        to="/config/product"
                    >
                        Config <span className="config-caret">▾</span>
                    </NavLink>
                )}
                {loggedIn && (
                    <NavLink className={navClass} to="/api">
                        API
                    </NavLink>
                )}
                <NavLink className={navClass} to="/about">
                    About
                </NavLink>
            </nav>
            {loggedIn && (
                <div className="config-user">
                    <button
                        className="config-user-button"
                        type="button"
                        onClick={() => setMenuOpen((prev) => !prev)}
                    >
                        <span className="config-avatar">AU</span>
                        <span>Admin User</span>
                        <span className="config-caret">▾</span>
                    </button>
                    {menuOpen && (
                        <div className="config-user-menu">
                            <button type="button" onClick={() => navigate("/")}>
                                Dashboard
                            </button>
                            <button type="button">Profile</button>
                            <button type="button">Settings</button>
                            <button type="button" onClick={handleSignOut}>
                                Sign out
                            </button>
                        </div>
                    )}
                </div>
            )}
        </header>
    );
}

export default AppTopbar;
