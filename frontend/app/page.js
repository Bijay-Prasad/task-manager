"use client";

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTasks } from './State/Task/Action';
import Navbar from './Components/Navbar';
import TaskCard from './Components/TaskCard';
import { useRouter } from 'next/navigation';

export default function Dashboard() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { tasks } = useSelector((state) => state.tasks);
  const { jwt } = useSelector((state) => state.user);

  useEffect(() => {
    if (!jwt) {
      router.push('/register');
    } else {
      dispatch(getTasks());
    }
  }, [jwt, dispatch, router]);

  if (!jwt) {
    return <div>Redirecting...</div>;
  }

  return (
    <div>
      <Navbar />
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-6 text-center text-purple-700">Your Tasks</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {tasks.map((task) => (
            <TaskCard key={task._id} task={task} />
          ))}
        </div>
      </div>
    </div>
  );
}
