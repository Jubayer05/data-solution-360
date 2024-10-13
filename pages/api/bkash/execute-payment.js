import axios from 'axios';
import getGrantToken from './grant-token';

export default async function executePayment(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { paymentID } = req.body; // Get payment ID from the request
  try {
    const token = await getGrantToken(); // Call the function to get grant token

    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BKASH_EXECUTE_PAYMENT_URL}`,
      {
        paymentID,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
