const form = document.getElementById('reviewForm');
const reviewsContainer = document.getElementById('reviewsContainer');

// Fetch existing reviews from server
async function loadReviews() {
    const res = await fetch('/reviews');
    const reviews = await res.json();
    displayReviews(reviews);
}

// Display reviews in DOM
function displayReviews(reviews) {
    reviewsContainer.innerHTML = '';
    reviews.forEach(r => {
        const div = document.createElement('div');
        div.classList.add('review-card');
        div.innerHTML = `
            <h3>${r.book} - <span>${r.rating}⭐</span></h3>
            <p><strong>${r.user}</strong> says:</p>
            <p>${r.comment}</p>
        `;
        reviewsContainer.appendChild(div);
    });
}

// Handle form submission
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const review = {
        book: document.getElementById('book').value,
        user: document.getElementById('user').value,
        rating: document.getElementById('rating').value,
        comment: document.getElementById('comment').value
    };

    const res = await fetch('/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(review)
    });

    if (res.ok) {
        form.reset();
        loadReviews();
        alert('Review added successfully!');
    } else {
        alert('Failed to add review.');
    }
});

// Initial load
loadReviews();
