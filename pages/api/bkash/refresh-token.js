import axios from 'axios';

export default async function refreshToken(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { refreshToken } = req.body; // Get refresh_token from request body

  console.log(refreshToken);

  try {
    const response = await axios.post(
      process.env.NEXT_PUBLIC_BKASH_REFRESH_TOKEN_URL,
      {
        app_key: process.env.NEXT_PUBLIC_BKASH_APP_KEY, // Add your app_key
        app_secret: process.env.NEXT_PUBLIC_BKASH_APP_SECRET, // Add your app_secret
        refresh_token: refreshToken, // Use the provided refresh token
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          username: process.env.NEXT_PUBLIC_BKASH_MERCHANT_ID,
          password: process.env.NEXT_PUBLIC_BKASH_PASSWORD,
          Authorization: `Bearer ${req.headers['authorization']}`, // Current token in header
        },
      },
    );

    res.status(200).json({ token: response.data.id_token });
  } catch (error) {
    console.error(
      'Error refreshing token:',
      error.response?.data || error.message,
    );
    res.status(500).json({ error: 'Failed to refresh token' });
  }
}
