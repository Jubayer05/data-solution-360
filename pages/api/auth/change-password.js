import { serialize } from 'cookie';
import { comparePassword, hashPassword } from '../../../lib/auth';
import { dbAdmin } from '../../../lib/firebaseAdmin';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { email, currentPassword, newPassword } = req.body;

  try {
    // Validate input
    if (!email || !currentPassword || !newPassword) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Check if user exists
    const usersRef = dbAdmin.collection('users');
    const snapshot = await usersRef.where('email', '==', email).get();

    if (snapshot.empty) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const userDoc = snapshot.docs[0];
    const userData = userDoc.data();

    // Compare current password
    const isValid = await comparePassword(currentPassword, userData.password);
    if (!isValid) {
      return res.status(400).json({ message: 'Invalid current password' });
    }

    // Hash new password
    const hashedPassword = await hashPassword(newPassword);

    // Update password in Firestore
    await usersRef.doc(userDoc.id).update({ password: hashedPassword });

    // Clear authentication cookie (forcing re-login)
    res.setHeader(
      'Set-Cookie',
      serialize('auth_token', '', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        path: '/',
        maxAge: 0,
      }),
    );

    return res
      .status(200)
      .json({ message: 'Password changed successfully. Please log in again.' });
  } catch (error) {
    console.log('ERROR ============>', error);
    return res.status(500).json({ message: 'Something went wrong', error });
  }
}
