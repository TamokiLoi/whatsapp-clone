import firebase from 'firebase';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCOP0ghgxTIYsCZ_sb4dKsiQM4g3zjsqlI",
    authDomain: "whats-app-clone-7d3de.firebaseapp.com",
    projectId: "whats-app-clone-7d3de",
    storageBucket: "whats-app-clone-7d3de.appspot.com",
    messagingSenderId: "99767881224",
    appId: "1:99767881224:web:c1482708c17b7169270bbd",
    measurementId: "G-B16GTMFMYL"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;