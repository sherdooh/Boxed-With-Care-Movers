const express = require('express');
const router = express.Router();

// Mock Google reviews – replace with real API call if needed
router.get('/', async (req, res, next) => {
  try {
    // Return empty array or mock data to avoid errors
    const mockReviews = [
      {
        id: '1',
        authorName: 'John Doe',
        rating: 5,
        text: 'Excellent service! Very careful with my belongings.',
        relativeTimeDescription: '2 weeks ago'
      }
    ];
    // If you have a Google Places API key, you can fetch real reviews here
    res.json(mockReviews);
  } catch (err) {
    next(err);
  }
});

module.exports = router;