import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Map from './components/map';
import registerServiceWorker from './registerServiceWorker';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware, combineReducers} from 'redux';
import thunk from 'redux-thunk';
import spotReducer from './reducers/skate-spot';
import authReducer from './reducers/auth';
import { composeWithDevTools } from 'redux-devtools-extension';

const store = createStore(
    combineReducers({
        spot: spotReducer,
        auth: authReducer
    }), composeWithDevTools(applyMiddleware(thunk)));

ReactDOM.render(
<Provider store={store}>
    <Map />
</Provider>
,
 document.getElementById('root'));
registerServiceWorker();
