import { FETCH_ALL_CATEGORIES } from '../globalActions';
import { ROOT_PATH, HEADERS } from '../../utils/constants';
import axios from 'axios';

axios.defaults.headers.common['Authorization'] = HEADERS

// Get all categories
export function fetchAll() {
  return dispatch => {
    axios.get(`${ROOT_PATH}/categories`)
    .then((res) => dispatch(fetchCategoriesSuccess(res.data)))
  }
}

function fetchCategoriesSuccess(data) {
  return {
      type: FETCH_ALL_CATEGORIES,
      payload: data
  }
}
