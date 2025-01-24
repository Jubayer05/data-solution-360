import firebase from '../../../firebase';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { phoneNumberEmail, newPassword } = req.body;

  try {
    // Verify the phone number is associated with an existing account
    const userRecord = await firebase
      .auth()
      .fetchSignInMethodsForEmail(phoneNumberEmail);

    if (userRecord.length === 0) {
      return res.status(404).json({ message: 'No account found' });
    }

    // Reauthenticate and update password
    const user = await firebase
      .auth()
      .signInWithEmailAndPassword(phoneNumberEmail, newPassword);

    await user.user.updatePassword(newPassword);

    return res.status(200).json({ message: 'Password reset successfully' });
  } catch (error) {
    console.error('Password reset error:', error);
    return res
      .status(500)
      .json({ message: 'Password reset failed', error: error.message });
  }
}
