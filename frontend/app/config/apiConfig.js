"use client";

import axios from 'axios';

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const createApiInstance = () => {
    const jwt = typeof window !== "undefined" ? localStorage.getItem("jwt") : null;

    return axios.create({
        baseURL: API_BASE_URL,
        headers: {
            "Authorization": jwt ? `Bearer ${jwt}` : "",
            "Content-Type": "application/json",
        },
    });
};