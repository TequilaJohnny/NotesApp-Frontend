import { Navigate, Outlet } from "react-router-dom";

type Props = {
    isAllowed?: boolean;
    redirectPath: string;
};

const ProtectedRoute = ({ isAllowed, redirectPath }: Props) => {
    if (!isAllowed) {
        return <Navigate to={redirectPath} />;
    }
    return <Outlet />;
};

export default ProtectedRoute;