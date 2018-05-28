import {
    SET_AUTH_TOKEN,
    CLEAR_AUTH,
    AUTH_REQUEST,
    AUTH_SUCCESS,
    AUTH_ERROR,
    REGISTER
} from '../actions/auth';
const initialState = {
  authToken: null,
  currentUser: null,
  loading: false,
  error: null,
  register: false
};

export default function authReducer(state = initialState, action) {
    if (action.type === SET_AUTH_TOKEN) {
        return Object.assign({}, state, {
            authToken: action.authToken
        });
    } else if (action.type === CLEAR_AUTH) {
        if (state.timeOut) {
            return Object.assign({}, state, {
                authToken: null,
                currentUser: null
            });
        } 
        return Object.assign({}, state, {
            authToken: null,
            currentUser: null
        });
    } else if (action.type === AUTH_REQUEST) {
        return Object.assign({}, state, {
            loading: true,
            error: null
        });
    } else if (action.type === AUTH_SUCCESS) {
        return Object.assign({}, state, {
            error: null,
            loading: false,
            currentUser: action.currentUser
        });
    } else if (action.type === AUTH_ERROR) {
        return Object.assign({}, state, {
            loading: false,
            error: action.error
        });
    } else if (action.type === REGISTER) {
        return Object.assign({}, state, {
            register:!state.register
        });
    }
    return state;
}