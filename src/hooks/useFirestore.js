import { useEffect, useState } from 'react';

import { db } from '../firebase/config';

function useFirestore(collection, condition) {
    const [documents, setDocuments] = useState([]);

    useEffect(() => {
        let collectionRef = db.collection(collection).orderBy('createdAt');

        if (condition) {
            if (!condition.compareValue || !condition.compareValue.length) {
                // reset documents
                setDocuments([]);
                return;
            }

            collectionRef = collectionRef.where(condition.name, condition.operator, condition.compareValue);
        }
        const unsubcribed = collectionRef.onSnapshot((snapshot) => {
            const documents = snapshot.docs.map((doc) => ({
                // .data() : sẽ convert value từ firestore sang object javascript
                ...doc.data(),
                id: doc.id,
            }));
            console.log({ documents, snapshot, docs: snapshot.docs });
            setDocuments(documents);
        });

        return () => unsubcribed;
    }, [collection, condition]);

    return documents;
}

export default useFirestore;
