export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { paymentID } = req.body;
  const token = req.headers.authorization?.split(' ')[1]; // Extract Bearer token from headers

  if (!token) {
    return res.status(401).json({ error: 'Token missing or invalid' });
  }

  if (!paymentID) {
    return res.status(400).json({ error: 'paymentID is required' });
  }

  try {
    // Step 1: Call bKash Query Payment API using fetch
    const response = await fetch(
      'https://tokenized.pay.bka.sh/v1.2.0-beta/tokenized/checkout/payment/status',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${token}`, // Use the valid token
          'X-APP-Key': process.env.BKASH_APP_KEY, // Your bKash app key
        },
        body: JSON.stringify({ paymentID }), // Send paymentID as body
      },
    );

    // Check if the response is successful
    if (!response.ok) {
      const errorData = await response.json();
      console.log('Error in payment status:', errorData);
      return res.status(400).json({
        error: 'Failed to retrieve payment status',
        details: errorData,
      });
    }

    // Parse the response data
    const paymentStatus = await response.json();
    console.log('Payment status response:', paymentStatus); // Log the response for debugging

    // Step 3: Check and return payment status
    if (paymentStatus.statusCode === '0000') {
      if (paymentStatus.transactionStatus === 'Completed') {
        return res
          .status(200)
          .json({ message: 'Payment completed', paymentStatus });
      } else if (paymentStatus.transactionStatus === 'Initiated') {
        return res
          .status(200)
          .json({ message: 'Payment initiated', paymentStatus });
      } else {
        return res
          .status(400)
          .json({ message: 'Unknown payment status', paymentStatus });
      }
    } else {
      console.log('Error in payment status:', paymentStatus);
      return res
        .status(400)
        .json({ error: 'Failed to retrieve payment status', paymentStatus });
    }
  } catch (error) {
    console.error('Error querying payment status:', error.message);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
