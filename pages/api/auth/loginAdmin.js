import { serialize } from 'cookie';
import jwt from 'jsonwebtoken';

export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ message: 'Email is required' });
  }

  // Generate a JWT token
  const token = jwt.sign({ email }, process.env.JWT_SECRET, {
    expiresIn: '24h',
  });

  // Set token in an HTTP-only cookie
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

  return res.status(200).json({ message: 'Token set in cookie' });
}
