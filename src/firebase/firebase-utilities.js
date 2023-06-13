import { initializeApp } from "firebase/app";
import { getAuth, updateProfile, createUserWithEmailAndPassword ,signInWithEmailAndPassword , onAuthStateChanged,  } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getFirestore, collection, addDoc , setDoc , doc , getDoc , getDocs ,  query, deleteDoc,
  where,
  orderBy,
  limit, } from "firebase/firestore";



// Initialize Firebase
const app = initializeApp({
  apiKey: "AIzaSyDOXk9GZZS9qpVeVGpZYI8HWjy0EH6kWaE",
  authDomain: "mynewsscrap.firebaseapp.com",
  projectId: "mynewsscrap",
  storageBucket: "mynewsscrap.appspot.com",
  messagingSenderId: "483322562801",
  appId: "1:483322562801:web:16285ed3b784d8b25c8150",
  measurementId: "G-59SXR4L0LS"
});

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);


// Initialize Realtime Database and get a reference to the service
const database = getDatabase(app);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);


export  {
  auth,
  database,
  db,
  getDoc,
  getDocs,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
  collection, 
  addDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit, 
  setDoc,
  doc
}