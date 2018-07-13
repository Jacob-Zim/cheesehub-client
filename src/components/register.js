import React from 'react';

import {connect} from 'react-redux';

import {registerUser, register} from '../actions/auth';

import './login.css';

export class Register extends React.Component {

    render() {
        return (
            <form
            className="login-form" 
            onSubmit={e => {
                e.preventDefault()
                const username = e.target.username.value;
                const password = e.target.password.value;
                this.props.dispatch(registerUser(username, password));
                this.props.dispatch(register());
            }}>
                <label className="userInput" htmlFor="username">Username</label>
                <input className="editField" name="username" type="text"></input>
                <label className="passInput" htmlFor="password">Password</label>
                <input className="editField" name="password" type="password"></input>
                <button className="editBtnSubmit regSubmit">submit</button>
                <button className="cancelReg deleteBtn cancelBtn" onClick={() => this.props.dispatch(register())}>cancel</button>
            </form>
        )
    }
}

const mapStateToProps = (state) => ({
    auth: state.auth
});

export default connect(mapStateToProps)(Register);