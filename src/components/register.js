import React from 'react';

import {connect} from 'react-redux';

import {registerUser, register} from '../actions/auth';

export class Register extends React.Component {

    render() {

        return (
            <form onSubmit={e => {
                e.preventDefault()
                const username = e.target.username.value;
                const password = e.target.password.value;
                this.props.dispatch(registerUser(username, password));
                this.props.dispatch(register());
            }}>
                <label htmlFor="username">username</label>
                <input name="username" type="text"></input>
                <label htmlFor="password">password</label>
                <input name="password" type="password"></input>
                <button>submit</button>
                <button onClick={() => this.props.dispatch(register())}>cancel</button>
            </form>
        )
    }
}

const mapStateToProps = (state) => ({
    auth: state.auth
});

export default connect(mapStateToProps)(Register);