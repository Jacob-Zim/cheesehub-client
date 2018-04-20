import {API_BASE_URL} from '../config';

export const FETCH_CHEESE_REQUEST = 'FETCH_CHEESE_REQUEST';
export const fetchCheeseRequest = () => ({
    type: FETCH_CHEESE_REQUEST
});

export const FETCH_CHEESE_SUCCESS = 'FETCH_CHEESE_SUCCESS';
export const fetchCheeseSuccess = (res) => ({
    type: FETCH_CHEESE_SUCCESS,
    cheeses: res
});

export const FETCH_CHEESE_ERROR = 'FETCH_CHEESE_ERROR';
export const fetchCheeseError = (err) => ({
    type: FETCH_CHEESE_ERROR,
    error: err
});

export const fetchCheeses = () => dispatch => {
    return (
        fetch(`${API_BASE_URL}/cheeses`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(cheeses => dispatch(fetchCheeseSuccess(cheeses)))
        .catch(err => {
            dispatch(fetchCheeseError(err));
        })
    )
}