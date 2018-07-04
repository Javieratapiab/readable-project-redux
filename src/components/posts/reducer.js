import {
  FETCH_CATEGORY_POSTS,
  FETCH_ALL_POSTS,
  POST_VOTE,
  DELETE_POST,
  EDIT_POST
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
    default:
      return state;
  }
}
