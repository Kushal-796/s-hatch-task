import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Loader2 } from 'lucide-react';

const ProtectedRoute = ({ children }) => {
  const { currentUser, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-deep-night">
        <div className="flex items-center space-x-3">
          <Loader2 className="w-6 h-6 text-sky-blue animate-spin" />
          <span className="text-white-smoke">Loading...</span>
        </div>
      </div>
    );
  }

  return currentUser ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
