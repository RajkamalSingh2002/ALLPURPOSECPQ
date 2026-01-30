import { ReactNode } from "react";
import { NavLink } from "react-router-dom";
import AppTopbar from "../../components/AppTopbar/AppTopbar";
import "./Config.css";

type ConfigLayoutProps = {
    title: string;
    children: ReactNode;
    activeSide?: "app-settings" | "question-items" | "rates" | "product-grouping" | "package-offered";
    activeTab?: "product" | "questions" | "rates" | "documents";
};

function ConfigLayout({ title, children, activeSide, activeTab }: ConfigLayoutProps) {
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
                    <NavLink
                        className={`config-side-link${activeSide === "question-items" ? " config-side-active" : ""}`}
                        to="/config/question-items"
                    >
                        Question Items
                    </NavLink>
                    <NavLink
                        className={`config-side-link${activeSide === "rates" ? " config-side-active" : ""}`}
                        to="/config/rates-library"
                    >
                        Rates
                    </NavLink>
                    <NavLink
                        className={`config-side-link${activeSide === "product-grouping" ? " config-side-active" : ""}`}
                        to="/config/product-grouping"
                    >
                        Product Grouping
                    </NavLink>
                    <NavLink
                        className={`config-side-link${activeSide === "package-offered" ? " config-side-active" : ""}`}
                        to="/config/package-offered"
                    >
                        Package Offered
                    </NavLink>
                </aside>

                <main className="config-main">
                    <div className="config-header">
                        <h1>{title}</h1>
                        <div className="config-status">
                            <span className="config-status-dot" />
                            All Changes Saved
                        </div>
                    </div>

                    <div className="config-tabs">
                        <NavLink
                            className={`config-tab${activeTab === "product" ? " config-tab-active" : ""}`}
                            to="/config/product"
                        >
                            Product
                        </NavLink>
                        <NavLink
                            className={`config-tab${activeTab === "questions" ? " config-tab-active" : ""}`}
                            to="/config/questions"
                        >
                            Questions
                        </NavLink>
                        <NavLink
                            className={`config-tab${activeTab === "rates" ? " config-tab-active" : ""}`}
                            to="/config/rates"
                        >
                            Rates
                        </NavLink>
                        <NavLink
                            className={`config-tab${activeTab === "documents" ? " config-tab-active" : ""}`}
                            to="/config/documents"
                        >
                            Documents
                        </NavLink>
                    </div>

                    {children}
                </main>
            </div>
        </div>
    );
}

export default ConfigLayout;
