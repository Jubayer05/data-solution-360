import { useState } from 'react';
import firebase from '../../../firebase'; // Adjust the path to your Firebase setup

const db = firebase.firestore();

/**
 * Utility function to update a document by ID in Firestore.
 * @param {string} collectionName - Name of the Firestore collection.
 * @param {string} docId - ID of the document to update.
 * @param {Object} updateData - Data to update in the document.
 * @param {function} onSuccess - Callback function to call upon successful update.
 * @param {function} onError - Callback function to call upon update failure.
 */
const updateDocumentById = async (
  collectionName,
  docId,
  updateData,
  onSuccess,
  onError,
) => {
  try {
    const docRef = db.collection(collectionName).doc(docId);
    await docRef.update(updateData);

    if (onSuccess) {
      onSuccess(); // Trigger the success callback if provided
    }
  } catch (error) {
    console.error('Error updating document:', error);
    if (onError) {
      onError(error); // Trigger the error callback if provided
    }
  }
};

/**
 * Custom hook to handle document update in Firestore by ID.
 * @param {string} collectionName - Firestore collection name.
 * @param {string} docId - Firestore document ID.
 */
const useUpdateDocumentById = (collectionName, docId) => {
  const [loadingUpdate, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const updateDocument = async (updateData) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      await updateDocumentById(
        collectionName,
        docId,
        updateData,
        () => {
          setSuccess(true); // Set success to true when update is complete
        },
        (err) => {
          setError(err); // Set error if any occurs during the update
        },
      );
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return { updateDocument, loadingUpdate, error, success };
};

export default useUpdateDocumentById;
