import { combineReducers } from 'redux';
import categories from './components/categories/reducer';
import comments from './components/comments/reducer';
import posts from './components/posts/reducer';

const rootReducer = combineReducers({ categories, comments, posts });

export default rootReducer;
