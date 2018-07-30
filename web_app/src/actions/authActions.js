import { AUTHENTICATED_USER, UNAUTHENTICATED_USER, AUTHENTICATION_ERROR } from './type';
import axios from 'axios';

const URL = 'http://127.0.0.1:8080/api/auth';

export const checkIfAuthenticated = () => dispatch => {
    const user = localStorage.getItem('user');
    if (user) {
        const userData = JSON.parse(user);
        try {
            axios.get('http://127.0.0.1:8080/api/auth/secret', {
                headers: { Authorization: userData.token }
            }).then(Response => {
                if (Response.data.secret === 'resource' && userData.name !== '') {
                    dispatch({
                        type: AUTHENTICATED_USER
                    });
                    console.log('You were still authenticated from last time! (:')
                } else {
                    localStorage.clear();
                    console.log('Something is wrong in your localstorage string. Deleting ...');
                }
            })
        } catch (error) {
            localStorage.clear();
            console.log(error);
        }

    } else {
        console.log('not signed in yet! (:')
    }
}

/*
Local Auth
*/
export const signInAction_LOCAL = (email, password) => dispatch => {
    try {
        axios.post(`${URL}/signin`,
            {
                email: email,
                password: password
            }).then(res => {
                dispatch({
                    type: AUTHENTICATED_USER,
                })
                console.log(res);
                localStorage.setItem('user', JSON.stringify({
                    name: email,
                    token: res.data.token
                }));
                console.log('look at your localstorage (:')
            })
    } catch (error) {
        dispatch({
            type: AUTHENTICATION_ERROR,
            payload: 'Local Auth Failed'
        });
        console.log('Local Auth Failed');
    }
}

export const signInAction_REGISTER = (email, password) => dispatch => {
    try{
        axios.post(`${URL}/signup`,
        {
            email: email,
            password: password
        }).then(res => {
            dispatch({
                type: AUTHENTICATED_USER,
            })
            console.log(res);
            localStorage.setItem('user', JSON.stringify({
                name: email,
                token: res.data.token
            }));
            console.log('user created (:')
        })
    }catch(error){
        dispatch({
            type: AUTHENTICATION_ERROR,
            payload: 'Local SignUp Failed'
        });
        console.log('Local SignUp Failed');
    }
}

/*
Facebook Auth
*/
export const signInAction_FB = (response) => dispatch => {
    try {
        axios.post(`${URL}/facebook`, { access_token: response.accessToken }).then(res => {
            dispatch({
                type: AUTHENTICATED_USER,
            })
            localStorage.setItem('user', JSON.stringify({
                name: response.name,
                token: res.data[0]
            }));
            console.log('look at your localstorage (:')
        })
    } catch (error) {
        dispatch({
            type: AUTHENTICATION_ERROR,
            payload: 'Facebook Auth Failed'
        });
        console.log('Facebook Auth Failed');
    }
}

/*
Google Auth
*/
export const signInAction_GOOGLE = (response) => dispatch => {
    try {
        axios.post(`${URL}/google`, { access_token: response.accessToken }).then(res => {
            console.log(res);
            dispatch({
                type: AUTHENTICATED_USER,
            })

            localStorage.setItem('user', JSON.stringify({
                name: response.profileObj.givenName,
                token: res.data.token
            }));
            console.log('look at your localstorage (:')
        })
    } catch (error) {
        dispatch({
            type: AUTHENTICATION_ERROR,
            payload: 'Google Auth Failed'
        });
        console.log('Google Auth Failed');
    }
}

/*
Log-Out
*/
export const signOut = (response) => dispatch => {
    localStorage.clear();
    dispatch({
        type: UNAUTHENTICATED_USER
    })
}


