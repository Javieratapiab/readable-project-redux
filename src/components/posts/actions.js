import axios from 'axios';
import { ROOT_PATH, HEADERS } from '../../utils/constants';
import { FETCH_ALL_POSTS, POST_VOTE } from '../globalActions';

axios.defaults.headers.common['Authorization'] = HEADERS

// Fetch all posts
export function fetchAll() {
  return dispatch => {
    axios.get(`${ROOT_PATH}/posts`)
    .then(posts => dispatch(fetchPostsSuccess(posts.data)));
  }
}

// New vote for a vote
export function newVote(id, impression) {
  return dispatch => {
    axios.post(`${ROOT_PATH}/posts/${id}`, { option: impression })
    .then((res) => dispatch({ type: POST_VOTE, payload: res.data }))
    .catch((err) => console.log(err))
  }
}

function fetchPostsSuccess(data) {
  return {
      type: FETCH_ALL_POSTS,
      payload: data
  };
}
