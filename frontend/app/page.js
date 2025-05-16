"use client";

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTasks } from './State/Task/Action';
import Navbar from './Components/Navbar';
import TaskCard from './Components/TaskCard';
import TaskForm from './Components/TaskForm';
import { useRouter } from 'next/navigation';

export default function Dashboard() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { tasks } = useSelector((state) => state.tasks);
  const { jwt, user } = useSelector((state) => state.user);
  const [showForm, setShowForm] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");

  useEffect(() => {
    if (!jwt) {
      router.push('/login');
    } else {
      if (user?.role === "ADMIN") {
        router.push("/unauthorized");
      } else {
        dispatch(getTasks());
      }
    }
  }, [jwt, dispatch, router, user]);

  const isManagerOrAdmin = user?.role === 'MANAGER' || user?.role === 'ADMIN';

  const handleCreateTask = () => setShowForm(!showForm);
  const handleFormClose = () => setShowForm(false);

  const filteredTasks = tasks?.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter ? task.status === statusFilter : true;
    const matchesPriority = priorityFilter ? task.priority === priorityFilter : true;

    const matchesDate = dateFilter ? new Date(task.dueDate).toISOString().split('T')[0] === dateFilter : true;

    return matchesSearch && matchesStatus && matchesPriority && matchesDate;
  });

  const resetFilters = () => {
    setSearchQuery("");
    setStatusFilter("");
    setPriorityFilter("");
    setDateFilter("");
  };

  return (
    <div className="relative min-h-screen bg-gray-50">
      <Navbar />

      <div className="p-6">
        <h1 className="text-3xl font-bold mb-6 text-center text-purple-700">
          {user?.role === "USER" ? "Your Tasks" : "Created Tasks"}
        </h1>

        {/* Search & Filters */}
        <div className="flex flex-col md:flex-row md:items-center gap-4 mb-10">
          <input
            type="text"
            placeholder="Search by title or description..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full md:w-1/3 px-4 py-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
          />

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 border rounded shadow-sm bg-white"
          >
            <option value="">All Statuses</option>
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>

          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            className="px-3 py-2 border rounded shadow-sm bg-white"
          >
            <option value="">All Priorities</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>

          <input
            type="date"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="px-3 py-2 border rounded shadow-sm bg-white"
          />
          {/* Reset Filters Button */}
          <div>
            <button
              onClick={resetFilters}
              className="text-sm cursor-pointer bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded transition-all duration-300"
            >
              Reset Filters
            </button>
          </div>
        </div>


        {/* Task List */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredTasks?.length > 0 ? (
            filteredTasks.map((task) => <TaskCard key={task._id} task={task} />)
          ) : (
            <div className="text-center col-span-full text-gray-500">No tasks found.</div>
          )}
        </div>
      </div>

      {/* Add Task Button */}
      {isManagerOrAdmin && !showForm && (
        <button
          onClick={handleCreateTask}
          className="fixed bottom-6 right-6 bg-purple-600 text-white p-4 h-14 w-14 cursor-pointer rounded-full shadow-lg hover:bg-purple-700 transition-all duration-300 transform hover:scale-110 z-50"
        >
          +
        </button>
      )}

      {/* Slide-in Task Form */}
      {isManagerOrAdmin && (
        <div className={`fixed top-0 right-0 h-full w-full sm:w-1/2 md:w-1/3 bg-white shadow-2xl z-40 transform transition-transform duration-500 ease-in-out ${showForm ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="flex justify-between items-center px-4 py-2 border-b mb-5">
            <h2 className="text-xl font-semibold text-purple-700">Create New Task</h2>
            <button onClick={handleFormClose} className="text-gray-600 hover:text-red-500 text-2xl font-bold">
              ×
            </button>
          </div>
          <div className="p-4">
            <TaskForm onSuccess={handleFormClose} />
          </div>
        </div>
      )}
    </div>
  );
}
