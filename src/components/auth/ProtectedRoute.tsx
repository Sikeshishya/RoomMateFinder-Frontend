import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

interface ProtectedRouteProps {
  redirectPath?: string;
  requireAdmin?: boolean;
}

export default function ProtectedRoute({ 
  redirectPath = '/login',
  requireAdmin = false
}: ProtectedRouteProps) {
  const { isAuthenticated, isAdmin, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-roommate-600"></div>
      </div>
    );
  }
  
  if (!isAuthenticated()) {
    return <Navigate to={redirectPath} replace />;
  }
  
  if (requireAdmin && !isAdmin()) {
    return <Navigate to="/dashboard" replace />;
  }
  
  return <Outlet />;
}
