'use strict';

import {
    FETCH_SPOT_REQUEST,
    FETCH_SPOT_SUCCESS,
    FETCH_SPOT_ERROR,
    CREATE_SPOT_INITIATE,
    CREATE_SPOT_SUCCESS
} from '../actions/spot';

const initialState = {
  spots: [],
  loading: false,
  error: null,
  creating: false
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
    else if (action.type === CREATE_SPOT_INITIATE) {
        return Object.assign({}, state, {
            creating: true
        });
    }
    else if (action.type === CREATE_SPOT_SUCCESS) {
        return Object.assign({}, state, {
            spots: [...state.spots, {lat:action.lat,lng:action.lng}],
            creating: false
        });
    }
    return state;
}