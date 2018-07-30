import { UPDATE_POST } from './type';
import axios from 'axios';

const URL = 'http://127.0.0.1:8080/api';

export const fetchPosts = () => dispatch => {
    axios.get(`${URL}/posts`).then(res => {
        dispatch({
            type: UPDATE_POST,
            payload: res.data
        })
    })
}

export const createPost = (postData) => dispatch => {
    axios.post(`${URL}/posts`, postData).then(res => {
        axios.get(`${URL}/posts`).then(res => {
            dispatch({
                type: UPDATE_POST,
                payload: res.data
            })
        })
    }).catch(function (error) {
        console.log(error);
    })
}

export const deletePost = (data) => dispatch => {
    axios.delete(`${URL}/posts/${data._id}`).then(res => {
        axios.get(`${URL}/posts`).then(res => {
            dispatch({
                type: UPDATE_POST,
                payload: res.data
            })
        })
    }).catch(function (error) {
        console.log(error);
    })
}
