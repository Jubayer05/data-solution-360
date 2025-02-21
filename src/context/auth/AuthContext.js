import { collection, getDocs, query, where } from 'firebase/firestore';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import { createContext, useContext, useEffect, useState } from 'react';
import { db } from '../../../firebase';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      const token = Cookies.get('auth_token'); // Read token from cookies
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const decoded = jwtDecode(token);
        let userData = { ...decoded, role: null };

        const q = query(
          collection(db, 'users'),
          where('email', '==', decoded.email),
        );
        const querySnapshot = await getDocs(q); // Await Firestore query

        if (!querySnapshot.empty) {
          const userFirestoreData = querySnapshot.docs[0].data();
          userData = { ...decoded, ...userFirestoreData };
        } else {
          console.warn('No user data found in Firestore for:', decoded.email);
        }

        setUser(userData);
      } catch (error) {
        console.error('Error decoding token or fetching user data:', error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []); // Dependencies kept empty to run only on mount

  const logout = () => {
    Cookies.remove('auth_token');
    setUser(null);
    window.location.reload();
  };

  return (
    <AuthContext.Provider value={{ user, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
