import jwt from 'jsonwebtoken';

export const authenticateUser = (req) => {
  try {
    const token = req.cookies.auth_token;
    if (!token) return null;

    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    return null;
  }
};
