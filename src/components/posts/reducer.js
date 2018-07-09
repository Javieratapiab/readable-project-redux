import {
  FETCH_CATEGORY_POSTS,
  FETCH_ALL_POSTS,
  POST_VOTE,
  DELETE_POST,
  EDIT_POST,
  CREATE_POST,
  FETCH_POST_BY_ID
} from '../globalActions';
import { mapKeys } from '../../utils/helpers'

export default function (state = {}, action) {
  switch (action.type) {
    case FETCH_ALL_POSTS:
      return mapKeys(action, state)
    case FETCH_CATEGORY_POSTS:
      return mapKeys(action, state)
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
      const newPost = { [action.payload.id]: action.payload }
      const newState = Object.assign({}, state.byId, newPost)
      return {
        ...state,
        allIds: state.allIds.concat(action.payload.id),
        byId: newState
      }
    case FETCH_POST_BY_ID:
      const currentPost = { [action.payload.id]: action.payload }
      const setState = Object.assign({}, currentPost)
      return {
        allIds: [action.payload.id],
        byId: setState
      }
    default:
      return state;
  }
}
