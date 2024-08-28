import { onAuthStateChanged } from 'firebase/auth';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { createContext, useContext, useEffect, useState } from 'react';
import { auth, firestore } from '../../../firebase'; // Ensure firebase is configured properly

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          // Query the 'users' collection by email
          const q = query(
            collection(firestore, 'users'),
            where('email', '==', user.email),
          );
          const querySnapshot = await getDocs(q);

          if (!querySnapshot.empty) {
            const userData = querySnapshot.docs[0].data(); // Assuming only one document per email
            setUser({ ...user, role: userData.role });
          } else {
            setUser({ ...user, role: null }); // No user data found
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
          setUser({ ...user, role: null });
        }
      } else {
        setUser(null); // No user logged in
      }

      setLoading(false); // Finish loading after fetching data
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
