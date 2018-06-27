import { FETCH_ALL_CATEGORIES } from '../globalActions';

export default function (state = [], action) {
  switch (action.type) {
    case FETCH_ALL_CATEGORIES:
      return action.payload.categories;
    default:
      return state;
  }
}
