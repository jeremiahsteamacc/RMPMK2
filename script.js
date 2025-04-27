// Submit a review
function submitReview(id, stars, comment) {
    let preceptors = JSON.parse(localStorage.getItem('preceptors')) || [];
    const index = preceptors.findIndex(p => p.id == id);

    if (index !== -1) {
        const review = { stars: stars, comment: comment };
        preceptors[index].reviews.push(review);

        // Recalculate average rating
        const ratings = preceptors[index].reviews.map(r => r.stars);
        const avgRating = ratings.reduce((a, b) => a + b, 0) / ratings.length;
        preceptors[index].rating = avgRating;

        localStorage.setItem('preceptors', JSON.stringify(preceptors));
        alert('Review submitted!');
        window.location.href = `preceptor.html?id=${id}`;
    } else {
        alert('Preceptor not found.');
    }
}
