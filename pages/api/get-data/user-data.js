// pages/api/get-data.js
import { collection, getDocs } from 'firebase/firestore';
import firebase from '../../../firebase';

const db = firebase.firestore();

export default async function handler(req, res) {
  const providedApiKey = req.headers['x-api-key'];
  const validApiKey = process.env.NEXT_PUBLIC_USER_COLLECTION_API_KEY;

  if (providedApiKey !== validApiKey) {
    return res.status(403).json({ error: 'Unauthorized access' });
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const querySnapshot = await getDocs(collection(db, 'users'));
    const data = [];
    querySnapshot.forEach((doc) => {
      data.push({ id: doc.id, ...doc.data() });
    });

    res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching Firestore data:', error);
    res.status(500).json({ error: 'Failed to fetch data' });
  }
}
