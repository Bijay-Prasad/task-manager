import { CREATE_TASK_FAILURE, CREATE_TASK_REQUEST, CREATE_TASK_SUCCESS, DELETE_TASK_FAILURE, DELETE_TASK_REQUEST, DELETE_TASK_SUCCESS, GET_TASKS_FAILURE, GET_TASKS_REQUEST, GET_TASKS_SUCCESS, UPDATE_TASK_FAILURE, UPDATE_TASK_REQUEST, UPDATE_TASK_SUCCESS } from "./ActionType";


const initialState = {
    task: null,
    tasks: [],
    loading: false,
    error: null,
};

export default function taskReducer(state = initialState, action) {
    switch (action.type) {
        case GET_TASKS_REQUEST:
        case CREATE_TASK_REQUEST:
        case UPDATE_TASK_REQUEST:
        case DELETE_TASK_REQUEST:
            return { ...state, loading: true, error: null };

        case GET_TASKS_SUCCESS:
            return { task: null, tasks: action.payload, loading: false, error: null };

        case CREATE_TASK_SUCCESS:
            return { ...state, task: action.payload, loading: false, error: null };
        
        case UPDATE_TASK_SUCCESS:
            return { ...state, task: action.payload, loading: false, error: null };

        case DELETE_TASK_SUCCESS:
            return { tasks: state.tasks.filter(task => task._id !== action.payload), loading: false, error: null };

        case GET_TASKS_FAILURE:
        case CREATE_TASK_FAILURE:
        case UPDATE_TASK_FAILURE:
        case DELETE_TASK_FAILURE:
            return { ...state, loading: true, error: action.payload };
            
        default:
            return state;
    }
}
