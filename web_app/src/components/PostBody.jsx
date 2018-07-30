import React, { Component } from 'react';
import Axios from '../../node_modules/axios';

class PostBody extends Component {
    constructor(props) {
        super(props);
        this.state = {
            postData: "",
        }
    }
    componentDidMount() {
        Axios.get(`http://127.0.0.1:8080/api/posts/${this.props.postId}`).then(Response => {
            this.setState({ postData: Response.data });
        })
    }
    render() {
        let postData = this.state.postData;
        return (
            <div className="page-container">
                <div className="post-details">
                    <div>
                        <img src={`http://127.0.0.1:8080/${postData.postImage}`} alt="" />
                    </div>
                    <h1>{postData.title}</h1>
                    <p className="prologue">{postData.prologue}</p>
                    <p>{postData.body}</p>
                </div>
            </div>
        );
    }
}

export default PostBody;