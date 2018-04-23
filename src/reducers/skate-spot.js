'use strict';

import {
    FETCH_SPOT_REQUEST,
    FETCH_SPOT_SUCCESS,
    FETCH_SPOT_ERROR
} from '../actions/spot';

const initialState = {
  spots: [],
  loading: false,
  error: null
};

export default function spotReducer(state = initialState, action) {
    if (action.type === FETCH_SPOT_REQUEST) {
        return Object.assign({}, state, {
            loading: true
        });
    }
    else if (action.type === FETCH_SPOT_SUCCESS) {
        return Object.assign({}, state, {
            loading: false,
            error: null,
            spots: action.spots
        });
    }
    else if (action.type === FETCH_SPOT_ERROR) {
        return Object.assign({}, state, {
            loading: false,
            error: action.error
        });
    }
}