import { FETCH_ALL_COMMENTS } from '../globalActions';

export default function (state = [], action) {
  switch (action.type) {
    case FETCH_ALL_COMMENTS:
      return action.payload;
    default:
      return state;
  }
}
