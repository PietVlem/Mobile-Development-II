import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { deletePost } from '../actions/postActions';

class DeleteLink extends Component {
    

    deleteNode(data) {
        this.props.deletePost(data, this.props.reFetchData(data));
    }

    render() {
        return (
            <div>
                <a onClick={() => this.deleteNode(this.props.data)} className="svgLink svgLink--delete"><i className="fas fa-times"></i></a>
            </div>
        );
    }
}

DeleteLink.propTypes = {
    deletePost: PropTypes.func.isRequired,
    posts: PropTypes.array.isRequired,
};

const mapStateToProps = state => ({
    posts: state.posts.items,
});

export default connect(mapStateToProps, { deletePost })(DeleteLink);