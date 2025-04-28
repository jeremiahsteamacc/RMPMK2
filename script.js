// Import Firebase
import { initializeApp } from "firebase/app";
import { getDatabase, ref, push, get, set, update, child } from "firebase/database";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyADv4HIvEaPaVc5NrfsnbNARpT5f4q7pMg",
  authDomain: "rmpmk2-a097a.firebaseapp.com",
  databaseURL: "https://rmpmk2-a097a-default-rtdb.firebaseio.com", // ✅ Added this line
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
      busyness,
      comment
    }]
  };
  push(preceptorRef, newPreceptor).then(() => {
    alert('Preceptor added successfully!');
    window.location.href = 'index.html';
  }).catch((error) => {
    console.error('Error adding preceptor:', error);
  });
}

// Display all preceptors
export function fetchPreceptorsFromFirebase() {
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

// Display preceptors
function displayPreceptors(preceptors) {
  const preceptorListDiv = document.getElementById('preceptorList');
  if (!preceptorListDiv) return;
  
  preceptorListDiv.innerHTML = '';

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
  const preceptorRef = ref(db, 'preceptors/');
  get(preceptorRef).then((snapshot) => {
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

// Preceptor profile page logic
if (window.location.pathname.includes('preceptor.html')) {
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get('id');

  if (id) {
    const preceptorRef = ref(db, `preceptors/${id}`);
    get(preceptorRef).then((snapshot) => {
      if (snapshot.exists()) {
        const preceptor = snapshot.val();
        const preceptorInfo = document.getElementById('preceptorInfo');
        preceptorInfo.innerHTML = `
          <h1>${preceptor.name} (${preceptor.degree})</h1>
          <h3>${preceptor.organization} - ${preceptor.location}</h3>
          <p><strong>Average Rating:</strong> ${preceptor.rating.toFixed(1)} ⭐</p>
          <h2>Reviews:</h2>
          <div id="reviews"></div>
        `;

        const reviewsDiv = document.getElementById('reviews');
        preceptor.reviews.forEach(review => {
          const reviewItem = document.createElement('div');
          reviewItem.innerHTML = `
            <p>⭐ ${review.stars}/5</p>
            <p><strong>Hours/week:</strong> ${review.hours} | 
               <strong>Demand:</strong> ${review.demand}/5 | 
               <strong>Busyness:</strong> ${review.busyness}/5</p>
            <p>${review.comment}</p>
            <hr>
          `;
          reviewsDiv.appendChild(reviewItem);
        });

        document.getElementById('reviewForm').addEventListener('submit', function(e) {
          e.preventDefault();
          const stars = parseInt(document.getElementById('stars').value);
          const hours = parseInt(document.getElementById('hours').value);
          const demand = parseInt(document.getElementById('demand').value);
          const busyness = parseInt(document.getElementById('busyness').value);
          const comment = document.getElementById('comment').value;

          const updatedReviews = [...(preceptor.reviews || []), { stars, hours, demand, busyness, comment }];
          const newRating = updatedReviews.reduce((acc, r) => acc + r.stars, 0) / updatedReviews.length;

          update(ref(db, `preceptors/${id}`), {
            reviews: updatedReviews,
            rating: newRating
          }).then(() => {
            alert('Review added!');
            window.location.reload();
          }).catch((error) => {
            console.error('Error adding review:', error);
          });
        });
      }
    }).catch((error) => {
      console.error('Error fetching preceptor:', error);
    });
  }
}

// Automatically fetch preceptors if on home page
if (window.location.pathname.includes('index.html')) {
  fetchPreceptorsFromFirebase();
}
