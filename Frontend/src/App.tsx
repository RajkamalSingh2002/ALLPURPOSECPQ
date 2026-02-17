import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home/Home";
import Api from "./pages/Api/Api";
import About from "./pages/About/About";
import Config from "./pages/Config/Config";
import Pricing from "./pages/Pricing/Pricing";
import Questions from "./pages/Config/Questions";
import Rates from "./pages/Config/Rates";
import Wordings from "./pages/Config/Wordings.tsx";
import AppSettings from "./pages/Config/AppSettings";
import FormulaBuilder from "./pages/Config/FormulaBuilder";
import PdfTemplate from "./pages/Config/PdfTemplate";
import Components from "./pages/Config/Components";
import * as authService from "./services/authService";
import { JSX } from "react";

/**
 * Protected Route component
 * Checks if user is authenticated with valid JWT token
 * Redirects to login if not authenticated
 */
function RequireAuth({ children }: { children: JSX.Element }) {
    const isAuthenticated = authService.isLoggedIn();

    if (!isAuthenticated) {
        // Redirect to home with login modal
        return <Navigate to="/?login=1" replace />;
    }

    return children;
}

/**
 * Role-based Protected Route component
 * Checks if user has required roles
 */
function RequireRole({
                         children,
                         requiredRoles,
                     }: {
    children: JSX.Element;
    requiredRoles: string[];
}) {
    const isAuthenticated = authService.isLoggedIn();
    const user = authService.getUser();

    if (!isAuthenticated) {
        return <Navigate to="/?login=1" replace />;
    }

    if (!user || !user.roles) {
        return <Navigate to="/?login=1" replace />;
    }

    const hasRequiredRole = requiredRoles.some((role) =>
        user.roles.includes(role)
    );

    if (!hasRequiredRole) {
        // User doesn't have required role - show unauthorized or redirect to home
        return <Navigate to="/" replace />;
    }

    return children;
}

export default function App() {
    return (
        <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Home forceLoginOpen />} />
            <Route path="/register" element={<Home forceRegisterOpen />} />
            <Route path="/about" element={<About />} />

            {/* Protected Routes */}
            <Route
                path="/api"
                element={
                    <RequireAuth>
                        <Api />
                    </RequireAuth>
                }
            />
            <Route
                path="/pricing"
                element={
                    <RequireAuth>
                        <Pricing />
                    </RequireAuth>
                }
            />

            {/* Config Section - Protected */}
            <Route
                path="/config"
                element={
                    <RequireAuth>
                        <Navigate to="/config/quote-data/products" replace />
                    </RequireAuth>
                }
            />

            {/* Quote Data Section - Protected */}
            <Route
                path="/config/quote-data/products"
                element={
                    <RequireAuth>
                        <Config />
                    </RequireAuth>
                }
            />
            <Route
                path="/config/quote-data/questions"
                element={
                    <RequireAuth>
                        <Questions />
                    </RequireAuth>
                }
            />
            <Route
                path="/config/quote-data/rates"
                element={
                    <RequireAuth>
                        <Rates />
                    </RequireAuth>
                }
            />
            <Route
                path="/config/quote-data/wordings"
                element={
                    <RequireAuth>
                        <Wordings />
                    </RequireAuth>
                }
            />
            <Route
                path="/config/quote-data/components"
                element={
                    <RequireAuth>
                        <Components />
                    </RequireAuth>
                }
            />

            {/* App Settings - Protected */}
            <Route
                path="/config/app-settings"
                element={
                    <RequireAuth>
                        <AppSettings />
                    </RequireAuth>
                }
            />

            {/* User Admin - Admin Only (Optional - if you want role-based access) */}
            <Route
                path="/config/user-admin"
                element={
                    <RequireAuth>
                        <div>User Administration Table</div>
                    </RequireAuth>
                }
            />
            {
            <Route
                path="/config/user-admin"
                element={
                    <RequireRole requiredRoles={["ADMIN", "SUPERADMIN"]}>
                        <div>User Administration Table</div>
                    </RequireRole>
                }
            />
            }
            {/*{Quote Config Section - Protected }*/}
            <Route
                path="/config/quote-config"
                element={
                    <RequireAuth>
                        <Navigate to="/config/quote-config/formula-builder" replace />
                    </RequireAuth>
                }
            />
            <Route
                path="/config/quote-config/formula-builder"
                element={
                    <RequireAuth>
                        <FormulaBuilder />
                    </RequireAuth>
                }
            />
            <Route
                path="/config/quote-config/pdf-template"
                element={
                    <RequireAuth>
                        <PdfTemplate />
                    </RequireAuth>
                }
            />

            {/* Catch-all - redirect to home */}
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    );
}
