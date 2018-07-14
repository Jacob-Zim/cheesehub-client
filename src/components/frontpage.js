import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import headerImg from '../images/skatespotsFrontpage.jpg';

import './frontpage.css';

class Frontpage extends Component {
  render() {
    return (
      <div className="frontpage-holder">
        <div className="landing-bkg" role="img" aria-label="skateboarder">
        </div>
        <h1 className="landing-header">Skatespots</h1>
        <h2 className="landing-subHeader">Find your new favorite place to skate</h2>
        <Link className="map-link" to="/map">Enter</Link>
        <h3 className="info-pointer">Info</h3>
        <a href="" className="info-arrow-holder" onClick={(e) => {
          e.preventDefault();
          window.scroll({
            top: window.innerHeight*1.1,
            left: 0,
            behavior: 'smooth'
          })
        }}>
          <div className="info-arrow">
          </div>
        </a>
        <div className="info-holder">
          <h2 className="info-header">Find Places to skateboard</h2>
          <p className="info-text">The map is populated with hundreds of spots for your discovery! If a user hasn't included many details of the spot, try using street view to check it out!</p>
          <h2 className="info-header">Share your favorite spots</h2>
          <p className="info-text">By logging in and double tapping on the map, you're able to create a spot to share with the world! You're able to edit your spots with any updated information as well!</p>
        </div>
      </div>
    );
  }
}

export default Frontpage;