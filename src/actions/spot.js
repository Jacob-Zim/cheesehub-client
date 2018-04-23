import {API_BASE_URL} from '../config';

export const FETCH_SPOT_REQUEST = 'FETCH_SPOT_REQUEST';
export const fetchSpotRequest = () => ({
    type: FETCH_SPOT_REQUEST
});

export const FETCH_SPOT_SUCCESS = 'FETCH_SPOT_SUCCESS';
export const fetchSpotSuccess = (res) => ({
    type: FETCH_SPOT_SUCCESS,
    cheeses: res
});

export const FETCH_SPOT_ERROR = 'FETCH_SPOT_ERROR';
export const fetchSpotError = (err) => ({
    type: FETCH_SPOT_ERROR,
    error: err
});

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