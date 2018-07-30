import React, { Component } from 'react'
import axios from 'axios';
import Dropzone from 'react-dropzone';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import { createPost } from '../actions/postActions';

class BECreatePost extends Component {
    constructor(props) {
        super(props);
        this.state = {
            categories: '',
            postTitle: '',
            postSynopsis: '',
            postPrologue: '',
            postbody: '',
            postImage: '',
            postCategory: ''
        }
    }
    componentDidMount() {
        axios.get('http://127.0.0.1:8080/api/categories').then(Response => {
            this.setState({ categories: Response.data });
            this.setState({ postCategory: Response.data[0]._id });
        })
    }
    handleUserInput(e) {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({ [name]: value });
    }
    handleChangePostTitle(e) {
        this.setState({ postTitle: e.target.value });
    }
    handleChangePostSynopsis(e) {
        this.setState({ postSynopsis: e.target.value });
    }
    handleChangePostPrologue(e) {
        this.setState({ postPrologue: e.target.value });
    }
    handleChangePostbody(e) {
        this.setState({ postbody: e.target.value });
    }
    handleChangePostCategory(e) {
        this.setState({ postCategory: e.target.value });
    }

    onDrop(acceptedFiles, rejectedFiles) {
        this.setState({ postImage: acceptedFiles });
    }
    handleUpload(ev) {
        ev.preventDefault();

        const data = new FormData();
        data.append('title', this.state.postTitle);
        data.append('synopsis', this.state.postSynopsis);
        data.append('prologue', this.state.postPrologue);
        data.append('body', this.state.postbody);
        data.append('postImage', this.state.postImage[0]);
        data.append('_category', this.state.postCategory);

        this.props.createPost(data);

        NotificationManager.success('Post Created!');
        this.setState({
            postTitle: '',
            postSynopsis: '',
            postPrologue: '',
            postbody: '',
            postImage: '',
            postCategory: this.state.categories[0]
        })

    }
    render() {
        let Cats = this.state.categories;
        let category_options
        if (Cats !== '') {
            category_options = Cats.map((cat) => {
                return (
                    <option key={cat._id} value={cat._id}>{cat.name}</option>
                )
            })
        }
        return (
            <div className="page-container">
                <div className="post-creation-wrapper">
                    <form onSubmit={this.handleUpload.bind(this)}>
                        <div className="form-group">
                            <label htmlFor="post_title">Title</label>
                            <input
                                type="text"
                                name="post_title"
                                id="post_title"
                                required
                                value={this.state.postTitle}
                                onChange={this.handleChangePostTitle.bind(this)}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="post_synopsis">synopsis</label>
                            <textarea
                                name="post_synopsis"
                                id="post_synopsis"
                                cols="30"
                                rows="10"
                                required
                                value={this.state.postSynopsis}
                                onChange={this.handleChangePostSynopsis.bind(this)}
                            >
                            </textarea>
                        </div>
                        <div className="form-group">
                            <label htmlFor="post_prologue">prologue</label>
                            <textarea
                                name="post_prologue"
                                id="post_prologue"
                                cols="30"
                                rows="10"
                                required
                                value={this.state.postPrologue}
                                onChange={this.handleChangePostPrologue.bind(this)}
                            ></textarea>
                        </div>
                        <div className="form-group">
                            <label htmlFor="post_body">Body</label>
                            <textarea
                                name="body"
                                id="post_body"
                                cols="30"
                                rows="10"
                                required
                                value={this.state.postbody}
                                onChange={this.handleChangePostbody.bind(this)}
                            ></textarea>
                        </div>
                        <div className="form-group">
                            <label htmlFor="categories">Category</label>
                            <select
                                name="post_categories"
                                id="post_categories"
                                value={this.state.postCategory}
                                onChange={this.handleChangePostCategory.bind(this)}
                            >
                                {category_options}
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="files">Post-Image</label>
                            <Dropzone className="dropzone" onDrop={(files) => this.onDrop(files)}>
                                <i className="fas fa-file-upload"></i><br />
                                <span>Try dropping some files here, or click to select files to upload.</span>
                            </Dropzone>
                            <div className="dropzone__filename">
                                {
                                    this.state.postImage !== '' ? (
                                        <span>File chosen: {this.state.postImage[0].name}</span>
                                    ) : (
                                            <span>No File chosen yet.</span>
                                        )
                                }
                            </div>
                        </div>
                        <div className="form-group">
                            <button className="button button--default">Create</button>
                        </div>
                    </form>
                </div>
                <NotificationContainer />
            </div>
        )
    }
}

BECreatePost.propTypes = {
    createPost: PropTypes.func.isRequired
}

export default connect(null, { createPost })(BECreatePost);