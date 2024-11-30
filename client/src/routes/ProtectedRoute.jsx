import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = ({ allowedRoles, element }) => {
    const token = JSON.parse(localStorage.getItem("usererp"));

    if (!token) {
        return <Navigate to="login" replace />;
    }

    if (allowedRoles && !allowedRoles.includes(token?.role)) {
    return <Navigate to="403" replace />;
    }

    return element;
};

export default ProtectedRoute;
