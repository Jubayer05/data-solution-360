import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import 'react-loading-skeleton/dist/skeleton.css';
import { useAuth } from '../../../src/context/auth/AuthContext';
import PageSkeleton from './LoadingPage';

const ProtectedRoute = (
  WrappedComponent,
  allowedRoles = ['user', 'content_manager'],
) => {
  const HOC = (props) => {
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // Add error handling for useAuth
    const auth = useAuth();
    const user = auth?.user;
    const loading = auth?.loading ?? true; // Default to true if undefined

    useEffect(() => {
      if (!loading) {
        if (!user) {
          router.push('/');
        } else if (!allowedRoles.includes(user.role)) {
          router.push('/unauthorized');
        } else {
          setIsAuthenticated(true);
        }
      }
    }, [user, loading, router, allowedRoles]);

    if (loading || !isAuthenticated) {
      return <PageSkeleton />;
    }

    return <WrappedComponent {...props} />;
  };

  HOC.displayName = `ProtectedRoute(${
    WrappedComponent.displayName || WrappedComponent.name || 'Component'
  })`;

  return HOC;
};

export default ProtectedRoute;
