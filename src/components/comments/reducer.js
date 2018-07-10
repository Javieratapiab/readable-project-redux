import { FETCH_ALL_COMMENTS,
         CREATE_COMMENT,
         COMMENT_VOTE,
         DELETE_COMMENT,
         EDIT_COMMENT
        } from '../globalActions';
import { mapKeys} from '../../utils/helpers'

export default function (state = {}, action) {
  switch (action.type) {
    case FETCH_ALL_COMMENTS:
      return mapKeys(action, state)
    case CREATE_COMMENT:
      const newComment = { [action.payload.id]: action.payload }
      const newState = Object.assign({}, state.byId, newComment)
      return {
        ...state,
        allIds: state.allIds.concat(action.payload.id),
        byId: newState
      }
    case COMMENT_VOTE:
      return {
        ...state,
        byId: {
          ...state.byId,
          [action.payload.id]: action.payload
        }
      }
    case DELETE_COMMENT:
      return {
        ...state,
        byId: {
          ...state.byId,
          [action.payload.id]: action.payload
        }
      }
    case EDIT_COMMENT:
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
