import React, { Component } from 'react';

class BESubTitle extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    render() {
        return (
            <div className="backoffice__subtitle">
                <h1>{this.props.title}</h1>
            </div>
        );
    }
}

export default BESubTitle;