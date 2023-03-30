import firebase from "firebase/app";
import "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyD9xpYWX00FfUjsO4Us8cuJW-UDcXm2-SA",
  authDomain: "react-quiz-app-47ae1.firebaseapp.com",
  projectId: "react-quiz-app-47ae1",
  storageBucket: "react-quiz-app-47ae1.appspot.com",
  messagingSenderId: "526945090838",
  appId: "1:526945090838:web:f62496e01d703c4cc46437",
  measurementId: "G-R9F0KE4PXM",
};

firebase.initializeApp(firebaseConfig);
const db = firebase.database();

export default db;
