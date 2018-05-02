/* eslint-disable no-undef */
import React from 'react';

import {connect} from 'react-redux';

import { bindActionCreators } from 'redux';

import Header from './header';

import './map.css';

import {
    fetchSpots,
    fetchSpot,
    createSpotInitiate, 
    deleteSpotInitiate, 
    createSpot, 
    deleteSpot, 
    createSpotForm, 
    closeSpot,
    editSpot,
    submitEditSpot,
    setMap
} from '../actions/spot';

import { 
    withScriptjs, 
    withGoogleMap,
    GoogleMap, 
    Marker
} from 'react-google-maps';

const { InfoBox } = require("react-google-maps/lib/components/addons/InfoBox");

export class SpotList extends React.Component {

    componentDidMount() {
        setTimeout(()=>{
            this.props.fetchSpots();
          },750);
    }

    getClickedPosition(event) {
        const xPos = event.pixel.x;
        const yPos = event.pixel.y;
        const lat = event.latLng.lat();
        const lng = event.latLng.lng();
        this.props.createSpotForm(xPos, yPos, lat, lng);
    }

    initiateCreateMarker(props) {
        // updates the state to allow for spot creation (creating:true)
        props.createSpotInitiate()
    }

    initiateDeleteMarker() {
        props.deleteSpotInitiate()
    }

    displaySpot(e, spot) {
        const lat = e.latLng.lat();
        const lng = e.latLng.lng();
        if (!this.props.spotList.hoverSpot || 
                (this.props.spotList.hoverSpot.lat !== spot.lat ||
                this.props.spotList.hoverSpot.lng !== spot.lng )) 
            {
                this.props.fetchSpot(lat, lng);
            }
    }

    // shouldComponentUpdate(nextProps, nextState) {
    //     if(this.props.spotList.defaultCenter.lat === nextProps.spotList.defaultCenter.lat){
    //         return false
    //       }else{
    //         return true
    //       }
    // }

    render() {
        let list
        if (this.props.spotList) {
            if (this.props.spotList.spots) {
                list =  this.props.spotList.spots.map((spot) => 
                <Marker 
                position={{ lat: spot.lat, lng: spot.lng }}
                 onMouseOver={ (e) => this.displaySpot(e, spot)}
                 icon={{
                     url: "https://www.svgrepo.com/show/175190/skateboard.svg",
                     scaledSize: new google.maps.Size(50, 50)
                 }}>
                 </Marker>);
            }
        }
        //if the create marker component is used
        let MyMap;
            MyMap = withScriptjs(withGoogleMap((props) => 
                <GoogleMap 
                zoom={props.zoom} //props.defaultZoom
                center={props.center} //props.center
                onDblClick={e => {this.getClickedPosition(e); if (this.props.spotList.hoverSpot) {this.props.closeSpot()}}}
                >
                    {list}
                </GoogleMap>
                ));
        let form;
        if (this.props.spotList.newSpot) {
            form = <div className="spotForm">
                <form onSubmit={(e) => {
                    e.preventDefault()
                    this.props.createSpot(
                        this.props.spotList.newSpot.lat,
                        this.props.spotList.newSpot.lng,
                        e.target.spotName.value,
                        e.target.spotDesc.value,
                        e.target.spotRating.value,
                        this.props.auth.authToken,
                        this.props.auth.currentUser
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

        if (this.props.spotList.hoverSpot) {
            let buttons;
            if (this.props.spotList.hoverSpot.userId === this.props.auth.currentUser) {
                buttons = 
                <div>
                    <button onClick={() => {this.props.editSpot()}}>EDIT</button>
                    <button onClick={() => {this.props.deleteSpot(this.props.spotList.hoverSpot.lat, this.props.spotList.hoverSpot.lng, this.props.auth.authToken, this.props.auth.currentUser)}}>DELETE</button>
                </div>
            }
            MyMap = withScriptjs(withGoogleMap((props) => 
                <GoogleMap 
                zoom={props.zoom}
                center={props.center}
                onDblClick={e => {this.getClickedPosition(e); if (this.props.spotList.hoverSpot) {this.props.closeSpot()}}}
                >
                    <InfoBox
            defaultPosition= {new google.maps.LatLng(this.props.spotList.hoverSpot.lat, this.props.spotList.hoverSpot.lng)}
            options={{ closeBoxURL: ``, enableEventPropagation: true }}
            >
                <div style={{ backgroundColor: `blue`, opacity: 0.5, padding: `12px` }}>
                    <div style={{ fontSize: `16px`, fontColor: `black` }}>
                        {this.props.spotList.hoverSpot.name}
                        {this.props.spotList.hoverSpot.notes}
                        {this.props.spotList.hoverSpot.rating}
                        {buttons}
                    </div>
                </div>
            </InfoBox>
                    {list}
                </GoogleMap>
                ));
        }

        if (this.props.spotList.editing) {
            MyMap = withScriptjs(withGoogleMap((props) => 
                <GoogleMap 
                zoom={props.zoom}
                center={props.center}
                >
                    <InfoBox
            defaultPosition= {new google.maps.LatLng(this.props.spotList.hoverSpot.lat, this.props.spotList.hoverSpot.lng)}
            options={{ closeBoxURL: ``, enableEventPropagation: true }}
            >
                <div style={{ backgroundColor: `blue`, opacity: 0.5, padding: `12px` }}>
                    <div style={{ fontSize: `16px`, fontColor: `#08233B` }}>
                    <form onSubmit={(e) => {
                        e.preventDefault();
                        this.props.submitEditSpot(
                        this.props.spotList.hoverSpot.lat,
                        this.props.spotList.hoverSpot.lng,
                        e.target.spotName.value,
                        e.target.spotDesc.value,
                        e.target.spotRating.value,
                        this.props.auth.authToken,
                        this.props.auth.currentUser
                        );
                    }}>
                        <input id="spotName" type="text"></input>
                        <label htmlFor="spotName">name</label>
                        <input id="spotDesc" type="text"></input>
                        <label htmlFor="spotDesc">notes</label>
                        <input id="spotRating" type="number"></input>
                        <label htmlFor="spotRating">rating</label>
                        <button>EDIT</button>
                    </form>
                        <button onClick={() => {this.props.deleteSpot(this.props.spotList.hoverSpot.lat, this.props.spotList.hoverSpot.lng, this.props.auth.authToken, this.props.auth.currentUser)}}>DELETE</button>
                    </div>
                </div>
            </InfoBox>
                    {list}
                </GoogleMap>
                ));
        }

        return (
            <div className="map-container">
            <Header />
            <div className="map">
            <MyMap
                    googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyD9t7sxzQrg5KAG4FG7CFbX-ghGbqtktH0&v=3.exp&libraries=geometry,drawing,places"
                    loadingElement={<div style={{ height: `100%` }} />}
                    containerElement={<div style={{ height: `100vh` }} />}
                    mapElement={<div style={{ height: `100%` }} />}
                    center={this.props.spotList.defaultCenter}
                    zoom={this.props.spotList.defaultZoom}
                />
            </div>
            {form}
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    spotList: state.spot,
    auth: state.auth
});

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        fetchSpots,
        fetchSpot,
        createSpotInitiate, 
        deleteSpotInitiate, 
        createSpot, 
        deleteSpot, 
        createSpotForm, 
        closeSpot,
        editSpot,
        submitEditSpot,
        setMap
    }, dispatch);
  };

export default connect(mapStateToProps, mapDispatchToProps)(SpotList);