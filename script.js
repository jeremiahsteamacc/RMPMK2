// Initialize preceptors array from Local Storage or empty
let preceptors = JSON.parse(localStorage.getItem('preceptors')) || [];

// Save preceptors back to Local Storage
function savePreceptors() {
    localStorage.setItem('preceptors', JSON.stringify(preceptors));
}

// Function to add a new preceptor
function addPreceptor(name, site, location) {
    const newPreceptor = {
        id: Date.now(),
        name: name,
        site: site,
        location: location,
        rating: null,
        reviews: []
    };
    preceptors.push(newPreceptor);
    savePreceptors();
    alert('Preceptor added!');
    window.location.href = 'index.html'; // Go back to home page
}

// Display preceptors on home page
function displayPreceptors(searchTerm = '') {
    const preceptorList = document.getElementById('preceptorList');
    if (!preceptorList) return;

    preceptorList.innerHTML = ''; // Clear previous list
    preceptors
        .filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()))
        .forEach(preceptor => {
            const preceptorItem = document.createElement('div');
            preceptorItem.innerHTML = `
                <h3><a href="preceptor.html?id=${preceptor.id}">${preceptor.name}</a></h3>
                <p>Site: ${preceptor.site}</p>
                <p>Location: ${preceptor.location}</p>
            `;
            preceptorList.appendChild(preceptorItem);
        });
}

// Search function
function searchPreceptors() {
    const searchInput = document.getElementById('searchInput');
    if (!searchInput) return;
    const searchTerm = searchInput.value;
    displayPreceptors(searchTerm);
}
