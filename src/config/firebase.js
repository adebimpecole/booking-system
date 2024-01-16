// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCITgSSCxKcZm60vvCpnknFXUUqUtIm8aA",
  authDomain: "lilies-7b8b1.firebaseapp.com",
  projectId: "lilies-7b8b1",
  storageBucket: "lilies-7b8b1.appspot.com",
  messagingSenderId: "577066769347",
  appId: "1:577066769347:web:677e0baaad87f1e08a7b76"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export default app;