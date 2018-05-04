import React from 'react';

import {connect} from 'react-redux';

import "./map.css";
import "./infoPopup.css"

import {getInfo} from '../actions/spot';

export class infoPopup extends React.Component {
    render() {
    return(
        <div className="infoBoxBkg infoPopupBox">
        <button className="infoBoxCloseBtn infoPopupClose" onClick={() => this.props.dispatch(getInfo())}>X</button>
            <h2 className="infoTextTitle">About</h2>
            <p>SkateSpot Finder provides the abilities to see 
                where others are skating and post the spots one frequents!
                For starts, you can see other user's submissions.
                
                To create a spot, log in and double click on the location you'd like to save
                
                To Edit or Delete a spot, hover over one of your spots and click on the corresponding buttons to
                peform these actions
            </p>
        </div>
    )
}
}

const mapStateToProps = (state) => ({
    spotList: state.spot,
    auth: state.auth
});

export default connect(mapStateToProps)(infoPopup);