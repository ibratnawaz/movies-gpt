// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyBrlivMlVrIHfZrTJgQ7HCZm88wIS4y2HU',
  authDomain: 'movies-gpt-1e95a.firebaseapp.com',
  projectId: 'movies-gpt-1e95a',
  storageBucket: 'movies-gpt-1e95a.appspot.com',
  messagingSenderId: '355806604114',
  appId: '1:355806604114:web:ae3bb7ede3f5a20fb9a88b',
  measurementId: 'G-JYQXZEGNE7'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default analytics;
