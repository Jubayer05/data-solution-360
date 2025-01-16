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
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setLoading(true); // Set loading true when processing starts
      if (firebaseUser) {
        try {
          // Query the 'users' collection by email
          const q = query(
            collection(firestore, 'users'),
            where('email', '==', firebaseUser.email),
          );
          const querySnapshot = await getDocs(q);

          if (!querySnapshot.empty) {
            // Assuming only one document matches
            const userData = querySnapshot.docs[0].data();
            // Merge Firestore data with Firebase user object
            setUser({ ...firebaseUser, role: userData.role });
          } else {
            console.warn(
              'No user data found in Firestore for:',
              firebaseUser.email,
            );
            setUser({ ...firebaseUser, role: null });
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
          setUser({ ...firebaseUser, role: null });
        }
      } else {
        setUser(null);
      }

      setLoading(false); // Finish loading
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
