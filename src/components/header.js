import React from 'react';

import { connect } from 'react-redux';

import Login from './login';
import Register from './register';

import {login as demologin} from '../actions/auth';

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
       let error;
       let demo;
       if (this.props.auth.currentUser) {
           logout = <button className="editBtn logoutBtn" onClick={() => this.props.dispatch(clearAuth())}>logout</button>
           username = <p className="currentUser"></p>
        }
       if (!this.props.auth.currentUser) {
           registers = <button className="editBtn registerBtn" onClick={() => this.props.dispatch(register())}>Register</button>
        }
       if (this.props.auth.register) {
           registers = <Register />
       }
       if (!this.props.auth.register && !this.props.auth.currentUser) {
           demo = <button className="demoBtn" onClick={(e) => {e.preventDefault(); this.props.dispatch(demologin("demoUser", "demodemo"));}} >Demo</button>
           login = <div><Login />{demo}</div>
       }
       if (this.props.auth.error) {
           error = this.props.auth.error;
       }
    return (
        <div className="banner" style={{height: this.props.auth.currentUser ? '75px' : '' }}>
            <h1 style={{display: this.props.auth.currentUser ? 'none' : 'block' }}>SkateSpot Finder</h1>
            <img style={{display: this.props.auth.currentUser ? 'none' : 'inline-block' }} className="skateboardImg" src="https://cdn.onlinewebfonts.com/svg/img_538005.png" alt="Skateboard" />
        <button style={{top: this.props.auth.currentUser ? '15px' : '' }} className="help" onClick={() => this.props.dispatch(getInfo())}>?</button>
        {username}
        <p className="errorMsg">{error}</p>
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