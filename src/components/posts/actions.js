import axios from 'axios';
import { ROOT_PATH, HEADERS } from '../../utils/constants';
import { generateUUID } from '../../utils/helpers';
import { FETCH_ALL_POSTS,
        POST_VOTE,
        DELETE_POST,
        EDIT_POST,
        CREATE_POST,
        FETCH_POST_BY_ID
      } from '../globalActions';

axios.defaults.headers.common['Authorization'] = HEADERS

// Fetch all posts
export function fetchAll() {
  return dispatch => {
    axios.get(`${ROOT_PATH}/posts`)
    .then(posts => dispatch(fetchPostsSuccess(posts.data)));
  }
}

// New vote
export function newVote(id, impression) {
  return dispatch => {
    axios.post(`${ROOT_PATH}/posts/${id}`, { option: impression })
    .then((res) => dispatch({ type: POST_VOTE, payload: res.data }))
    .catch((err) => console.log(err))
  }
}

// Delete post
export function deletePost(id) {
  return dispatch => {
    axios.delete(`${ROOT_PATH}/posts/${id}`)
    .then((res) => dispatch(fetchDeletedPost(res.data)))
    .catch((err) => console.log(err))
  }
}

// Edit post
export function editPost(id, params) {
  return dispatch => {
    axios.put(`${ROOT_PATH}/posts/${id}`, { title: params.title, body: params.body })
    .then((res) => dispatch(editPostSuccess(res.data)))
    .catch((err) => console.log(err))
  }
}

// Create post
export function createPost(params) {
  params['id'] = generateUUID()
  params['timestamp'] = Date.now()
  return dispatch => {
    axios.post(`${ROOT_PATH}/posts`, params)
    .then((res) => dispatch(newPostSuccess(res.data)))
    .catch((err) => console.log(err))
  }
}

// Get post detail
export function fetchPostById(id) {
  return dispatch => {
    axios.get(`${ROOT_PATH}/posts/${id}`)
    .then((res) => dispatch(fetchCurrentPost(res.data)))
    .catch((err) => console.log(err))
  }
}

function fetchCurrentPost(data) {
  return {
    type: FETCH_POST_BY_ID,
    payload: data
  }
}

function newPostSuccess(data) {
  return {
    type: CREATE_POST,
    payload: data
  }
}

function editPostSuccess(data) {
  return {
    type: EDIT_POST,
    payload: data
  };
}

function fetchDeletedPost(data) {
  return {
    type: DELETE_POST,
    payload: data
  };
}

function fetchPostsSuccess(data) {
  return {
      type: FETCH_ALL_POSTS,
      payload: data
  };
}
