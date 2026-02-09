import { ReactNode, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import AppTopbar from "../../components/AppTopbar/AppTopbar.tsx";
import AppFooter from "../../components/AppFooter/AppFooter.tsx";
import "./Config.css";

type ConfigSideType = "app-settings" | "quote-data" | "quote-config" | "user-admin";
type QuoteDataTab = "products" | "components" | "questions" | "rates" | "wordings";
type QuoteConfigTab = "formula-builder" | "pdf-template";

type ConfigLayoutProps = {
    title: string;
    children: ReactNode;
    activeSide?: ConfigSideType;
    activeTab?: QuoteDataTab;
    activeQuoteConfigTab?: QuoteConfigTab;
};

function ConfigLayout({
    title,
    children,
    activeSide,
    activeTab,
    activeQuoteConfigTab
}: ConfigLayoutProps) {
    const [quoteDataOpen, setQuoteDataOpen] = useState(activeSide === "quote-data");
    const [quoteConfigOpen, setQuoteConfigOpen] = useState(activeSide === "quote-config");

    useEffect(() => {
        if (activeSide === "quote-data") {
            setQuoteDataOpen(true);
        }
        if (activeSide === "quote-config") {
            setQuoteConfigOpen(true);
        }
    }, [activeSide]);

    return (
        <div className="config-page">
            <AppTopbar />
            <div className="config-body">
                <aside className="config-sidebar">
                    <NavLink
                        className={`config-side-link${activeSide === "app-settings" ? " config-side-active" : ""}`}
                        to="/config/app-settings"
                    >
                        APP Settings
                    </NavLink>

                    <button
                        className={`config-side-group-toggle${activeSide === "quote-data" ? " config-side-active" : ""}`}
                        type="button"
                        onClick={() => setQuoteDataOpen((open) => !open)}
                    >
                        <span>Quote Data</span>
                        <span className={`config-side-caret${quoteDataOpen ? " config-side-caret-open" : ""}`}>▾</span>
                    </button>
                    {quoteDataOpen && (
                        <div className="config-side-submenu">
                            <NavLink className={`config-side-sub-link${activeTab === "products" ? " config-side-sub-active" : ""}`} to="/config/quote-data/products">Products</NavLink>
                            <NavLink className={`config-side-sub-link${activeTab === "components" ? " config-side-sub-active" : ""}`} to="/config/quote-data/components">Components</NavLink>
                            <NavLink className={`config-side-sub-link${activeTab === "questions" ? " config-side-sub-active" : ""}`} to="/config/quote-data/questions">Questions</NavLink>
                            <NavLink className={`config-side-sub-link${activeTab === "rates" ? " config-side-sub-active" : ""}`} to="/config/quote-data/rates">Rates</NavLink>
                            <NavLink className={`config-side-sub-link${activeTab === "wordings" ? " config-side-sub-active" : ""}`} to="/config/quote-data/wordings">Wordings</NavLink>
                        </div>
                    )}

                    <button
                        className={`config-side-group-toggle${activeSide === "quote-config" ? " config-side-active" : ""}`}
                        type="button"
                        onClick={() => setQuoteConfigOpen((open) => !open)}
                    >
                        <span>Quote Configuration</span>
                        <span className={`config-side-caret${quoteConfigOpen ? " config-side-caret-open" : ""}`}>▾</span>
                    </button>
                    {quoteConfigOpen && (
                        <div className="config-side-submenu">
                            <NavLink className={`config-side-sub-link${activeQuoteConfigTab === "formula-builder" ? " config-side-sub-active" : ""}`} to="/config/quote-config/formula-builder">Formula Builder</NavLink>
                            <NavLink className={`config-side-sub-link${activeQuoteConfigTab === "pdf-template" ? " config-side-sub-active" : ""}`} to="/config/quote-config/pdf-template">PDF Template</NavLink>
                        </div>
                    )}

                    <NavLink
                        className={`config-side-link${activeSide === "user-admin" ? " config-side-active" : ""}`}
                        to="/config/user-admin"
                    >
                        User Administration
                    </NavLink>
                </aside>

                <main className="config-main">
                    <div className="config-header">
                        <h1>{title}</h1>
                    </div>
                    {children}
                </main>
            </div>
            <AppFooter />
        </div>
    );
}

export default ConfigLayout;
