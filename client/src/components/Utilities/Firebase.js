//FIREBASE CONFIG FILE

import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyChpsf5IB9WVv1GnyOZTn0Px3QNCUg41w0",
  authDomain: "seng-51.firebaseapp.com",
  databaseURL: "https://seng-51.firebaseio.com",
  projectId: "seng-51",
  storageBucket: "seng-51.appspot.com",
  messagingSenderId: "1026081474984",
  appId: "1:1026081474984:web:5471c6141c6a28058d359d",
  measurementId: "G-1B3B3YYV45",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);


export default firebase;
