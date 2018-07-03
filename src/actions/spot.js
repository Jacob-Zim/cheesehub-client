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

export const GET_INFO = 'GET_INFO';
export const getInfo = () => ({
    type: GET_INFO
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

export const CREATE_SPOT_CANCEL = 'CREATE_SPOT_CANCEL';
export const createSpotCancel = () => ({
    type: CREATE_SPOT_CANCEL
})

export const EDIT_SPOT = 'EDIT_SPOT';
export const editSpot = () => ({
    type: EDIT_SPOT
})

export const CANCEL_EDIT = 'CANCEL_EDIT';
export const cancelEdit = () => ({
    type: CANCEL_EDIT
})

export const DELETE_SPOT_INITIATE = 'DELETE_SPOT_INITIATE';
export const deleteSpotInitiate = () => ({
    type: DELETE_SPOT_INITIATE
})

export const DELETE_SPOT_SUCCESS = 'DELETE_SPOT_SUCCESS';
export const deleteSpotSuccess = (lat, lng, userId) => ({
    type: DELETE_SPOT_SUCCESS,
    lat,
    lng,
    userId
})

export const CREATE_SPOT_SUCCESS = 'CREATE_SPOT_SUCCESS';
export const createSpotSuccess = (lat, lng, name, notes, rating, address, image, userId) => ({
    type: CREATE_SPOT_SUCCESS,
    lat,
    lng,
    name,
    notes,
    rating,
    userId,
    address,
    image
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

export const createSpot = (lat, lng, name, notes, rating, address, image, authToken, userId) => (dispatch) => {

    return (
        fetch(`${API_BASE_URL}/spots`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${authToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({lat, lng, name, notes, rating, userId, image, address})
        })
        .then(res => res.json())
        .then(spot => {dispatch(createSpotSuccess(spot.lat, spot.lng, spot.name, spot.notes, spot.rating, spot.address, spot.image, userId))})
        .catch(err => {
            
        })
    )
}

export const fetchSpot = (lat, lng) => dispatch => {
    Number.prototype.toFixedDown = function(digits) {
        var re = new RegExp("(\\d+\\.\\d{" + digits + "})(\\d)"),
            m = this.toString().match(re);
        return m ? parseFloat(m[1]) : this.valueOf();
    };
    let id;
    fetch(`${API_BASE_URL}/spots`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(res => res.json())
    .then(spots => {
        id = spots.filter(spot => spot.lat.toFixedDown(3) === lat.toFixedDown(3) && spot.lng.toFixedDown(3) === lng.toFixedDown(3))[0].id;
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
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({userId})
        })
        )
    })
    .then(res => {dispatch(deleteSpotSuccess(lat, lng, userId))});
}

export const submitEditSpot = (lat, lng, name, notes, rating, address, image, authToken, userId) => dispatch => {
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
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${authToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({lat, lng, name, notes, rating, userId, address, image}),
        })
        )
    })
    .then(res => res.json())
    .then(spot => {dispatch(editSpotSuccess(spot))});
}
