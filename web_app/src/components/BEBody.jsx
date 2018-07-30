import React, { Component } from 'react';

// components
import BESdieNav from '../components/BESideNav';
import BEHeader from '../components/BEHeader';
import BESubTitle from '../components/BESubTitle';
import BEDashboard from '../components/BEDashboard';
import BEPosts from '../components/BEPosts';
import BECreatePost from '../components/BECreatePost';

class BEBody extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeComponent: "dashboard"
        }
    }

    handleChangeActiveComponent(comp) {
        this.setState({ activeComponent: comp })
    }

    render() {
        return (
            <div className="backoffice__containter">
                <BESdieNav ChangeComponent={this.handleChangeActiveComponent.bind(this)} active={this.state.activeComponent} />
                <div className="backoffice__content">
                    <BEHeader />
                    <BESubTitle title={this.state.activeComponent} />
                    <div className="content__container">
                        {
                            this.state.activeComponent === "dashboard" ? (<BEDashboard />) : ""
                        }
                        {
                            this.state.activeComponent === "posts" ? (<BEPosts />) : ""
                        }
                        {
                            this.state.activeComponent === "create_post" ? (<BECreatePost />) : ""
                        }
                    </div>
                </div>
            </div>
        );
    }
}

export default BEBody;