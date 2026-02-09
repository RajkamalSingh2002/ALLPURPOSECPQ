import { Routes, Route, Navigate } from "react-router-dom";
// import Register from "./pages/Register/Register";
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
import { isLoggedIn } from "./services/auth";
import {JSX} from "react";

function RequireAuth({ children }: { children: JSX.Element }) {
    return isLoggedIn() ? children : <Navigate to="/?login=1" replace />;
}

export default function App() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Home forceLoginOpen />} />
            <Route path="/register" element={<Home forceRegisterOpen />} />
            <Route path="/api" element={<RequireAuth><Api /></RequireAuth>} />
            <Route path="/about" element={<About />} />
            <Route
                path="/pricing"
                element={
                    <RequireAuth>
                        <Pricing />
                    </RequireAuth>
                }
            />
            {/* Base Config redirect to the first item in Quote Data */}
            <Route path="/config" element={<RequireAuth><Navigate to="/config/quote-data/products" replace /></RequireAuth>} />

            {/* Quote Data Section */}
            <Route path="/config/quote-data/products" element={<RequireAuth><Config /></RequireAuth>} />
            <Route path="/config/quote-data/questions" element={<RequireAuth><Questions /></RequireAuth>} />
            <Route path="/config/quote-data/rates" element={<RequireAuth><Rates /></RequireAuth>} />
            <Route path="/config/quote-data/wordings" element={<RequireAuth><Wordings /></RequireAuth>} />
            <Route path="/config/quote-data/components" element={<RequireAuth><Components /></RequireAuth>} />

            {/* Primary Navigation Sections */}
            <Route path="/config/app-settings" element={<RequireAuth><AppSettings /></RequireAuth>} />
            <Route path="/config/user-admin" element={<RequireAuth><div>User Administration Table</div></RequireAuth>} />
            <Route path="/config/quote-config" element={<RequireAuth><Navigate to="/config/quote-config/formula-builder" replace /></RequireAuth>} />
            <Route path="/config/quote-config/formula-builder" element={<RequireAuth><FormulaBuilder /></RequireAuth>} />
            <Route path="/config/quote-config/pdf-template" element={<RequireAuth><PdfTemplate /></RequireAuth>} />

            {/* Catch-all */}
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    );
}
