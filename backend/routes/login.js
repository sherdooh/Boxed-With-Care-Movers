const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { readJSON, writeJSON, ensureFile } = require('../utils/fileStorage');

const router = express.Router();

// Ensure admin user exists on startup
(async () => {
  await ensureFile('users.json', []);
  const users = await readJSON('users.json');
  const adminExists = users.find(u => u.username === 'admin');
  if (!adminExists) {
    const hashed = await bcrypt.hash(process.env.DEFAULT_ADMIN_PASSWORD || 'BWC@2025!', 10);
    users.push({ username: 'admin', password: hashed });
    await writeJSON('users.json', users);
  }
})();

router.post('/', async (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password required' });
  }
  try {
    const users = await readJSON('users.json');
    const user = users.find(u => u.username === username);
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    const token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: '8h' });
    res.json({ token });
  } catch (err) {
    next(err);
  }
});

module.exports = router;