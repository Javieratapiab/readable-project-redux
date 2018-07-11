import { FETCH_ALL_COMMENTS,
         CREATE_COMMENT,
         COMMENT_VOTE,
         DELETE_COMMENT,
         EDIT_COMMENT
        } from '../globalActions';
import { ROOT_PATH, HEADERS } from '../../utils/constants';
import { generateUUID } from '../../utils/helpers';
import axios from 'axios';

axios.defaults.headers.common['Authorization'] = HEADERS

// Fetch all comments
export function fetchAllComments(id) {
  return dispatch => {
    axios.get(`${ROOT_PATH}/posts/${id}/comments`)
    .then(comments => dispatch(fetchCommentsSuccess(comments.data)));
  }
}

// Create comment
export function createComment(params) {
  params['id'] = generateUUID()
  params['timestamp'] = Date.now()
  return dispatch => {
    axios.post(`${ROOT_PATH}/comments`, params)
    .then(comments => dispatch(createSuccess(comments.data)));
  }
}

// New vote
export function commentVote(id, impression) {
  return dispatch => {
    axios.post(`${ROOT_PATH}/comments/${id}`, { option: impression })
    .then((res) => dispatch({ type: COMMENT_VOTE, payload: res.data }))
    .catch((err) => console.log(err))
  }
}

// Delete comment
export function deleteComment(id) {
  return dispatch => {
    axios.delete(`${ROOT_PATH}/comments/${id}`)
    .then((res) => dispatch({ type: DELETE_COMMENT, payload: res.data }))
    .catch((err) => console.log(err))
  }
}

// Edit comment
export function editComment(id, params) {
  params['timestamp'] = Date.now()
  return dispatch => {
    axios.put(`${ROOT_PATH}/comments/${id}`, params)
    .then((res) => dispatch({ type: EDIT_COMMENT, payload: res.data }))
    .catch((err) => console.log(err))
  }
}

function createSuccess(data) {
  return {
    type: CREATE_COMMENT,
    payload: data
  }
}

function fetchCommentsSuccess(data) {
  return {
    type: FETCH_ALL_COMMENTS,
    payload: data
  }
}