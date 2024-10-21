import { setOtp } from './otpStore';

const generateOtp = () => {
  return Math.floor(100000 + Math.random() * 900000); // 6-digit OTP
};

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { phoneNumber } = req.body;

    const otp = generateOtp(); // Generate a new OTP
    await setOtp(phoneNumber, otp); // Store OTP in Firestore

    const message = `Your Data Solution 360 account verification code is ${otp}. The code will expire in 2 minutes.`;
    const apiUrl = 'http://bulksmsbd.net/api/smsapi';

    try {
      const response = await fetch(
        `${apiUrl}?api_key=GD42SGxtuPyeFjwFJtns&type=text&number=${phoneNumber}&senderid=8809617621561&message=${encodeURIComponent(
          message,
        )}`,
      );

      if (!response.ok) {
        throw new Error('Failed to send OTP');
      }

      res.status(200).json({ message: 'OTP sent to your phone!' });
    } catch (error) {
      res
        .status(500)
        .json({ message: 'Error sending OTP', error: error.message });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
