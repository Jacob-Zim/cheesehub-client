'use strict';

import {
    FETCH_SPOT_REQUEST,
    FETCH_SPOT_SUCCESS,
    FETCH_SPOT_ERROR,
    CREATE_SPOT_INITIATE,
    CREATE_SPOT_SUCCESS,
    CREATE_SPOT_FORM
} from '../actions/spot';

const initialState = {
  spots: [],
  loading: false,
  error: null,
  creating: false,
  newSpot: false
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
            spots: [
                ...state.spots,
                { lat:action.lat,
                  lng:action.lng,
                  name:action.name,
                  notes:action.notes,
                  rating:action.rating
                }
            ],
            creating: false,
            newSpot: false
        });
    }
    else if (action.type === CREATE_SPOT_FORM) {
        return Object.assign({}, state, {
            newSpot: {x:action.x, y:action.y, lat:action.lat, lng:action.lng}
        });
    }
    return state;
}