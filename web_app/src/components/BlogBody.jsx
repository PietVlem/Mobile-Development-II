import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { fetchPosts } from '../actions/postActions';

class BlogBody extends Component {
    componentWillMount() {
        this.props.fetchPosts();
    }
    navigatePost(postId) {
        window.location = "#/post/" + postId;
    }
    render() {
        let Data = this.props.posts;
        let Posts;
        if (Data !== '') {
            Posts = Data.map((post) => {
                return (
                    <div onClick={() => this.navigatePost(post._id)} key={post._id} className="grid__item large--one-half huge--one-third">
                        <div className="blog-post">
                            <div className="blog-post__image">
                                <img src={`http://127.0.0.1:8080/${post.postImage}`} alt="" />
                            </div>
                            <div className="blog-post__info">
                                <h2>{post.title}</h2>
                                <span>{post.synopsis}</span>
                            </div>
                        </div>
                    </div>
                )
            })
        }
        return (
            <div className="page-container">
                <div className="grid grid--blog">
                    {Posts}
                </div>
            </div>
        );
    }
}

BlogBody.propTypes = {
    fetchPosts: PropTypes.func.isRequired,
    posts: PropTypes.array.isRequired,
};

const mapStateToProps = state => ({
    posts: state.posts.items,
});

export default connect(mapStateToProps, { fetchPosts })(BlogBody);