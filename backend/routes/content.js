const express = require('express');
const { readJSON, writeJSON } = require('../utils/fileStorage');
const auth = require('../middleware/auth');

const router = express.Router();

// GET /api/content – public
router.get('/', async (req, res, next) => {
  try {
    const content = await readJSON('content.json');
    res.json(content);
  } catch (err) {
    next(err);
  }
});

// POST /api/content – admin only
router.post('/', auth, async (req, res, next) => {
  try {
    const updatedContent = req.body;
    await writeJSON('content.json', updatedContent);
    res.json(updatedContent);
  } catch (err) {
    next(err);
  }
});

module.exports = router;