import React, { Component } from 'react';
import {signOut} from '../actions/authActions';
import { connect } from 'react-redux';

class BEHeader extends Component {
    signOut() {
        this.props.signOut();
    }

    render() {
        return (
            <div className="backoffice__header">
                <button onClick={() => this.signOut()}><i className="fas fa-sign-out-alt"></i> log out</button>
            </div>
        );
    }
}

export default connect(null, { signOut })(BEHeader);