import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import Router from './routing/routing';

class App extends Component {
  render() {
    return(
      <View style={styles.container}>
        <Router/>
      </View> 
    )
  }
}

const styles = StyleSheet.create({
  container:{
    width: "100%",
    height: "100%"
  }
});

export default App;
