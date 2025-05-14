const express = require('express');
const Task = require('../models/Task.js');
const authMiddleware = require('../middleware/auth.js');

const router = express.Router();

// // Get all users (for assigning tasks)
// router.get('/', authMiddleware, async (req, res) => {
//   const users = await User.find({ role: "USER" }, 'name _id role email'); // only return name and _id
//   res.status(200).send(users);
// });

// ✅ Create task — only MANAGER or ADMIN can create
router.post('/', authMiddleware, async (req, res) => {
  const task = await Task.create({ ...req.body, createdBy: req.user.userId });
  res.status(201).send(task);
});

// ✅ View tasks — any authenticated user
router.get('/', authMiddleware, async (req, res) => {
  const tasks = await Task.find({
    $or: [{ createdBy: req.user.userId }, { assignedTo: req.user.userId }],
  })
    .populate('assignedTo', 'name')
    .populate('createdBy', 'name');

  res.status(200).send(tasks);
});

// ✅ Update task — same logic as before (you'll add role logic inside the handler)
router.put('/:id', authMiddleware, async (req, res) => {
  const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.status(200).send(task);
});

// ✅ Delete task — only MANAGER/ADMIN
router.delete('/:id', authMiddleware, async (req, res) => {
  const task = await Task.findByIdAndDelete(req.params.id);
  res.status(200).send(task.title);
});

module.exports = router;