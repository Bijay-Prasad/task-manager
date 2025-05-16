import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteTask } from "../../State/Task/Action";
import { toast } from "react-toastify";
import EditTaskModal from "../EditTaskModal";
import { getAllTasks } from "@/app/State/Admin/User/Action";


const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

const TASKS_PER_PAGE = 6;

export default function TaskTable() {
  const dispatch = useDispatch();
  const { tasks } = useSelector((state) => state.adminUser);
  const { user } = useSelector((state) => state.user);

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [priorityFilter, setPriorityFilter] = useState("All");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedTask, setSelectedTask] = useState(null);

  useEffect(() => {
    dispatch(getAllTasks());
  }, [dispatch]);

  const handleDelete = async (taskId) => {
    try {
      await dispatch(deleteTask(taskId));
      toast.success("Task deleted successfully!");
      dispatch(getAllTasks());
    } catch (err) {
      toast.error("Failed to delete task.");
    }
  };

  const filteredTasks = tasks.filter((task) => {
    const matchesStatus = statusFilter === "All" || task.status === statusFilter;
    const matchesPriority = priorityFilter === "All" || task.priority === priorityFilter;

    const taskDate = new Date(task.createdAt);
    const fromDate = dateFrom ? new Date(dateFrom) : null;
    const toDate = dateTo ? new Date(dateTo) : null;

    const matchesDate =
      (!fromDate || taskDate >= fromDate) && (!toDate || taskDate <= toDate);

    const matchesSearch =
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.status.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.assignedTo?.name.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesStatus && matchesPriority && matchesDate && matchesSearch;
  });

  const totalPages = Math.ceil(filteredTasks.length / TASKS_PER_PAGE);
  const paginatedTasks = filteredTasks.slice(
    (currentPage - 1) * TASKS_PER_PAGE,
    currentPage * TASKS_PER_PAGE
  );

  console.log("paginatedTasks", paginatedTasks);


  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="w-full">
      {/* Filters */}
      <div className="grid md:grid-cols-3 gap-4 mb-4">
        <input
          type="text"
          placeholder="Search tasks..."
          className="w-full px-4 py-2 border rounded shadow-sm focus:ring-2 focus:ring-purple-500"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setCurrentPage(1);
          }}
        />

        <select
          value={statusFilter}
          onChange={(e) => {
            setStatusFilter(e.target.value);
            setCurrentPage(1);
          }}
          className="w-full px-4 py-2 border rounded shadow-sm focus:ring-2 focus:ring-purple-500"
        >
          <option value="All">Status: All</option>
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>

        <select
          value={priorityFilter}
          onChange={(e) => {
            setPriorityFilter(e.target.value);
            setCurrentPage(1);
          }}
          className="w-full px-4 py-2 border rounded shadow-sm focus:ring-2 focus:ring-purple-500"
        >
          <option value="All">Priority: All</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
      </div>

      {/* Date Filters */}
      <div className="grid md:grid-cols-2 gap-4 mb-4">
        <input
          type="date"
          className="w-full px-4 py-2 border rounded shadow-sm focus:ring-2 focus:ring-purple-500"
          value={dateFrom}
          onChange={(e) => {
            setDateFrom(e.target.value);
            setCurrentPage(1);
          }}
        />
        <input
          type="date"
          className="w-full px-4 py-2 border rounded shadow-sm focus:ring-2 focus:ring-purple-500"
          value={dateTo}
          onChange={(e) => {
            setDateTo(e.target.value);
            setCurrentPage(1);
          }}
        />
      </div>

      {/* Task Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 shadow-md rounded-lg bg-white">
          <thead className="bg-purple-700 text-white text-sm">
            <tr>
              <th className="px-6 py-3 text-left font-semibold">Title</th>
              <th className="px-6 py-3 font-semibold">Status</th>
              <th className="px-6 py-3 font-semibold">Priority</th>
              <th className="px-6 py-3 font-semibold">Assigned Date</th>
              <th className="px-6 py-3 font-semibold">Due Date</th>
              <th className="px-6 py-3 font-semibold">Assigned</th>
              <th className="px-6 py-3 font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody className="text-sm divide-y divide-gray-200">
            {paginatedTasks.length > 0 ? (
              paginatedTasks.map((task) => (
                <tr key={task._id} className="hover:bg-gray-100 transition">
                  <td className="px-6 py-4">{task.title}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${task.status === "Completed"
                        ? "bg-green-100 text-green-600"
                        : task.status === "In Progress"
                          ? "bg-yellow-100 text-yellow-600"
                          : "bg-red-100 text-red-600"
                        }`}
                    >
                      {task.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${task.priority === "High"
                        ? "bg-red-200 text-red-800"
                        : task.priority === "Medium"
                          ? "bg-yellow-200 text-yellow-800"
                          : "bg-green-200 text-green-800"
                        }`}
                    >
                      {task.priority}
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    {task.createdAt ? formatDate(task.createdAt) : "N/A"}
                  </td>

                  <td className="px-6 py-4">
                    {task.dueDate ? formatDate(task.dueDate) : "N/A"}
                  </td>

                  <td className="px-6 py-4">
                    {task.assignedTo?.name || (
                      <span className="text-gray-400">Unassigned</span>
                    )}
                  </td>
                  <td className="px-6 py-4 flex items-center gap-2">
                    <button
                      onClick={() => setSelectedTask(task)}
                      className="px-3 py-1 text-xs cursor-pointer bg-blue-600 hover:bg-blue-700 text-white rounded"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(task._id)}
                      className="px-3 py-1 text-xs cursor-pointer bg-red-600 hover:bg-red-700 text-white rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-4 text-gray-500">
                  No tasks found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-4 gap-2">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-3 py-1 cursor-pointer bg-gray-300 rounded hover:bg-gray-400 disabled:opacity-50"
          >
            Prev
          </button>
          {Array.from({ length: totalPages }, (_, idx) => (
            <button
              key={idx + 1}
              onClick={() => handlePageChange(idx + 1)}
              className={`px-3 py-1 rounded ${currentPage === idx + 1
                ? "bg-purple-600 text-white"
                : "bg-gray-200 hover:bg-gray-300"
                }`}
            >
              {idx + 1}
            </button>
          ))}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-3 py-1 cursor-pointer bg-gray-300 rounded hover:bg-gray-400 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}

      {/* Edit Modal */}
      {selectedTask && (
        <EditTaskModal
          open={!!selectedTask}
          onClose={() => setSelectedTask(null)}
          task={selectedTask}
          user={user}
        />
      )}
    </div>
  );
}
