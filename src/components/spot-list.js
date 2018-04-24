import React from 'react';

import {connect} from 'react-redux';

import {fetchSpots} from '../actions/spot';

import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps';

export class SpotList extends React.Component {

    componentDidMount() {
        this.props.dispatch(fetchSpots());
    }

    getClickedPosition(event) {
        const lat = event.latLng.lat();
        const lng = event.latLng.lng();
        console.log(lat,lng);
    }

    render() {
        let list
        if (this.props.spotList) {
            console.log(this.props);
            if (this.props.spotList.spots) {
                list =  this.props.spotList.spots.map((spot) => <Marker position={{ lat: spot.lat, lng: spot.lng }}></Marker>);
            }
        }
        const MyMap = withScriptjs(withGoogleMap((/*PROPS HERE*/) => 
                <GoogleMap 
                defaultZoom={8}
                defaultCenter={{ lat: -34.397, lng: 150.64 }}
                onClick={e => this.getClickedPosition(e)}
                >
                    {list}
                </GoogleMap>
                ));
        return (
            <div className="map">
            <MyMap
                    googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyD9t7sxzQrg5KAG4FG7CFbX-ghGbqtktH0&v=3.exp&libraries=geometry,drawing,places"
                    loadingElement={<div style={{ height: `100%` }} />}
                    containerElement={<div style={{ height: `600px` }} />}
                    mapElement={<div style={{ height: `100%` }} />}
                />
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    spotList: state
});

export default connect(mapStateToProps)(SpotList);