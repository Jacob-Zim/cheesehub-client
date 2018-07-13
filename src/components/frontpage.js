import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import headerImg from '../images/skatespotsFrontpage.jpg';

import './frontpage.css';

class Frontpage extends Component {
  render() {
    return (
      <div>
        <div className="landing-bkg" role="img" aria-label="skateboarder">
        </div>
        <h1 className="landing-header">Skatespots</h1>
        <h2 className="landing-subHeader">Find your new favorite place to skate</h2>
        <Link className="map-link" to="/map">Enter</Link>
      </div>
    );
  }
}

export default Frontpage;