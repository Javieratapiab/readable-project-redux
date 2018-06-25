import {
  FETCH_CATEGORY_POSTS,
  FETCH_ALL_POSTS
} from '../globalActions';

export default function (state = [], action) {
  switch (action.type) {
    case FETCH_ALL_POSTS:
      const allPosts = Object.keys(action.payload).map(function(key) {
        return action.payload[key]
      })
      return allPosts;
    case FETCH_CATEGORY_POSTS:
      const posts = Object.keys(action.payload).map(function(key) {
        return action.payload[key]
      })
      return posts;
    default:
      return state;
  }
}
