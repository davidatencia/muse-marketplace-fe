import { Navigate, Outlet } from 'react-router';
import { getAccessToken } from '@shared/api/tokenStorage';

function ProtectedRoute() {
  const accessToken = getAccessToken();

  if (!accessToken) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}

export default ProtectedRoute;
