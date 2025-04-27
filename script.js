// Example preceptor data
let preceptors = [
  { name: "Dr. Smith", rating: 4.5, id: 1 },
  { name: "Dr. Johnson", rating: 3.8, id: 2 },
];

// Load preceptors
function displayPreceptors() {
  const list = document.getElementById('preceptorList');
  list.innerHTML = "";
  preceptors.forEach(preceptor => {
    list.innerHTML += `
      <div>
        <a href="preceptor.html?id=${preceptor.id}">
          ${preceptor.name} - ⭐ ${preceptor.rating}/5
        </a>
      </div>
    `;
  });
}

displayPreceptors();

// Search function
document.getElementById('searchBar').addEventListener('input', function(e) {
  const keyword = e.target.value.toLowerCase();
  const filtered = preceptors.filter(p => p.name.toLowerCase().includes(keyword));
  preceptors = filtered.length ? filtered : preceptors;
  displayPreceptors();
});
