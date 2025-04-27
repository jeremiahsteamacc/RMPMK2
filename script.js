// Import necessary functions from Firebase SDK
import { initializeApp } from "firebase/app";
import { getDatabase, ref, push, get, child } from "firebase/database";

// Your Firebase configuration object
const firebaseConfig = {
  apiKey: "AIzaSyADv4HIvEaPaVc5NrfsnbNARpT5f4q7pMg",
  authDomain: "rmpmk2-a097a.firebaseapp.com",
  projectId: "rmpmk2-a097a",
  storageBucket: "rmpmk2-a097a.firebasestorage.app",
  messagingSenderId: "383802807213",
  appId: "1:383802807213:web:03adfd3dd073bc23414724",
  measurementId: "G-J97G3LS4WW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// Fetch preceptors from Firebase
function fetchPreceptorsFromFirebase() {
  const preceptorRef = ref(db, 'preceptors/');
  get(preceptorRef).then((snapshot) => {
    if (snapshot.exists()) {
      displayPreceptors(snapshot.val());
    } else {
      console.log("No data available");
    }
  }).catch((error) => {
    console.error(error);
  });
}

// Display preceptors on the homepage
function displayPreceptors(preceptors) {
  const preceptorListDiv = document.getElementById('preceptorList');
  preceptorListDiv.innerHTML = '';

  if (!preceptors || Object.keys(preceptors).length === 0) {
    preceptorListDiv.innerHTML = '<p>No preceptors found.</p>';
  } else {
    Object.values(preceptors).forEach(preceptor => {
      const preceptorItem = document.createElement('div');
      preceptorItem.classList.add('preceptor-item');
      preceptorItem.innerHTML = `
        <h3>${preceptor.name} (${preceptor.degree})</h3>
        <p><strong>Rotation Type:</strong> ${preceptor.rotationType}</p>
        <p><strong>Organization:</strong> ${preceptor.organization}</p>
        <p><strong>Location:</strong> ${preceptor.location}</p>
        <p><strong>Average Rating:</strong> ${preceptor.rating} ⭐</p>
      `;
      preceptorListDiv.appendChild(preceptorItem);
    });
  }
}

// Search preceptors by name or rotation type
function filterPreceptors() {
  const query = document.getElementById('searchBar').value.toLowerCase();
  const preceptorRef = ref(db, 'preceptors/');
  get(preceptorRef).then((snapshot) => {
    if (snapshot.exists()) {
      const filteredPreceptors = Object.values(snapshot.val()).filter(preceptor =>
        preceptor.name.toLowerCase().includes(query) ||
        preceptor.rotationType.toLowerCase().includes(query)
      );
      displayPreceptors(filteredPreceptors);
    }
  }).catch((error) => {
    console.error(error);
  });
}

// Call this function when the page loads to display preceptors
window.onload = fetchPreceptorsFromFirebase;
