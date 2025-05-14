"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../State/User/Action";
import { MdErrorOutline } from "react-icons/md";

export default function Login() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { jwt, error } = useSelector((state) => state.user);


  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (jwt) {
      router.push('/');
    }
  }, [jwt, router]);

  const handleSubmit = async (e) => {
    const loginData = { email, password };

    e.preventDefault();
    await dispatch(login(loginData));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center text-purple-600 mb-6">Login</h2>
        {error && (
          <div className="bg-red-100 text-red-700 p-3 rounded mb-4 flex items-center gap-5">
            <MdErrorOutline />
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <button
            type="submit"
            className="w-full bg-purple-600 text-white cursor-pointer py-3 rounded hover:bg-purple-700 transition duration-300"
          >
            Login
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Don&apos;t have an account?{' '}
            <span
              className="text-purple-600 cursor-pointer hover:underline"
              onClick={() => router.push('/register')}
            >
              Register
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
