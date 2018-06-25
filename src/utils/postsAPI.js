import { ROOT_PATH, HEADERS } from './constants';
import axios from 'axios';
import { FETCH_CATEGORY_POSTS } from '../components/globalActions';

axios.defaults.headers.common['Authorization'] = HEADERS

// Get all posts
export function fetchAll() {
  return axios.get(`${ROOT_PATH}/posts`)
    .then((res) => res.data)
}

// Get posts associated to categories
export function fetchPostsByCategory(category) {
  return dispatch => {
    axios.get(`${ROOT_PATH}/${category}/posts`)
    .then((res) => dispatch({ type: FETCH_CATEGORY_POSTS, payload: res.data }))
    .catch((err) => console.log(err))
  }
}
