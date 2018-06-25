import { FETCH_ALL_CATEGORIES } from '../globalActions';

export default function (state = [], action) {
  switch (action.type) {
    case FETCH_ALL_CATEGORIES:
      const { categories } = action
      return categories;
    default:
      return state;
  }
}
