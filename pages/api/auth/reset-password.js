import jwt from 'jsonwebtoken';
import { hashPassword } from '../../../lib/auth';
import { dbAdmin } from '../../../lib/firebaseAdmin';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { resetToken, newPassword } = req.body;

  try {
    // Verify token
    const decoded = jwt.verify(resetToken, process.env.JWT_SECRET);
    if (!decoded.purpose || decoded.purpose !== 'password_reset') {
      return res.status(400).json({ message: 'Invalid reset token' });
    }

    // Find user with this token
    const usersRef = dbAdmin.collection('users');
    const snapshot = await usersRef
      .where('resetToken', '==', resetToken)
      .where('email', '==', decoded.email)
      .get();

    if (snapshot.empty) {
      return res
        .status(400)
        .json({ message: 'Invalid or expired reset token' });
    }

    const userDoc = snapshot.docs[0];
    const userData = userDoc.data();

    // Check if token has expired
    if (userData.resetTokenExpiry.toDate() < new Date()) {
      return res.status(400).json({ message: 'Reset token has expired' });
    }

    // Hash new password
    const hashedPassword = await hashPassword(newPassword);

    // Update password and clear reset token
    await userDoc.ref.update({
      password: hashedPassword,
      resetToken: null,
      resetTokenExpiry: null,
      updatedAt: new Date(),
    });

    return res.status(200).json({ message: 'Password reset successful' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Something went wrong', error });
  }
}
