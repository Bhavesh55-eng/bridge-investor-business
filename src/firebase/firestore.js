/**
 * Helper functions for Firestore operations
 */

const createDocument = async (collection, data) => {
    try {
        const docRef = await firebaseDb.collection(collection).add(data);
        return docRef.id;
    } catch (error) {
        console.error(`Error creating document in ${collection}:`, error);
        throw error;
    }
};

const getDocuments = async (collection, queryFn = null) => {
    try {
        let q = firebaseDb.collection(collection);
        if (queryFn) q = queryFn(q);
        const snapshot = await q.get();
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
        console.error(`Error fetching documents from ${collection}:`, error);
        throw error;
    }
};

const updateDocument = async (collection, docId, data) => {
    try {
        await firebaseDb.collection(collection).doc(docId).update(data);
    } catch (error) {
        console.error(`Error updating document ${docId} in ${collection}:`, error);
        throw error;
    }
};

const deleteDocument = async (collection, docId) => {
    try {
        await firebaseDb.collection(collection).doc(docId).delete();
    } catch (error) {
        console.error(`Error deleting document ${docId} from ${collection}:`, error);
        throw error;
    }
};

// Export helper methods
window.createDoc = createDocument;
window.getDocs = getDocuments;
window.updateDoc = updateDocument;
window.deleteDoc = deleteDocument;
