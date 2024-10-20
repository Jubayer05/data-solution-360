import { deleteDoc, doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../../../firebase';

// Store OTP in Firestore
export const setOtp = async (phoneNumber, otp) => {
  const docRef = doc(db, 'otp_store', phoneNumber); // Phone number as the document ID
  await setDoc(docRef, {
    otp: otp,
    createdAt: new Date(), // Optionally store timestamp
  });
};

// Get OTP from Firestore
export const getOtp = async (phoneNumber) => {
  const docRef = doc(db, 'otp_store', phoneNumber);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data().otp;
  } else {
    return null; // OTP not found
  }
};

// Clear OTP after verification
export const clearOtp = async (phoneNumber) => {
  const docRef = doc(db, 'otp_store', phoneNumber);
  await deleteDoc(docRef); // Delete OTP document after use
};
