import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';
import Swal from 'sweetalert2';

const firebaseConfig = {
  apiKey: 'AIzaSyBYRPbYsEBbDIdPcN32JStfomTkcmJJKes',
  authDomain: 'data-solution-360.firebaseapp.com',
  projectId: 'data-solution-360',
  storageBucket: 'data-solution-360.appspot.com',
  messagingSenderId: '14980860098',
  appId: '1:14980860098:web:021631d89050c588e6135b',
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app();
}

export const auth = firebase.auth();

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

export default firebase;
