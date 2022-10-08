import firebase from './config';
import { db } from './config';

function addDocument(collection, data) {
    const query = db.collection(collection);

    query.add({
        ...data,
        // Lấy ra thời gian hiện tại của firebase : firebase.firestore.FieldValue.serverTimestamp()
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    });
}

export default addDocument;
