// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCh5r007Bick81t10uxCe568eY52vycjDg",
    authDomain: "hairbytimablaq-c8b84.firebaseapp.com",
    projectId: "hairbytimablaq-c8b84",
    storageBucket: "hairbytimablaq-c8b84.appspot.com",
    messagingSenderId: "1064560112254",
    appId: "1:1064560112254:web:3ff298d68aa59ed6fede2f",
    measurementId: "G-0DCTWP7T7S"
};

// Initialize Firebase
 // eslint-disable-next-line
const app = initializeApp(firebaseConfig);
export const db = getFirestore()
 // eslint-disable-next-line
const analytics = getAnalytics(app);