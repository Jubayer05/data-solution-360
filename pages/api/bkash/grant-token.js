export default async function getGrantToken(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const response = await fetch(
      'https://tokenized.pay.bka.sh/v1.2.0-beta/tokenized/checkout/token/grant',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          username: process.env.MERCHANT_ID, // Add username to headers
          password: process.env.PASSWORD, // Add password to headers
        },
        body: JSON.stringify({
          app_key: process.env.APP_KEY,
          app_secret: process.env.APP_SECRET,
        }),
      },
    );

    // Check if the response is successful
    if (!response.ok) {
      const errorData = await response.json();
      console.error('Error fetching grant token:', errorData); // Log error details
      return res
        .status(500)
        .json({ error: 'Failed to get grant token', details: errorData });
    }

    // Send the token back to the client
    const data = await response.json();
    res.status(200).json({ token: data.id_token });
  } catch (error) {
    console.error('Error fetching grant token:', error.message); // Log error message
    res
      .status(500)
      .json({ error: 'Failed to get grant token', details: error.message });
  }
}
