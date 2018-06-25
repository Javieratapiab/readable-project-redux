import { FETCH_ALL_CATEGORIES } from '../globalActions';

export function fetchAll ({ categories }) {
  return {
    type: FETCH_ALL_CATEGORIES,
    categories,
  }
}
