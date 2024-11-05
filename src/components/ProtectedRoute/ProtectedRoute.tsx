import {Navigate} from "react-router-dom";
import React from "react";

interface ProtectedRouteProps {
    children: React.ReactNode;
    isAllowed: boolean;
}

function ProtectedRoute({ children, isAllowed }:ProtectedRouteProps) {
    if (!isAllowed) {
        return <Navigate to="/login" replace />;
    }
    return <>{children}</>;
}

export default ProtectedRoute;
