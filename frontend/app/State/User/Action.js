"use client";

import axios from 'axios';
import { GET_ALL_USERS_FAILURE, GET_ALL_USERS_REQUEST, GET_ALL_USERS_SUCCESS, LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT, REGISTER_FAILURE, REGISTER_REQUEST, REGISTER_SUCCESS, STORE_JWT } from './ActionType';
import { createApiInstance } from '@/app/config/apiConfig';

const storeJwt = (token) => {
    localStorage.setItem("jwt", token);
    return { type: STORE_JWT, payload: token };
};

export const login = (loginData) => async dispatch => {
    dispatch({ type: LOGIN_REQUEST });

    try {
        const { data } = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`, loginData);
        const { token, user } = data;

        if (token) {
            await dispatch(storeJwt(token));
            dispatch({ type: LOGIN_SUCCESS, payload: data });
            return user;
        }
        throw new Error("Authentication token missing in response");
    } catch (error) {
        const errorMessage = error.response?.data?.msg || "Something went wrong";
        dispatch({ type: LOGIN_FAILURE, payload: errorMessage });
    }
};

export const register = (registerData) => async dispatch => {
    dispatch({ type: REGISTER_REQUEST })
    try {
        const { data } = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/register`, registerData);
        console.log("data:", data);

        dispatch({ type: REGISTER_SUCCESS, payload: data });
    } catch (error) {
        console.log("error:", error);

        const errorMessage = error.response?.data?.msg || "Something went wrong";
        dispatch({ type: REGISTER_FAILURE, payload: errorMessage });
    }
};

export const logout = () => (dispatch) => {
    localStorage.removeItem("jwt");
    dispatch({ type: LOGOUT });
};


export const getAllUsers = () => async dispatch => {
    const api = createApiInstance();
    dispatch({ type: GET_ALL_USERS_REQUEST });

    try {
        const { data } = await api.get(`${process.env.NEXT_PUBLIC_API_URL}/api/users`);
        console.log("data:", data);

        dispatch({ type: GET_ALL_USERS_SUCCESS, payload: data });
        return data;
    } catch (error) {
        console.log("error:", error);

        const errorMessage = error.response?.data?.msg || "Something went wrong";
        dispatch({ type: GET_ALL_USERS_FAILURE, payload: errorMessage });
    }
};