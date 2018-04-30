import {
    SET_AUTH_TOKEN
} from '../actions/auth';
const initialState = {
  authToken: null,
  loading: false,
  error: null
};

export default function authReducer(state = initialState, action) {
    if (action.type === SET_AUTH_TOKEN) {
        return Object.assign({}, state, {
            authToken: action.authToken
        });
    }
    return state;
}