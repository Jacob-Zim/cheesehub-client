/* eslint-disable no-undef */
import React from 'react';

import {connect} from 'react-redux';

import { bindActionCreators } from 'redux';

import Header from './header';
import InfoPopup from './infoPopup';

import './map.css';

import {
    fetchSpots,
    fetchSpot,
    createSpotInitiate, 
    createSpotCancel,
    deleteSpotInitiate, 
    createSpot, 
    deleteSpot, 
    createSpotForm, 
    closeSpot,
    editSpot,
    submitEditSpot,
    cancelEdit,
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
          },1000);
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
                list =  this.props.spotList.spots.map((spot, key) => 
                <Marker 
                key={key}
                position={{ lat: spot.lat, lng: spot.lng }}
                 onClick={ (e) => this.displaySpot(e, spot)}
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
                onDblClick={e => {if (this.props.auth.currentUser){this.getClickedPosition(e)}; if (this.props.spotList.hoverSpot) {this.props.closeSpot()}}}
                >
                    {list}
                </GoogleMap>
                ));
        let form;
        if (this.props.spotList.newSpot) {
            form = <div>
                <form onSubmit={(e) => {
                    e.preventDefault()
                    this.props.createSpot(
                        this.props.spotList.newSpot.lat,
                        this.props.spotList.newSpot.lng,
                        e.target.spotName.value,
                        e.target.spotDesc.value,
                        e.target.spotRating.value,
                        e.target.spotAddress.value,
                        e.target.spotImage.value,
                        this.props.auth.authToken,
                        this.props.auth.currentUser
                        )
                }
            }
                style={ {position: 'fixed', top: `20%`, left: `10%`, zIndex: 100} }
                className="infoBoxBkg createSpotForm createSpotBox"
                >
                    <button className="infoBoxCloseBtn" onClick={() => this.props.createSpotCancel()}>X</button>
                    <label htmlFor="spotName">name</label>
                    <input className="editSpotField editField" id="spotName" type="text"></input>
                    <label htmlFor="spotDesc">notes</label>
                    <input className="editSpotField editField" id="spotDesc" type="text"></input>
                    <label htmlFor="spotRating">rating</label>
                    <input className="editSpotField editField" id="spotRating" type="number" max="5"></input>
                    <label htmlFor="spotAddress">Address</label>
                    <input className="editSpotField editField" id="spotAddress" type="text"></input>
                    <label htmlFor="spotImage">Image Url</label>
                    <input className="editSpotField editField" id="spotImage" type="text"></input>
                    <section className="editSubmitBtns">
                        <button className="submitSpot editBtnSubmit">Submit</button>
                    </section>
                </form>
            </div>
        }

        if (this.props.spotList.hoverSpot) {
            let buttons;
            if (this.props.spotList.hoverSpot.userId === this.props.auth.currentUser) {
                buttons = 
                <div className="editDeleteBtns">
                    <button className="editBtn" onClick={() => {this.props.editSpot()}}>EDIT</button>
                    <button className="deleteBtn" onClick={() => {this.props.deleteSpot(this.props.spotList.hoverSpot.lat, this.props.spotList.hoverSpot.lng, this.props.auth.authToken, this.props.auth.currentUser)}}>DELETE</button>
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
                <div className="infoBoxBkg">
                    <section className="infoBoxCont" style={{ fontSize: `16px`, fontColor: `black` }}>
                        <button className="infoBoxCloseBtn" onClick={() => this.props.closeSpot()}>X</button>
                        <p className="spotName">{this.props.spotList.hoverSpot.name}</p>
                        <div className="ratingGroup">
                        <p className="spotRating">{this.props.spotList.hoverSpot.rating}</p>
                        <img className="ratingStar" src="http://www.clker.com/cliparts/6/b/a/9/13501528831665215180star.svg" alt="Star Rating"/>
                        </div>
                        <p className="spotAddress">{this.props.spotList.hoverSpot.address}</p>
                        <img className="skateSpotImg" src={this.props.spotList.hoverSpot.image} alt="Spot here"/>
                        <p className="spotNotes">{this.props.spotList.hoverSpot.notes}</p>
                        {buttons}
                    </section>
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
                <div className="infoBoxBkg spotBox" style={{ paddingLeft: `15px`, paddingRight: `20px` }}>
                    <section className="infoBoxCont">
                    <form onSubmit={(e) => {
                        e.preventDefault();
                        this.props.submitEditSpot(
                        this.props.spotList.hoverSpot.lat,
                        this.props.spotList.hoverSpot.lng,
                        e.target.spotName.value,
                        e.target.spotDesc.value,
                        e.target.spotRating.value,
                        e.target.spotAddress.value,
                        e.target.spotImage.value,
                        this.props.auth.authToken,
                        this.props.auth.currentUser
                        );
                    }}>
                        <button className="infoBoxCloseBtn" onClick={() => this.props.closeSpot()}>X</button>
                        <label className="labelFont" htmlFor="spotName">name</label>
                        <input className="editFormSpotField editSpotField editField" id="spotName" type="text" defaultValue={this.props.spotList.hoverSpot.name}></input>
                        <label className="labelFont" htmlFor="spotDesc">notes</label>
                        <input className="editFormSpotField editSpotField editField" id="spotDesc" type="text" defaultValue={this.props.spotList.hoverSpot.notes}></input>
                        <label className="labelFont" htmlFor="spotRating">rating</label>
                        <input className="editFormSpotField editSpotField editField" id="spotRating" type="number" defaultValue={this.props.spotList.hoverSpot.rating}></input>
                        <label className="labelFont" htmlFor="spotAddress">address</label>
                        <input className="editFormSpotField editSpotField editField" id="spotAddress" type="text" defaultValue={this.props.spotList.hoverSpot.address}></input>
                        <label className="labelFont imgUrl" htmlFor="spotImage">image</label>
                        <input className="editFormSpotField editSpotField imgUrlInp editField" id="spotImage" type="text" defaultValue={this.props.spotList.hoverSpot.image}></input>
                        <section className="editSubmitBtns">
                            <button className="editBtnSubmit">SUBMIT</button>
                            <button className="cancelEditBtn" onClick={() => this.props.cancelEdit()}>CANCEL</button>
                        </section>
                    </form>
                        <section className="deleteBtnEditModeCont">
                        <button className="deleteBtnEditModeBtn"onClick={() => {this.props.deleteSpot(this.props.spotList.hoverSpot.lat, this.props.spotList.hoverSpot.lng, this.props.auth.authToken, this.props.auth.currentUser)}}>DELETE</button>
                        </section>
                    </section>
                </div>
            </InfoBox>
                    {list}
                </GoogleMap>
                ));
        }

        let info;

        if (this.props.spotList.info) {
            info = <InfoPopup />;
        }

        return (
            <div className="map-container">
            <Header />
            {info}
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
        createSpotCancel,
        deleteSpotInitiate, 
        createSpot, 
        deleteSpot, 
        createSpotForm, 
        closeSpot,
        editSpot,
        cancelEdit,
        submitEditSpot,
        setMap
    }, dispatch);
  };

export default connect(mapStateToProps, mapDispatchToProps)(SpotList);