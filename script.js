// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyADv4HIvEaPaVc5NrfsnbNARpT5f4q7pMg",
  authDomain: "rmpmk2-a097a.firebaseapp.com",
  databaseURL: "https://rmpmk2-a097a-default-rtdb.firebaseio.com",  // Make sure this URL is correct
  projectId: "rmpmk2-a097a",
  storageBucket: "rmpmk2-a097a.appspot.com",
  messagingSenderId: "383802807213",
  appId: "1:383802807213:web:03adfd3dd073bc23414724",
  measurementId: "G-J97G3LS4WW"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.database();

// Add a new preceptor
export function addPreceptor(name, degree, rotationType, organization, location, stars, hours, demand, busyness, comment) {
  const preceptorRef = firebase.database().ref('preceptors/');
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
      busyness,
      comment
    }]
  };
  firebase.database().ref('preceptors/').push(newPreceptor).then(() => {
    alert('Preceptor added successfully!');
    window.location.href = 'index.html';
  }).catch((error) => {
    console.error('Error adding preceptor:', error);
  });
}

// Display all preceptors
export function fetchPreceptorsFromFirebase() {
  const preceptorRef = firebase.database().ref('preceptors/');
  preceptorRef.get().then((snapshot) => {
    if (snapshot.exists()) {
      displayPreceptors(snapshot.val());
    } else {
      console.log("No data available");
    }
  }).catch((error) => {
    console.error(error);
  });
}

// Display preceptors
function displayPreceptors(preceptors) {
  const preceptorListDiv = document.getElementById('preceptorList');
  if (!preceptorListDiv) return;
  
  preceptorListDiv.innerHTML = '';  // Clear existing content

  Object.entries(preceptors).forEach(([id, preceptor]) => {
    const preceptorItem = document.createElement('div');
    preceptorItem.classList.add('preceptor-item');
    preceptorItem.innerHTML = `
      <h3><a href="preceptor.html?id=${id}">${preceptor.name} (${preceptor.degree})</a></h3>
      <p><strong>Rotation Type:</strong> ${preceptor.rotationType}</p>
      <p><strong>Organization:</strong> ${preceptor.organization}</p>
      <p><strong>Location:</strong> ${preceptor.location}</p>
      <p><strong>Average Rating:</strong> ${preceptor.rating ? preceptor.rating.toFixed(1) : "N/A"} ⭐</p>
    `;
    preceptorListDiv.appendChild(preceptorItem);
  });
}

// Filter preceptors by search
export function filterPreceptors() {
  const query = document.getElementById('searchBar').value.toLowerCase();
  const preceptorRef = firebase.database().ref('preceptors/');
  preceptorRef.get().then((snapshot) => {
    if (snapshot.exists()) {
      const filteredPreceptors = Object.entries(snapshot.val()).filter(([id, preceptor]) =>
        preceptor.name.toLowerCase().includes(query) ||
        preceptor.rotationType.toLowerCase().includes(query)
      );
      const filteredObj = Object.fromEntries(filteredPreceptors);
      displayPreceptors(filteredObj);
    }
  }).catch((error) => {
    console.error(error);
  });
}

// Automatically fetch preceptors if on home page
if (window.location.pathname.includes('index.html')) {
  fetchPreceptorsFromFirebase();
}
