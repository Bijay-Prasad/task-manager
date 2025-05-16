import { DELETE_USER_FAILURE, DELETE_USER_REQUEST, DELETE_USER_SUCCESS, GET_ALL_TASKS_FAILURE, GET_ALL_TASKS_REQUEST, GET_ALL_TASKS_SUCCESS, GET_ALL_USERS_FAILURE, GET_ALL_USERS_REQUEST, GET_ALL_USERS_SUCCESS, UPDATE_USER_ROLE_FAILURE, UPDATE_USER_ROLE_REQUEST, UPDATE_USER_ROLE_SUCCESS } from "./ActionType";


const initialState = {
    users: [],
    tasks: [],
    loading: false,
    error: null,
};

export default function userReducer(state = initialState, action) {
    switch (action.type) {
        case GET_ALL_TASKS_REQUEST:
        case GET_ALL_USERS_REQUEST:
        case UPDATE_USER_ROLE_REQUEST:
        case DELETE_USER_REQUEST:
            return { ...state, loading: true, error: null };

        case GET_ALL_TASKS_SUCCESS:
            return { ...state, loading: false, error: null, tasks: action.payload };

        case GET_ALL_USERS_SUCCESS:
            return { ...state, loading: false, error: null, users: action.payload };

        case UPDATE_USER_ROLE_SUCCESS:
            return { ...state, loading: false, error: null };

        case DELETE_USER_SUCCESS:
            return { ...state, loading: false, error: null };

        case GET_ALL_TASKS_FAILURE:
        case GET_ALL_USERS_FAILURE:
        case UPDATE_USER_ROLE_FAILURE:
        case DELETE_USER_FAILURE:
            return { ...state, loading: false, error: action.payload };        

        default:
            return state;
    }
}