import React from 'react';
import { Text, View } from 'react-native';
import axios from 'axios';

import Post from '../components/post';

class BlogScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      BlogPosts: ''
    }
  }


  componentDidMount() {
    // use '10.0.2.2' instead of '127.0.0.1' because i'm reaching for my local machine on my emulator
    axios.get('http://10.0.2.2:8080/api/posts').then(response => { 
      console.log(response.data)
    })
    .catch(error => {
      if (error.response) {
        // The request was made, but the server responded with a status code
        // that falls out of the range of 2xx
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', error.message);
      }
      console.log(error.config);
    });
  }
  render() {
    return (
      <View style={{ flex: 1 }}>

      </View>
    );
  }
}

export default BlogScreen;
