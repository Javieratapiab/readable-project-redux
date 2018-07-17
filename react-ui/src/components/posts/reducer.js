import {
  FETCH_CATEGORY_POSTS,
  FETCH_ALL_POSTS,
  POST_VOTE,
  DELETE_POST,
  EDIT_POST,
  CREATE_POST,
  FETCH_POST_BY_ID,
} from '../globalActions';
import { mapKeys } from '../../utils/helpers'

// Initalize variables
let initalState = {}
let newPost = {}
let newState = {}
let currentPost = {}

export default function (state = initalState, action) {
  switch (action.type) {
    case FETCH_ALL_POSTS:
      return mapKeys(action.payload, state)
    case FETCH_CATEGORY_POSTS:
      return mapKeys(action.payload, state)
    case POST_VOTE:
      return {
        ...state,
        byId: {
          ...state.byId,
          [action.payload.id]: action.payload
        }
      }
    case DELETE_POST:
      return {
        ...state,
        byId: {
          ...state.byId,
          [action.payload.id]: action.payload
        }
      }
    case EDIT_POST:
      return {
        ...state,
        byId: {
          ...state.byId,
          [action.payload.id]: action.payload
        }
      }
    case CREATE_POST:
      newPost = { [action.payload.id]: action.payload }
      newState = Object.assign({}, state.byId, newPost)
      return {
        ...state,
        allIds: state.allIds.concat(action.payload.id),
        byId: newState
      }
    case FETCH_POST_BY_ID:
      currentPost = { [action.payload.id]: action.payload }
      newState = Object.assign({}, currentPost)
      return {
        allIds: [action.payload.id],
        byId: newState
      }
    default:
      return state;
  }
}
