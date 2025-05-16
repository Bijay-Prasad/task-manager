"use client";

import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { register } from '../State/User/Action';
import { MdErrorOutline } from "react-icons/md";

export default function Register() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { jwt, user, error, loading } = useSelector((state) => state.user);
  const userData = useSelector((state) => state.user);

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
  });

  // console.log("userData:", userData);
  

  useEffect(() => {
    if (user && user.role === "ADMIN") {
      router.push('/admin');
    }
    else if(user){
      router.push('/');
    }
  }, [user, router]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    // console.log(form);
    
    e.preventDefault();
    dispatch(register(form));
  };


  if (jwt) return <div>Redirecting...</div>;

  if(loading) return <div>loading...</div>;

  // if(error) return <div>{error}</div>;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center text-purple-600 mb-6">Register</h2>
        {error && (
          <div className="bg-red-100 text-red-700 p-3 rounded mb-4 flex items-center gap-5">
            <MdErrorOutline/>
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <button
            type="submit"
            className="w-full bg-purple-600 text-white cursor-pointer py-3 rounded hover:bg-purple-700 transition duration-300"
          >
            Register
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Already have an account?{' '}
            <span
              className="text-purple-600 cursor-pointer hover:underline"
              onClick={() => router.push('/login')}
            >
              Login
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
