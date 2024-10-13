import axios from 'axios';

export default async function createPayment(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { amount, additionalInfo } = req.body;

  // Validate amount
  if (!amount || isNaN(amount)) {
    return res.status(400).json({ error: 'Invalid amount' });
  }

  try {
    // Fetch the grant token
    const tokenResponse = await fetch(
      `${req.headers.origin}/api/bkash/grant-token`,
      {
        method: 'POST',
      },
    );

    if (!tokenResponse.ok) {
      throw new Error('Failed to fetch grant token');
    }

    const tokenData = await tokenResponse.json();
    const token = tokenData.id_token || tokenData.token;

    console.log('Token:', token);

    // Create payment request to bKash API
    const paymentData = {
      mode: '0011',
      payerReference: ' ',
      callbackURL: `${req.headers.origin}/bkash/callback`,
      amount: '1',
      additionalInfo: JSON.stringify(additionalInfo),
      // amount: amount.toString(),
      currency: 'BDT',
      intent: 'sale',
      merchantInvoiceNumber: `Inv-${Date.now()}`,
    };

    // Make request to bKash create payment API
    const response = await axios.post(
      process.env.NEXT_PUBLIC_BKASH_CREATE_PAYMENT_URL,
      paymentData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'X-APP-Key': process.env.NEXT_PUBLIC_BKASH_APP_KEY, // Add the X-APP-Key header
          'Content-Type': 'application/json',
        },
      },
    );

    // Send the response back to the client
    res.status(200).json(response.data);
  } catch (error) {
    console.error(
      'Error creating payment:',
      error.response?.data || error.message,
    );
    res.status(500).json({
      error: 'Failed to create payment',
      details: error.response?.data || error.message,
    });
  }
}
