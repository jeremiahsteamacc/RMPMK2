// Import Firebase
import { initializeApp } from "firebase/app";
import { getDatabase, ref, push, get, set, update, child } from "firebase/database";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyADv4HIvEaPaVc5NrfsnbNARpT5f4q7pMg",
  authDomain: "rmpmk2-a097a.firebaseapp.com",
  projectId: "rmpmk2-a097a",
  storageBucket: "rmpmk2-a097a.appspot.com",
  messagingSenderId: "383802807213",
  appId: "1:383802807213:web:03adfd3dd073bc23414724",
  measurementId: "G-J97G3LS4WW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// Add a new preceptor
export function addPreceptor(name, degree, rotationType, organization, location, stars, hours, demand, busyness, comment) {
  const preceptorRef = ref(db, 'preceptors/');
  const newPreceptor = {
    name,
    degree,
    rotationType,
    organization,
    location,
    rating: stars,
    reviews: [{
      stars,
      hours,
      demand,
