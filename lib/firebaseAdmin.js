import dotenv from 'dotenv';
import * as admin from 'firebase-admin';
import { initializeApp } from 'firebase-admin/app';

// Load environment variables
dotenv.config();

if (!admin.apps.length) {
  try {
    console.log(
      'Attempting to load Firebase Admin from environment variables...',
    );

    const serviceAccount = {
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    };

    console.log('Service account loaded from environment variables.');

    // Initialize the app with credentials
    initializeApp({
      credential: admin.credential.cert(serviceAccount),
      databaseURL: process.env.FIREBASE_DATABASE_URL,
    });

    console.log('Firebase Admin initialized successfully.');
  } catch (error) {
    console.error('Error initializing Firebase Admin:', error);
  }
}

const dbAdmin = admin.firestore();
export { dbAdmin };
