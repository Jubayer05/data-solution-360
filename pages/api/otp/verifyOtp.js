import { clearOtp, getOtp } from './otpStore';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { phoneNumber, inputOtp } = req.body;

    const storedOtp = await getOtp(phoneNumber); // Retrieve OTP from Firestore

    if (!storedOtp) {
      return res.status(400).json({ message: 'OTP not found or expired' });
    }

    if (parseInt(inputOtp) === parseInt(storedOtp)) {
      await clearOtp(phoneNumber); // Clear OTP after successful verification
      return res.status(200).json({ message: 'OTP verified successfully!' });
    } else {
      return res.status(400).json({ message: 'Invalid OTP' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
