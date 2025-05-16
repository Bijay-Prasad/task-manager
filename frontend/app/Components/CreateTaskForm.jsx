'use client';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createTask } from '../State/Task/Action';
import { createApiInstance } from '../config/apiConfig';

export default function CreateTaskForm() {
    const dispatch = useDispatch();
    const { jwt } = useSelector(state => state.user);
    const [users, setUsers] = useState([]);
    const [form, setForm] = useState({
        title: '',
        description: '',
        dueDate: '',
        priority: 'Medium',
        status: 'Pending',
        assignedTo: ''
    });

    useEffect(() => {
        async function fetchUsers() {
            const api = createApiInstance();
            const res = await api.get('/api/users');
            setUsers(res.data);
        }
        if (jwt) fetchUsers();
    }, [jwt]);

    const handleChange = e => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = e => {
        e.preventDefault();
        // console.log("form-data:", form);
        dispatch(createTask(form));
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-xl shadow-md w-full max-w-lg">
            <h2 className="text-xl font-bold">Create Task</h2>
            <input className="w-full p-2 border rounded" name="title" placeholder="Title" onChange={handleChange} required />
            <textarea className="w-full p-2 border rounded" name="description" placeholder="Description" onChange={handleChange} required />
            <input type="date" name="dueDate" className="w-full p-2 border rounded" onChange={handleChange} required />

            <select name="priority" className="w-full p-2 border rounded" onChange={handleChange} defaultValue="Medium">
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
            </select>

            <select name="status" className="w-full p-2 border rounded" onChange={handleChange}>
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
            </select>

            <select name="assignedTo" className="w-full p-2 border rounded" onChange={handleChange}>
                <option value="">Unassigned</option>
                {users.map(user => (
                    <option key={user._id} value={user._id}>{user.name}</option>
                ))}
            </select>

            <button type="submit" className="w-full bg-purple-600 text-white p-2 rounded hover:bg-purple-700">
                Create Task
            </button>
        </form>
    );
}
