import axios from 'axios';
import { ROOT_PATH, HEADERS } from '../../utils/constants';
import { FETCH_ALL_POSTS } from '../globalActions';

axios.defaults.headers.common['Authorization'] = HEADERS

// Fetch all posts
export function fetchAll() {
  return dispatch => {
    axios.get(`${ROOT_PATH}/posts`)
    .then(posts => dispatch(fetchPostsSuccess(posts.data)));
  }
}

function fetchPostsSuccess(data) {
  return {
      type: FETCH_ALL_POSTS,
      payload: data
  };
}

