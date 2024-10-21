import axios from 'axios';

export default async function executePayment(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { paymentID } = JSON.parse(req.body); // Get payment ID from the request
  const token = req.headers.authorization?.split(' ')[1]; // Extract Bearer token from headers

  if (!token) {
    return res.status(401).json({ error: 'Token missing or invalid' });
  }

  try {
    const response = await axios.post(
      `${process.env.EXECUTE_PAYMENT_URL}`,
      { paymentID },
      {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`, // Use the token here
          'X-APP-Key': process.env.APP_KEY,
        },
      },
    );

    console.log('Execute Payment:', response.data);
    res.status(200).json(response.data);
  } catch (error) {
    console.error(
      'Execute Payment Error:',
      error.response?.data || error.message,
    );
    res.status(500).json({ error: error.response?.data || error.message });
  }
}
