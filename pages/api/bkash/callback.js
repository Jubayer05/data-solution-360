import axios from 'axios';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { paymentID, status } = req.query;

  try {
    // Step 1: Validate the payment status
    if (status === 'success') {
      // Step 2: Call bKash's payment verification API to confirm the payment
      const verifyResponse = await axios.post(
        process.env.NEXT_PUBLIC_BKASH_VERIFY_PAYMENT_URL,
        { paymentID },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_BKASH_TOKEN}`,
          },
        },
      );

      const verifyData = verifyResponse.data;

      console.log(verifyData);

      if (verifyData.status === 'Completed') {
        // Step 3: Structure the response object
        const response = {
          paymentId: verifyData.paymentID || paymentID,
          createTime: verifyData.createTime || new Date().toISOString(),
          orgLogo: verifyData.orgLogo || '/logo/logo_updated.png',
          orgName: verifyData.orgName || 'Data',
          transactionStatus: verifyData.transactionStatus || 'Completed',
          amount: verifyData.amount || 'Unknown',
          currency: verifyData.currency || 'BDT',
          intent: verifyData.intent || 'sale',
          merchantInvoiceNumber: verifyData.merchantInvoiceNumber || 'Unknown',
          additionalInfo: JSON.parse(additionalInfo),
        };

        // Send the structured response
        return res.status(200).json(response);
      } else {
        return res
          .status(400)
          .json({ error: 'Payment verification failed', verifyData });
      }
    } else {
      return res.status(400).json({ error: 'Payment was not successful' });
    }
  } catch (error) {
    console.error('Error during payment verification:', error.message);
    res.status(500).json({ error: 'Failed to verify payment' });
  }
}
