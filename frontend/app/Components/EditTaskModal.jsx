// components/EditTaskModal.jsx
'use client';
import { useState, useEffect } from "react";
import {
  Box,
  Modal,
  TextField,
  Button,
  MenuItem,
  Typography,
  Stack,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { updateTask, getTasks } from "../State/Task/Action";
import { toast } from "react-toastify";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 450,
  bgcolor: "background.paper",
  borderRadius: "12px",
  boxShadow: 24,
  p: 4,
  maxHeight: '90vh',
  overflowY: 'auto',
};

export default function EditTaskModal({ open, onClose, task, user }) {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({ ...task });

  useEffect(() => {
    setFormData({ ...task });
  }, [task]);

  const isAssignedUser = user?._id === task?.assignedTo?._id;
  const isUserOnly = user?.role === "USER";
  const canEditOnlyStatus = isUserOnly || isAssignedUser;
  const isAdminOrManager = user?.role === "ADMIN" || user?.role === "MANAGER";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdate = async () => {
    try {
      await dispatch(updateTask(task._id, formData));
      await dispatch(getTasks());
      toast.success("Task updated successfully!");
      onClose();
    } catch (error) {
      toast.error("Failed to update task.");
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={modalStyle}>
        <Typography variant="h6" fontWeight="600" gutterBottom>
          ✏️ {canEditOnlyStatus ? "Update Task Status" : "Edit Task"}
        </Typography>

        <Stack spacing={2}>
          {!canEditOnlyStatus && (
            <>
              <TextField
                label="Title"
                name="title"
                value={formData.title || ""}
                onChange={handleChange}
                fullWidth
                variant="outlined"
              />

              <TextField
                label="Description"
                name="description"
                value={formData.description || ""}
                onChange={handleChange}
                multiline
                rows={3}
                fullWidth
                variant="outlined"
              />

              <TextField
                label="Due Date"
                name="dueDate"
                type="date"
                value={formData.dueDate?.slice(0, 10) || ""}
                onChange={handleChange}
                fullWidth
                InputLabelProps={{ shrink: true }}
                variant="outlined"
              />

              <TextField
                label="Priority"
                name="priority"
                value={formData.priority || ""}
                onChange={handleChange}
                select
                fullWidth
                variant="outlined"
              >
                {["Low", "Medium", "High"].map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
            </>
          )}

          {/* Status Dropdown is always shown to assigned users or USER */}
          {(canEditOnlyStatus || isAdminOrManager) && (
            <TextField
              label="Status"
              name="status"
              value={formData.status || ""}
              onChange={handleChange}
              select
              fullWidth
              variant="outlined"
            >
              {["Pending", "In Progress", "Completed"].map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
          )}
        </Stack>

        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 4, gap: 2 }}>
          <Button onClick={onClose} variant="outlined" color="secondary">
            Cancel
          </Button>
          <Button onClick={handleUpdate} variant="contained" color="primary">
            Update
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}
