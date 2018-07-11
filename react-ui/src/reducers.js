import { combineReducers } from 'redux';
import categories from './components/categories/reducer';
import comments from './components/comments/reducer';
import posts from './components/posts/reducer';
import sortBy from './components/posts/sortReducer';

const rootReducer = combineReducers({
  categories: categories,
  comments: comments,
  posts: posts,
  postsSorted: sortBy
});

export default rootReducer;
