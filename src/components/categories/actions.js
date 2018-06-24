export const FETCH_ALL_CATEGORIES = 'FETCH_ALL_CATEGORIES';

export function fetchAll ({ categories }) {
  return {
    type: FETCH_ALL_CATEGORIES,
    categories,
  }
}
