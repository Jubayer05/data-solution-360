export default async function createPayment(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { amount, additionalInfo, token } = req.body;

  // Validate amount
  if (!amount || isNaN(amount)) {
    return res.status(400).json({ error: 'Invalid amount' });
  }

  try {
    // Create payment request data
    const paymentData = {
      mode: '0011',
      payerReference: ' ',
      callbackURL: `${req.headers.origin}/bkash/callback`,
      amount: '1', // Replace '1' with amount.toString() if using dynamic amounts
      additionalInfo: JSON.stringify(additionalInfo),
      currency: 'BDT',
      intent: 'sale',
      merchantInvoiceNumber: `Inv-${Date.now()}`,
    };

    // Make request to bKash create payment API using fetch
    const response = await fetch(
      'https://tokenized.pay.bka.sh/v1.2.0-beta/tokenized/checkout/create',
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'X-APP-Key': process.env.APP_KEY, // Add the X-APP-Key header
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(paymentData),
      },
    );

    // Check if the response is successful
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        `Failed to create payment: ${errorData.message || 'Unknown error'}`,
      );
    }

    // Parse the response data
    const responseData = await response.json();
    console.log('Create Payment response:', responseData);

    // Send the response back to the client
    res.status(200).json(responseData);
  } catch (error) {
    console.error('Error creating payment:', error.message);
    res.status(500).json({
      error: 'Failed to create payment',
      details: error.message,
    });
  }
}
