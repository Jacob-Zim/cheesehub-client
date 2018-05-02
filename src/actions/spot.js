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

export const FETCH_ONE_SPOT_SUCCESS = 'FETCH_ONE_SPOT_SUCCESS';
export const fetchOneSpotSuccess = (res) => ({
    type: FETCH_ONE_SPOT_SUCCESS,
    hoverSpot: res
});

export const CLOSE_SPOT = 'CLOSE_SPOT';
export const closeSpot = () => ({
    type: CLOSE_SPOT
})

export const FETCH_SPOT_ERROR = 'FETCH_SPOT_ERROR';
export const fetchSpotError = (err) => ({
    type: FETCH_SPOT_ERROR,
    error: err
});

export const CREATE_SPOT_INITIATE = 'CREATE_SPOT_INITIATE';
export const createSpotInitiate = () => ({
    type: CREATE_SPOT_INITIATE
})

export const EDIT_SPOT = 'EDIT_SPOT';
export const editSpot = () => ({
    type: EDIT_SPOT
})

export const DELETE_SPOT_INITIATE = 'DELETE_SPOT_INITIATE';
export const deleteSpotInitiate = () => ({
    type: DELETE_SPOT_INITIATE
})

export const DELETE_SPOT_SUCCESS = 'DELETE_SPOT_SUCCESS';
export const deleteSpotSuccess = (lat, lng) => ({
    type: DELETE_SPOT_SUCCESS,
    lat,
    lng
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

export const EDIT_SPOT_SUCCESS = 'EDIT_SPOT_SUCCESS';
export const editSpotSuccess = (spot) => ({
    type: EDIT_SPOT_SUCCESS,
    spot
})

export const SET_MAP = 'SET_MAP';
export const setMap = (latlng, zoom) => ({
    type: SET_MAP,
    latlng,
    zoom
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

export const createSpot = (lat, lng, name, notes, rating, authToken, userId) => (dispatch) => {

    const data = new URLSearchParams();
    data.append('lat', lat);
    data.append('lng', lng);
    data.append('name', name);
    data.append('notes', notes);
    data.append('rating', rating);
    data.append('userId', userId)
    return (
        fetch(`${API_BASE_URL}/spots`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${authToken}`,
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

export const fetchSpot = (lat, lng) => dispatch => {
    let id;
    fetch(`${API_BASE_URL}/spots`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(res => res.json())
    .then(spots => {
        id = spots.filter(spot => spot.lat === lat && spot.lng === lng)[0].id;
        return (fetch(`${API_BASE_URL}/spots/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        )
    })
    .then(res => res.json())
    .then(spot => dispatch(fetchOneSpotSuccess(spot)));
}

export const deleteSpot = (lat, lng, authToken, userId) => dispatch => {
    const data = new URLSearchParams();
    data.append('userId', userId);
    let id;
    fetch(`${API_BASE_URL}/spots`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(res => res.json())
    .then(spots => {
        id = spots.filter(spot => spot.lat === lat && spot.lng === lng)[0].id;
        return (fetch(`${API_BASE_URL}/spots/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${authToken}`,
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: data
        })
        )
    })
    .then(res => res.json())
    .then(res => {dispatch(deleteSpotSuccess(lat, lng))});
}

export const submitEditSpot = (lat, lng, name, notes, rating, authToken, userId) => dispatch => {
    let id;
    var data = new URLSearchParams();
    data.append('lat', lat);
    data.append('lng', lng);
    data.append('name', name);
    data.append('notes', notes);
    data.append('rating', rating);
    data.append('userId', userId);
    fetch(`${API_BASE_URL}/spots`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(res => res.json())
    .then(spots => {
        id = spots.filter(spot => spot.lat === lat && spot.lng === lng)[0].id;
        return (fetch(`${API_BASE_URL}/spots/${id}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${authToken}`,
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: data,
        })
        )
    })
    .then(res => res.json())
    .then(spot => {dispatch(editSpotSuccess(spot))});
}
