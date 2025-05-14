import { useDispatch, useSelector } from "react-redux";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import { deleteTask, getTasks } from "../State/Task/Action";
import { Bounce, ToastContainer, toast } from 'react-toastify';
import { Box, Tooltip } from "@mui/material";
import EditTaskModal from "./EditTaskModal";
import { useState } from "react";
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn'; // for status update


const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

export default function TaskCard({ task }) {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.user);

    const [openEditModal, setOpenEditModal] = useState(false);

    const canDelete =
        (user?.role === "MANAGER" || user?.role === "ADMIN") &&
        task.createdBy?._id === user._id;

    const isAssignedUser = user?._id === task?.assignedTo?._id;
    const isUserOnly = user?.role === "USER";
    const canUpdateStatusOnly = isUserOnly || isAssignedUser;

    return (
        <div className="bg-white relative rounded-2xl p-6 shadow-xl hover:scale-[1.02] transition-transform duration-300 border-l-4 border-purple-500">
            {/* ICONS */}
            <Box className="flex flex-col absolute right-5 bottom-5 gap-2">

                {/* EDIT & DELETE ICONS FOR MANAGER OR ADMIN */}
                {canDelete && (
                    <>
                        <Tooltip title="Edit Task">
                            <IconButton onClick={() => setOpenEditModal(true)}>
                                <EditIcon className="text-blue-500 hover:text-blue-700" />
                            </IconButton>
                        </Tooltip>

                        <Tooltip title="Delete Task">
                            <IconButton onClick={async () => {
                                try {
                                    await dispatch(deleteTask(task._id));
                                    await dispatch(getTasks());
                                    toast.success("Task deleted successfully!");
                                } catch (err) {
                                    toast.error("Failed to delete task.");
                                }
                            }}>
                                <DeleteIcon className="text-red-500 hover:text-red-700" />
                            </IconButton>
                        </Tooltip>
                    </>
                )}

                {/* STATUS UPDATE BUTTON FOR USER OR ASSIGNED */}
                {canUpdateStatusOnly && (
                    <Tooltip title="Update Task Status">
                        <IconButton onClick={() => setOpenEditModal(true)}>
                            <AssignmentTurnedInIcon className="text-green-600 hover:text-green-800" />
                        </IconButton>
                    </Tooltip>
                )}
            </Box>

            {/* TASK DETAILS */}
            <div className="flex items-center justify-between mb-2">
                <h2 className="text-xl font-semibold text-gray-800">{task.title}</h2>
                <span
                    className={`text-xs font-semibold px-2 py-1 rounded-full ${task.priority === "High"
                        ? "bg-red-100 text-red-600"
                        : task.priority === "Medium"
                            ? "bg-yellow-100 text-yellow-600"
                            : "bg-green-100 text-green-600"
                        }`}
                >
                    {task.priority}
                </span>
            </div>

            <p className="text-sm text-gray-600 mb-4">{task.description}</p>

            <div className="flex flex-col text-xs text-gray-500 gap-1">
                <div>
                    <strong>Status:</strong>{" "}
                    <span
                        className={`font-medium ${task.status === "Completed"
                            ? "text-green-600"
                            : task.status === "In Progress"
                                ? "text-yellow-600"
                                : "text-red-600"
                            }`}
                    >
                        {task.status}
                    </span>
                </div>
                <div>
                    <strong>Due Date:</strong>{" "}
                    {formatDate(task.dueDate)}
                </div>
                <div>
                    <strong>Created At:</strong>{" "}
                    {formatDate(task.createdAt)}
                </div>
                <div>
                    <strong>Assigned To:</strong>{" "}
                    <span className="text-purple-600">
                        {task.assignedTo ? task.assignedTo.name : "Unassigned"}
                    </span>
                </div>
                <div>
                    <strong>Created By:</strong>{" "}
                    <span className="text-blue-600">
                        {task.createdBy ? task.createdBy.name : "Unknown"}
                    </span>
                </div>
            </div>

            {/* MODAL: Edit or Update Status */}
            <EditTaskModal
                open={openEditModal}
                onClose={() => setOpenEditModal(false)}
                task={task}
                user={user}
            />
        </div>
    );
}
