import { AUTHENTICATED_USER, UNAUTHENTICATED_USER, AUTHENTICATION_ERROR } from '../actions/type';

export default function (state = {}, action) {
  switch (action.type) {
    case AUTHENTICATED_USER:
      return {
        ...state,
        authenticated: true
      };
    case UNAUTHENTICATED_USER:
      return {
        ...state,
        authenticated: false
      };
    case AUTHENTICATION_ERROR:
      return {
        ...state,
        error: action.payload
      };
    default:
      return state;
  }
}