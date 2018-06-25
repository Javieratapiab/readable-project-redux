import { ROOT_PATH, HEADERS } from './constants';
import axios from 'axios';

axios.defaults.headers.common['Authorization'] = HEADERS

// Get all categories
export function fetchAll() {
  return axios.get(`${ROOT_PATH}/categories`)
    .then((res) => res.data)
}

