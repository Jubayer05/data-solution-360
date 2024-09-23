import firebase from '../../firebase'; // adjust the path to your firebase setup

const db = firebase.firestore();

/**
 * Utility function to load data from Firestore.
 * @param {string} collectionName - Name of the Firestore collection.
 * @param {function} setState - State setter function to update the state with fetched data.
 * @param {Object} options - Optional parameters for ordering, filtering, and limiting.
 * @param {string} options.orderBy - Field to order the data by.
 * @param {'asc' | 'desc'} options.orderDirection - Order direction: 'asc' or 'desc'.
 * @param {string} options.whereField - Field for filtering the data.
 * @param {string | number} options.whereCondition - Condition value for filtering.
 * @param {number} options.limit - Limit the number of documents fetched.
 * @param {function} options.filterFunction - Optional filter function to apply additional filtering.
 */
export const loadData = async (collectionName, setState, options = {}) => {
  try {
    let query = db.collection(collectionName);

    // Apply ordering if specified
    if (options.orderBy && options.orderDirection) {
      query = query.orderBy(options.orderBy, options.orderDirection);
    }

    // Apply filtering if specified
    if (options.whereField && options.whereCondition !== undefined) {
      query = query.where(options.whereField, '==', options.whereCondition);
    }

    // Apply limit if specified
    if (options.limit) {
      query = query.limit(options.limit);
    }

    // Fetch the data
    const snapshot = await query.get();
    let data = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    // Apply additional filtering if a filterFunction is provided
    if (options.filterFunction) {
      data = data.filter(options.filterFunction);
    }

    // Update the state with the fetched and filtered data
    setState(data);
  } catch (error) {
    console.error('Error loading data from Firestore:', error);
  }
};
