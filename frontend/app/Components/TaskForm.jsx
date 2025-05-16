"use client";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createTask, getTasks } from "../State/Task/Action";
import { getAllUsers } from "../State/User/Action";
import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";

export default function TaskForm({ onSuccess }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  console.log("User:", user);
  const { users } = useSelector((state) => state.user);


  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [status, setStatus] = useState("Pending");
  const [assignedTo, setAssignedTo] = useState("");

  useEffect(() => {
    dispatch(getAllUsers());
    dispatch(getTasks());
  }, [dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      title,
      description,
      dueDate,
      priority,
      status,
      assignedTo,
    };

    console.log("Task Data:", payload);
    
    await dispatch(createTask(payload));
    dispatch(getTasks());
    setTitle("");
    setDescription("");
    setDueDate("");
    setPriority("Medium");
    setStatus("Pending");
    setAssignedTo("");
    if (onSuccess) onSuccess();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 transition-all duration-500"
    >
      <Box onSubmit={handleSubmit} sx={{ display: 'grid', gap: 2 }}>
        {/* Title */}
        <TextField
          label="Title"
          fullWidth
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        {/* Description */}
        <TextField
          label="Description"
          fullWidth
          multiline
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />

        {/* Due Date */}
        <TextField
          label="Due Date"
          type="date"
          fullWidth
          InputLabelProps={{ shrink: true }}
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          required
        />

        {/* Priority */}
        <FormControl fullWidth required>
          <InputLabel>Priority</InputLabel>
          <Select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            label="Priority"
          >
            <MenuItem value="Low">Low</MenuItem>
            <MenuItem value="Medium">Medium</MenuItem>
            <MenuItem value="High">High</MenuItem>
          </Select>
        </FormControl>

        {/* Status */}
        <FormControl fullWidth required>
          <InputLabel>Status</InputLabel>
          <Select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            label="Status"
          >
            <MenuItem value="Pending">Pending</MenuItem>
            <MenuItem value="In Progress">In Progress</MenuItem>
            <MenuItem value="Completed">Completed</MenuItem>
          </Select>
        </FormControl>

        {/* Assigned To */}
        <FormControl fullWidth required>
          <InputLabel>Assign To</InputLabel>
          <Select
            value={assignedTo}
            onChange={(e) => setAssignedTo(e.target.value)}
            label="Assign To"
          >
            <MenuItem value="">None</MenuItem>
            {users?.map((user) => (
              <MenuItem key={user._id} value={user._id}>
                {user.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Submit Button */}
        <Button
          variant="contained"
          type="submit"
          fullWidth
          sx={{ backgroundColor: "#9333ea", "&:hover": { backgroundColor: "#7e22ce" } }}
        >
          Create Task
        </Button>
      </Box>
    </form>
  );
}
