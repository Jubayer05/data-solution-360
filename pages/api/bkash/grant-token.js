// Function to fetch the grant token
export default async function getGrantToken(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Make the request to fetch the grant token using fetch
    const response = await fetch(process.env.GRANT_TOKEN_URL, {
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
    });

    // Check if the response is successful
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        `Failed to get grant token: ${errorData.message || 'Unknown error'}`,
      );
    }

    // Parse the response data
    const responseData = await response.json();

    // Send the token back to the client
    res.status(200).json({ token: responseData.id_token });
  } catch (error) {
    console.error('Error fetching grant token:', error.message); // Log error details
    res.status(500).json({ error: 'Failed to get grant token' });
  }
}
