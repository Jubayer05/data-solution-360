export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { paymentID, status } = req.query;

  // Log the received paymentID and status for debugging
  console.log('Received paymentID:', paymentID);
  console.log('Payment status:', status);

  // Check if the payment was successful
  if (status === 'success') {
    // Payment was successful
    // Here, you can store the payment details or perform any other necessary actions.

    return res.status(200).json({ message: 'Payment successful', paymentID });
  } else {
    // Payment was not successful
    console.log('Payment was not successful');
    return res.status(400).json({ error: 'Payment was not successful' });
  }
}
