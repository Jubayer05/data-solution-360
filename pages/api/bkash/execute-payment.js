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
    // Make the request to the bKash execute payment API using fetch
    const response = await fetch(
      'https://tokenized.pay.bka.sh/v1.2.0-beta/tokenized/checkout/execute',
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`, // Use the token here
          'X-APP-Key': process.env.BKASH_APP_KEY,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ paymentID }), // Send the payment ID as body
      },
    );

    // Check if the response is successful
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        `Failed to execute payment: ${errorData.message || 'Unknown error'}`,
      );
    }

    // Parse the response data
    const responseData = await response.json();

    // Send the response back to the client
    res.status(200).json(responseData);
  } catch (error) {
    console.error('Execute Payment Error:', error.message);
    res.status(500).json({ error: error.message });
  }
}
