import { hashPassword } from '../../../lib/auth';
import { dbAdmin } from '../../../lib/firebaseAdmin';

export default async function handler(req, res) {
  if (req.method !== 'POST')
    return res.status(405).json({ message: 'Method Not Allowed' });

  const { email, password, phoneNumber, fullName, student_id, createdAt } =
    req.body;

  console.log(email, password, phoneNumber, fullName, student_id);

  try {
    // Check if user already exists
    const usersRef = dbAdmin.collection('users');
    const snapshot = await usersRef.where('email', '==', email).get();
    if (!snapshot.empty) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Save user to Firestore
    await usersRef.add({
      email,
      password: hashedPassword,
      full_name: fullName,
      phone: phoneNumber,
      role: 'student',
      student_id,
      enrolled_courses: [],
      createdAt: new Date().toISOString(),
    });

    return res.status(201).json({ message: 'User registered successfully!' });
  } catch (error) {
    return res.status(500).json({ message: 'Something went wrong', error });
  }
}
