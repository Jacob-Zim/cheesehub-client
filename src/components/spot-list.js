import React from 'react';

import {connect} from 'react-redux';

import {fetchSpots, createSpotInitiate, createSpot} from '../actions/spot';

import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps';

export class SpotList extends React.Component {

    componentDidMount() {
        this.props.dispatch(fetchSpots());
    }

    getClickedPosition(event) {
        const lat = event.latLng.lat();
        const lng = event.latLng.lng();
        console.log(lat,lng);
        this.props.dispatch(createSpot(lat, lng));
    }

    createMarker(props) {
        // updates the state to allow for spot creation (creating:true)
        console.log("GOT HERE", props);
        props.dispatch(createSpotInitiate())
    }

    render() {
        let list
        if (this.props.spotList) {
            console.log(this.props);
            if (this.props.spotList.spots) {
                list =  this.props.spotList.spots.map((spot) => <Marker position={{ lat: spot.lat, lng: spot.lng }}></Marker>);
            }
        }
        //if the create marker component is used
        let MyMap;
        console.log("MY MAP",this.props.spotList.creating);
        if (this.props.spotList.creating) {
            MyMap = withScriptjs(withGoogleMap((/*PROPS HERE*/) => 
                <GoogleMap 
                defaultZoom={8}
                defaultCenter={{ lat: -34.397, lng: 150.64 }}
                onClick={e => this.getClickedPosition(e)}
                >
                    {list}
                </GoogleMap>
                ));
            }
        else {
            MyMap = withScriptjs(withGoogleMap((/*PROPS HERE*/) => 
                <GoogleMap 
                defaultZoom={8}
                defaultCenter={{ lat: -34.397, lng: 150.64 }}
                >
                    {list}
                </GoogleMap>
                ));
        }
        return (
            <div className="map-container">
            <div className="map">
            <MyMap
                    googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyD9t7sxzQrg5KAG4FG7CFbX-ghGbqtktH0&v=3.exp&libraries=geometry,drawing,places"
                    loadingElement={<div style={{ height: `100%` }} />}
                    containerElement={<div style={{ height: `600px` }} />}
                    mapElement={<div style={{ height: `100%` }} />}
                />
            </div>
            <button className="createBtn" onClick={() => this.createMarker(this.props)}>+</button>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    spotList: state
});

export default connect(mapStateToProps)(SpotList);