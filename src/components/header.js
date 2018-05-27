import React from 'react';

import { connect } from 'react-redux';

import Login from './login';
import Register from './register';

import {clearAuth, register} from '../actions/auth';
import {getInfo} from '../actions/spot';

import './header.css';
import './map.css';

export class Header extends React.Component {
   render() {
       let logout;
       let registers;
       let username;
       let login;
       if (this.props.auth.currentUser) {
           logout = <button className="editBtn registerBtn" onClick={() => this.props.dispatch(clearAuth())}>logout</button>
           username = <p className="currentUser"></p>
        }
       if (!this.props.auth.currentUser) {
           registers = <button className="editBtn registerBtn" onClick={() => this.props.dispatch(register())}>Register</button>
       }
       if (this.props.auth.register) {
           registers = <Register />
       }
       if (!this.props.auth.register && !this.props.auth.currentUser) {
        login = <Login />
       }
    return (
        <div className="banner">
            <h1 style={{display: this.props.auth.currentUser ? 'none' : 'block' }}>SkateSpot Finder</h1>
            <img style={{display: this.props.auth.currentUser ? 'none' : 'block' }} className="skateboardImg" src="https://cdn.onlinewebfonts.com/svg/img_538005.png" alt="Skateboard" />
        <button className="help" onClick={() => this.props.dispatch(getInfo())}>?</button>
        {username}
        {login}
        {logout}
        {registers}
        </div>
    )
};
}

const mapStateToProps = (state) => ({
    auth: state.auth
});

export default connect(mapStateToProps)(Header);