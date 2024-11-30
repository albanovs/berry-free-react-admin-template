import { Navigate } from 'react-router-dom';

const ProtectedRouteGlobal = ({ element }) => {
    const token = JSON.parse(localStorage.getItem("usererp"));

    if (!token) {
        return <Navigate to="/login" replace />;
    }

    return element;
};

export default ProtectedRouteGlobal;
