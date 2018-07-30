import React, { Component } from 'react';

// Components
import Header from '../components/Header';
import LolBody from '../components/LolBody';

class App extends Component {
  
  render() {
    return (
      <div>
        <Header/>
        <LolBody/>
      </div>
    );
  }
}

export default App;
