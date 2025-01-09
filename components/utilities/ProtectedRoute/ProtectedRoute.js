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
    const { user, loading } = useAuth();
    console.log(user);
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
      if (!loading) {
        if (!user) {
          router.push('/'); // Redirect to login if not authenticated
        } else if (!allowedRoles.includes(user.role)) {
          router.push('/unauthorized'); // Redirect to unauthorized page
        } else {
          setIsAuthenticated(true); // Authentication successful
        }
      }
    }, [user, loading, router, allowedRoles]); // Add allowedRoles as a dependency

    if (loading || !isAuthenticated) {
      return <PageSkeleton />; // Show a loading indicator
    }

    return <WrappedComponent {...props} />;
  };

  // Adding displayName to the HOC for better debugging in React DevTools
  HOC.displayName = `ProtectedRoute(${
    WrappedComponent.displayName || WrappedComponent.name || 'Component'
  })`;

  return HOC;
};

export default ProtectedRoute;
