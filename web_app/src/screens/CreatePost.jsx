import React, { Component } from 'react';

// Components
import Header from '../components/Header';
import CreatePostBody from '../components/CreatePostBody';

class CreatePost extends Component {
  
  render() {
    return (
      <div>
        <Header/>
        <CreatePostBody/>
      </div>
    );
  }
}

export default CreatePost;
