import React from 'react';

import { connect } from 'react-redux';

import './header.css';

export class Header extends React.Component {
   render() {
    return (
        <div className="banner">
            <h1>SkateSpot Finder</h1>
            <img className="skateboardImg" src="https://cdn.onlinewebfonts.com/svg/img_538005.png" />
            <div className="cite">Icon made from <a href="http://www.onlinewebfonts.com/icon">Icon Fonts</a> is licensed by CC BY 3.0</div>
        </div>
    )
};
}

const mapStateToProps = (state) => ({
    spotList: state
});

export default connect(mapStateToProps)(Header);