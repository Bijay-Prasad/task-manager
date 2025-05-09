"use client";

import axios from 'axios';
import { LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT, REGISTER_FAILURE, REGISTER_REQUEST, STORE_JWT } from './ActionType';

const storeJwt = (token) => {
    localStorage.setItem("jwt", token);
    return { type: STORE_JWT, payload: token };
};

export const login = (loginData) => async dispatch => {
    dispatch({ type: LOGIN_REQUEST });
    console.log(loginData);
    console.log("env:", process.env.NEXT_PUBLIC_API_URL);
    
    
    
    try {
        const { data } = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`, loginData);
        const { token, user } = data;
        console.log("data:", data);
        

        if (token) {
            await dispatch(storeJwt(token));
            dispatch({ type: LOGIN_SUCCESS, payload: data});
            return user;
        }
        throw new Error("Authentication token missing in response");
    } catch (error) {
        dispatch({ type: LOGIN_FAILURE, payload: error.message });
    }
};

export const register = (name, email, password) => async dispatch => {
    dispatch({ type: REGISTER_REQUEST })
    try {
        const { data } = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/register`, { name, email, password });
        dispatch({ type: REGISTER_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: REGISTER_FAILURE, payload: error.message });
    }
};

export const logout = () => (dispatch) => {
    localStorage.removeItem("jwt");
    dispatch({ type: LOGOUT });
};