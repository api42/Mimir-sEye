// Import the functions you need from the SDKs you need
import firebase from "firebase";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAvvNB5s8qiNRTgUHQwyjNhehFZye0uyKE",
  authDomain: "mimir-s-eye.firebaseapp.com",
  projectId: "mimir-s-eye",
  storageBucket: "mimir-s-eye.appspot.com",
  messagingSenderId: "318589810677",
  appId: "1:318589810677:web:03a5d859b3e920e15d92bc",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
var db = firebase.firestore();

export default db;
