import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import * as authService from "../../services/authService";

interface ProtectedRouteProps {
    children: ReactNode;
    requiredRoles?: string[];
}

/**
 * ProtectedRoute component that checks if user is authenticated
 * Redirects to login if user is not logged in
 * Can optionally check for specific roles
 */
function ProtectedRoute({ children, requiredRoles }: ProtectedRouteProps) {
    // Check if user has a valid access token
    const isAuthenticated = authService.isLoggedIn();

    if (!isAuthenticated) {
        // Redirect to login if not authenticated
        return <Navigate to="/login" replace />;
    }

    // If specific roles are required, check if user has them
    if (requiredRoles && requiredRoles.length > 0) {
        const user = authService.getUser();

        if (!user || !user.roles) {
            return <Navigate to="/login" replace />;
        }

        // Check if user has at least one of the required roles
        const hasRequiredRole = requiredRoles.some((role) =>
            user.roles.includes(role)
        );

        if (!hasRequiredRole) {
            // Redirect to unauthorized page or home
            return <Navigate to="/unauthorized" replace />;
        }
    }

    // User is authenticated and has required roles, render the component
    return <>{children}</>;
}

export default ProtectedRoute;
