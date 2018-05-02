import React from 'react';

import { connect } from 'react-redux';

import Login from './login';

import {clearAuth} from '../actions/auth';

import './header.css';

export class Header extends React.Component {
   render() {
       let logout;
       if (this.props.auth.currentUser) {
           logout = <button onClick={() => this.props.dispatch(clearAuth())}>logout</button>
       }
    return (
        <div className="banner">
            <h1>SkateSpot Finder</h1>
            <img className="skateboardImg" src="https://cdn.onlinewebfonts.com/svg/img_538005.png" />
            <div className="cite">Icon made from <a href="http://www.onlinewebfonts.com/icon">Icon Fonts</a> is licensed by CC BY 3.0</div>
        <Login />
        {logout}
        </div>
    )
};
}

const mapStateToProps = (state) => ({
    auth: state.auth
});

export default connect(mapStateToProps)(Header);