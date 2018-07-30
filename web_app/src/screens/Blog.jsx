import React, { Component } from 'react';

// Components
import Header from '../components/Header';
import BlogBody from '../components/BlogBody';

class Blog extends Component {
  
  render() {
    return (
      <div>
        <Header/>
        <BlogBody/>
      </div>
    );
  }
}

export default Blog;
