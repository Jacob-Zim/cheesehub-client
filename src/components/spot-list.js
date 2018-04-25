import React from 'react';

import {connect} from 'react-redux';

import {fetchSpots, createSpotInitiate, createSpot, createSpotForm} from '../actions/spot';

import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps';

export class SpotList extends React.Component {

    componentDidMount() {
        this.props.dispatch(fetchSpots());
    }

    getClickedPosition(event) {
        const xPos = event.pixel.x;
        const yPos = event.pixel.y;
        const lat = event.latLng.lat();
        const lng = event.latLng.lng();
        this.props.dispatch(createSpotForm(xPos, yPos, lat, lng));
    }

    createSpot(lat, lng, name, notes, rating) {
        console.log("GOT TO THE CREATE SPOT");
        this.props.dispatch(createSpot(lat, lng, name, notes, rating));
    }

    initiateCreateMarker(props) {
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
        let form;
        if (this.props.spotList.newSpot) {
            form = <div className="spotForm">
                <form onSubmit={(e) => {
                    e.preventDefault()
                    this.createSpot(
                        this.props.spotList.newSpot.lat, 
                        this.props.spotList.newSpot.lng,
                        e.target.spotName.value,
                        e.target.spotDesc.value,
                        e.target.spotRating.value
                        )
                }
            }
                style={ {position: 'fixed', top: this.props.spotList.newSpot.y, left: this.props.spotList.newSpot.x} }>
                    <input id="spotName" type="text"></input>
                    <label htmlFor="spotName">name</label>
                    <input id="spotDesc" type="text"></input>
                    <label htmlFor="spotDesc">notes</label>
                    <input id="spotRating" type="number"></input>
                    <label htmlFor="spotRating">rating</label>
                    <button></button>
                </form>
            </div>
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
            <button className="createBtn" onClick={() => this.initiateCreateMarker(this.props)}>+</button>
            {form}
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    spotList: state
});

export default connect(mapStateToProps)(SpotList);