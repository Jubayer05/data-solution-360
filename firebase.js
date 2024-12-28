import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';
import { getFirestore } from 'firebase/firestore';
import Swal from 'sweetalert2';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Initialize Firebase app only if it hasn't been initialized already
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app(); // Use the existing app
}

const app = firebase.app(); // Get the initialized app

export const db = getFirestore(app);
export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const handleAuthError = (error) => {
  let errorMessage = '';

  switch (error.code) {
    case 'auth/wrong-password':
      errorMessage = 'The password you entered is incorrect. Please try again.';
      break;
    case 'auth/user-not-found':
      errorMessage =
        'No user found with this email. Please check the email and try again.';
      break;
    case 'auth/invalid-email':
      errorMessage =
        'The email address is not valid. Please enter a valid email.';
      break;
    default:
      errorMessage = 'An unknown error occurred. Please try again later.';
  }

  Swal.fire('Hey!', errorMessage, 'error');
};

export const handleLogout = async () => {
  try {
    await firebase.auth().signOut();
    window.location.href = '/';
  } catch (error) {
    console.error('Error signing out: ', error);
  }
};

export default firebase;
