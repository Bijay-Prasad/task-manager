const express = require('express');
const Task = require('../models/Task.js');
const auth = require('../middleware/auth.js');

const router = express.Router();

// Create task
router.post('/', auth, async (req, res) => {
  const task = await Task.create({ ...req.body, createdBy: req.user.id });
  res.json(task);
});

// Get tasks
router.get('/', auth, async (req, res) => {
  const tasks = await Task.find({
    $or: [{ createdBy: req.user.id }, { assignedTo: req.user.id }],
  }).populate('assignedTo');
  res.json(tasks);
});

// Update
router.put('/:id', auth, async (req, res) => {
  const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(task);
});

// Delete
router.delete('/:id', auth, async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.json({ msg: 'Deleted' });
});

module.exports = router;