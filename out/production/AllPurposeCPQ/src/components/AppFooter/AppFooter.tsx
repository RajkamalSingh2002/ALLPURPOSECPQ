import "./AppFooter.css";
import logoAllCpq from "../../assets/logo_allCPQ.png";

function AppFooter() {
    return (
        <footer className="app-footer">
            <img src={logoAllCpq} alt="AllCPQ logo" className="app-footer-logo" />
            <span className="app-footer-text">All Purpose CPQ</span>
        </footer>
    );
}

export default AppFooter;
