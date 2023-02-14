// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCeI-yJ3uuOi1yQqgxB3xiu8SCfyHtqeuY",
  authDomain: "write-up-41b62.firebaseapp.com",
  projectId: "write-up-41b62",
  storageBucket: "write-up-41b62.appspot.com",
  messagingSenderId: "264679798688",
  appId: "1:264679798688:web:97989570b3d23ce95996c5",
  measurementId: "G-MF2QJ70525"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const  storage = getStorage(app);