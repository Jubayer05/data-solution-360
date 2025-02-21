import { serialize } from 'cookie';
import jwt from 'jsonwebtoken';
import { comparePassword } from '../../../lib/auth';
import { dbAdmin } from '../../../lib/firebaseAdmin';

export default async function handler(req, res) {
  if (req.method !== 'POST')
    return res.status(405).json({ message: 'Method Not Allowed' });

  const { email, password } = req.body;

  try {
    // Check if user exists
    const usersRef = dbAdmin.collection('users');
    const snapshot = await usersRef.where('email', '==', email).get();

    if (snapshot.empty) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const userData = snapshot.docs[0].data();

    // Compare passwords
    const isValid = await comparePassword(password, userData.password);
    if (!isValid) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign({ email }, process.env.JWT_SECRET, {
      expiresIn: '24h',
    });

    // Set cookie for authentication
    res.setHeader(
      'Set-Cookie',
      serialize('auth_token', token, {
        // httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        path: '/',
        maxAge: 86400, // 24 hours
      }),
    );

    return res.status(200).json({ message: 'Login successful!' });
  } catch (error) {
    console.log('ERROR ============> ' + error);
    return res.status(500).json({ message: 'Something went wrong 22', error });
  }
}
