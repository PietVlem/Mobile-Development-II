import React, { Component } from 'react';
import { checkIfAuthenticated } from '../actions/authActions';
import { connect } from 'react-redux';

// Components
import RouterFile from '../router/router';
import Login from './Login';


class Main extends Component {
    componentWillMount() {
        this.props.checkIfAuthenticated();
      }
    render() {
        return (
            <div className="App">
                {
                    this.props.authenticated ? <RouterFile /> : <Login />
                }
            </div>
        )
    }
}

function mapStateToProps(state) {
    return { 
        authenticated: state.auth.authenticated
    };
}

export default connect(mapStateToProps, { checkIfAuthenticated })(Main);
