// utils/createNotification.js
import firebase from '../../firebase';

const db = firebase.firestore();

export async function createNotification(recipientId, title, message) {
  try {
    await db.collection('notifications').add({
      recipientId,
      title,
      message,
      read: false,
      createdAt: new Date(),
    });
  } catch (error) {
    console.error('Error creating notification:', error);
  }
}
