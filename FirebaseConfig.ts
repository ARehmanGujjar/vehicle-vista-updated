// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// import { getStorage } from "firebase/storage";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyCp6Hwybdt54_1bJKTEG8T4o4AIg7XDxqk",
//   authDomain: "vehiclevista-8d5f4.firebaseapp.com",
//   projectId: "vehiclevista-8d5f4",
//   storageBucket: "vehiclevista-8d5f4.firebasestorage.app",
//   messagingSenderId: "559993627923",
//   appId: "1:559993627923:web:07d4d072899f82892026e6",
//   measurementId: "G-WQKR5GXJ7K",
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
// export const storage = getStorage(app);

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCsoLqVoK0ik9MuoEtOPXE2dtJJZBOrN6Q",
  authDomain: "reactnative1-58653.firebaseapp.com",
  projectId: "reactnative1-58653",
  storageBucket: "reactnative1-58653.appspot.com",
  messagingSenderId: "627699678258",
  appId: "1:627699678258:web:2b54aa36ce1b2795aa902b",
  measurementId: "G-ELH2BSL1YN",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

// Initialize Firestore and Storage
export const db = getFirestore(app);
export const storage = getStorage(app);
