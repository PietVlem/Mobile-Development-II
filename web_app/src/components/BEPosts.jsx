import React, { Component } from 'react';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { fetchPosts } from '../actions/postActions';


// Components
import DeleteLink from '../components/DeleteLink';

class BEPosts extends Component {

    componentDidMount() {
        this.props.fetchPosts();
    }

    reFetchData(data){
        NotificationManager.error('Post Deleted');
    }

    render() {
        let tableRows;
        tableRows = this.props.posts.map(post => {
            return (
                <tr key={post._id}>
                    <td>{post.title}</td>
                    <td>author</td>
                    <td>
                        <DeleteLink reFetchData={this.reFetchData.bind(this)} data={post} />
                    </td>
                </tr>
            )
        })

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