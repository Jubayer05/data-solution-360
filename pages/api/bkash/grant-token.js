import axios from 'axios';

// Function to fetch the grant token
export default async function getGrantToken(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const response = await axios.post(
      process.env.NEXT_PUBLIC_BKASH_GRANT_TOKEN_URL, // Correct URL for the grant token
      {
        app_key: process.env.NEXT_PUBLIC_BKASH_APP_KEY,
        app_secret: process.env.NEXT_PUBLIC_BKASH_APP_SECRET,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          username: process.env.NEXT_PUBLIC_BKASH_MERCHANT_ID, // Add username to headers
          password: process.env.NEXT_PUBLIC_BKASH_PASSWORD, // Add password to headers
        },
      },
    );

    // Send the token back to the client
    res.status(200).json({ token: response.data.id_token });
  } catch (error) {
    console.error(
      'Error fetching grant token:',
      error.response?.data || error.message,
    ); // Log error details
    res.status(500).json({ error: 'Failed to get grant token' });
  }
}
