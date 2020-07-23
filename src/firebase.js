import firebase from 'firebase';
const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyC3JfLM3Zr7mHbqAXsOeyM0Ct_fMSDHx0k",
    authDomain: "cake-shop-ba2cf.firebaseapp.com",
    databaseURL: "https://cake-shop-ba2cf.firebaseio.com",
    projectId: "cake-shop-ba2cf",
    storageBucket: "cake-shop-ba2cf.appspot.com",
    messagingSenderId: "1024789349351",
    appId: "1:1024789349351:web:8323714ca2759d1e3cf342",
    measurementId: "G-W3NJPDBQVF"
});

const db = firebaseApp.firestore();
const auth = firebaseApp.auth();
const storage = firebaseApp.storage();

export { db, auth, storage };