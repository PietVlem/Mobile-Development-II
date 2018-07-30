// Libs
import React, { Component } from 'react';

// Style
import './App.css';

// Components
import Main from './screens/Main';

// redux
import { Provider } from 'react-redux';
import store  from './redux/store';


class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Main/>
      </Provider>
    );
  }
}

export default App;
