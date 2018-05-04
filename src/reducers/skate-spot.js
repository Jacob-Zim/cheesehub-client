
import {
    FETCH_SPOT_REQUEST,
    FETCH_SPOT_SUCCESS,
    FETCH_SPOT_ERROR,
    CREATE_SPOT_INITIATE,
    CREATE_SPOT_CANCEL,
    CREATE_SPOT_SUCCESS,
    CREATE_SPOT_FORM,
    DELETE_SPOT_INITIATE,
    DELETE_SPOT_SUCCESS,
    FETCH_ONE_SPOT_SUCCESS,
    CLOSE_SPOT,
    EDIT_SPOT,
    EDIT_SPOT_SUCCESS,
    CANCEL_EDIT,
    SET_MAP,
    GET_INFO
} from '../actions/spot';

const initialState = {
  defaultZoom: 5,
  defaultCenter: { lat: 40.44, lng: -109.56 },
  spots: [],
  loading: false,
  error: null,
  creating: false,
  deleting: false,
  newSpot: false,
  hoverSpot: false,
  editing: false,
  _map: false,
  info: false
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
    else if (action.type === CREATE_SPOT_CANCEL) {
        return Object.assign({}, state, {
            creating: false,
            newSpot: false
        });
    }
    else if (action.type === DELETE_SPOT_INITIATE) {
        return Object.assign({}, state, {
            deleting: true
        });
    }
    else if (action.type === DELETE_SPOT_SUCCESS) {
        const lat = action.lat;
        const lng = action.lng;
        const testSpot = state.spots.filter(spot => spot.lat === lat || spot.lng === lng);
        let newSpots;
        if (testSpot[0].userId === action.userId) {
            newSpots = state.spots.filter(spot => spot.lat !== lat || spot.lng !== lng);
        } else {
            newSpots = state.spots;
        }
        return Object.assign({}, state, {
            spots: newSpots,
            deleting: false,
            hoverSpot: false,
            editing: false,
            defaultCenter: { lat:action.lat, lng:action.lng}
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
                  rating:action.rating,
                  userId:action.userId,
                  image:action.image,
                  address:action.address
                }
            ],
            creating: false,
            newSpot: false
        });
    }
    else if (action.type === CREATE_SPOT_FORM) {
        return Object.assign({}, state, {
            newSpot: {x:action.x, y:action.y, lat:action.lat, lng:action.lng},
            defaultCenter: { lat:action.lat, lng:action.lng}
        });
    }
    else if (action.type === FETCH_ONE_SPOT_SUCCESS) {
        return Object.assign({}, state, {
            hoverSpot: action.hoverSpot,
            defaultCenter: { lat:action.hoverSpot.lat, lng:action.hoverSpot.lng},
            defaultZoom: 15
        });
    }
    else if (action.type === CLOSE_SPOT) {
        return Object.assign({}, state, {
            hoverSpot: false,
            editing: false
        });
    }
    else if (action.type === CANCEL_EDIT) {
        return Object.assign({}, state, {
            editing: false
        });
    }
    else if (action.type === EDIT_SPOT) {
        return Object.assign({}, state, {
            editing: true
        });
    }
    else if (action.type === EDIT_SPOT_SUCCESS) {
        const editedSpot = action.spot;
        console.log(editedSpot);
        const newSpotList = state.spots.map(spot => {
            if (editedSpot.lat === spot.lat && editedSpot.lng === spot.lng) {
                return editedSpot;
            }
            else return spot;
    });
        return Object.assign({}, state, {
            spots: newSpotList,
            editing: false,
            hoverSpot: false
        });
    }
    else if (action.type === SET_MAP) {
        return Object.assign({}, state, {
            defaultCenter: action.latlng,
            defaultZoom: action.zoom
        });
    }
    else if (action.type === GET_INFO) {
        return Object.assign({}, state, {
            info: !state.info
        });
    }
    return state;
}