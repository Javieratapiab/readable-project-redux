import { FETCH_ALL_COMMENTS } from '../globalActions';
import { ROOT_PATH, HEADERS } from '../../utils/constants';
import axios from 'axios';

axios.defaults.headers.common['Authorization'] = HEADERS

// Fetch all comments
export function fetchAllComments(id) {
  return dispatch => {
    axios.get(`${ROOT_PATH}/posts/${id}/comments`)
    .then(posts => dispatch(fetchCommentsSuccess(posts.data)));
  }
}

function fetchCommentsSuccess(data) {
  return {
    type: FETCH_ALL_COMMENTS,
    payload: data
  }
}