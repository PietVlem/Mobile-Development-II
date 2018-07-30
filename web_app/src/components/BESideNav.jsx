import React, { Component } from 'react';

import logo from '../assets/images/lol_icon.png';

class BESideNav extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  changeActiveComponent(comp) {
    this.props.ChangeComponent(comp);
  }

  render() {
    return (
      <div className="backoffice__sidenav">
        <img src={logo} alt=""/>
        <div className="sidenav__section">
          <p className="sidenav__title">Navigation</p>
          <p onClick={this.changeActiveComponent.bind(this, 'dashboard')} className={this.props.active === "dashboard" ? "active_item" : ""}><i className="fas fa-home fa-fw"></i>Dashboard</p>
        </div>
        <div className="sidenav__section">
          <p className="sidenav__title">Blog</p>
          <p onClick={this.changeActiveComponent.bind(this, 'posts')} className={this.props.active === "posts" ? "active_item" : ""}><i className="fas fa-clipboard fa-fw"></i>Posts</p>
          <p onClick={this.changeActiveComponent.bind(this, 'create_post')} className={this.props.active === "create_post" ? "active_item" : ""}><i className="fas fa-pencil-alt fa-fw"></i>Create Post</p>
        </div>
      </div>
    );
  }
}

export default BESideNav;