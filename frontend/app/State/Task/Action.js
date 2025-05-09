import { api, createApiInstance } from "@/app/config/apiConfig";
import { CREATE_TASK_FAILURE, CREATE_TASK_REQUEST, CREATE_TASK_SUCCESS, DELETE_TASK_FAILURE, DELETE_TASK_REQUEST, DELETE_TASK_SUCCESS, GET_TASKS_FAILURE, GET_TASKS_REQUEST, GET_TASKS_SUCCESS, UPDATE_TASK_FAILURE, UPDATE_TASK_REQUEST, UPDATE_TASK_SUCCESS } from "./ActionType";


export const createTask = (task) => async (dispatch) => {
    const api = createApiInstance();
    dispatch({ type: CREATE_TASK_REQUEST });
    try {
        const { data } = await api.post(`${process.env.NEXT_PUBLIC_API_URL}/api/tasks`, task);
        dispatch({ type: CREATE_TASK_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: CREATE_TASK_FAILURE, payload: error.message });
    }
};

export const getTasks = () => async (dispatch) => {
    const api = createApiInstance();
    dispatch({ type: GET_TASKS_REQUEST });
    try {
        const { data } = await api.get(`${process.env.NEXT_PUBLIC_API_URL}/api/tasks`);
        dispatch({ type: GET_TASKS_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: GET_TASKS_FAILURE, payload: error.message });
    }
};

export const updateTask = (taskId, updateData) => async (dispatch) => {
    const api = createApiInstance();
    dispatch({ type: UPDATE_TASK_REQUEST });
    try {
        const { data } = await api.put(`${process.env.NEXT_PUBLIC_API_URL}/api/tasks/${taskId}`, updateData);
        dispatch({ type: UPDATE_TASK_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: UPDATE_TASK_FAILURE, payload: error.message });
    }
};

export const deleteTask = (taskId) => async (dispatch) => {
    const api = createApiInstance();
    dispatch({ type: DELETE_TASK_REQUEST });
    try {
        const { data } = await api.delete(`${process.env.NEXT_PUBLIC_API_URL}/api/tasks/${taskId}`);
        dispatch({ type: DELETE_TASK_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: DELETE_TASK_FAILURE });
    }
};
