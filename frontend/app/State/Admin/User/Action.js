"use client";
import { createApiInstance } from '@/app/config/apiConfig';
import { DELETE_USER_FAILURE, DELETE_USER_REQUEST, DELETE_USER_SUCCESS, GET_ALL_TASKS_FAILURE, GET_ALL_TASKS_REQUEST, GET_ALL_TASKS_SUCCESS, GET_ALL_USERS_FAILURE, GET_ALL_USERS_REQUEST, GET_ALL_USERS_SUCCESS, UPDATE_USER_ROLE_REQUEST } from './ActionType';


export const getAllTasks = () => async (dispatch) => {
    const api = createApiInstance();
    dispatch({ type: GET_ALL_TASKS_REQUEST });
    try {
        const { data } = await api.get(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/tasks`);
        dispatch({ type: GET_ALL_TASKS_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: GET_ALL_TASKS_FAILURE, payload: error.message });
    }
};


export const getAllUsers = () => async dispatch => {
    const api = createApiInstance();
    dispatch({ type: GET_ALL_USERS_REQUEST });

    try {
        const { data } = await api.get(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/users`);
        // console.log("data:", data);

        dispatch({ type: GET_ALL_USERS_SUCCESS, payload: data });
        return data;
    } catch (error) {
        // console.log("error:", error);

        const errorMessage = error.response?.data?.msg || "Something went wrong";
        dispatch({ type: GET_ALL_USERS_FAILURE, payload: errorMessage });
    }
};



export const updateUserRole = (id, updateRole) => async dispatch => {
    const api = createApiInstance();
    dispatch({ type: UPDATE_USER_ROLE_REQUEST });

    try {
        await api.patch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/user/${id}/role`, updateRole);

        dispatch({ type: GET_ALL_USERS_SUCCESS });
    } catch (error) {
        // console.log("error:", error);

        const errorMessage = error.response?.data?.msg || "Something went wrong";
        dispatch({ type: GET_ALL_USERS_FAILURE, payload: errorMessage });
    }
};


export const deleteUser = (id) => async dispatch => {
    const api = createApiInstance();
    dispatch({ type: DELETE_USER_REQUEST });

    try {
        await api.delete(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/user/${id}`);

        dispatch({ type: DELETE_USER_SUCCESS });
    } catch (error) {
        // console.log("error:", error);

        const errorMessage = error.response?.data?.msg || "Something went wrong";
        dispatch({ type: DELETE_USER_FAILURE, payload: errorMessage });
    }
};