import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';
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
      this.setState({ BlogPosts: response.data })
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
    console.log(this.state.BlogPosts);
    let Posts;
    if (this.state.BlogPosts !== '') {
      Posts = this.state.BlogPosts.map((post) => {
        return (
          <View style={styles.post} key={post._id}>
            <Image
              style={styles.postImg}
              source={{ uri: `http://10.0.2.2:8080/${post.postImage}` }}
            />
            <View style={styles.postText}>
              <Text style={styles.postTitle}>{post.title}</Text>
              <Text style={styles.postSynops}>{post.synopsis}</Text>
            </View>
          </View>

        )
      })
    }
    return (
      <View style={{ flex: 1 }}>
        <ScrollView style={styles.postWrapper}>
          {Posts}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  postWrapper:{
    paddingTop: 20,
    backgroundColor: '#f3f4f9',
  },  
  post:{
    backgroundColor: 'white',
    marginBottom: 20,
    marginLeft: 10,
    marginRight: 10,
  },
  postImg:{
    width: '100%',
    height: 200,
  },
  postText:{
    padding: 10,
  },
  postTitle:{
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    paddingBottom: 10,
  },
  postSynops:{

  }
});

export default BlogScreen;
