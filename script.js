function addPreceptor(name, degree, rotationType, organization, location, stars, hours, demand, busyness, comment) {
    let preceptors = JSON.parse(localStorage.getItem('preceptors')) || [];
    const id = Date.now(); // simple unique ID

    const newPreceptor = {
        id: id,
        name: name,
        degree: degree,
        rotationType: rotationType,
        organization: organization,
        location: location,
        rating: stars,
        reviews: [{
            stars: stars,
            hours: hours,
            demand: demand,
            busyness: busyness,
            comment: comment
        }]
    };

    preceptors.push(newPreceptor);
    localStorage.setItem('preceptors', JSON.stringify(preceptors));

    alert('Preceptor added!');
    window.location.href = 'index.html';
}
