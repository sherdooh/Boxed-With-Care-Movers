const express = require('express');
const auth = require('../middleware/auth');

const router = express.Router();

router.get('/', auth, (req, res) => {
  res.status(200).json({ valid: true, admin: req.admin });
});

module.exports = router;