const express = require('express');
const { body, validationResult } = require('express-validator');
const { readJSON, writeJSON } = require('../utils/fileStorage');
const auth = require('../middleware/auth');

const router = express.Router();

// POST /api/leads – public
router.post('/', [
  body('name').notEmpty().trim(),
  body('email').isEmail(),
  body('phone').notEmpty(),
  body('from_location').optional(),
  body('to_location').optional(),
  body('move_date').optional(),
  body('move_type').optional(),
], async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const leads = await readJSON('leads.json');
    const newLead = {
      id: req.body.id || Date.now().toString(),
      date: new Date().toLocaleString(),
      ...req.body,
      createdAt: new Date().toISOString()
    };
    leads.unshift(newLead);
    await writeJSON('leads.json', leads);
    res.status(201).json(newLead);
  } catch (err) {
    next(err);
  }
});

// GET /api/leads – admin
router.get('/', auth, async (req, res, next) => {
  try {
    const leads = await readJSON('leads.json');
    res.json(leads);
  } catch (err) {
    next(err);
  }
});

// DELETE /api/leads/:id – admin
router.delete('/:id', auth, async (req, res, next) => {
  try {
    let leads = await readJSON('leads.json');
    const newLeads = leads.filter(l => l.id !== req.params.id);
    if (newLeads.length === leads.length) {
      return res.status(404).json({ error: 'Lead not found' });
    }
    await writeJSON('leads.json', newLeads);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
});

module.exports = router;