import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import SpotList from './components/spot-list';
import registerServiceWorker from './registerServiceWorker';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import spotReducer from './reducers/skate-spot';

const store = createStore(spotReducer, applyMiddleware(thunk));

ReactDOM.render(
<Provider store={store}>
    <SpotList />
</Provider>
,
 document.getElementById('root'));
registerServiceWorker();
