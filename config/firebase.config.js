// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: 'portfolio-c5ed5.firebaseapp.com',
  projectId: 'portfolio-c5ed5',
  storageBucket: 'portfolio-c5ed5.appspot.com',
  messagingSenderId: '725268804672',
  appId: '1:725268804672:web:1c49e83d39306575bd1ba5',
  measurementId: 'G-XQV57YP00L',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
