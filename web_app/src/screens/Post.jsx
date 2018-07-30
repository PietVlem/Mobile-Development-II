import React, { Component } from 'react';

// Components
import Header from '../components/Header';
import PostBody from '../components/PostBody';

class Post extends Component {
  render() {
    return (
      <div>
        <Header/>
        <PostBody postId={this.props.match.params.postId}/>
      </div>
    );
  }
}

export default Post;
