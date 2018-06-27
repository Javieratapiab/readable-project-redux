import {
  FETCH_CATEGORY_POSTS,
  FETCH_ALL_POSTS,
  POST_VOTE
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
    default:
      return state;
  }
}
