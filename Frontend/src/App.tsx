import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Home from "./pages/Home/Home";
import Api from "./pages/Api/Api";
import About from "./pages/About/About";
import Config from "./pages/Config/Config";
import Questions from "./pages/Config/Questions";
import Rates from "./pages/Config/Rates";
import Documents from "./pages/Config/Documents";
import AppSettings from "./pages/Config/AppSettings";
import QuestionItems from "./pages/Config/QuestionItems";
import RatesLibrary from "./pages/Config/RatesLibrary";
import ProductGrouping from "./pages/Config/ProductGrouping";
import PackageOffered from "./pages/Config/PackageOffered";
import { isLoggedIn } from "./services/auth";

function RequireAuth({ children }: { children: JSX.Element }) {
    return isLoggedIn() ? children : <Navigate to="/login" replace />;
}

export default function App() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
                path="/api"
                element={
                    <RequireAuth>
                        <Api />
                    </RequireAuth>
                }
            />
            <Route path="/about" element={<About />} />
            <Route
                path="/config"
                element={
                    <RequireAuth>
                        <Navigate to="/config/product" replace />
                    </RequireAuth>
                }
            />
            <Route
                path="/config/product"
                element={
                    <RequireAuth>
                        <Config />
                    </RequireAuth>
                }
            />
            <Route
                path="/config/questions"
                element={
                    <RequireAuth>
                        <Questions />
                    </RequireAuth>
                }
            />
            <Route
                path="/config/rates"
                element={
                    <RequireAuth>
                        <Rates />
                    </RequireAuth>
                }
            />
            <Route
                path="/config/documents"
                element={
                    <RequireAuth>
                        <Documents />
                    </RequireAuth>
                }
            />
            <Route
                path="/config/app-settings"
                element={
                    <RequireAuth>
                        <AppSettings />
                    </RequireAuth>
                }
            />
            <Route
                path="/config/question-items"
                element={
                    <RequireAuth>
                        <QuestionItems />
                    </RequireAuth>
                }
            />
            <Route
                path="/config/rates-library"
                element={
                    <RequireAuth>
                        <RatesLibrary />
                    </RequireAuth>
                }
            />
            <Route
                path="/config/product-grouping"
                element={
                    <RequireAuth>
                        <ProductGrouping />
                    </RequireAuth>
                }
            />
            <Route
                path="/config/package-offered"
                element={
                    <RequireAuth>
                        <PackageOffered />
                    </RequireAuth>
                }
            />

            {/* optional: redirect unknown routes */}
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    );
}
