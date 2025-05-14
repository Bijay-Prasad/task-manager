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
  console.log("tasks:", tasks);
  
  const { jwt, user } = useSelector((state) => state.user);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    if (!jwt) {
      router.push('/register');
    } else {
      dispatch(getTasks());
    }
  }, [jwt, dispatch, router]);

  const handleCreateTask = () => {
    setShowForm(!showForm);
  };

  const handleFormClose = () => {
    setShowForm(false);
  };

  const isManagerOrAdmin = user?.role === 'MANAGER' || user?.role === 'ADMIN';

  if (!jwt) return <div>Redirecting...</div>;

  return (
    <div className="relative min-h-screen bg-gray-50">
      <Navbar />

      <div className="p-6">
        <h1 className="text-3xl font-bold mb-6 text-center text-purple-700">{user?.role === "USER" ? "Your Tasks" : "Created Tasks"}</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {tasks.map((task) => (
            <TaskCard key={task._id} task={task} />
          ))}
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

      {/* Slide-in Form */}
      {isManagerOrAdmin && (
        <div
          className={`fixed top-0 right-0 h-full w-full sm:w-1/2 md:w-1/3 bg-white shadow-2xl z-40 transform transition-transform duration-500 ease-in-out ${
            showForm ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
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
