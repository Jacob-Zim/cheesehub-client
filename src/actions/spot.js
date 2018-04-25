import {API_BASE_URL} from '../config';

export const FETCH_SPOT_REQUEST = 'FETCH_SPOT_REQUEST';
export const fetchSpotRequest = () => ({
    type: FETCH_SPOT_REQUEST
});

export const FETCH_SPOT_SUCCESS = 'FETCH_SPOT_SUCCESS';
export const fetchSpotSuccess = (res) => ({
    type: FETCH_SPOT_SUCCESS,
    spots: res
});

export const FETCH_SPOT_ERROR = 'FETCH_SPOT_ERROR';
export const fetchSpotError = (err) => ({
    type: FETCH_SPOT_ERROR,
    error: err
});

export const CREATE_SPOT_INITIATE = 'CREATE_SPOT_INITIATE';
export const createSpotInitiate = () => ({
    type: CREATE_SPOT_INITIATE
})

export const CREATE_SPOT_SUCCESS = 'CREATE_SPOT_SUCCESS';
export const createSpotSuccess = (lat, lng, name, notes, rating) => ({
    type: CREATE_SPOT_SUCCESS,
    lat,
    lng,
    name,
    notes,
    rating
})

export const CREATE_SPOT_FORM = 'CREATE_SPOT_FORM';
export const createSpotForm = (x, y, lat, lng) => ({
    type: CREATE_SPOT_FORM,
    x,
    y,
    lat,
    lng
})

export const fetchSpots = () => dispatch => {
    return (
        fetch(`${API_BASE_URL}/spots`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(spots => dispatch(fetchSpotSuccess(spots)))
        .catch(err => {
            dispatch(fetchSpotError(err));
        })
    )
}

export const createSpot = (lat, lng, name, notes, rating) => dispatch => {
    console.log("IN THE ACTION",lat,lng);

    var data = new URLSearchParams();
    data.append('lat', lat);
    data.append('lng', lng);
    data.append('name', name);
    data.append('notes', notes);
    data.append('rating', rating);
    return (
        fetch(`${API_BASE_URL}/spots`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: data
        })
        .then(res => res.json())
        .then(spot => {dispatch(createSpotSuccess(spot.lat, spot.lng, spot.name, spot.notes, spot.rating))})
        .catch(err => {
            
        })
    )
}