const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to serve static files
app.use(express.static('public'));
app.use(express.json());

// Temporary in-memory storage for reviews
let reviews = [
    { book: "The Great Gatsby", user: "Alice", rating: 5, comment: "A timeless classic!" },
    { book: "1984", user: "Bob", rating: 4, comment: "Thought-provoking dystopia." }
];

// Get all reviews
app.get('/reviews', (req, res) => {
    res.json(reviews);
});

// Add a new review
app.post('/reviews', (req, res) => {
    const { book, user, rating, comment } = req.body;
    if (!book || !user || !rating || !comment) {
        return res.status(400).json({ message: "All fields are required!" });
    }
    reviews.push({ book, user, rating, comment });
    res.status(201).json({ message: "Review added successfully!" });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
