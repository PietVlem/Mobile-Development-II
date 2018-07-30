import React, { Component } from 'react';

// images
import lol_icon from '../assets/images/lol_icon.png';

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    navigate(page) {
        window.location = "#/" + page;
        console.log('navigated to: /' + page);
    }
    render() {
        return (
            <div className="page-header">
                <img src={lol_icon} alt="" />
                <nav className="main-nav">
                    <li onClick={() => this.navigate('lol')}>search</li>
                    <li onClick={() => this.navigate('blog')}>Blog</li>
                </nav>
                <i className="fas fa-user user-icon"></i>
            </div>
        );
    }
}

export default Header;