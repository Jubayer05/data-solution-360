import dotenv from 'dotenv';
import * as admin from 'firebase-admin';
import { initializeApp } from 'firebase-admin/app';

// Load environment variables
dotenv.config();

// Initialize Firebase Admin with applicationDefault credentials or with your service account
if (!admin.apps.length) {
  try {
    console.log('Attempting to load service account...');

    const serviceAccount = require('../serviceAccountKey.json'); // Use the downloaded JSON file directly
    console.log('Service account loaded successfully!');

    // Initialize the app with credentials
    initializeApp({
      credential: admin.credential.cert(serviceAccount),
      databaseURL: 'https://data-solution-360.firebaseio.com',
    });

    console.log('Firebase Admin initialized successfully.');
  } catch (error) {
    // Detailed error logging for better insights
    console.error('Error initializing Firebase Admin:', error);
    if (error.code) {
      console.error('Error code:', error.code);
    }
    if (error.message) {
      console.error('Error message:', error.message);
    }
    if (error.stack) {
      console.error('Error stack:', error.stack);
    }
  }
}

const dbAdmin = admin.firestore();
export { dbAdmin };
