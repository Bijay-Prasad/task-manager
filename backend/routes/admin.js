const express = require('express');
const User = require('../models/User.js');
const authMiddleware = require('../middleware/auth.js');

const router = express.Router();

// Get all users (for assigning tasks)
router.get('/users', authMiddleware, async (req, res) => {
  const users = await User.find({}, 'name _id role email');
  res.status(200).send(users);
});


// Update user role
router.patch('/user/:id/role', authMiddleware, async (req, res) => {
  const { id } = req.params;
  const { role } = req.body;
  const validRoles = ['USER', 'MANAGER', 'ADMIN'];

  if (!validRoles.includes(role)) {
    return res.status(400).json({ message: 'Invalid role.' });
  }

  const updated = await User.findByIdAndUpdate(id, { role }, { new: true }).select('-password');
  res.json(updated);
});


// Delete user
router.delete('/user/:id', authMiddleware, async (req, res) => {
  const { id } = req.params;
  await User.findByIdAndDelete(id);
  res.json({ message: 'User deleted successfully.' });
});

module.exports = router;
