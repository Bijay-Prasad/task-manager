import { LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT, REGISTER_FAILURE, REGISTER_REQUEST, REGISTER_SUCCESS, STORE_JWT } from "./ActionType";

const initialState = {
    user: null,
    jwt:  typeof window !== "undefined" ? localStorage.getItem("jwt") : null,
    loading: false,
    error: null,
};

export default function userReducer(state = initialState, action) {
    switch (action.type) {
        case REGISTER_REQUEST:
        case LOGIN_REQUEST:
            return { ...state, loading: true, error: null };

        case REGISTER_SUCCESS:
            return { ...state, loading: false, error: null };

        case LOGIN_SUCCESS:
            return { user: action.payload.user, jwt: action.payload.token, loading: false, error: null };

        case REGISTER_FAILURE:
        case LOGIN_FAILURE:
            return { ...state, loading: false, error: action.payload };
        
        case LOGOUT:
            return { ...state, jwt: null };

        case STORE_JWT:
            return { ...state, jwt: action.payload };

        default:
            return state;
    }
}