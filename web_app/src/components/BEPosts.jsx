import React, { Component } from 'react';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { fetchPosts } from '../actions/postActions';
import axios from 'axios';


// Components
import DeleteLink from '../components/DeleteLink';

class BEPosts extends Component {

    constructor(props) {
        super(props);
        this.state = {
            users: ''
        }
    }

    componentDidMount() {
        this.props.fetchPosts();
        axios.get('http://127.0.0.1:8080/api/users').then(Response => {
            this.setState({ users: Response.data });
        })

    }

    reFetchData(data) {
        NotificationManager.error('Post Deleted');
    }

    render() {
        let tableRows;
        if (this.state.users != '') {
            tableRows = this.props.posts.map(post => {
                const result = this.state.users.find(user => user._id === post._user);
                return (
                    <tr key={post._id}>
                        <td>{post.title}</td>
                        <td>{result._id}</td>
                        <td>
                            <DeleteLink reFetchData={this.reFetchData.bind(this)} data={post} />
                        </td>
                    </tr>
                )
            })
        }


        return (
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>Post title</th>
                            <th>Author</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tableRows}
                    </tbody>
                </table>
                <NotificationContainer />
            </div>
        );
    }
}

BEPosts.propTypes = {
    fetchPosts: PropTypes.func.isRequired,
    posts: PropTypes.array.isRequired,
};

const mapStateToProps = state => ({
    posts: state.posts.items,
    newPost: state.posts.item
});

export default connect(mapStateToProps, { fetchPosts })(BEPosts);