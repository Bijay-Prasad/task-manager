const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User.js');

const router = express.Router();

router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  const user = await User.create({ name, email, password });
  res.status(201).json(user);
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.password)))
    return res.status(400).json({ msg: 'Invalid credentials' });

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE_IN });
  res.json({ token, user });
});

module.exports = router;