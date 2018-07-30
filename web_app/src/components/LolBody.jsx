import React, { Component } from 'react';
import axios from 'axios';
import { HashLoader } from 'react-spinners';
import { NotificationContainer, NotificationManager } from 'react-notifications';

import LolProfile from './LolProfile';

class LolBody extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchedName: "",
            responseData: "",
            loading: false,
        }
    }
    enterPressed(event) {
        var code = event.keyCode || event.which;
        if (code === 13) {
            this.setState({ 
                loading: true,
                responseData: ''
            });
            axios.get(`http://127.0.0.1:8080/api/summoner/${this.state.searchedName}`).then(response => {
                this.setState({ responseData: response.data });
                console.log(response.data);
                if (this.state.responseData !== '') {
                    this.setState({ loading: false });
                    if(this.state.responseData === null){
                        NotificationManager.error('Summoner not found!');
                    }
                }
            }).catch(error=>{
                console.log(error)
                this.setState({ loading: false });
            })
        }
    }
    handleChangeName(e) {
        this.setState({ searchedName: e.target.value });
    }
    render() {
        let searchResult
        if(this.state.responseData !== "" && this.state.responseData !== null){
            searchResult = <LolProfile data={this.state.responseData} />
        }
        return (
            <div className="page-container">
                <form>
                    <input
                        className="searchbar"
                        type="text"
                        placeholder="summoner"
                        name=""
                        id=""
                        onKeyPress={this.enterPressed.bind(this)}
                        value={this.state.searchedName}
                        onChange={this.handleChangeName.bind(this)}
                    />
                </form>
                <HashLoader
                    className="hashloader"
                    color={'#2ba3f4'}
                    loading={this.state.loading}
                />
                <div className="search-result">
                    {searchResult}
                </div>
                <NotificationContainer />
            </div>
        );
    }
}

export default LolBody;