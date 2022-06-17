import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBYRPbYsEBbDIdPcN32JStfomTkcmJJKes",
  authDomain: "data-solution-360.firebaseapp.com",
  projectId: "data-solution-360",
  storageBucket: "data-solution-360.appspot.com",
  messagingSenderId: "14980860098",
  appId: "1:14980860098:web:021631d89050c588e6135b",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app();
}

export default firebase;
