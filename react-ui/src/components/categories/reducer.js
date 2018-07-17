import { FETCH_ALL_CATEGORIES } from '../globalActions';

// Iniialize variables
let initialState = []

export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_ALL_CATEGORIES:
      return action.payload.categories;
    default:
      return state;
  }
}
