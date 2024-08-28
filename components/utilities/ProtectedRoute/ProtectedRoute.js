import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useAuth } from '../../../src/context/auth/AuthContext';
// import { useAuth } from '../context/AuthContext';

const ProtectedRoute = (WrappedComponent, accessLevel = 'user') => {
  const HOC = (props) => {
    const { user, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (!loading) {
        if (!user) {
          router.push('/'); // Redirect to login if not authenticated
        } else if (user.role !== accessLevel) {
          router.push('/'); // Redirect to unauthorized page if access level is insufficient
        }
      }
    }, [user, loading, router]);

    if (loading || !user) {
      return <p>Loading...</p>; // Show a loading indicator while checking user
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
