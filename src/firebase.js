// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDZ-Md21iFuwqCqkBUHqVeKrEkU3qklYfM",
  authDomain: "clone-apps-kg-portfolio.firebaseapp.com",
  projectId: "clone-apps-kg-portfolio",
  storageBucket: "clone-apps-kg-portfolio.appspot.com",
  messagingSenderId: "944100008301",
  appId: "1:944100008301:web:d35797b8e0366a0c7f3a64"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);
export const auth = getAuth();
export const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });