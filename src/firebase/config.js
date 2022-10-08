import firebase from 'firebase/app';

import 'firebase/analytics';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: 'AIzaSyDN06AZJ8TcsW5e5rGWs-DtvOgQBEwcolI',
    authDomain: 'food-app-a0b86.firebaseapp.com',
    projectId: 'food-app-a0b86',
    storageBucket: 'food-app-a0b86.appspot.com',
    messagingSenderId: '897025878159',
    appId: '1:897025878159:web:bf1f6368e1c3f6d70668fa',
    measurementId: 'G-6CPL9KBJ08',
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

//  auth : xác thực
const auth = firebase.auth();
// firestore : lưu trữ
const db = firebase.firestore();

export { auth, db };
export default firebase;
