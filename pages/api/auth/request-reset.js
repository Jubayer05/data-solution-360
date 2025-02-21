import jwt from 'jsonwebtoken';
import { dbAdmin } from '../../../lib/firebaseAdmin';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { email } = req.body;

  try {
    // Check if user exists
    const usersRef = dbAdmin.collection('users');
    const snapshot = await usersRef.where('email', '==', email).get();

    if (snapshot.empty) {
      return res.status(400).json({ message: 'User not found' });
    }
    console.log(usersRef);

    // Generate reset token
    const resetToken = jwt.sign(
      { email, purpose: 'password_reset' },
      process.env.JWT_SECRET,
      { expiresIn: '1h' },
    );

    // Store reset token and expiry in Firestore
    const userDoc = snapshot.docs[0];
    await userDoc.ref.update({
      resetToken,
      resetTokenExpiry: new Date(Date.now() + 3600000), // 1 hour from now
    });

    // In a real application, you would send this token via email
    // For demo purposes, we'll just return it in the response
    return res.status(200).json({
      message: 'Password reset token generated',
      resetToken,
    });
  } catch (error) {
    return res.status(500).json({ message: 'Something went wrong', error });
  }
}
